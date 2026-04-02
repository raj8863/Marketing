import React from "react";
import { motion } from "framer-motion";
import { FaGavel, FaFileContract } from "react-icons/fa";
import Herolayout from "../components/herolayout/Herolayout";

const TermsOfUse = () => {
 const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("https://marketing-b3je.onrender.com/api/team");
        const data = await res.json();
        setTeamMembers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <>
      <Herolayout 
        title="Terms of Use" 
        subtitle="Please read these terms and conditions carefully before using our service."
      />

         <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member._id} className="group text-center">
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-emerald-500 font-medium">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfUse;
