import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SolveProblemPage from './pages/SolveProblemPage';
import AllProblemsPage from './pages/AllProblemsPage';
import FeedbackPage from './pages/FeedbackPage';
import Layout from './pages/Layout';
import NotFoundPage from './pages/NotFoundPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import './App.css';

export const App = () => {
  return (
    <>
      <div className='app-container'>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<AllProblemsPage />} />
              <Route path='/problem' element={<SolveProblemPage />} />
              <Route path='/feedback' element={<FeedbackPage />} />
              <Route path='/progress' element={<UnderConstructionPage />} />
              <Route path='/courses' element={<UnderConstructionPage />} />
              <Route path='/mock-interview' element={<UnderConstructionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App