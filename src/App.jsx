import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import SchedulePage from './SchedulePage';
import GpaCalculator from './GpaCalculator';
import GradingSystemPage from './GradingSystemPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/GPA-Calc" element={<GpaCalculator />} />
          <Route path="/Grading-System" element={<GradingSystemPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;