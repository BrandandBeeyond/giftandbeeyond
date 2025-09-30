import Link from "next/link";

import AdminHeader from "./components/Adminheader";
import AdminFooter from "./components/AdminFooter";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-gray-100">
        <div className="flex flex-col h-screen">
          <AdminHeader />
          <div className="flex flex-1">
            <AdminSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
          <AdminFooter />
        </div>
      </body>
    </html>
  );
}
