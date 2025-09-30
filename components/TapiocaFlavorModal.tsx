import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import { MenuItem } from '../types';
import { MENU_DATA } from '../constants';

interface TapiocaFlavorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (flavor: MenuItem) => void;
}

const TapiocaFlavorModal: React.FC<TapiocaFlavorModalProps> = ({ isOpen, onClose, onSave }) => {
  const [selectedFlavorId, setSelectedFlavorId] = useState<number | null>(null);

  const availableFlavors = useMemo(() => {
    const traditional = MENU_DATA.find(c => c.title === "Pasteis Tradicionais")?.items || [];
    const sweet = MENU_DATA.find(c => c.title === "Pasteis Doces")?.items || [];
    return [...traditional, ...sweet];
  }, []);

  const handleSave = () => {
    const selectedFlavor = availableFlavors.find(f => f.id === selectedFlavorId);
    if (selectedFlavor) {
      onSave(selectedFlavor);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
        setSelectedFlavorId(null);
    }, 300);
  }

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Escolha o Sabor da Tapioca">
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {availableFlavors.map(flavor => (
          <label
            key={flavor.id}
            className={`flex items-center p-3 rounded-md transition-all duration-200 border cursor-pointer ${
              selectedFlavorId === flavor.id ? 'bg-yellow-200 border-yellow-400' : 'bg-white/50 border-gray-200 hover:bg-yellow-100/50'
            }`}
          >
            <input
              type="radio"
              name="tapioca-flavor"
              checked={selectedFlavorId === flavor.id}
              onChange={() => setSelectedFlavorId(flavor.id)}
              className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-500 flex-shrink-0"
            />
            <span className="ml-3 text-sm text-gray-800 font-semibold">{flavor.name}</span>
          </label>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={!selectedFlavorId}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-all ${
            selectedFlavorId
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedFlavorId ? 'Confirmar Sabor' : 'Selecione um sabor'}
        </button>
      </div>
    </Modal>
  );
};

export default TapiocaFlavorModal;