"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCustomer, getInquiries, downloadInquiryPDF } from "@/app/lib/api";
import { getStoredUser } from "@/app/lib/auth";
import Toast from "@/app/components/ui/Toast";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { StatusBadge } from "@/app/components/ui/StatusBadge";
import Link from "next/link";
import React from 'react';

const inputCls = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500";
const labelCls = "block text-xs font-semibold text-gray-700 mb-1";
const btnPrimary = "rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700 disabled:opacity-60";
const btnSecondary = "rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60";

export default function SellerCustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = Number(params?.id);

  const [loading, setLoading] = useState(true);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  const [customer, setCustomer] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) { router.replace("/login"); return; }
    if (user.designation !== "seller") { router.replace("/admin/dashboard"); return; }
    loadData();
  }, [customerId]);

  async function loadData() {
    setLoading(true);
    try {
      const cust = await getCustomer(customerId);
      setCustomer(cust);
      
      if (cust.customer_ref_id) {
        setInquiriesLoading(true);
        try {
          const inqRes = await getInquiries({ search: cust.customer_ref_id, limit: 100 });
          setInquiries(inqRes.inquiries || []);
        } catch (e) {
          console.error(e);
        } finally {
          setInquiriesLoading(false);
        }
      }
    } catch {
      setToast({ message: "Failed to load customer", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const handleDownloadPDF = async (inquiryId: number) => {
    try {
      const blob = await downloadInquiryPDF(inquiryId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inquiry-${inquiryId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      setToast({ message: err.message || "Failed to download PDF", type: 'error' });
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center"><LoadingSpinner /></div>;
  if (!customer) return <div className="flex-1 flex items-center justify-center text-gray-500">Customer not found.</div>;

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 min-h-screen print:bg-white print:p-0">
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; }
          .print-hidden { display: none !important; }
        }
      `}</style>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6 print-hidden">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Profile</h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Header section for print */}
        <div className="hidden print:block border-b-2 border-orange-600 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{customer.customer_name}</h1>
          <p className="text-sm text-gray-500">Ref: {customer.customer_ref_id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1"><p className={labelCls}>Customer ID</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.customer_ref_id}</p></div>
          <div className="space-y-1"><p className={labelCls}>Customer Name</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.customer_name}</p></div>
          <div className="space-y-1"><p className={labelCls}>Sector</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.sector || "—"}</p></div>
          
          <div className="space-y-1"><p className={labelCls}>Party</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.party || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>Customer Initials</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.customer_initials || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>City</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.city || "—"}</p></div>

          <div className="space-y-1"><p className={labelCls}>Email</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.email || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>Phone</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.phone || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>Website</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.website || "—"}</p></div>

          <div className="space-y-1"><p className={labelCls}>HO. Address</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.ho_address || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>Factory Address</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.factory_address || "—"}</p></div>
          
          <div className="space-y-1"><p className={labelCls}>NTN#</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.ntn || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>GST#</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.gst || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>CNIC#</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.cnic || "—"}</p></div>

          <div className="space-y-1"><p className={labelCls}>Cust. Relation</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.cust_relation || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>Cust. Priority</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.cust_priority || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>Cust. Type</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.cust_type || "—"}</p></div>

          <div className="space-y-1"><p className={labelCls}>Cust. Culture</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.cust_culture || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>Payment Method</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.payment_method || "—"}</p></div>
          <div className="space-y-1"><p className={labelCls}>Payment Terms</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.payment_terms || "—"}</p></div>
          
          <div className="space-y-1"><p className={labelCls}>Tax Type</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1">{customer.tax_type || "—"}</p></div>
          <div className="space-y-1 md:col-span-2 lg:col-span-3"><p className={labelCls}>Additional Details</p><p className="text-sm text-gray-900 border-b border-gray-100 pb-1 whitespace-pre-wrap">{customer.additional_details || "—"}</p></div>
        </div>
        
        {/* Contact Persons Table */}
        <div className="pt-6 border-t border-gray-200 print:border-t-2 print:border-gray-800 print:pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Contact Persons</h3>
          </div>
          
          {customer.personnel && customer.personnel.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50 print:bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">CP. Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Designation</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {customer.personnel.map((p: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{p.cp_name || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.department || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.desg || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.email || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.phone || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No contact persons registered.</p>
          )}
        </div>

        {/* Inquiries History Section */}
        <div className="pt-6 border-t border-gray-200 print:hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Customer Inquiries History</h3>
          </div>
          
          {inquiriesLoading ? (
            <div className="flex justify-center p-4"><LoadingSpinner /></div>
          ) : inquiries && inquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ref ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Sales Rep</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {inquiries.map((inq: any) => (
                    <tr key={inq.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{inq.inquiry_ref_id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{new Date(inq.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm"><StatusBadge status={inq.status} /></td>
                      <td className="px-4 py-3 text-sm text-gray-600">{inq.seller?.username || "—"}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <Link href={`/seller/inquiries/${inq.id}`} className="text-orange-600 hover:text-orange-800">
                            View Inquiry
                          </Link>
                          <button onClick={() => handleDownloadPDF(inq.id)} className="flex items-center gap-1 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-xs transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download PDF
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
              <p className="text-sm text-gray-500 italic">No inquiries recorded for this customer yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

