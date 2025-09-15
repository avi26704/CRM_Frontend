export default function Navbar({ user, onLogout }) {
  return (
    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl">CRM Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>{user?.name}</span>
        <img src={user?.picture} alt="avatar" className="w-8 h-8 rounded-full" />
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
