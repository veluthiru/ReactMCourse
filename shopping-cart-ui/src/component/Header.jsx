import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
const Header = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.qty, 0)
    .toFixed(2);
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">
        Shopping Cart ({totalItems})
      </h1>
      <div className="relative">
        <button
          className="cursor-pointer"
          onClick={() => setShowCart(!showCart)}
        >
          <FaShoppingCart className="text-2xl text-gray-700" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
        {showCart && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-10">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Cart Items
            </h2>
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex flex-col border-b pb-2 mb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {item.name} x {item.qty}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="text-red-500 text-xs mt-1 self-start hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
            <p className="text-sm font-semibold mt-3 pt-2 border-t">
              Total: ${totalPrice}
            </p>
            {cart.length > 0 && (
              <button
                className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
