import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiVideo, 
  FiPhoneCall, 
  FiMoreVertical,
  FiSearch,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track which card's dropdown menu is open
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // 1. Fetch Data
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        const result = await response.json();
        
        if (result.success) {
          setMeetings(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  // 2. Update Status Function (Talks to your PUT route)
  const updateMeetingStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update the UI instantly without reloading
        setMeetings(meetings.map(m => m._id === id ? { ...m, status: newStatus } : m));
        setOpenDropdownId(null); // Close the menu
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating meeting status.");
    }
  };

  // 3. Filter logic
  const filteredMeetings = meetings.filter(meeting => {
    let displayStatus = 'Upcoming';
    if (meeting.status === 'Closed') displayStatus = 'Completed';
    if (meeting.status === 'Canceled') displayStatus = 'Canceled';

    const matchesFilter = filter === 'All' || displayStatus === filter;
    
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = meeting.name?.toLowerCase().includes(searchLower) || false;
    const emailMatch = meeting.email?.toLowerCase().includes(searchLower) || false;
    
    return matchesFilter && (nameMatch || emailMatch);
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Syncing with Backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8" onClick={() => setOpenDropdownId(null)}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              Meeting Schedule
            </h1>
            <p className="text-slate-500 font-medium mt-1">Manage your upcoming strategy syncs and calls.</p>
          </div>
        
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          
          <div className="flex bg-slate-100 p-1 rounded-xl w-full lg:w-auto">
            {['All', 'Upcoming', 'Completed', 'Canceled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 lg:px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH CLIENTS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-emerald-500 transition-all uppercase tracking-widest placeholder:opacity-50"
            />
          </div>
        </div>

        {/* Meeting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => {
              const isMeet = meeting.bookingType === 'meet';
              const displayDate = meeting.date 
                ? new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                : new Date(meeting.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
              
              const displayTime = meeting.date 
                ? new Date(meeting.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : "ASAP";

              let displayStatus = 'Upcoming';
              if (meeting.status === 'Closed') displayStatus = 'Completed';
              if (meeting.status === 'Canceled') displayStatus = 'Canceled';

              return (
                <div 
                  key={meeting._id} 
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-visible"
                >
                  {/* Status Indicator Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    displayStatus === 'Upcoming' ? 'bg-emerald-500' : 
                    displayStatus === 'Completed' ? 'bg-blue-500' : 'bg-red-500'
                  }`} />

                  <div className="flex justify-between items-start mb-4 relative">
                    <div className="flex gap-4 items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        isMeet 
                          ? 'bg-blue-50 border-blue-100 text-blue-600' 
                          : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                      }`}>
                        {isMeet ? <FiVideo size={20} /> : <FiPhoneCall size={20} />}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-lg leading-tight">{meeting.name}</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate max-w-[150px]">{meeting.email}</p>
                      </div>
                    </div>

                    {/* Action Menu Toggle */}
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the outer div onClick from firing
                          setOpenDropdownId(openDropdownId === meeting._id ? null : meeting._id);
                        }}
                        className="text-slate-400 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <FiMoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {openDropdownId === meeting._id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 top-10 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-10 overflow-hidden"
                          >
                            <div className="p-1">
                              {displayStatus !== 'Completed' && (
                                <button 
                                  onClick={() => updateMeetingStatus(meeting._id, 'Closed')}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors text-left"
                                >
                                  <FiCheckCircle size={14} /> Mark Completed
                                </button>
                              )}
                              {displayStatus !== 'Canceled' && (
                                <button 
                                  onClick={() => updateMeetingStatus(meeting._id, 'Canceled')}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-left"
                                >
                                  <FiXCircle size={14} /> Cancel Meeting
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 mb-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <FiCalendar className="text-slate-400" size={14} />
                      <span className="text-sm font-medium">{displayDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <FiClock className="text-slate-400" size={14} />
                      <span className="text-sm font-medium">{displayTime}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                      displayStatus === 'Upcoming' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      displayStatus === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {displayStatus}
                    </span>

                    {displayStatus === 'Upcoming' && (
                      <a href={isMeet ? "https://meet.google.com/new" : `tel:${meeting.phone}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-900 hover:text-emerald-600 uppercase tracking-widest transition-colors">
                        {isMeet ? 'Join Meet →' : meeting.phone}
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <FiCalendar size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-2">No Meetings Found</h3>
              <p className="text-slate-500 text-sm">You have no scheduled leads matching this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingList;