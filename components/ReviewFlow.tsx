import React, { useState } from 'react';
import Modal from './Modal';
import { GOOGLE_REVIEW_URL, StarIcon } from '../constants';

interface ReviewFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewFlow: React.FC<ReviewFlowProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'rating' | 'feedback' | 'thanks'>('rating');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingSubmit = (rate: number) => {
    setRating(rate);
    if (rate === 5) {
      window.open(GOOGLE_REVIEW_URL, '_blank');
      onClose();
      resetState();
    } else {
      setStep('feedback');
    }
  };
  
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('thanks');
    // In a real app, you would submit the form data here.
    // The form action handles the submission via FormSubmit.
  };

  const resetState = () => {
    setStep('rating');
    setRating(0);
    setHoverRating(0);
  };
  
  const handleClose = () => {
      onClose();
      // Delay reset to allow modal to close smoothly
      setTimeout(resetState, 300);
  }

  const renderContent = () => {
    switch (step) {
      case 'rating':
        return (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">Sua opinião é importante!</h3>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingSubmit(star)}
                  className="transform transition-transform duration-200 hover:scale-125"
                >
                  <StarIcon
                    className={`w-10 h-10 cursor-pointer ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        );
      case 'feedback':
        return (
          <div className="text-left">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">O que aconteceu?</h3>
            <p className="text-sm text-yellow-700 mb-4">Lamentamos por não atender às suas expectativas. Por favor, conte-nos como podemos melhorar.</p>
             <form action="https://formsubmit.co/SEU_EMAIL_AQUI" method="POST" onSubmit={handleFeedbackSubmit}>
                 <input type="hidden" name="_subject" value="Feedback - Sr. Pastel" />
                 <input type="hidden" name="rating" value={rating} />
                 <textarea
                    name="feedback"
                    rows={4}
                    className="w-full p-2 border border-yellow-300 rounded-md bg-white/50 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
                    placeholder="Sua mensagem..."
                    required
                 ></textarea>
                 <button type="submit" className="mt-4 w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                    Enviar Feedback
                 </button>
             </form>
          </div>
        );
        case 'thanks':
            return (
                <div className="text-center p-4">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Obrigado!</h3>
                    <p className="text-sm text-yellow-700">Seu feedback é muito valioso e nos ajudará a melhorar.</p>
                </div>
            );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Deixe sua Avaliação">
      {renderContent()}
    </Modal>
  );
};

export default ReviewFlow;