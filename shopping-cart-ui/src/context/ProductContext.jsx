import { useState, useEffect, createContext, useContext } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await fetch("/api/products");
        if (!resp.ok) throw new Error("Failed to fetch the products");
        const data = await resp.json();
        console.log(data);
        setProduct(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
