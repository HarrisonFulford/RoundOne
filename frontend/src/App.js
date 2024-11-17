import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SolveProblemPage from './pages/SolveProblemPage';
import AllProblemsPage from './pages/AllProblemsPage';
import FeedbackPage from './pages/FeedbackPage';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<AllProblemsPage />} />
          <Route path='/problem' element={<SolveProblemPage />} />
          <Route path='/feedback' element={<FeedbackPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App