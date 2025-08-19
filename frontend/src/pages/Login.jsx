import { Link } from 'react-router-dom';
import Input from '../components/Input';

export const Login = () => {
  return (
    <div>
      <h1 className="text-3xl text-white mb-4">Login</h1>

      <Input variant="primary"  />
      <Link to="/register" className="text-3xl text-white">
        Register
      </Link>
    </div>
  );
};
