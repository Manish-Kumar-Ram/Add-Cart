import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('https://dummyjson.com/products');
        setProducts(result.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  function addToCart(product) {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  }

  function removeToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(existingProductIndex, 1);
      setCart(updatedCart);
    }
  }

  useEffect(() => {
    const bill = cart.reduce((acc, product) => acc + product.price, 0);
    setTotalBill(bill);
  }, [cart]);

  return (
    <>
      <header className='nav'>
        <h1>UseReducer</h1>
        <div className="cart">
          <p>CART</p>
          <span>{cart.length}</span>
        </div>
        <h1>Total Bill: $ {totalBill.toFixed(2)}</h1>
      </header>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h1>{product.title}</h1>
              <p>$ {product.price}</p>
              <button onClick={() => addToCart(product)}>ADD to cart</button>
              <button onClick={() => removeToCart(product)}>Remove from cart</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
