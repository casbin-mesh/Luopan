import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import theme from './theme';
import Connection from './connection';
import Layout from './dashboard/_layout';
import Dashboard from './dashboard/index';
import { FetcherProvider } from '../service/context/fetcher';

export default function App() {
  const [instance] = useState(() => axios.create({ timeout: 5000 }));

  return (
    <ThemeProvider theme={theme}>
      <FetcherProvider value={instance}>
        <Router>
          <Routes>
            <Route path="/" element={<Connection />} />
            <Route path="/dashboard/" element={<Layout />}>
              <Route path=":connectionKey" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </FetcherProvider>
    </ThemeProvider>
  );
}
