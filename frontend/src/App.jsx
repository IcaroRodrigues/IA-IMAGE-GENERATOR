import './App.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { ToastProvider } from './providers/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-blue-300">
        <Sidebar />
        <div className="flex-1 flex justify-center py-10 px-4 md:px-[72px]">
          <div className="w-full max-w-[1062px]">
            <Outlet />
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
