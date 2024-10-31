import React, { createContext, useState } from 'react';

// Create the context
const UserType = createContext();

// Create a provider component
export const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserType.Provider value={{
      userId,
      setUserId,
      userEmail,
      setUserEmail,
      userAddress,
      setUserAddress,
      userOrders,
      setUserOrders,
      isAuthenticated,
      setIsAuthenticated
    }}>
      {children}
    </UserType.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserType);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContext');
  }
  return context;
};

export default UserType; 