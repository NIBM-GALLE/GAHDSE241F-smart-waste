import Sidebar from "../../../components/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Manage waste bins, users, and system settings here.</p>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-2xl">150</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">Active Bins</h2>
            <p className="text-2xl">48</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">Alerts</h2>
            <p className="text-2xl">12</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
