import { useState } from 'react';

import { useLoggedUser } from './useLoggedUser';

export const useGenerateImage = () => {
  const [openLogginModal, setOpenLogginModal] = useState(false);
  const { userIsLogged } = useLoggedUser();

  async function handleSubmitImagePromp(data) {
    if(!userIsLogged()) {
      setOpenLogginModal(true)
    }

    console.log(data)
  }

  return {
    openLogginModal,
    setOpenLogginModal,
    handleSubmitImagePromp
  };
};
