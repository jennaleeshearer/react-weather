import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import WeatherPage from './pages/weather';
import MoreLocationsPage from './pages/moreLocations';

export const AppRoutes = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/more_locations" element={<MoreLocationsPage />} />
      </RouterRoutes>
    </Router>
  );
};

export default AppRoutes;
