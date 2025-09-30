'use client'
import Link from 'next/link'
import { LayoutDashboard, Box, ShoppingCart, Users } from 'lucide-react'

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-full bg-white shadow-md p-5">
      <nav className="space-y-4">
        <Link href="/admin" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link href="/admin/products" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <Box size={20} />
          Products
        </Link>
        <Link href="/admin/orders" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <ShoppingCart size={20} />
          Orders
        </Link>
        <Link href="/admin/users" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <Users size={20} />
          Users
        </Link>
      </nav>
    </aside>
  )
}

export default AdminSidebar
