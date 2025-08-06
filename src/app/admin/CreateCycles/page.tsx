import Navbar from '@/app/admin/components/admin_Navbar';
import CreateCycleForm from '@/app/admin/components/CreateCycleForm';

export default function AdminCreateCyclesPage() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <CreateCycleForm />
      </div>
    </div>
    </>
    
  );
}
