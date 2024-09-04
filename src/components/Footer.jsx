
import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  const handleLocationClick = () => {
    console.log('Redirigiendo a la página de ubicación');
  };

  const handleSocialClick = (redessociales) => {
    let redirectTo = '';
  
    switch (redessociales.toLowerCase()) {
      case 'facebook':
        redirectTo = 'https://www.facebook.com/profile.php?id=100063743822305&locale=es_LA';
        break;
      case 'instagram':
        redirectTo = 'https://www.instagram.com/momentosmagicos12/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==';
        break;
      case 'whatsapp':
        redirectTo = 'https://wa.me/+573102303983?text=Hola%20desde%20mi%20sitio%20web!';
        break;
      default:
        console.error('Red social no reconocida');
        return;
    }
    window.open(redirectTo, '_blank');
  };
  
  return (
    <footer>
      <div>
        <h3>Información de Contacto</h3>
        <p><strong>Dirección:</strong> Cra 3 #2-49</p>
          <p>Barrio Centro, El Carmen de Chucuri</p>
        <p><strong>Email:</strong> momentosmagicos@gmail.com</p>
        <p><strong>Telefono:</strong> (555) 123-4567</p>
      </div>
      <div>
        <h3>Ubicación</h3>
        <a href='https://maps.app.goo.gl/1f7pAGgJh5ek91HD6' target="_blank" onClick={handleLocationClick}>
          <button>Ver Ubicación</button>
        </a>
      </div>  
      <div>
        <h3>Redes Sociales</h3>
        <div>
          <button className="button-redes" onClick={() => handleSocialClick('facebook')}>
            <img className='img-fb' src='./src/img/logofacebook.png' alt="Facebook" />
          </button>
          <button className="button-redes" onClick={() => handleSocialClick('instagram')}>
            <img className='img-inst' src='./src/img/logoinstagram.png' alt="Instagram" />
          </button>
          <button className="button-redes" onClick={() => handleSocialClick('whatsapp')}>
            <img className='img-wtsp' src='./src/img/logowhatsapp.png' alt="WhatsApp" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
