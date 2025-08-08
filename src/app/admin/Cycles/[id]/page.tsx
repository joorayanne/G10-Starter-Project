"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/app/auth/authHelpers";
import { Cycle } from "@/types/cycle";
import UpdateCycleForm from "@/components/admin/UpdateCycleForm";

const API_BASE = "https://a2sv-application-platform-backend-team10.onrender.com";



export default function CycleDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const token = getAccessToken();

  useEffect(() => {
    const fetchCycle = async () => {
      try {
        const res = await axios.get(`${API_BASE}/cycles/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCycle(res.data.data);

        
        setFormData({
          name: res.data.data.name,
          start_date: res.data.data.start_date,
          end_date: res.data.data.end_date,
          description: res.data.data.description || "",
        });
      } catch (err) {
        console.error("Error fetching cycle", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCycle();
  }, [id]);

  const handleActivate = async () => {
    try {
      await axios.patch(`${API_BASE}/admin/cycles/${id}/activate/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowToast("Cycle activated successfully!");
      setTimeout(() => {
        router.refresh();
        setShowToast("");
      }, 1500);
    } catch (err) {
      console.error("Error activating cycle", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this cycle?")) return;
    try {
      await axios.delete(`${API_BASE}/admin/cycles/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowToast("Cycle deleted successfully!");
      setTimeout(() => {
        router.push("/admin/cycles");
      }, 1500);
    } catch (err) {
      console.error("Error deleting cycle", err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/admin/cycles/${id}/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowToast("Cycle updated successfully!");
      setShowUpdateForm(false);
      setTimeout(() => {
        router.refresh();
        setShowToast("");
      }, 1500);
    } catch (err) {
      console.error("Error updating cycle", err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!cycle) return <p className="p-4">Cycle not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow relative">
      {/* Update Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowUpdateForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Cycle
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">{cycle.name}</h1>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Start Date:</span>{" "}
        {new Date(cycle.start_date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">End Date:</span>{" "}
        {new Date(cycle.end_date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-6">
        <span className="font-semibold">Description:</span>{" "}
        {cycle.description || "No description available"}
      </p>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleActivate}
          className={`px-4 py-2 rounded text-white ${
            cycle.is_active
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={cycle.is_active}
        >
          {cycle.is_active ? "Already Active" : "Activate Cycle"}
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Cycle
        </button>
      </div>

      {/* Update Form Modal */}
      {showUpdateForm && (
          <UpdateCycleForm
            formData={formData}
            setFormData={setFormData}
            onCancel={() => setShowUpdateForm(false)}
            onSubmit={handleUpdate}
          />
        )}


      {/* Toast */}
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white px-6 py-3 rounded shadow-lg text-center text-green-600 font-semibold">
            {showToast}
          </div>
        </div>
      )}
    </div>
  );
}
