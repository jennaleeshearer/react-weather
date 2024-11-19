import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './pages/weather';
import LoginPage from './pages/login';
import SignUp from './pages/signup';
import ProtectedRoute from './components/protectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
