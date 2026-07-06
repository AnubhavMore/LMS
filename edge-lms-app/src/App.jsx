import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import LearnerWorkspace from './pages/LearnerWorkspace';
import ClientAdminWorkspace from './pages/ClientAdminWorkspace';
import SuperAdminWorkspace from './pages/SuperAdminWorkspace';
import FacilitatorWorkspace from './pages/FacilitatorWorkspace';

function AppContent() {
  const { currentRole } = useAppContext();

  return (
    <MainLayout>
      {currentRole === "Learner" && <LearnerWorkspace />}
      {currentRole === "Client Admin" && <ClientAdminWorkspace />}
      {currentRole === "Super Admin" && <SuperAdminWorkspace />}
      {currentRole === "Facilitator" && <FacilitatorWorkspace />}
    </MainLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
