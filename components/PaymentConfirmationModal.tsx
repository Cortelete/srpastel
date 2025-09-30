import React from 'react';
import Modal from './Modal';

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({ isOpen, onClose, whatsappUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pedido na Fila!">
      <div className="text-center p-4">
        <div className="text-5xl mb-4">👍</div>
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Seu pedido já vai para a cozinha!</h3>
        <p className="text-sm text-yellow-700 mb-6">
          Seu pedido está na nossa fila de produção. O pagamento será feito na entrega ou retirada para finalizarmos. Clique abaixo para confirmar via WhatsApp.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Confirmar Pedido no WhatsApp
        </a>
      </div>
    </Modal>
  );
};

export default PaymentConfirmationModal;
