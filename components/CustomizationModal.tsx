import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { MenuItem } from '../types';
import { CUSTOMIZATION_MEATS, CUSTOMIZATION_ACCOMPANIMENTS } from '../constants';

interface CustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onSave: (item: MenuItem, selections: { meats: string[], accompaniments: string[] }) => void;
}

const CheckboxGrid = ({ title, options, selected, onChange, limit }: { title: string, options: string[], selected: string[], onChange: (option: string) => void, limit: number }) => (
  <div>
    <h4 className="font-bold text-yellow-900 mb-2">{title} <span className="text-sm font-normal text-yellow-800/80">({selected.length}/{limit})</span></h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map(option => {
        const isSelected = selected.includes(option);
        const isDisabled = !isSelected && selected.length >= limit;
        return (
          <label
            key={option}
            className={`flex items-center p-2 rounded-md transition-all duration-200 border ${
              isSelected ? 'bg-yellow-200 border-yellow-400' : 'bg-white/50 border-gray-200'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-yellow-100/50'}`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              disabled={isDisabled}
              onChange={() => onChange(option)}
              className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
            />
            <span className={`ml-2 text-sm text-gray-800 ${isDisabled ? 'text-gray-500' : ''}`}>{option}</span>
          </label>
        );
      })}
    </div>
  </div>
);

const CustomizationModal: React.FC<CustomizationModalProps> = ({ item, onClose, onSave }) => {
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const [selectedAccompaniments, setSelectedAccompaniments] = useState<string[]>([]);

  useEffect(() => {
    // Reset state when modal opens for a new item or closes
    if (!item) {
      setSelectedMeats([]);
      setSelectedAccompaniments([]);
    }
  }, [item]);

  const handleMeatChange = (meat: string) => {
    setSelectedMeats(prev =>
      prev.includes(meat) ? prev.filter(m => m !== meat) : [...prev, meat]
    );
  };

  const handleAccompanimentChange = (accompaniment: string) => {
    setSelectedAccompaniments(prev =>
      prev.includes(accompaniment) ? prev.filter(a => a !== accompaniment) : [...prev, accompaniment]
    );
  };

  const handleSaveClick = () => {
    if (item) {
      onSave(item, {
        meats: selectedMeats,
        accompaniments: selectedAccompaniments,
      });
    }
  };
  
  const isValid = selectedMeats.length === 2 && selectedAccompaniments.length === 3;

  if (!item) return null;

  return (
    <Modal isOpen={!!item} onClose={onClose} title={`Personalizar ${item.name}`}>
        <div className="space-y-6">
            <p className="text-sm text-center text-yellow-800 bg-yellow-100/50 p-3 rounded-lg">
                Selecione exatamente <strong>2 carnes</strong> e <strong>3 acompanhamentos</strong> para montar o seu super pastel!
            </p>
            <CheckboxGrid
                title="Escolha as Carnes"
                options={CUSTOMIZATION_MEATS}
                selected={selectedMeats}
                onChange={handleMeatChange}
                limit={2}
            />
            <CheckboxGrid
                title="Escolha os Acompanhamentos"
                options={CUSTOMIZATION_ACCOMPANIMENTS}
                selected={selectedAccompaniments}
                onChange={handleAccompanimentChange}
                limit={3}
            />
            <button
                onClick={handleSaveClick}
                disabled={!isValid}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-all ${
                    isValid
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                {isValid ? 'Adicionar ao Pedido' : 'Complete sua seleção'}
            </button>
        </div>
    </Modal>
  );
};

export default CustomizationModal;
