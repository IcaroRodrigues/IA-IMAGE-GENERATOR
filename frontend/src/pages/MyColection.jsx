import { useLoggedUser } from '../hooks/useLoggedUser';

export const MyColection = () => {
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
      <h1 className="text-3xl text-white">MyColection</h1>
    </div>
  );
};
