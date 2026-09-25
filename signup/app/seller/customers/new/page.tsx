"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer, getSellers } from "@/app/lib/api";
import Toast from "@/app/components/ui/Toast";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import React, { useEffect } from 'react';

const inputCls = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500";
const labelCls = "block text-xs font-semibold text-gray-700 mb-1";
const btnPrimary = "rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700 disabled:opacity-60";
const btnSecondary = "rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60";

export default function NewCustomerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [sellers, setSellers] = useState<any[]>([]);
  
  const [form, setForm] = useState<any>({
    sector: "", party: "", customer_name: "", customer_initials: "",
    ho_address: "", factory_address: "", city: "", website: "", email: "",
    ntn: "", gst: "", cnic: "", phone: "", cust_relation: "", cust_priority: "",
    cust_type: "", cust_culture: "", payment_method: "", payment_terms: "", tax_type: "",
    sales_rep_id: "", additional_details: "",
    personnel: []
  });

  useEffect(() => {
    getSellers().then(setSellers).catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPersonnel = () => {
    setForm({ ...form, personnel: [...form.personnel, { cp_name: "", department: "", desg: "", email: "", phone: "" }] });
  };

  const updatePersonnel = (index: number, field: string, value: string) => {
    const updated = [...form.personnel];
    updated[index][field] = value;
    setForm({ ...form, personnel: updated });
  };

  const removePersonnel = (index: number) => {
    const updated = form.personnel.filter((_: any, i: number) => i !== index);
    setForm({ ...form, personnel: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (payload.sales_rep_id) payload.sales_rep_id = Number(payload.sales_rep_id);
      else payload.sales_rep_id = null;
      
      await createCustomer(payload);
      setToast({ message: "Customer created successfully!", type: "success" });
      setTimeout(() => router.push("/seller/customers"), 1000);
    } catch (err: any) {
      setToast({ message: err.message || "Failed to create customer", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create Customer Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelCls}>Sector *</label><input required name="sector" value={form.sector || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Party</label><input name="party" value={form.party || ""} onChange={handleChange} className={inputCls} /></div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelCls}>Customer *</label><input required name="customer_name" value={form.customer_name || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Customer Initials</label><input name="customer_initials" value={form.customer_initials || ""} onChange={handleChange} className={inputCls} /></div>
        </div>
        {/* Row 3 & 4 */}
        <div><label className={labelCls}>HO. Address *</label><input required name="ho_address" value={form.ho_address || ""} onChange={handleChange} className={inputCls} /></div>
        <div><label className={labelCls}>Factory Address</label><input name="factory_address" value={form.factory_address || ""} onChange={handleChange} className={inputCls} /></div>
        
        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className={labelCls}>City *</label><input required name="city" value={form.city || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Website *</label><input required name="website" value={form.website || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Email *</label><input required type="email" name="email" value={form.email || ""} onChange={handleChange} className={inputCls} /></div>
        </div>
        {/* Row 6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className={labelCls}>NTN#</label><input name="ntn" value={form.ntn || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>GST#</label><input name="gst" value={form.gst || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>CNIC#</label><input name="cnic" value={form.cnic || ""} onChange={handleChange} className={inputCls} /></div>
        </div>
        {/* Row 7 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className={labelCls}>Phone# *</label><input required name="phone" value={form.phone || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Cust. Relation</label><input name="cust_relation" value={form.cust_relation || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Cust. Priority</label><input name="cust_priority" value={form.cust_priority || ""} onChange={handleChange} className={inputCls} /></div>
        </div>
        {/* Row 8 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className={labelCls}>Cust. Type *</label><input required name="cust_type" value={form.cust_type || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Cust. Culture</label><input name="cust_culture" value={form.cust_culture || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Payment Method</label><input name="payment_method" value={form.payment_method || ""} onChange={handleChange} className={inputCls} /></div>
        </div>
        {/* Row 9 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className={labelCls}>Payment Terms</label><input name="payment_terms" value={form.payment_terms || ""} onChange={handleChange} className={inputCls} /></div>
          <div><label className={labelCls}>Tax Type</label><input name="tax_type" value={form.tax_type || ""} onChange={handleChange} className={inputCls} /></div>
          <div>
            <label className={labelCls}>Sales Rep</label>
            <select name="sales_rep_id" value={form.sales_rep_id || ""} onChange={handleChange} className={inputCls}>
              <option value="">-- Select Rep --</option>
              {sellers.map(s => <option key={s.id} value={s.id}>{s.username}</option>)}
            </select>
          </div>
        </div>
        {/* Row 10 */}
        <div><label className={labelCls}>Additional Details</label><textarea name="additional_details" value={form.additional_details || ""} onChange={handleChange} className={inputCls} rows={3} /></div>
        
        {/* Row 11: Dynamic Contact Persons Table */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800">Contact Persons</h3>
            <button type="button" onClick={addPersonnel} className="text-xs font-bold text-orange-600 hover:text-orange-800">+ Add Row</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">CP. Name *</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">Department</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">Desg</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">Email</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">Phone</th>
                  <th className="px-3 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {form.personnel.map((p: any, i: number) => (
                  <tr key={i}>
                    <td className="px-2 py-2"><input required value={p.cp_name || ""} onChange={e => updatePersonnel(i, "cp_name", e.target.value)} className={inputCls} placeholder="Name" /></td>
                    <td className="px-2 py-2"><input value={p.department || ""} onChange={e => updatePersonnel(i, "department", e.target.value)} className={inputCls} placeholder="Dept" /></td>
                    <td className="px-2 py-2"><input value={p.desg || ""} onChange={e => updatePersonnel(i, "desg", e.target.value)} className={inputCls} placeholder="Desg" /></td>
                    <td className="px-2 py-2"><input value={p.email || ""} onChange={e => updatePersonnel(i, "email", e.target.value)} className={inputCls} placeholder="Email" type="email" /></td>
                    <td className="px-2 py-2"><input value={p.phone || ""} onChange={e => updatePersonnel(i, "phone", e.target.value)} className={inputCls} placeholder="Phone" /></td>
                    <td className="px-2 py-2 text-center"><button type="button" onClick={() => removePersonnel(i)} className="text-red-500 hover:text-red-700 text-lg">×</button></td>
                  </tr>
                ))}
                {form.personnel.length === 0 && (
                  <tr><td colSpan={6} className="px-3 py-6 text-center text-sm text-gray-400">No contact persons added.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
          <button type="button" onClick={() => router.back()} className={btnSecondary}>Cancel</button>
          <button type="submit" disabled={saving} className={btnPrimary}>{saving ? "Saving..." : "Save Customer"}</button>
        </div>
      </form>
    </div>
  );
}
