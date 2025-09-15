import React, { useEffect, useState } from "react";
import {
  BarChart,Bar,XAxis,YAxis, CartesianGrid,Tooltip,ResponsiveContainer,PieChart,Pie,Cell,Legend,} from "recharts";

export default function Dashboard({ user }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (user?.email) {
    const url=process.env.REACT_APP_API_GET_CAMP_URL;
    fetch(`${url}?createdBy=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched campaigns:", data);
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        setLoading(false);
      });
  }
}, [user]);


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-indigo-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c) => c.pending > 0).length;
  const leadsGenerated = campaigns.reduce((sum, c) => sum + c.audienceSize, 0);
  const conversions = campaigns.reduce((sum, c) => sum + c.sent, 0);

  const stats = [
    { title: "Total Campaigns", value: totalCampaigns },
    { title: "Active Campaigns", value: activeCampaigns },
    { title: "Leads Generated", value: leadsGenerated },
    { title: "Conversions", value: conversions },
  ];

  const recentCampaigns = campaigns.slice(0, 5).map((c) => ({
    id: c.id,
    name: c.name,
    status: c.pending > 0 ? "Active" : c.failed > 0 ? "Completed" : "Draft",
    leads: c.audienceSize,
  }));

  const campaignPerformance = campaigns.map((c) => ({
    name: c.name,
    leads: c.audienceSize,
  }));

  const campaignStatus = [
    { name: "Active", value: campaigns.filter((c) => c.pending > 0).length },
    { name: "Completed", value: campaigns.filter((c) => c.failed > 0).length },
    {
      name: "Draft",
      value: campaigns.filter((c) => c.pending === 0 && c.sent === 0).length,
    },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.name} 👋</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition"
          >
            <h3 className="text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis/>
              <Tooltip />
              <Bar dataKey="leads" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Campaign Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignStatus}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {campaignStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Campaigns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold text-indigo-600">
                Campaign ID: {campaign.id}
              </h4>
              <h4 className="font-semibold text-red-600">
                {campaign.name}
              </h4>
              <p className="text-sm text-gray-500">
                Status: {campaign.status}
              </p>
              <p className="text-sm text-gray-500">
                Leads: {campaign.leads}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
