import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const PRODUCTS = [
  { id: 1, name: "Colchão Queen Size Premium", price: 2499.90, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop" },
  { id: 2, name: "Colchão Casal Ortopédico", price: 1899.90, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop" },
  { id: 3, name: "Colchão King Size Luxo", price: 3299.90, image: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=500&h=500&fit=crop" },
  { id: 4, name: "Apartamento 2 Quartos Centro", price: 350000, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=500&fit=crop" },
  { id: 5, name: "Casa 3 Quartos com Quintal", price: 480000, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=500&fit=crop" },
  { id: 6, name: "Studio Moderno Mobiliado", price: 220000, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=500&fit=crop" },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (productId: number) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast({
      title: "Adicionado ao carrinho!",
      description: product.name,
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-muted to-background">
          <div className="container text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              SEU LAR IDEAL
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Colchões confortáveis e imóveis dos sonhos
            </p>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default Index;
