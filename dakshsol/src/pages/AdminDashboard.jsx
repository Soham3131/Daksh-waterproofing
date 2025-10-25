
import React, { useState, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Loader from '../components/Loader';
import { bookingApis } from '../api/apis';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const DashboardCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-lg flex items-center justify-between border-l-4 border-${color}-500 transition-shadow duration-300 hover:shadow-xl`}
  >
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
    <span className={`text-4xl text-${color}-500`}>{icon}</span>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('All Time');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await bookingApis.getDashboardStatsAdmin();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const monthOptions = useMemo(() => {
    if (!stats?.monthlyTrend) return ['All Time'];
    const months = stats.monthlyTrend.map((d) => d.monthYear);
    return ['All Time', ...months];
  }, [stats]);

  const filteredChartData = useMemo(() => {
    if (!stats?.monthlyTrend) return [];
    if (selectedMonth === 'All Time') return stats.monthlyTrend;
    return stats.monthlyTrend.filter((m) => m.monthYear === selectedMonth);
  }, [stats, selectedMonth]);

  const selectedMonthDays = useMemo(() => {
    if (!stats?.dailyTrend || selectedMonth === 'All Time') return [];
    return stats.dailyTrend[selectedMonth] || [];
  }, [stats, selectedMonth]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-md text-sm">
          <p className="font-bold text-indigo-600">{label}</p>
          {payload.map((p, index) => (
            <p key={index} className="text-gray-700">
              {p.name}:{' '}
              <span className="font-semibold">
                {p.name === 'Revenue' ? `₹${p.value.toLocaleString()}` : p.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="p-8"><Loader /></div>;
  if (error || !stats)
    return (
      <div className="p-8 text-red-600 bg-red-100 border border-red-400 rounded-xl">
        {error}
      </div>
    );

  const { kpis } = stats;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixed */}
      <div className="w-64 sticky top-0 h-screen bg-white border-r shadow-md">
        <AdminSidebar />
      </div>

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
          Admin Dashboard
        </h1>
        <Outlet />

        {/* KPI cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-6">
          <DashboardCard
            title="Total Bookings"
            value={kpis.totalBookings}
            icon="📋"
            color="blue"
          />
          <DashboardCard
            title="Total Revenue"
            value={`₹${kpis.totalRevenue.toLocaleString()}`}
            icon="💰"
            color="green"
          />
          <DashboardCard
            title="Completed Orders"
            value={kpis.completedBookings}
            icon="✅"
            color="purple"
          />
          <DashboardCard
            title="Pending Payments"
            value={kpis.pendingPaymentCount}
            icon="⏳"
            color="red"
          />
        </div>

        {/* Monthly Trend */}
        <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              📈 Monthly Performance (Last 12 Months)
            </h2>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Select Month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500"
              >
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.monthlyTrend}
                margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="monthYear" />
                <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
                <YAxis yAxisId="right" orientation="right" stroke="#059669" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookings"
                  name="Bookings"
                  stroke="#2563eb"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  name="Revenue"
                  fill="#059669"
                  barSize={20}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Breakdown for Selected Month */}
        {selectedMonth !== 'All Time' && (
          <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              📊 Daily Breakdown — {selectedMonth}
            </h2>
            {selectedMonthDays.length > 0 ? (
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedMonthDays}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No daily data available for this month.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;