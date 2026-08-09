import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Logged-in user
  const [user, setUser] = useState(null);

  // Loading while checking authentication
  const [loading, setLoading] = useState(true);

  // Fetch current logged-in user
  const fetchUser = async () => {
    try {
      const response = await api.get("/profile");

      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser,
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
