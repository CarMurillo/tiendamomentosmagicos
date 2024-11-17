import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const Header = ({ cartItemCount, handleSearch, handleCancelSearch }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirige a la página de inicio después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const itemCount = Number(cartItemCount);

  return (
    <>
      <header className='header'>
        <nav className='nav'>
          <div className='logotipo'>
            <NavLink to="/" className='buttonlogo'>
              <img src="/src/img/logo.png" alt="Logotipo del sitio Web" />
            </NavLink>
          </div>
          <div className="search-container">
            <form action="/search" onSubmit={(e) => handleSearch(e)}>
              <input
                type="text"
                placeholder="Buscar..."
                name="search"
              />
              <button className='button-busqueda' type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          <div className="user-container">
            {user && (
              <button type="button">
                <NavLink to="/" className="active-link">
                  <i className="fas fa-user user-icon"></i> HOLA
                </NavLink>
              </button>
            )}
          </div>
          <div className="cart-container">
            {user && (
              <button type="button">
                <NavLink to="/Cart" className="active-link">
                  <i className="fas fa-shopping-cart cart-icon"></i> Carrito ({itemCount})
                </NavLink>
              </button>
            )}
          </div>
          <div className="user-container">
            {!user && (
              <>
                <button type="button">
                  <NavLink to="/Login" className="active-link">
                    <i className="fas fa-user user-icon"></i> Iniciar Sesión
                  </NavLink>
                </button>
                <button type="button">
                  <NavLink to="/Registro" className="active-link">
                    <i className="fas fa-user-plus user-icon"></i> Registrarse
                  </NavLink>
                </button>
                <button type="button">
                  <NavLink to="/JuegoScratch" className="active-link">
                     JuegoScratch
                  </NavLink>
                </button>
                <button type="button">
                  <NavLink to="/SobreNosotros" className="active-link">
                     SobreNosotros
                  </NavLink>
                </button>
              </>
            )}
            {user && (
              <button onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

