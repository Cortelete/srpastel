export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export interface MenuCategory {
  title: string;
  icon: string;
  items: MenuItem[];
}

export interface OrderItem extends MenuItem {
  cartId: string; // Unique ID for this specific item in the cart
  additionals: MenuItem[]; // Additionals for this specific item
  categoryTitle?: string;
}