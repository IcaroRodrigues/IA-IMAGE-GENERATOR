import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div>
      <h1 className="text-3xl text-white mb-4">Login</h1>
      <Link to="/register" className="text-3xl text-white">
        Register
      </Link>
    </div>
  );
};
