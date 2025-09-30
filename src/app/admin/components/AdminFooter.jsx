import React from "react";

const AdminFooter = () => {
  return (
    <footer className="bg-white shadow-inner relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Gift and Beeyond — Admin Panel
      </div>
    </footer>
  );
};

export default AdminFooter;
