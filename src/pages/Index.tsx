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
  { id: 1, name: "Camiseta Oversized Preta", price: 89.90, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop" },
  { id: 2, name: "Camiseta Básica Branca", price: 79.90, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop" },
  { id: 3, name: "Camiseta Estampada", price: 99.90, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop" },
  { id: 4, name: "Camiseta Vintage", price: 94.90, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop" },
  { id: 5, name: "Camiseta Listrada", price: 84.90, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=500&fit=crop" },
  { id: 6, name: "Camiseta Premium", price: 109.90, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop" },
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
              NOVA COLEÇÃO
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Estilo único para quem não segue padrões
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
