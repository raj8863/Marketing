import React, { useEffect, useState } from 'react';
import Herolayout from '../../components/herolayout/Herolayout';
import axios from 'axios';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/team");
        setTeamMembers(res.data);
      } catch (err) {
        console.error("Failed to sync team data");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <>
      <Herolayout title="Our Expert Team" subtitle="The talented people behind Decent11's success." />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member._id} className="group text-center">
                <div className="relative overflow-hidden rounded-[2.5rem] mb-6 shadow-lg shadow-slate-100 bg-slate-50">
                  <img 
                    src={member.image} // DIRECT Cloudinary URL
                    alt={member.name} 
                    className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Member"; }}
                  />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">{member.name}</h3>
                <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;