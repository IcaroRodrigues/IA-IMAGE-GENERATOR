export const useLoggedUser = () => {
  function userIsLogged() {
    const token = localStorage.getItem('token');

    return !!token;
  }

  function logout() {
    localStorage.removeItem('token');
  }

  return {
    userIsLogged,
    logout,
  };
};
