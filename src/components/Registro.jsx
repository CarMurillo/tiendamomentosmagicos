
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../credenciales'; 
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../CSS/Registro.css';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const auth = getAuth(appFirebase);
  const db = getFirestore(appFirebase);
  const navigate = useNavigate(); 
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid(email)) {
      setErrorMessage('Ingrese un correo electrónico válido');
      return;
    }

    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = {
          uid: userCredential.user.uid,
          email: email,
          nombre: nombre,
          apellido: apellido,
        };

        const docRef = await addDoc(collection(db, 'usuarios'), user);

        console.log('Usuario registrado con ID: ', docRef.id);
        navigate('/');
      } catch (error) {
        setErrorMessage('Error al registrar usuario: ' + 'el susuario ya esta en uso');
      }
    } else {
      setErrorMessage('Las contraseñas no coinciden');
    }
  };
  const handleVisibilityChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
      <img src="./src/img/logo2.png" alt="Logo de registro" />
    <br />
    <label htmlFor="email">Correo electrónico:</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="labels"
      required
    />
    <label htmlFor="nombre">Ingresa tu nombre:</label>
    <input
      type="text  "
      id="nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      className="labels"
      required
    />
    <label htmlFor="apellido">Ingresa tu apellido:</label>
    <input
      type="text "
      id="apellido"
      value={apellido}
      onChange={(e) => setApellido(e.target.value)}
      className="labels"
      required
    />
    <label htmlFor="password">Contraseña:</label>
    <input
      type={passwordVisible ? ' ' : 'password'}
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="labels"
      required
    />
    <label htmlFor="confirm-password">Confirmar contraseña:</label>
    <input
      type={passwordVisible ? ' ' : 'password'}
      id="confirm-password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="labels"
      required
    />
    <span
      className="eye-icon"
      onClick={handleVisibilityChange}
      role="img"
      aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
    >
      {passwordVisible ? <span class="fas fa-eye" ></span> : <span class="fas fa-eye-slash"></span>}
    </span>
    <br /><br />
    <button type="submit" id="registration-button">
      Registrarse
    </button>
    <a href="/Login" className="register-link">
          ¿Ya tienes cuenta?
        </a>
      </form>
      {errorMessage && (
        <p id="error-message" className="error-message">
          {errorMessage}
        </p>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Registro;
