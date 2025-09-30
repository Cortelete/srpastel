import React, { useState, useMemo, useEffect, useRef } from 'react';
import Modal from './Modal';
import CustomizationModal from './CustomizationModal';
import PixModal from './PixModal';
import PaymentConfirmationModal from './PaymentConfirmationModal';
import AdditionalModal from './AdditionalModal';
import TapiocaFlavorModal from './TapiocaFlavorModal'; // Import the new modal
import { MENU_DATA, WHATSAPP_NUMBER } from '../constants';
import { MenuItem, OrderItem } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [itemToCustomize, setItemToCustomize] = useState<MenuItem | null>(null);
  const [itemToAddAsAdditional, setItemToAddAsAdditional] = useState<MenuItem | null>(null);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isTapiocaModalOpen, setIsTapiocaModalOpen] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setOrder([]);
        setCustomerName('');
        setPaymentMethod('');
        setNotes('');
        setSearchTerm('');
        setOpenCategory(null);
        setItemToCustomize(null);
        setItemToAddAsAdditional(null);
        setIsTapiocaModalOpen(false);
      }, 300);
    }
  }, [isOpen]);

  const handleAddItem = (item: MenuItem, categoryTitle: string) => {
    const newOrderItem: OrderItem = {
      ...item,
      cartId: `${item.id}-${Date.now()}`,
      additionals: [],
      categoryTitle,
    };
    setOrder(prevOrder => [...prevOrder, newOrderItem]);
  };
  
  const handleRemoveLastOfItem = (itemId: number) => {
    // This logic finds the last added item with this ID, which might not be what the user expects if items are customized.
    // It's safer to stick to removal by cartId from the summary. Let's keep it simple for now.
    const lastItemIndex = order.map(item => item.id).lastIndexOf(itemId);
    if (lastItemIndex !== -1) {
        const cartIdToRemove = order[lastItemIndex].cartId;
        setOrder(prevOrder => prevOrder.filter(item => item.cartId !== cartIdToRemove));
    }
  };

  const handleRemoveItemByCartId = (cartId: string) => {
      setOrder(prevOrder => prevOrder.filter(item => item.cartId !== cartId));
  }
  
  const handleAddAdditional = (additional: MenuItem, targetCartIds: string[]) => {
    setOrder(prevOrder => 
      prevOrder.map(item => {
        if (targetCartIds.includes(item.cartId)) {
          // Avoid adding duplicate additionals to the same item
          if (!item.additionals.some(add => add.id === additional.id)) {
            return { ...item, additionals: [...item.additionals, additional] };
          }
        }
        return item;
      })
    );
  };

  const handleSaveCustomization = (baseItem: MenuItem, selections: { meats: string[], accompaniments: string[] }) => {
    const customDescription = `Carnes: ${selections.meats.join(', ')}. Acompanhamentos: ${selections.accompaniments.join(', ')}.`;
    const uniqueId = parseInt(`${baseItem.id}${Date.now() % 10000}`);
    const customizedItem: MenuItem = {
      ...baseItem,
      id: uniqueId,
      name: `${baseItem.name} (Personalizado)`,
      description: customDescription,
    };
    const parentCategory = MENU_DATA.find(cat => cat.items.some(it => it.id === baseItem.id));
    handleAddItem(customizedItem, parentCategory?.title || 'Personalizado');
    setItemToCustomize(null);
  };

  const handleSaveTapiocaFlavor = (flavor: MenuItem) => {
    const tapiocaBaseItem = MENU_DATA.flatMap(c => c.items).find(i => i.id === 25);
    if (tapiocaBaseItem) {
        const uniqueId = parseInt(`${tapiocaBaseItem.id}${flavor.id}${Date.now() % 10000}`);
        const tapiocaItemWithFlavor: OrderItem = {
            ...tapiocaBaseItem,
            id: uniqueId,
            name: `Tapioca - ${flavor.name}`,
            cartId: `${uniqueId}-${Date.now()}`,
            additionals: [],
            // No categoryTitle needed as name is descriptive enough
        };
        setOrder(prevOrder => [...prevOrder, tapiocaItemWithFlavor]);
    }
    setIsTapiocaModalOpen(false);
  };

  const total = useMemo(() => {
    return order.reduce((sum, item) => {
      const additionalsPrice = item.additionals.reduce((addSum, add) => addSum + add.price, 0);
      return sum + item.price + additionalsPrice;
    }, 0);
  }, [order]);

  const groupedOrder = useMemo(() => {
    const map = new Map<string, { item: OrderItem, quantity: number }>();
    order.forEach(item => {
      const additionalsKey = item.additionals.map(a => a.id).sort().join(',');
      const key = `${item.id}-${item.categoryTitle || ''}-${item.description || ''}-${additionalsKey}`;

      if (map.has(key)) {
        map.get(key)!.quantity++;
      } else {
        map.set(key, { item: item, quantity: 1 });
      }
    });
    return Array.from(map.values());
  }, [order]);

  const generateWhatsAppMessage = () => {
    let message = `Olá, Sr. Pastel! 👋\n\nGostaria de fazer o seguinte pedido:\n\n`;
    message += `*Cliente:* ${customerName}\n\n`;
    groupedOrder.forEach(({ item, quantity }) => {
      const itemName = item.categoryTitle ? `${item.categoryTitle} - ${item.name}` : item.name;
      message += `*${quantity}x* ${itemName}`;
      if (item.additionals.length > 0) {
        message += `\n  (Com: ${item.additionals.map(a => a.name).join(', ')})`;
      }
      if (item.description && item.description.startsWith("Carnes:")) {
        message += `\n  (${item.description})`;
      }
      message += `\n`;

      const itemPriceWithAddons = item.price + item.additionals.reduce((p, a) => p + a.price, 0);
      const subtotal = itemPriceWithAddons * quantity;
      message += `  Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    });
    message += `\n*Total:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    if (paymentMethod) message += `*Forma de Pagamento:* ${paymentMethod}\n`;
    if (notes) message += `*Observações:* ${notes}\n`;
    message += `\nObrigado!`;
    return encodeURIComponent(message);
  };
  
  const handleSendOrder = () => {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`;
      setWhatsappUrl(url);

      if (paymentMethod === 'Pix') {
          setIsPixModalOpen(true);
      } else {
          setIsConfirmationModalOpen(true);
      }
  };

  const filteredMenuData = useMemo(() => {
    if (!searchTerm) return MENU_DATA;
    return MENU_DATA
      .map(category => ({
        ...category,
        items: category.items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
      }))
      .filter(category => category.items.length > 0);
  }, [searchTerm]);

  const isOrderReady = order.length > 0 && customerName.trim() !== '' && paymentMethod !== '';

  const handleCategoryClick = (categoryTitle: string) => {
    const isOpening = openCategory !== categoryTitle;
    setOpenCategory(isOpening ? categoryTitle : null);

    if (isOpening) {
      setTimeout(() => {
        categoryRefs.current[categoryTitle]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300); 
    }
  };
  
  const eligibleItemsForAdditionals = order.filter(item => {
    const parentCategory = MENU_DATA.find(cat => cat.items.some(menuItem => menuItem.id === item.id));
    return parentCategory && !['Bebidas', 'Adicionais para seu Lanche'].includes(parentCategory.title);
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Cardápio e Pedidos">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 flex flex-col">
            <input
              type="text"
              placeholder="🔎 Procurar item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border border-yellow-300 rounded-md bg-white/50 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
            />
            <div className="space-y-2 flex-grow overflow-y-auto pr-2 -mr-2">
              {filteredMenuData.map((category) => {
                const isCategoryOpen = openCategory === category.title;
                const itemsInCartCount = order.filter(orderItem => category.items.some(menuItem => menuItem.id === orderItem.id)).length;
                return (
                  <div key={category.title} ref={el => categoryRefs.current[category.title] = el} className="bg-white/30 rounded-lg overflow-hidden transition-all duration-300">
                    <button onClick={() => handleCategoryClick(category.title)} className="w-full flex justify-between items-center p-3 text-left">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{category.icon}</span>
                        <h3 className="font-bold text-yellow-900">{category.title}</h3>
                        {itemsInCartCount > 0 && <span className="ml-2 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{itemsInCartCount}</span>}
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-yellow-800 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                    {isCategoryOpen && (
                      <div className="p-3 pt-0">
                        <ul className="space-y-3">
                          {category.items.map((item) => {
                            const isAdditionalCategory = category.title === 'Adicionais para seu Lanche';
                            const isTapioca = item.id === 25;
                            const quantity = order.filter(orderItem => orderItem.id === item.id).length;
                            return (
                              <li key={item.id} className={`p-3 rounded-lg transition-all duration-300 ${quantity > 0 && !isAdditionalCategory ? 'bg-yellow-100/80 shadow-inner' : 'bg-white/50'}`}>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-semibold text-yellow-800">{item.name}</p>
                                    {item.description && <p className="text-xs text-yellow-700 italic mt-1 max-w-xs">{item.description}</p>}
                                    <p className="text-sm font-bold text-yellow-900 mt-1">R$ {item.price.toFixed(2)}</p>
                                  </div>
                                  {isAdditionalCategory ? (
                                     <button onClick={() => {
                                        if (eligibleItemsForAdditionals.length > 0) {
                                            setItemToAddAsAdditional(item)
                                        } else {
                                            alert('Adicione primeiro um lanche ao carrinho para depois incluir um adicional.')
                                        }
                                     }} className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-full hover:bg-yellow-600 transition-colors text-sm flex-shrink-0">Adicionar</button>
                                  ) : quantity === 0 ? (
                                    isTapioca ? (
                                        <button onClick={() => setIsTapiocaModalOpen(true)} className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-full hover:bg-yellow-600 transition-colors text-sm flex-shrink-0">Escolher Sabor</button>
                                    ) : item.id === 24 ? (
                                      <button onClick={() => setItemToCustomize(item)} className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-full hover:bg-yellow-600 transition-colors text-sm flex-shrink-0">Personalizar</button>
                                    ) : (
                                      <button onClick={() => handleAddItem(item, category.title)} className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-full hover:bg-yellow-600 transition-colors text-sm flex-shrink-0">Adicionar</button>
                                    )
                                  ) : (
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      <button onClick={() => handleRemoveLastOfItem(item.id)} className="bg-gray-200 text-gray-700 w-7 h-7 rounded-full font-bold text-lg flex items-center justify-center">-</button>
                                      <span className="font-bold text-lg w-6 text-center text-gray-900">{quantity}</span>
                                      <button onClick={() => handleAddItem(item, category.title)} className="bg-yellow-500 text-white w-7 h-7 rounded-full font-bold text-lg flex items-center justify-center">+</button>
                                    </div>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
              {filteredMenuData.length === 0 && <p className="text-center text-yellow-700">Nenhum item encontrado.</p>}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <h3 className="text-lg font-bold text-yellow-900 mb-2">Resumo do Pedido</h3>
            {order.length === 0 ? (
              <div className="flex-grow flex items-center justify-center"><p className="text-center text-yellow-700 bg-white/20 p-4 rounded-lg">Seu carrinho está vazio.</p></div>
            ) : (
              <div className="space-y-2 flex-grow overflow-y-auto pr-2 mb-4 border-b border-yellow-200/50 pb-4">
                {order.map((item) => (
                  <div key={item.cartId} className="flex justify-between items-center text-sm p-2 bg-white/20 rounded-md">
                    <div>
                      <p className="font-semibold text-yellow-800">{item.categoryTitle ? `${item.categoryTitle} - ${item.name}` : item.name}</p>
                       {item.additionals.length > 0 && (
                            <p className="text-xs text-yellow-700 italic pl-2">
                                + {item.additionals.map(a => a.name).join(', ')}
                            </p>
                       )}
                      {item.description && item.description.startsWith("Carnes:") && (
                        <p className="text-xs text-yellow-700 italic pl-2">{item.description}</p>
                      )}
                      <p className="text-xs text-yellow-900">R$ {(item.price + item.additionals.reduce((p, a) => p + a.price, 0)).toFixed(2)}</p>
                    </div>
                    <button onClick={() => handleRemoveItemByCartId(item.cartId)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Remover</button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-auto">
              <div className="space-y-3">
                <input type="text" placeholder="Seu nome" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className="w-full p-2 border border-yellow-300 rounded-md bg-white/50 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900" />
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required className="w-full p-2 border border-yellow-300 rounded-md bg-white/50 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900">
                  <option value="" disabled>Forma de Pagamento</option>
                  <option value="Pix">Pix</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
                <textarea placeholder="Observações (ex: sem cebola)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full p-2 border border-yellow-300 rounded-md bg-white/50 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900" />
              </div>
              <div className="mt-4 text-right">
                <p className="text-xl font-bold text-yellow-900">Total: R$ {total.toFixed(2)}</p>
              </div>
              <button
                onClick={handleSendOrder}
                disabled={!isOrderReady}
                className={`mt-4 w-full block text-center font-bold py-3 px-4 rounded-lg transition-all ${isOrderReady ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                {isOrderReady ? 'Enviar Pedido' : 'Preencha os dados para pedir'}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <CustomizationModal
        item={itemToCustomize}
        onClose={() => setItemToCustomize(null)}
        onSave={handleSaveCustomization}
      />
      
       <AdditionalModal
        additional={itemToAddAsAdditional}
        order={order}
        onClose={() => setItemToAddAsAdditional(null)}
        onSave={handleAddAdditional}
      />

      <TapiocaFlavorModal
        isOpen={isTapiocaModalOpen}
        onClose={() => setIsTapiocaModalOpen(false)}
        onSave={handleSaveTapiocaFlavor}
      />

      <PixModal
        isOpen={isPixModalOpen}
        onClose={() => setIsPixModalOpen(false)}
        total={total}
        whatsappUrl={whatsappUrl}
      />

      <PaymentConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
};

export default OrderModal;