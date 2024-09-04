import React, { useState } from 'react';
import Modal from 'react-modal';
import '../CSS/Cart.css';
import Footer from './Footer';

const Cart = ({ cartItems, setCartItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', direccion: '' });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    const cantidadcero = cartItems.some(item => item.quantity === 0);
    const total = getTotal();
    const totalcero = parseFloat(total) === 0;
  
    if (cantidadcero || totalcero) {
      alert('Por favor, asegúrese de que todos los productos tengan una cantidad mayor que cero o verifica que tengas productos añadidos.');
    } else {
      openModal();
    }
  };

  const handlePayment = () => {
    if (!customerInfo.name.trim() || !customerInfo.email.trim() || !customerInfo.direccion.trim() ) {
      alert('Por favor, complete todos los campos antes de pagar.');
      return;
    }
    console.log('Procesamiento de pago...');
    console.log('Enviando factura al correo:', customerInfo.email);
    alert('Compra exitosa');
    closeModal();
    setCartItems([]);
  };

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (id, newQuantity) => {
    newQuantity = Math.max(newQuantity, 0);
    
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  return (
    <>
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ marginRight: '5px', maxWidth: '35px' }}
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>${item.price}</td>
              <td>
                <div className="quantity-controls">
                  <button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                    &#9660;
                  </button>
                  <span>{item.quantity}</span>
                  <button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    &#9650;
                  </button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button className="button-cart" onClick={() => handleDelete(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td>${getTotal()}</td>
            <td>
              <button className="button-compra" onClick={handleCheckout}>
                Finalizar Compra
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Formulario de Pago"
        className="modal">

          <button className="close-button" onClick={closeModal}>
            &#10006;  
          </button>
          <br />
        <h2>Complete la información de pago</h2>
        <div className="modal-cart-info">
          <h3>Resumen de la Compra</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total: ${getTotal()}</p>
        </div>
        <form>
          <label>
            Nombre:
            <input
              type=""
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            />
          </label>
          <label>
            Correo electrónico:
            <input
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            />
          </label>
          <label>
            Direccion
            <input 
            type="" 
            value={customerInfo.direccion}
            onChange={(e)=>setCustomerInfo({...customerInfo, direccion: e.target.value})}
            />
          </label>
          <button className="button-compra" type="button" onClick={handlePayment}>
            Pagar
          </button>
        </form>
      </Modal>
    </div>
    <Footer/>
    </>
  );
};

export default Cart;