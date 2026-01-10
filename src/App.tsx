import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import KneeModelViewer from './pages/KneeModelViewer';
import BiomechanicsPanel from './pages/BiomechanicsPanel';
import ExerciseRecommendations from './pages/ExerciseRecommendations';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/viewer" element={<KneeModelViewer />} />
          <Route path="/biomechanics" element={<BiomechanicsPanel />} />
          <Route path="/exercises" element={<ExerciseRecommendations />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
