import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-5 space-y-4">
      <Link to="/dashboard" className="block hover:text-indigo-300">Dashboard</Link>
      <Link to="/create-campaign" className="block hover:text-indigo-300">Create Campaign</Link>
      <Link to="/data-ingestion" className="block hover:text-indigo-300">Data Ingestion</Link>
      <Link to="/analytics" className="block hover:text-indigo-300">Campaign Analytics</Link>
    </div>
  );
}
