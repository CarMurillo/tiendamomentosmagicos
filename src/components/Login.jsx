import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../credenciales';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../CSS/Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth(appFirebase);
  const navigate = useNavigate();

  const handleVisibilityChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);

      setErrorMessage('');
      navigate('/');

    } catch (error) {
      setErrorMessage('Error al iniciar sesión: ' + error.message);
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <img src="/src/img/logo2.png" alt="imagen-usuario-fallo" />
          <label htmlFor="username">Usuario</label>
          <input
            className="labels"
            type=" "
            id="username"
            placeholder="Ejemplo: correo@hotmail.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <div className="password-input-container">
            <input
              className="labels"
              type={passwordVisible ? ' ' : 'password'}
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </div>
          <br />
          <button type="submit" id="login-button">
            Iniciar Sesión
          </button>
          <a href="/Registro" className="register-link">
            Registro
          </a>
        </form>

        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
