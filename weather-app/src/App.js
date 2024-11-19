import AppRoutes from './routes';
import React, { useState } from 'react';

export const App = () => {
  const [token, setToken] = useState('');

  return <AppRoutes setToken={setToken} />;
};

export default App;
