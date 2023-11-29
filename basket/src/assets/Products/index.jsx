import React, { useState, useEffect } from "react";
import axious from "axios";
import "./style.css";
function Product() {
  const [product, setProduct] = useState([]);
  const [basket, setBasket] = useState(localStorage.getItem("basket")?JSON.parse(localStorage.getItem("basket")):[]);
  const [isLoading, setIsLoading] = useState(true)

  async function getFetch() {
    const response = await axious.get(
      "https://northwind.vercel.app/api/products"
    );
    setProduct(response.data);
    setIsLoading(false)
  }
  useEffect(() => {
    localStorage.setItem("basket",JSON.stringify(basket))
  }, [basket])
  
  useEffect(() => {
    getFetch();
  }, []);

  function addBasket(item) {
    const elementIndex = basket.findIndex((x) => x.id === item.id);
    if (elementIndex !== -1) {
      const newBasket = [...basket];
      newBasket[elementIndex].count++;
      setBasket(newBasket);
    } else {
      setBasket([...basket, { ...item, count: 1 }]);
    }


  }

  function setCountValue(status,item) {
    const elementIndex = basket.findIndex((x) => x.id === item.id);
    const newBasket = [...basket];
    if (status) {
    newBasket[elementIndex].count++;
    setBasket(newBasket)
    }
    else{
      if (newBasket[elementIndex].count>0) {
        newBasket[elementIndex].count--;
      setBasket(newBasket)
      }
    }
  }
  
  function removeItem(id) {
    setBasket(basket.filter((x) => x.id !== id));
  }
  return (
    <>{isLoading?<div className="vid"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>:<div className="vd">
        <div className="basket">
        <h2>Basket</h2>
        {basket.map((x) => (
          <ul id="basket_ul" key={x.id}>
            <li>{x.id}</li>
            <li>{x.name}</li>
            <li>
              Say:{x.count}
              <button onClick={() => setCountValue(true,x)}>+</button>
              <button onClick={() => setCountValue(false,x)}>-</button>
            </li>
            <li>
              <button onClick={() => removeItem(x.id)}>Remove Item</button>
            </li>
          </ul>
        ))}
      </div>
        <h2>Products</h2>
      <ul>
        {product.map((x) => (
          <div key={x.id}>
            <li>{x.id}</li>
            <li>{x.name}</li>
            <button onClick={() => addBasket(x)}>Add Basket</button>
          </div>
        ))}
      </ul>
    </div>}
    
    </>
  );
}
export default Product;
