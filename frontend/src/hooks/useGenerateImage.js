import { useState } from 'react';

import { useLoggedUser } from './useLoggedUser';

export const useGenerateImage = () => {
  const [openLogginModal, setOpenLogginModal] = useState(false);
  const { userIsLogged } = useLoggedUser();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedResolution, setSelectionResolution] = useState(null);
  const [guidance, setGuidance] = useState(5);

  const toggleColor = (colorValue) => {
    if (selectedColors.includes(colorValue)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorValue));
    } else {
      setSelectedColors([...selectedColors, colorValue]);
    }
  };

  async function handleSubmitImagePromp(data) {
    if (!userIsLogged()) {
      setOpenLogginModal(true);
    }
  }

  return {
    openLogginModal,
    setOpenLogginModal,
    handleSubmitImagePromp,
    toggleColor,
    selectedColors,
    selectedResolution,
    setSelectionResolution,
    guidance,
    setGuidance,
  };
};
