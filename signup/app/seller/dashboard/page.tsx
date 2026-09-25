"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getInquiries, getDashboardStats, downloadInquiryPDF, deleteInquiry } from '@/app/lib/api';
import { getStoredUser } from '@/app/lib/auth';
import { StatusBadge } from '@/app/components/ui/StatusBadge';
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner';
import Toast from '@/app/components/ui/Toast';
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

export default function SellerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, new: 0, in_progress: 0, completed: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'}|null>(null);
  const [deleteModal, setDeleteModal] = useState<number | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [inqRes, statRes] = await Promise.all([
        getInquiries({ limit: 100 }).catch(() => ({ inquiries: [] })),
        getDashboardStats().catch(() => ({ total: 0, new: 0, in_progress: 0, completed: 0, cancelled: 0 }))
      ]);
      setInquiries(inqRes?.inquiries || []);
      setStats(statRes);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteInquiry(id);
      setToast({ message: 'Inquiry deleted successfully', type: 'success' });
      setDeleteModal(null);
      fetchData();
    } catch (err: any) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handleDownloadPDF = async (id: number) => {
    try {
      const blob = await downloadInquiryPDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inquiry-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      setToast({ message: err.message || "Failed to download PDF", type: 'error' });
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner /></div>;

  // Pie Chart Data
  const pieData = [
    { name: 'In Progress', value: stats.in_progress, color: '#f59e0b' },
    { name: 'Completed', value: stats.completed, color: '#10b981' },
    { name: 'Cancelled', value: stats.cancelled, color: '#ef4444' },
    { name: 'New', value: stats.new, color: '#3b82f6' }
  ].filter(d => d.value > 0);

  // Bar Chart Data (Monthly Submissions)
  const monthlyData: Record<string, number> = {};
  [...inquiries].reverse().forEach(inq => {
    const d = new Date(inq.created_at);
    const month = d.toLocaleString('default', { month: 'short' });
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });
  const barData = Object.keys(monthlyData).map(k => ({ name: k, inquiries: monthlyData[k] })).slice(-6);

  // Recent Inquiries (Strict LIFO)
  const recentInquiries = [...inquiries].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);

  return (
    <div className="space-y-6 pb-12 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.username}</h1>
      </div>

      {/* Top Row: KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        <MetricCard 
          title="Total Inquiries" value={stats.total} subtitle="All time" 
          color="text-indigo-600" bg="bg-indigo-50"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} 
        />
        <MetricCard 
          title="New" value={stats.new} subtitle="Requires action" 
          color="text-blue-600" bg="bg-blue-50"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>} 
        />
        <MetricCard 
          title="In Progress" value={stats.in_progress} subtitle="Active work" 
          color="text-yellow-600" bg="bg-yellow-50"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
        />
        <MetricCard 
          title="Completed" value={stats.completed} subtitle="Closed deals" 
          color="text-green-600" bg="bg-green-50"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
        />
        <MetricCard 
          title="Cancelled" value={stats.cancelled} subtitle="Dropped deals" 
          color="text-red-600" bg="bg-red-50"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>} 
        />
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Inquiry Status Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Monthly Submissions</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} allowDecimals={false} />
                <RechartsTooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="inquiries" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Inquiries */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Recent Inquiries</h2>
          <Link href="/seller/inquiries" className="text-sm font-medium text-orange-600 hover:text-orange-800 bg-orange-50 px-3 py-1.5 rounded-md">View All Inquiries →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Inquiry ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentInquiries.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No recent inquiries found.</td></tr>
              ) : (
                recentInquiries.map((inq: any) => (
                  <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{inq.inquiry_ref_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{inq.customer?.customer_name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={inq.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inq.seller?.username || 'Unassigned'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(inq.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/seller/inquiries/${inq.id}`} className="text-orange-600 hover:text-orange-800 font-semibold">View</Link>
                        <button onClick={() => handleDownloadPDF(inq.id)} className="text-gray-500 hover:text-gray-900" title="Download PDF">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </button>
                        <button onClick={() => setDeleteModal(inq.id)} className="text-red-500 hover:text-red-700" title="Delete">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Inquiry</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this inquiry? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteModal(null)} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon, color, bg }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}