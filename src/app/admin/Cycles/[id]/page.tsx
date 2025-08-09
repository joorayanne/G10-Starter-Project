"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Cycle } from "@/types/cycle";
import UpdateCycleForm from "@/components/admin/UpdateCycleForm";

const API_BASE = "https://a2sv-application-platform-backend-team10.onrender.com";

export default function CycleDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const fetchCycle = async () => {
    if (!session?.accessToken || session.error === "RefreshAccessTokenError") {
      router.push("/signin");
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/cycles/${id}/`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }
    if (status === "authenticated" && id) {
      fetchCycle();
    }
  }, [id, session, status]);

  const handleActivate = async () => {
    if (!session) return;
    try {
      await axios.patch(`${API_BASE}/admin/cycles/${id}/activate/`, {}, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      setShowToast("Cycle activated successfully!");
      await fetchCycle();
      setTimeout(() => setShowToast(""), 1500);
    } catch (err) {
      console.error("Error activating cycle", err);
    }
  };

  const handleDelete = async () => {
    if (!session) return;
    try {
      await axios.delete(`${API_BASE}/admin/cycles/${id}/`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      setShowToast("Cycle deleted successfully!");
      setTimeout(() => {
        router.push("/admin/cycles");
      }, 1000);
    } catch (err) {
      console.error("Error deleting cycle", err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    try {
      await axios.put(`${API_BASE}/admin/cycles/${id}/`, formData, {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      });
      setShowToast("Cycle updated successfully!");
      setShowUpdateForm(false);
      await fetchCycle();
      setTimeout(() => setShowToast(""), 1500);
    } catch (err) {
      console.error("Error updating cycle", err);
    }
  };

  if (status === "loading" || loading) return <p className="p-4">Loading...</p>;
  if (!cycle) return <p className="p-4">Cycle not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow relative">
      {/* Title and Update Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold">{cycle.name}</h1>
        <button
          onClick={() => setShowUpdateForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-auto self-start sm:self-auto"
        >
          Update Cycle
        </button>
      </div>

      {/* Description first */}
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Description:</span>{" "}
        {cycle.description || "No description available"}
      </p>

      {/* Start/End Dates side-by-side (responsive) */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <p className="text-gray-600">
          <span className="font-semibold">Start Date:</span>{" "}
          {new Date(cycle.start_date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 sm:text-right">
          <span className="font-semibold">End Date:</span>{" "}
          {new Date(cycle.end_date).toLocaleDateString()}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col justify-between sm:flex-row gap-3 mt-8">
        <button
          onClick={handleActivate}
          className={`px-4 py-2 w-auto self-start sm:self-auto rounded text-white ${
            cycle.is_active
              ? "bg-green-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={cycle.is_active}
        >
          {cycle.is_active ? "Activated" : "Activate Cycle"}
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 w-auto self-start sm:self-auto bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete Cycle
        </button>
      </div>

      {/* Update form */}
      {showUpdateForm && (
        <UpdateCycleForm
          formData={formData}
          setFormData={setFormData}
          onCancel={() => setShowUpdateForm(false)}
          onSubmit={handleUpdate}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this cycle?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  handleDelete();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
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
