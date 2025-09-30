import React from 'react';
import Modal from './Modal';
import { GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL, LOCATION_ADDRESS } from '../constants';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nossa Localização">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        ></iframe>
      </div>
       <div className="text-center mt-4 text-yellow-800">
        <p className="font-semibold">{LOCATION_ADDRESS}</p>
        <p className="text-sm mt-1"><em>(Em frente a Unicesumar)</em></p>
        <p className="mt-3 text-lg font-display">Estamos esperando por você!</p>
     </div>
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full block text-center bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Abrir no Google Maps
      </a>
    </Modal>
  );
};

export default LocationModal;