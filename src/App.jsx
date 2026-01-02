import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthRedirect from "./Components/AuthRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/login" />} 
        />

        <Route 
          path="/login" 
          element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
          } 
        />

        <Route 
          path="/register" 
          element={
          <AuthRedirect>
            <Register />
          </AuthRedirect>
          }  
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
