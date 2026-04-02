import { useEffect } from "react";
import { useState } from "react";
import {
  LayoutDashboard,
  CheckCircle,
  Users,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  ChevronRight,
  ArrowUp,
  BookOpen,
  Compass,
  MessageSquare, // <--- Add this
  Search,
  Bell,
  Send,          // <--- Add this
  MoreVertical,
  Filter,
  Plus,
  Edit2,         // <--- Add this
  Trash2,        // <--- Add this
  X,
  Save,
  Image as ImageIcon
} from "lucide-react";
/* =======================
   QUOTE VIEW COMPONENT
======================= */
 export const QuoteView = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://marketing-b3je.onrender.com/api/quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const response = await fetch(`https://marketing-b3je.onrender.com/api/quotes/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setQuotes(quotes.filter((q) => q._id !== id));
        }
      } catch (error) {
        console.error("Error deleting quote:", error);
      }
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400 animate-pulse font-medium">Fetching inquiries...</div>;

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Inquiries</h2>
          <p className="text-sm text-gray-500">Manage your incoming project requests from the website.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm text-sm font-bold text-blue-600">
          Total: {quotes.length}
        </div>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">No quotes found yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {quotes.map((quote) => (
            <div key={quote._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-100">
                      {quote.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{quote.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                        <Send size={14} /> {quote.contact}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {quote.services?.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-100">
                        {s}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-gray-50 text-gray-600 text-[10px] font-black uppercase rounded-full border border-gray-100">
                      Budget: {quote.budget || 'Any'}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                      "{quote.details || "No specific details provided."}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-between items-end gap-4">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Received On</span>
                    <span className="text-sm font-bold text-gray-700">
                       {new Date(quote.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDelete(quote._id)}
                      className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Entry"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
