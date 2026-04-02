import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state add ki hai taaki page refresh par redirect issue na ho

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Agar JSON corrupt ho toh clear kar do
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  // Login Function: Token aur User dono save honge
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout Function: Sab kuch saaf (Clear) karega
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // Page ko reload karna best rehta hai taaki saari states reset ho jayein
    window.location.href = "/login";
  };

  // Update Profile: Local storage aur state sync karega
  const updateProfile = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};