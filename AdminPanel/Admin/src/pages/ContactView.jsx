import { useEffect } from "react";
import { useState } from "react";
import { 
  MessageSquare, 
  Trash2, // <--- ADD THIS
  Send, 
  X 
} from "lucide-react";
export const ContactView = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await fetch('https://marketing-b3je.onrender.com/api/contacts');
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Inbound Messages</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{msg.subject}</span>
                <h3 className="font-bold text-gray-900">{msg.name}</h3>
                <p className="text-sm text-gray-500">{msg.email} | {msg.phone}</p>
              </div>
              <button onClick={async () => {
                await fetch(`https://marketing-b3je.onrender.com/api/contacts/${msg._id}`, { method: 'DELETE' });
                fetchMessages();
              }} className="text-red-400 hover:text-red-600">
                <Trash2 size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
              {msg.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
