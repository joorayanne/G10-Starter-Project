import AdminNavbar from "../../components/admin/Admin_Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNavbar />
      <main className="p-8 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
