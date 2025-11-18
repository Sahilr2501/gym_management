import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MembersProvider } from './contexts/MembersContext';
import { PlansProvider } from './contexts/PlansContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MembersPage from './pages/MembersPage';
import MemberFormPage from './pages/MemberFormPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import PlansPage from './pages/PlansPage';
import PlanFormPage from './pages/PlanFormPage';
import ReportsPage from './pages/ReportsPage';
import './styles/index.css';

function App() {
  return (
    <MembersProvider>
      <PlansProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/members/new" element={<MemberFormPage />} />
              <Route path="/members/:id" element={<MemberDetailsPage />} />
              <Route path="/members/:id/edit" element={<MemberFormPage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/plans/new" element={<PlanFormPage />} />
              <Route path="/plans/:id/edit" element={<PlanFormPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </Layout>
        </Router>
      </PlansProvider>
    </MembersProvider>
  );
}

export default App;

