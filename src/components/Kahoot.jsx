import React from "react";
import Footer from './Footer';

const Kahoot = () => {
  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Juego de Kahoot</h1>
        <div style={styles.iframeContainer}>
          <iframe
            src="https://kahoot.it/challenge/?quiz-id=eb7d2e43-fd5b-47b4-9c03-0dfcf965761c&single-player=true"
            style={styles.iframe}
            title="Kahoot Game"
            frameBorder="0"
            allowFullScreen
          ></iframe>
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
    height: "700px",
    width: "1100px",
  },
};

export default Kahoot;
