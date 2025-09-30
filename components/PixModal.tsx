import React, { useState } from 'react';
import Modal from './Modal';
import { PIX_KEY } from '../constants';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  whatsappUrl: string;
}

const PixModal: React.FC<PixModalProps> = ({ isOpen, onClose, total, whatsappUrl }) => {
  const [copyStatus, setCopyStatus] = useState('');

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY)
      .then(() => {
        setCopyStatus('Copiado!');
        setTimeout(() => setCopyStatus(''), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setCopyStatus('Falha ao copiar');
        setTimeout(() => setCopyStatus(''), 2000);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pagamento via Pix">
      <div className="text-center p-4">
        <p className="text-yellow-800 mb-4">Escaneie o QR Code abaixo para pagar:</p>
        <div className="flex justify-center my-4">
            <img src="/qrcode.png" alt="QR Code para pagamento Pix" className="w-48 h-48 bg-gray-200 rounded-lg object-cover" />
        </div>

        <div className="my-6">
          <p className="text-yellow-800 mb-2">Ou use a chave Pix (copia e cola):</p>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={handleCopyPixKey}
              className="bg-gray-200 text-yellow-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copiar Chave Pix
            </button>
            {copyStatus && <span className="text-sm text-green-600 font-bold animate-pulse">{copyStatus}</span>}
          </div>
        </div>
        
        <p className="text-2xl font-bold text-yellow-900 mb-4">
          Total: R$ {total.toFixed(2).replace('.', ',')}
        </p>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-left mb-6">
          <p className="font-bold">Atenção!</p>
          <p className="text-sm">Não se esqueça de enviar o comprovante do seu pagamento após confirmar o pedido no WhatsApp.</p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Confirmar e Abrir WhatsApp
        </a>
      </div>
    </Modal>
  );
};

export default PixModal;