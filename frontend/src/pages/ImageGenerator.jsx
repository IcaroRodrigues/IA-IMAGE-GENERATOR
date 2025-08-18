import { useState } from 'react';
import { Modal } from '../components/Modal';

export const ImageGenerator = () => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} />
      <h1 className="text-3xl text-white">ImageGenerator</h1>
    </div>
  );
};
