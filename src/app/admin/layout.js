import Link from "next/link";

import AdminHeader from "./components/Adminheader";
import AdminFooter from "./components/AdminFooter";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <AdminFooter />
    </div>
  );
}
