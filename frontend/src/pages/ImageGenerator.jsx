import { useState, useEffect, use } from 'react';
import { Modal } from '../components/Modal';
import Input from '../components/Input';

export const ImageGenerator = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      console.log(data);
    }

    getUsers();
  }, []);

  return (
    <div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        teste
      </Modal>

      <h1 className="text-3xl text-white">ImageGenerator</h1>
    </div>
  );
};
