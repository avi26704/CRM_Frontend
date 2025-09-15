import { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function CampaignAnalytics() {
  const [campaignID, setCampaignID] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const COLORS = ["#4ade80", "#f87171", "#facc15"];

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!campaignID) return;

    setLoading(true);
    try {
      const url=process.env.REACT_APP_API_ANALYTICS_URL;
      const res = await axios.get(`${url}/${campaignID}`);
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch analytics. Please check the Campaign ID.");
      setAnalytics(null);
    }
    setLoading(false);
  };

  const barData = analytics
    ? [
        { name: "Sent", value: analytics.stats.sent },
        { name: "Failed", value: analytics.stats.failed },
        { name: "Pending", value: analytics.stats.pending },
      ]
    : [];

  const pieData = analytics
    ? [
        { name: "Sent", value: analytics.stats.sent },
        { name: "Failed", value: analytics.stats.failed },
        { name: "Pending", value: analytics.stats.pending },
      ]
    : [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Campaign Analytics</h2>

      <form className="mb-6 flex gap-2" onSubmit={handleFetch}>
        <input
          type="text"
          placeholder="Enter Campaign ID"
          value={campaignID}
          onChange={(e) => setCampaignID(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch
        </button>
      </form>

      {loading && <p>Loading Campaign Data...</p>}

      {analytics && !loading && (
        <div className="space-y-4">
          <div>
            <p><b>Total:</b> {analytics.stats.total}</p>
            <p><b>Sent:</b> {analytics.stats.sent}</p>
            <p><b>Failed:</b> {analytics.stats.failed}</p>
            <p><b>Pending:</b> {analytics.stats.pending}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Bar Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Pie Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}