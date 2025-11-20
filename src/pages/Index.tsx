import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { Cart } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "colchoes" | "moveis";
  popularity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Colchão Queen Size Premium", price: 2499.90, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop", category: "colchoes", popularity: 95 },
  { id: 2, name: "Colchão Casal Ortopédico", price: 1899.90, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop", category: "colchoes", popularity: 88 },
  { id: 3, name: "Colchão King Size Luxo", price: 3299.90, image: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=500&h=500&fit=crop", category: "colchoes", popularity: 92 },
  { id: 4, name: "Sofá 3 Lugares Confort", price: 2899.90, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop", category: "moveis", popularity: 85 },
  { id: 5, name: "Mesa de Jantar 6 Lugares", price: 1599.90, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop", category: "moveis", popularity: 78 },
  { id: 6, name: "Guarda-Roupa Casal", price: 1999.90, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop", category: "moveis", popularity: 82 },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [category, setCategory] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<string>("popular");
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    let filtered = [...PRODUCTS];

    // Filtrar por categoria
    if (category !== "todos") {
      filtered = filtered.filter(p => p.category === category);
    }

    // Ordenar
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return filtered;
  }, [category, sortBy]);

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
              Colchões confortáveis e móveis para seu lar
            </p>
          </div>
        </section>

        <section className="container py-12">
          <ProductFilters
            category={category}
            sortBy={sortBy}
            onCategoryChange={setCategory}
            onSortChange={setSortBy}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
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
