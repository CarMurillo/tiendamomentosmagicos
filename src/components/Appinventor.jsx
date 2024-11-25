
import React from "react";
import Footer from './Footer';

const Appinventor = () => {
  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Aplicación App Inventor</h1>
        <div style={styles.iframeContainer}>
        <iframe 
            width="1200" height="630" src="https://www.youtube.com/embed/T4Js5LDFZo0?si=9fTIacql0k2Smz6X" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  iframeContainer: {
    display: "flex",
    justifyContent: "center",
  },
  iframe: {
    border: "none",
    height: "400px",
    width: "600px",
  },
};

export default Appinventor;

