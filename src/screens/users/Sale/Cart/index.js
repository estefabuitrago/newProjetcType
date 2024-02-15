"use client"
import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import { shop } from '@/app/src/Components/Auth/index';
import { styleInventory } from '@/app/src/Style/index';
import "bootstrap/dist/css/bootstrap.css";
import MenuUser from "@/app/src/Components/navUser/MenuUser.js";
import md5 from 'md5';
import { auth } from "@/app/src/Components/Auth/index";
import { api, resources } from "@/app/src/utils/sdk/";

const Cart = () => {
  const [shopCart, setShopCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const fetchProducts = () => {
    const storedCart = localStorage.getItem('shopCar');
    setShopCart(storedCart ? JSON.parse(storedCart) : []);
  };

  const getUserInfo = async () => {
    try {
      const response = await api.get(`${resources.account}${auth.users.id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting user information:", error);
      return null;
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedCart = [...shopCart];
    updatedCart.splice(index, 1);
    setShopCart(updatedCart);
  };

  const calculateTotal = () => {
    const total = shopCart.reduce((acc, item) => acc + item.price * item.amount, 0);
    setCartTotal(total);
  };

  

  const payu = async () => {
    const userInfo = await getUserInfo();
    const userEmail = userInfo ? userInfo.email : 'test@test.com';
    const generateRandomReferenceCode = () => {
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 1000);
    return `Turismo${timestamp}${randomValue}`;
  };
    const apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
    const merchantId = '508029';
    const referenceCode = generateRandomReferenceCode();
    const amount = cartTotal;
    const currency = 'COP';
    const stringToHash = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
    const signature = md5(stringToHash);
    const payuData = {
      accountId: '512321',
      merchantId,
      apiKey,
      description: 'Test PAYU',
      referenceCode,
      amount,
      tax: '0',
      taxReturnBase: '0',
      currency,
      signature,
      test: '1',
      buyerEmail: userEmail,
      responseUrl: 'http://www.test.com/response',
      confirmationUrl: 'http://www.test.com/confirmation',
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/';

    for (const key in payuData) {
      if (payuData.hasOwnProperty(key)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payuData[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('shopCart', JSON.stringify(shopCart));
    calculateTotal();
  }, [shopCart]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      if (userInfo) {
        console.log("User information:", userInfo);
      }
    };
  
    fetchUserInfo();
  }, []);

  return (
    <div>
      <MenuUser />

      <div className="cart">
        <h1>Carrito</h1>
        {shopCart.length === 0 ? (
          <h3 className='empty-cart-message'>El carrito está vacío</h3>
        ) : (
          shopCart.map((item, index) => (
            <div key={index} className='row show-product'>
              <div className='col-3'>
                <Image src={item.file} />
              </div>
              <div className='col-9 info-product'>
                <div className='row'>
                  <div className='col-3'>
                    <p className='name-product'>{item.name}</p>
                    <p><b>Precio unitario:</b> ${item.price}</p>
                    <p><b>Cantidad:</b>{item.amount}</p>
                  </div>
                  <div className='col-6'>
                    <p><b>Total:</b>${item.price * item.amount}</p>
                  </div>
                  <div className='col-3'>
                    <button onClick={() => handleDeleteProduct(index)}>
                      <DeleteIcon className='btn-delete-cart' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {shopCart.length > 0 && (
          <div className='runway'>
            <p><b>Total del Carrito:${cartTotal}</b></p>
            <h3>Metodos de pago</h3>
            <button onClick={payu}><img className='payu' src='https://chile.payu.com/wp-content/uploads/sites/4/2020/05/PAYU_LOGO_LIME.png'></img></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
