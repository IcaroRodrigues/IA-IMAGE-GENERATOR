import { useLoggedUser } from '../hooks/useLoggedUser';

export const History = () => {
  const { userIsLogged } = useLoggedUser();

  if (!userIsLogged()) {
    return (
      <div>
        <h1 className="text-3xl text-white">Tem que estar Logado </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl text-white">History</h1>
    </div>
  );
};
