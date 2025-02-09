import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);
      setIsAuthenticated(!!token);
    }
  }, []);

  const signup = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = { email, password };
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      resolve(); // Resolve the promise after signup
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email === email && user.password === password) {
        localStorage.setItem('token', 'dummy-token');
        setCurrentUser(user);
        resolve(); // Resolve the promise after login
      } else {
        alert('Invalid email or password');
        reject(); // Reject the promise if login fails
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = { currentUser, isAuthenticated, setIsAuthenticated, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};