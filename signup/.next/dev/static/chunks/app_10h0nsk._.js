(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/ui/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Toast({ message, type, onClose }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            const timer = setTimeout(onClose, 4000);
            return ({
                "Toast.useEffect": ()=>clearTimeout(timer)
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        onClose
    ]);
    const base = "fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl px-5 py-4 shadow-2xl text-sm font-medium max-w-sm animate-fade-in-up";
    const styles = type === "success" ? `${base} bg-emerald-600 text-white` : `${base} bg-red-600 text-white`;
    const icon = type === "success" ? // Checkmark circle
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "mt-0.5 shrink-0 h-5 w-5",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
            clipRule: "evenodd"
        }, void 0, false, {
            fileName: "[project]/app/components/ui/Toast.tsx",
            lineNumber: 29,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/ui/Toast.tsx",
        lineNumber: 28,
        columnNumber: 7
    }, this) : // X circle
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "mt-0.5 shrink-0 h-5 w-5",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
            clipRule: "evenodd"
        }, void 0, false, {
            fileName: "[project]/app/components/ui/Toast.tsx",
            lineNumber: 38,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/ui/Toast.tsx",
        lineNumber: 37,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: styles,
        role: "alert",
        children: [
            icon,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex-1",
                children: message
            }, void 0, false, {
                fileName: "[project]/app/components/ui/Toast.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "ml-2 shrink-0 opacity-80 hover:opacity-100 transition-opacity",
                "aria-label": "Dismiss",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "h-4 w-4",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        fillRule: "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        clipRule: "evenodd"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ui/Toast.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/ui/Toast.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ui/Toast.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ui/Toast.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(Toast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addPersonnel",
    ()=>addPersonnel,
    "createAdmin",
    ()=>createAdmin,
    "createCompany",
    ()=>createCompany,
    "createCustomer",
    ()=>createCustomer,
    "createInquiry",
    ()=>createInquiry,
    "createSeller",
    ()=>createSeller,
    "deleteAdmin",
    ()=>deleteAdmin,
    "deleteCustomer",
    ()=>deleteCustomer,
    "deleteInquiry",
    ()=>deleteInquiry,
    "deletePersonnel",
    ()=>deletePersonnel,
    "deleteSeller",
    ()=>deleteSeller,
    "downloadInquiryPDF",
    ()=>downloadInquiryPDF,
    "getAdmins",
    ()=>getAdmins,
    "getCompany",
    ()=>getCompany,
    "getCustomer",
    ()=>getCustomer,
    "getCustomerInquiries",
    ()=>getCustomerInquiries,
    "getCustomerPersonnel",
    ()=>getCustomerPersonnel,
    "getCustomers",
    ()=>getCustomers,
    "getInquiries",
    ()=>getInquiries,
    "getInquiry",
    ()=>getInquiry,
    "getSellers",
    ()=>getSellers,
    "loginUser",
    ()=>loginUser,
    "registerUser",
    ()=>registerUser,
    "toggleAdmin",
    ()=>toggleAdmin,
    "toggleSeller",
    ()=>toggleSeller,
    "updateAdmin",
    ()=>updateAdmin,
    "updateCompany",
    ()=>updateCompany,
    "updateCustomer",
    ()=>updateCustomer,
    "updateInquiry",
    ()=>updateInquiry,
    "updateInquiryStatus",
    ()=>updateInquiryStatus,
    "updatePersonnel",
    ()=>updatePersonnel,
    "updateSeller",
    ()=>updateSeller
]);
const BASE_URL = 'http://127.0.0.1:8000';
async function parseError(res) {
    try {
        const body = await res.json();
        if (typeof body.detail === 'string') return body.detail;
        if (Array.isArray(body.detail)) return body.detail.map((e)=>e.msg).join(', ');
    } catch  {}
    return `Request failed with status ${res.status}`;
}
function authHeaders() {
    const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
    return {
        'Content-Type': 'application/json',
        ...token ? {
            Authorization: `Bearer ${token}`
        } : {}
    };
}
async function request(method, path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: authHeaders(),
        body: body !== undefined ? JSON.stringify(body) : undefined
    });
    if (!res.ok) throw new Error(await parseError(res));
    if (res.status === 204) return undefined;
    return res.json();
}
async function registerUser(payload) {
    const res = await fetch(`${BASE_URL}/user/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
}
async function loginUser(payload) {
    const res = await fetch(`${BASE_URL}/user/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
}
const getCompany = ()=>request('GET', '/api/company');
const createCompany = (data)=>request('POST', '/api/company', data);
const updateCompany = (data)=>request('PUT', '/api/company', data);
const getCustomers = (params = {})=>{
    const q = new URLSearchParams(params).toString();
    return request('GET', `/api/customers${q ? '?' + q : ''}`);
};
const createCustomer = (data)=>request('POST', '/api/customers', data);
const getCustomer = (id)=>request('GET', `/api/customers/${id}`);
const updateCustomer = (id, data)=>request('PUT', `/api/customers/${id}`, data);
const deleteCustomer = (id)=>request('DELETE', `/api/customers/${id}`);
const getCustomerInquiries = (id)=>request('GET', `/api/customers/${id}/inquiries`);
const getCustomerPersonnel = (id)=>request('GET', `/api/customers/${id}/personnel`);
const addPersonnel = (customerId, data)=>request('POST', `/api/customers/${customerId}/personnel`, data);
const updatePersonnel = (customerId, personnelId, data)=>request('PUT', `/api/customers/${customerId}/personnel/${personnelId}`, data);
const deletePersonnel = (customerId, personnelId)=>request('DELETE', `/api/customers/${customerId}/personnel/${personnelId}`);
const getInquiries = (params = {})=>{
    const q = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([, v])=>v !== undefined && v !== ''))).toString();
    return request('GET', `/api/inquiries${q ? '?' + q : ''}`);
};
const createInquiry = (data)=>request('POST', '/api/inquiries', data);
const getInquiry = (id)=>request('GET', `/api/inquiries/${id}`);
const updateInquiry = (id, data)=>request('PUT', `/api/inquiries/${id}`, data);
const updateInquiryStatus = (id, status)=>request('PATCH', `/api/inquiries/${id}/status`, {
        status
    });
const deleteInquiry = (id)=>request('DELETE', `/api/inquiries/${id}`);
const downloadInquiryPDF = async (id)=>{
    const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
    const res = await fetch(`${BASE_URL}/api/inquiries/${id}/pdf`, {
        headers: token ? {
            Authorization: `Bearer ${token}`
        } : {}
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.blob();
};
const getAdmins = ()=>request('GET', '/api/admins');
const createAdmin = (data)=>request('POST', '/api/admins', data);
const updateAdmin = (id, data)=>request('PUT', `/api/admins/${id}`, data);
const toggleAdmin = (id)=>request('PATCH', `/api/admins/${id}/toggle-active`);
const deleteAdmin = (id)=>request('DELETE', `/api/admins/${id}`);
const getSellers = ()=>request('GET', '/api/sellers');
const createSeller = (data)=>request('POST', '/api/sellers', data);
const updateSeller = (id, data)=>request('PUT', `/api/sellers/${id}`, data);
const toggleSeller = (id)=>request('PATCH', `/api/sellers/${id}/toggle-active`);
const deleteSeller = (id)=>request('DELETE', `/api/sellers/${id}`);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/register/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/Toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function validate(values) {
    const errors = {};
    if (!values.username.trim()) {
        errors.username = "Username is required.";
    } else if (values.username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters.";
    }
    if (!values.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
    }
    if (!values.password) {
        errors.password = "Password is required.";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
}
function RegisterPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        designation: "seller"
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dismissToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RegisterPage.useCallback[dismissToast]": ()=>setToast(null)
    }["RegisterPage.useCallback[dismissToast]"], []);
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev)=>({
                ...prev,
                [name]: value
            }));
        if (errors[name]) {
            setErrors((prev)=>({
                    ...prev,
                    [name]: undefined
                }));
        }
    }
    function handleDesignationChange(value) {
        setForm((prev)=>({
                ...prev,
                designation: value
            }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerUser"])({
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password,
                designation: form.designation
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify({
                id: res.data.id,
                username: res.data.username,
                email: res.data.email,
                designation: res.data.designation
            }));
            setToast({
                message: "Account created successfully! Redirecting…",
                type: "success"
            });
            setTimeout(()=>router.push("/dashboard"), 1200);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setToast({
                message,
                type: "error"
            });
        } finally{
            setIsLoading(false);
        }
    }
    // Consistent input styling: Bold text, clear border, transparent glass look
    const inputBaseClass = "w-full rounded-xl border border-gray-400/80 bg-white/40 px-4 py-3.5 text-base font-semibold text-black placeholder:text-gray-600 placeholder:font-normal outline-none backdrop-blur-md transition-all focus:border-orange-600 focus:bg-white/60 focus:ring-4 focus:ring-orange-500/20";
    const designationOptions = [
        {
            value: "seller",
            label: "Seller",
            description: "Manage products & orders"
        },
        {
            value: "admin",
            label: "Admin",
            description: "Full platform access"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-bg flex min-h-screen items-center justify-center px-4 py-12",
        children: [
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: toast.message,
                type: toast.type,
                onClose: dismissToast
            }, void 0, false, {
                fileName: "[project]/app/register/page.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-3xl border border-white/40 bg-white/20 backdrop-blur-xl shadow-2xl px-10 py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8 flex flex-col items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.png",
                                        alt: "Unisons Logo",
                                        width: 220,
                                        height: 62,
                                        className: "h-16 w-auto object-contain",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full border-t border-gray-300/40"
                                    }, void 0, false, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-3xl font-extrabold tracking-tight text-gray-950",
                                                children: "Create an Account"
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm font-medium text-gray-700",
                                                children: [
                                                    "Already have one?",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/login",
                                                        className: "font-bold text-orange-600 hover:text-orange-700 hover:underline transition-colors",
                                                        children: "Sign in"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/register/page.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 161,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/register/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                noValidate: true,
                                className: "flex flex-col gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "username",
                                                className: "text-sm font-bold text-gray-900",
                                                children: "Username"
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 177,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "username",
                                                name: "username",
                                                type: "text",
                                                autoComplete: "username",
                                                placeholder: "johndoe",
                                                value: form.username,
                                                onChange: handleChange,
                                                className: `${inputBaseClass} ${errors.username ? "border-red-500 ring-2 ring-red-300" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this),
                                            errors.username && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-red-600",
                                                role: "alert",
                                                children: errors.username
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "email",
                                                className: "text-sm font-bold text-gray-900",
                                                children: "Email Address"
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "email",
                                                name: "email",
                                                type: "email",
                                                autoComplete: "email",
                                                placeholder: "john@example.com",
                                                value: form.email,
                                                onChange: handleChange,
                                                className: `${inputBaseClass} ${errors.email ? "border-red-500 ring-2 ring-red-300" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, this),
                                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-red-600",
                                                role: "alert",
                                                children: errors.email
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-gray-900",
                                                children: "Designation"
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-3",
                                                role: "radiogroup",
                                                "aria-label": "Select your designation",
                                                children: designationOptions.map(({ value, label, description })=>{
                                                    const isSelected = form.designation === value;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        role: "radio",
                                                        "aria-checked": isSelected,
                                                        onClick: ()=>handleDesignationChange(value),
                                                        className: [
                                                            "flex flex-col items-start rounded-xl border px-4 py-3 text-left transition-all",
                                                            "focus:outline-none focus:ring-4 focus:ring-orange-500/20",
                                                            isSelected ? "border-orange-500 bg-orange-50/60 ring-2 ring-orange-400/40 backdrop-blur-md" : "border-gray-400/80 bg-white/40 hover:border-orange-400/60 hover:bg-white/50 backdrop-blur-md"
                                                        ].join(" "),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-sm font-bold ${isSelected ? "text-orange-700" : "text-gray-900"}`,
                                                                children: label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/register/page.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mt-0.5 text-xs font-normal text-gray-500",
                                                                children: description
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/register/page.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, value, true, {
                                                        fileName: "[project]/app/register/page.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "password",
                                                className: "text-sm font-bold text-gray-900",
                                                children: "Password"
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "password",
                                                name: "password",
                                                type: "password",
                                                autoComplete: "new-password",
                                                placeholder: "Min. 8 characters",
                                                value: form.password,
                                                onChange: handleChange,
                                                className: `${inputBaseClass} ${errors.password ? "border-red-500 ring-2 ring-red-300" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 15
                                            }, this),
                                            errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-red-600",
                                                role: "alert",
                                                children: errors.password
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "confirmPassword",
                                                className: "text-sm font-bold text-gray-900",
                                                children: "Confirm Password"
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "confirmPassword",
                                                name: "confirmPassword",
                                                type: "password",
                                                autoComplete: "new-password",
                                                placeholder: "Repeat your password",
                                                value: form.confirmPassword,
                                                onChange: handleChange,
                                                className: `${inputBaseClass} ${errors.confirmPassword ? "border-red-500 ring-2 ring-red-300" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            errors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-red-600",
                                                role: "alert",
                                                children: errors.confirmPassword
                                            }, void 0, false, {
                                                fileName: "[project]/app/register/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isLoading,
                                        className: "mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-orange-600/30 focus:outline-none focus:ring-4 focus:ring-orange-500/40 disabled:cursor-not-allowed disabled:opacity-60",
                                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "h-5 w-5 animate-spin",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "opacity-25",
                                                            cx: "12",
                                                            cy: "12",
                                                            r: "10",
                                                            stroke: "currentColor",
                                                            strokeWidth: "4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/register/page.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            className: "opacity-75",
                                                            fill: "currentColor",
                                                            d: "M4 12a8 8 0 018-8v8H4z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/register/page.tsx",
                                                            lineNumber: 322,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/register/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 19
                                                }, this),
                                                "Creating account…"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/register/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 17
                                        }, this) : "Create Account"
                                    }, void 0, false, {
                                        fileName: "[project]/app/register/page.tsx",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/register/page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/register/page.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-6 text-center text-xs font-medium text-gray-800",
                        children: [
                            "By registering you agree to our",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-orange-600 cursor-pointer hover:underline",
                                children: "Terms of Service"
                            }, void 0, false, {
                                fileName: "[project]/app/register/page.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/register/page.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/register/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/register/page.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(RegisterPage, "FVxsJsE24wK3xJbdMvYHAKQ81Rc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RegisterPage;
var _c;
__turbopack_context__.k.register(_c, "RegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_10h0nsk._.js.map