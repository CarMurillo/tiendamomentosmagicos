import React from "react";
import '../CSS/SobreNosotros.css'; 
import Footer from './Footer';

const SobreNosotros = () => {
  return (
    <>
    <div className="sobre-nosotros-container">
      <h1 className="title">Sobre Nosotros</h1>
      <section className="section">
        <h2>Conoce más sobre nosotros</h2>
        <div className="video-container">
          <video width="100%" height="auto" controls>
            <source src="/src/video/AvatarMultimedia.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
          <p>
          <a href="https://studio.d-id.com/share?id=c4983d1c3499aecd33da0f975718b42b&utm_source=copy" target="_blank" rel="noopener noreferrer">
            Ver Tambien Aqui
          </a>
        </p>
        </div>
      </section>
      <section className="section">
        <h2>Misión</h2>
        <p>
        Nuestra misión es ser el puente que conecta emociones y sentimientos a 
        través de detalles únicos y personalizados. Nos dedicamos a ofrecer una amplia 
        gama de productos de alta calidad, como peluches, chocolatería, ropa, bolsos, decoraciones, 
        y más, que inspiran alegría y fortalecen las relaciones entre las personas. Creemos que 
        cada cliente tiene una historia que contar, y trabajamos con pasión y creatividad para 
        transformar esas historias en experiencias memorables, asegurándonos de que cada producto 
        que ofrecemos cumpla con las expectativas de quienes nos eligen.

        Nos comprometemos a brindar una atención cercana, cálida y profesional, garantizando 
        que cada compra sea un reflejo de los valores de nuestra empresa: confianza, innovación y 
        excelencia en cada detalle.
        </p>
      </section>
      <section className="section">
        <h2>Visión</h2>
        <p>
        Nuestra visión es convertirnos en la miscelánea líder y más confiable de la región, 
        reconocida por ser el lugar donde los momentos especiales toman forma. Aspiramos a ser 
        un referente en el mercado de detalles personalizados y regalos, destacándonos no solo 
        por la diversidad de nuestros productos, sino también por la calidad, creatividad y 
        dedicación que ponemos en cada uno de ellos.

        Imaginamos un futuro donde nuestra miscelánea sea sinónimo de felicidad y conexiones 
        significativas, impactando positivamente la vida de nuestros clientes y sus seres queridos. 
        Trabajaremos constantemente para innovar y ampliar nuestra oferta, integrando las 
        tendencias del mercado sin perder nuestra esencia de cercanía y personalización. 
        De esta manera, no solo venderemos productos, sino que seremos parte de los momentos 
        más importantes en la vida de nuestros clientes, dejando huellas imborrables en sus 
        recuerdos.
        </p>
      </section>
      <section className="section">
        <h2>Valores</h2>
        <ul>
          <li>Creatividad</li>
          <li>Compromiso</li>
          <li>Calidad</li>
          <li>Empatía</li>
        </ul>
      </section>
      <section className="section">
        <h2>¿Quiénes somos?</h2>
        <p>
          Somos un equipo apasionado por los detalles y la personalización, dedicados a hacer 
          realidad los sueños de nuestros clientes. Con productos y servicios únicos, trabajamos 
          para fortalecer los lazos entre las personas a través de experiencias inolvidables.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default SobreNosotros;
