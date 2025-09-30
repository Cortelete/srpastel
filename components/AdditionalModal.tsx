import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { OrderItem, MenuItem } from '../types';
import { MENU_DATA } from '../constants';


interface AdditionalModalProps {
  additional: MenuItem | null;
  order: OrderItem[];
  onClose: () => void;
  onSave: (additional: MenuItem, targetCartIds: string[]) => void;
}

const AdditionalModal: React.FC<AdditionalModalProps> = ({ additional, order, onClose, onSave }) => {
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);

  useEffect(() => {
    // Reset selection when modal is closed or additional changes
    if (!additional) {
      setSelectedCartIds([]);
    }
  }, [additional]);
  
  if (!additional) {
    return null;
  }

  const toggleSelection = (cartId: string) => {
    setSelectedCartIds(prev =>
      prev.includes(cartId)
        ? prev.filter(id => id !== cartId)
        : [...prev, cartId]
    );
  };
  
  const handleSave = () => {
    if (selectedCartIds.length > 0) {
        onSave(additional, selectedCartIds);
    }
    onClose();
  }
  
  const eligibleOrderItems = order.filter(item => {
    const parentCategory = MENU_DATA.find(cat => cat.items.some(menuItem => menuItem.id === item.id));
    return parentCategory && !['Bebidas', 'Adicionais para seu Lanche'].includes(parentCategory.title);
  });


  return (
    <Modal isOpen={!!additional} onClose={onClose} title={`Adicionar ${additional.name} para:`}>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {eligibleOrderItems.length > 0 ? (
          eligibleOrderItems.map(item => (
            <label
              key={item.cartId}
              className={`flex items-center p-3 rounded-md transition-all duration-200 border cursor-pointer ${
                selectedCartIds.includes(item.cartId) ? 'bg-yellow-200 border-yellow-400' : 'bg-white/50 border-gray-200 hover:bg-yellow-100/50'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCartIds.includes(item.cartId)}
                onChange={() => toggleSelection(item.cartId)}
                className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 flex-shrink-0"
              />
              <span className="ml-3 text-sm text-gray-800 font-semibold">{item.name}
                 {item.additionals.length > 0 && 
                    <span className="ml-1 text-xs text-gray-600 font-normal">
                    (+{item.additionals.map(a => a.name).join(', ')})
                    </span>
                 }
              </span>
            </label>
          ))
        ) : (
          <p className="text-center text-yellow-700">Não há lanches no seu carrinho para adicionar um extra.</p>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={selectedCartIds.length === 0}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-all ${
            selectedCartIds.length > 0
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedCartIds.length > 0 ? 'Confirmar Adicional' : 'Selecione um item'}
        </button>
      </div>
    </Modal>
  );
};

export default AdditionalModal;
