import React, { useState, useEffect } from 'react';
import { InstagramIcon, MapPinIcon, MenuIcon, StarIcon, DEVELOPER_WHATSAPP_NUMBER, DEVELOPER_INSTAGRAM_URL } from './constants';
import LocationModal from './components/LocationModal';
import ReviewFlow from './components/ReviewFlow';
import OrderModal from './components/OrderModal';
import ConstructionModal from './components/ConstructionModal';

type ModalType = 'location' | 'review' | 'order' | 'construction' | null;

const subtitles = [
    "\"O Senhor é o meu pastor; de nada terei falta.\" - Salmos 23:1",
    "\"Qualidade tem nome\""
];

const App: React.FC = () => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSubtitleIndex(prevIndex => (prevIndex + 1) % subtitles.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const handleLogoClick = () => {
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 3000); // Duration matches animation
    };

    const LinkButton = ({ icon, text, onClick, disabled = false }: { icon: React.ReactNode, text: string, onClick: () => void, disabled?: boolean }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className="group w-full flex items-center p-4 my-2 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            <div className="w-1/6 text-yellow-900">{icon}</div>
            <span className="flex-grow text-center text-lg md:text-xl font-semibold text-yellow-900">{text}</span>
            <div className="w-1/6"></div>
        </button>
    );

    const devCtaMessage = encodeURIComponent("Olá, vi o link do Sr. Pastel e quero um site parecido!");

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 bg-gray-100 animated-gradient">
            <main className="w-full max-w-lg mx-auto flex flex-col items-center justify-center flex-grow">
                <div className="relative w-full p-6 md:p-8 bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl">
                    <img src="/outubrorosa.png" alt="Selo de conscientização Outubro Rosa" className="absolute -top-3 -left-3 w-16 h-auto transform rotate-[-15deg] drop-shadow-lg" />
                    <header className="text-center">
                        <img
                            src="/logo.png"
                            alt="Sr. Pastel Logo"
                            onClick={handleLogoClick}
                            className={`w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 cursor-pointer coin ${isSpinning ? 'spinning' : ''}`}
                        />
                        <h1 className="text-4xl md:text-5xl font-bold animated-text-gradient font-display">
                            Sr. Pastel
                        </h1>
                        <p key={subtitleIndex} className="mt-2 text-sm md:text-base text-amber-800 italic subtitle-fade h-10 flex items-center justify-center">
                           {subtitles[subtitleIndex]}
                        </p>
                    </header>
                    <section className="mt-8 w-full">
                        <LinkButton icon={<MenuIcon />} text="Cardápio e Pedidos" onClick={() => setActiveModal('order')} />
                        <LinkButton icon={<InstagramIcon />} text="Instagram" onClick={() => setActiveModal('construction')} />
                        <LinkButton icon={<MapPinIcon />} text="Localização" onClick={() => setActiveModal('location')} />
                        <LinkButton icon={<StarIcon />} text="Avalie-nos" onClick={() => setActiveModal('review')} />
                    </section>
                </div>
            </main>

            <footer className="w-full max-w-lg text-center mt-8 text-sm">
                 <a
                    href={`https://wa.me/${DEVELOPER_WHATSAPP_NUMBER}?text=${devCtaMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 text-xs md:text-sm mb-4"
                >
                    Quer um site incrível como esse? Fale comigo! 🚀
                </a>
                <p className="text-amber-900/80">
                    Desenvolvido por{' '}
                    <a href={DEVELOPER_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
                        InteligenciArte.IA ✨
                    </a>
                </p>
            </footer>

            <LocationModal isOpen={activeModal === 'location'} onClose={() => setActiveModal(null)} />
            <ReviewFlow isOpen={activeModal === 'review'} onClose={() => setActiveModal(null)} />
            <OrderModal isOpen={activeModal === 'order'} onClose={() => setActiveModal(null)} />
            <ConstructionModal isOpen={activeModal === 'construction'} onClose={() => setActiveModal(null)} />

        </div>
    );
};

export default App;
