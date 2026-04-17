import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import History from "./pages/History";
import SearchOverlay from "./components/SearchOverlay";
import { PRODUCTS, Product, CartItem } from "./types";
import { motion, AnimatePresence } from "motion/react";

type Page = "home" | "products" | "detail" | "cart" | "history";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProductId]);

  const navigate = (page: Page, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (page !== "products") {
        setCategoryFilter(null);
    }
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    navigate("cart");
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  const filteredProducts = useMemo(() => {
      if (!categoryFilter) return PRODUCTS;
      return PRODUCTS.filter(p => p.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-blue selection:text-white">
      <Navbar 
        onNavigate={(page, extra) => {
            if (page === "products" && extra) {
                setCategoryFilter(extra);
                navigate("products");
            } else {
                navigate(page as Page);
            }
        }} 
        currentPage={currentPage}
        onSearchClick={() => setIsSearchOpen(true)}
        cartCount={cartCount}
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onProductClick={(id) => navigate("detail", id)}
      />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Home onNavigate={() => navigate("products")} />
            </motion.div>
          )}

          {currentPage === "products" && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProductList 
                products={filteredProducts}
                onProductClick={(id) => navigate("detail", id)} 
              />
            </motion.div>
          )}

          {currentPage === "detail" && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProductDetail 
                product={selectedProduct} 
                onBack={() => navigate("products")} 
                onAddToCart={(product, quantity) => addToCart(product, quantity)}
              />
            </motion.div>
          )}

          {currentPage === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <Cart 
                items={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemove={removeFromCart}
                onBack={() => navigate("products")}
                onCheckout={() => alert("Merci pour votre commande ! (Démo uniquement)")}
              />
            </motion.div>
          )}

          {currentPage === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <History />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

