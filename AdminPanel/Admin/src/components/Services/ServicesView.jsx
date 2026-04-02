import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { getIconComponent } from "../../utils/iconMapper";
import ServiceForm from "./ServiceForm"; // Assuming separate file

const ServicesView = ({ initialMode = "list" }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(initialMode);
  const [selectedService, setSelectedService] = useState(null);

  // Sync mode with props if necessary
  useEffect(() => {
    setMode(initialMode);
    if (initialMode === "list") fetchServices();
  }, [initialMode]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/services');
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/services/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setServices(services.filter(s => s._id !== id));
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Could not delete service. Check server connection.");
      }
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setMode('edit');
  };

  const handleAddNew = () => {
    setSelectedService(null); // Clear previous selection
    setMode('add');
  };

  const handleSaveSuccess = () => {
    setMode('list');
    fetchServices();
  };

  // --- VIEW LOGIC ---
  if (mode === 'add' || mode === 'edit') {
    return (
      <ServiceForm
        initialData={mode === 'edit' ? selectedService : null}
        onSave={handleSaveSuccess}
        onCancel={() => setMode('list')}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Services</h2>
          <p className="text-sm text-gray-500">View, edit, or remove your digital service offerings.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-95 w-full md:w-auto"
        >
          <Plus size={18} /> Add New Service
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium">Loading services data...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-50">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 font-bold">
              <tr>
                <th className="px-6 py-4">ID & Icon</th>
                <th className="px-6 py-4">Service Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((service) => (
                <tr key={service._id} className="group hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                        {service.serviceId}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getIconComponent ? getIconComponent(service.icon) : service.icon}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {service.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 bg-gray-50 px-2 py-0.5 rounded text-xs">
                      /{service.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {services.length === 0 && (
            <div className="text-center py-16 bg-gray-50/30">
              <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No services found.</p>
              <button onClick={handleAddNew} className="text-emerald-500 text-sm font-bold mt-1 hover:underline">
                Create your first service
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesView;