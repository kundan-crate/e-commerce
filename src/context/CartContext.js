import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext for user authentication

// Create the CartContext
export const CartContext = createContext();

// Define initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null,
};

// Cart reducer to handle different actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: calculateTotal(action.payload.items || []),
        itemCount: calculateItemCount(action.payload.items || []),
      };
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Update quantity if product already exists in cart
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new product to cart
        const newItem = {
          id: product.id,
          name: product.name,
          price: calculateDiscountedPrice(product),
          image: product.image,
          quantity,
          stock: product.stock,
        };
        updatedItems = [...state.items, newItem];
      }

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity: Math.min(item.stock, Math.max(1, quantity)) } : item
      );

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };
    case 'CART_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'CART_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Helper functions
const calculateDiscountedPrice = (product) => {
  return ((100 - (product.discount || 0)) * product.price / 100);
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const calculateItemCount = (items) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Inside your CartProvider, after the reducer:
  useEffect(() => {
    console.log("Cart state updated:", state.itemCount);
  }, [state.itemCount]);

  // Load cart data from localStorage or server when user changes
  useEffect(() => {
    const loadCart = async () => {
      try {
        dispatch({ type: 'CART_REQUEST' });

        if (isAuthenticated && user && user.id) {
          // Add a console.log to debug
          console.log("Loading cart for user:", user.id);

          const response = await fetch(`http://localhost:3001/users/${user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();

          console.log("User data loaded:", userData);

          // Check if cart exists and is an array
          if (userData.cart && Array.isArray(userData.cart)) {
            dispatch({
              type: 'INITIALIZE_CART',
              payload: { items: userData.cart },
            });
          } else {
            console.warn("User has no cart or cart is not an array:", userData);
            dispatch({
              type: 'INITIALIZE_CART',
              payload: { items: [] },
            });
          }
        } else {
          console.log("No authenticated user, loading from localStorage");
          const localCart = localStorage.getItem('guestCart');
          if (localCart) {
            dispatch({
              type: 'INITIALIZE_CART',
              payload: { items: JSON.parse(localCart) },
            });
          }
        }

        dispatch({ type: 'CART_SUCCESS' });
      } catch (error) {
        console.error("Error loading cart:", error);
        dispatch({
          type: 'CART_FAILURE',
          payload: error.message,
        });
      }
    };

    loadCart();
  }, [user, isAuthenticated]);

  // Save cart whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        if (isAuthenticated && user && user.id) {
          console.log("Saving cart for user:", user.id, "Items:", state.items);

          // Fetch current user data
          const response = await fetch(`http://localhost:3001/users/${user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();

          // Update only the cart portion
          const updatedUserData = {
            ...userData,
            cart: state.items, // Update cart with current items
          };

          // Save updated user data back to server
          const updateResponse = await fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
          });

          if (!updateResponse.ok) {
            throw new Error('Failed to update user cart');
          }

          console.log("Cart saved successfully");
        } else {
          // Save to localStorage if no user
          console.log("No authenticated user, saving to localStorage");
          localStorage.setItem('guestCart', JSON.stringify(state.items));
        }
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    };

    // Only save if we have items and we're not currently loading
    if (!state.loading && state.items) {
      saveCart();
    }
  }, [state.items, user, isAuthenticated]);

  // Merge guest cart with user cart on login
  useEffect(() => {
    const mergeGuestCart = async () => {
      if (isAuthenticated && user) {
        const localCart = localStorage.getItem('guestCart');
        if (localCart) {
          const guestItems = JSON.parse(localCart);
          if (guestItems.length > 0) {
            try {
              const response = await fetch(`http://localhost:3001/users/${user.id}`);
              if (!response.ok) {
                throw new Error('Failed to fetch user data for merging');
              }
              const userData = await response.json();

              const mergedItems = [...(userData.cart || [])];
              guestItems.forEach(guestItem => {
                const existingIndex = mergedItems.findIndex(item => item.id === guestItem.id);
                if (existingIndex >= 0) {
                  mergedItems[existingIndex].quantity += guestItem.quantity;
                } else {
                  mergedItems.push(guestItem);
                }
              });

              const updatedUserData = {
                ...userData,
                cart: mergedItems,
              };

              await fetch(`http://localhost:3001/users/${user.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
              });

              dispatch({
                type: 'INITIALIZE_CART',
                payload: { items: mergedItems },
              });

              localStorage.removeItem('guestCart');
            } catch (error) {
              console.error('Failed to merge carts:', error);
            }
          }
        }
      }
    };

    mergeGuestCart();
  }, [isAuthenticated, user]);

  // Actions that can be dispatched
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity },
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id },
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};