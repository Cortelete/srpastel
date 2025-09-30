import React from 'react';
import Modal from './Modal';

interface ConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConstructionModal: React.FC<ConstructionModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Em Construção">
      <div className="text-center p-4">
        <div className="text-5xl mb-4">🚧</div>
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Página em Desenvolvimento</h3>
        <p className="text-sm text-yellow-700">
          Estamos preparando algo incrível para você em nosso Instagram. Volte em breve!
        </p>
      </div>
    </Modal>
  );
};

export default ConstructionModal;