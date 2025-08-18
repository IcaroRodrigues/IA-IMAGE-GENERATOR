import './App.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen bg-blue">
      <Sidebar />
      <div className="w-screen flex justify-center py-8 px-[72px]">
        <div className="w-full max-w-[1062px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
