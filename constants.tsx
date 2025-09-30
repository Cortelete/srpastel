import { MenuCategory } from './types';

export const MENU_DATA: MenuCategory[] = [
    {
        title: "Pasteis Tradicionais",
        icon: "🥟",
        items: [
            { id: 1, name: "Carne", price: 9.00 },
            { id: 2, name: "Carne com Milho", price: 9.50 },
            { id: 3, name: "Carne com Queijo", price: 9.50 },
            { id: 4, name: "Frango", price: 9.00 },
            { id: 5, name: "Frango com Milho", price: 9.50 },
            { id: 6, name: "Frango com Queijo", price: 9.50 },
            { id: 7, name: "Bacon com Queijo", price: 9.50 },
        ],
    },
    {
        title: "Pasteis Doces",
        icon: "🍫",
        items: [
            { id: 8, name: "Banana com Doce de Leite", price: 8.00 },
            { id: 9, name: "Banana com Chocolate", price: 8.00 },
            { id: 10, name: "Chocolate Branco", price: 8.00 },
            { id: 11, name: "Nutella", price: 10.00 },
            { id: 12, name: "Morango com Nutella", price: 12.00 },
            { id: 13, name: "Morango com Chocolate", price: 10.00 },
            { id: 14, name: "Morango com Chocolate Branco", price: 10.00 },
        ],
    },
    {
        title: "Pasteis Especiais",
        icon: "⭐",
        items: [
            { id: 15, name: "Palmito", price: 10.00 },
            { id: 16, name: "Pizza", price: 10.00 },
            { id: 17, name: "Queijo com Calabresa", price: 10.00 },
            { id: 18, name: "Queijo com Bacon", price: 10.00 },
            { id: 19, name: "Vegetariano", price: 12.00 },
            { id: 20, name: "Costelinha com Queijo", price: 12.00 },
            { id: 21, name: "4 Queijos", price: 12.00 },
            { id: 22, name: "Camarão com Palmito + Catupiry", price: 14.00 },
            { id: 23, name: "Camarão com Palmito + Catupiry e Queijo", price: 15.00 },
        ],
    },
    {
        title: "Pastel Super Especial",
        icon: "🥟",
        items: [
            { id: 24, name: "Sr. Pastel", price: 25.00, description: "👉 São 2 massas, você escolhe duas carnes e três acompanhamentos 💡 Dica: Frango + Bacon + Queijo + Milho + Catupiry" },
        ],
    },
    {
        title: "Tapioca",
        icon: "🌮",
        items: [
            { id: 25, name: "Sabores dos pastéis tradicionais ou doce", price: 12.00 },
        ],
    },
    {
        title: "Dogs",
        icon: "🌭",
        items: [
            { id: 26, name: "Dog Tradicional", price: 13.00 },
            { id: 27, name: "Dog Cheddar", price: 14.00 },
            { id: 28, name: "Dog Catupiry", price: 14.00 },
            { id: 29, name: "Dog Bacon", price: 15.00 },
            { id: 30, name: "Dog Francês", price: 15.00 },
            { id: 31, name: "Dog Especial", price: 16.00 },
            { id: 32, name: "Dog St. Dogão", price: 25.00, description: "pão francês recheado, purê de batata, cheddar, catupiry, milho, batata palha, maionese, ketchup, mostarda, 2 salsichas, carne moída e queijo" },
        ],
    },
    {
        title: "X-Lanches",
        icon: "🍔",
        items: [
            { id: 33, name: "X-Burguer", price: 12.00 },
            { id: 34, name: "X-Egg", price: 13.00 },
            { id: 35, name: "X-Bacon", price: 15.00 },
            { id: 36, name: "X-Salada", price: 16.00 },
            { id: 37, name: "X-Calabresa", price: 15.00 },
            { id: 38, name: "X-Frango", price: 16.00 },
            { id: 39, name: "X-Tudo", price: 25.00 },
        ],
    },
    {
        title: "Outros Lanches",
        icon: "🌯",
        items: [
            { id: 40, name: "Misto Quente", price: 10.00 },
            { id: 41, name: "Cachorro Quente", price: 12.00 },
            { id: 42, name: "Xis Dog", price: 18.00 },
            { id: 43, name: "Xis Frango", price: 20.00 },
            { id: 44, name: "Xis Calabresa", price: 20.00 },
            { id: 45, name: "Xis Catupiry", price: 22.00 },
        ],
    },
    {
        title: "Bebidas",
        icon: "🥤",
        items: [
            { id: 46, name: "Água", price: 2.50 },
            { id: 47, name: "Água com gás", price: 2.50 },
            { id: 48, name: "Refrigerante Lata", price: 5.00 },
            { id: 49, name: "Refrigerante 600ml", price: 7.00 },
            { id: 50, name: "Refrigerante 2L", price: 10.00 },
            { id: 51, name: "Suco", price: 5.00, description: "Laranja, Morango, Maracujá, Abacaxi, Uva, Goiaba, Cajú, Manga" },
            { id: 52, name: "Cerveja Lata", price: 4.00 },
            { id: 53, name: "Cerveja Long Neck", price: 5.00 },
            { id: 54, name: "Cerveja 600ml", price: 10.00 },
        ],
    },
    {
        title: "Adicionais para seu Lanche",
        icon: "➕",
        items: [
            { id: 55, name: "Ovo", price: 2.00 },
            { id: 56, name: "Milho", price: 2.00 },
            { id: 57, name: "Batata Palha", price: 2.00 },
            { id: 58, name: "Azeitona", price: 2.00 },
            { id: 59, name: "Champignon", price: 3.00 },
            { id: 60, name: "Palmito", price: 3.00 },
            { id: 61, name: "Mussarela", price: 3.00 },
            { id: 62, name: "Cream Cheese", price: 3.00 },
            { id: 63, name: "Bacon", price: 3.00 },
            { id: 64, name: "Calabresa", price: 3.00 },
            { id: 65, name: "Hambúrguer", price: 3.00 },
            { id: 66, name: "Salsicha", price: 3.00 },
        ],
    },
];

export const WHATSAPP_NUMBER = "5542991044200";
export const PIX_KEY = "42991044200"; // Chave Pix (celular)
export const LOCATION_ADDRESS = "R. São João do Triunfo, 58, Ponta Grossa, Paraná, Brasil, 84036-360";
export const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJpfOaYp8b6JQRi0eaCrsqrNc";
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION_ADDRESS)}`;
export const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.179875316434!2d-50.1506646!3d-25.129608899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81b9f629af3a5%3A0xd7ac2abb0a9a478b!2sSr%20Pastel!5e0!3m2!1spt-BR!2sbr!4v1759238739855!5m2!1spt-BR!2sbr";

export const DEVELOPER_WHATSAPP_NUMBER = "5541988710303";
export const DEVELOPER_INSTAGRAM_URL = "https://www.instagram.com/inteligenciarte.ia";

export const CUSTOMIZATION_MEATS: string[] = [
    "Carne", "Frango", "Bacon", "Calabresa", "Costelinha", "Camarão"
];

export const CUSTOMIZATION_ACCOMPANIMENTS: string[] = [
    "Queijo", "Milho", "Palmito", "Ovo", "Azeitona", "Champignon", "Mussarela", "Cream Cheese", "Catupiry", "Cheddar"
];


export const InstagramIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);
export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
export const MapPinIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
export const StarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
export const MenuIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
);