import React from "react";
import Footer from './Footer';


const JuegoScratch = () => {
  return (
    <>
    <div style={styles.container}>
      <h1 style={styles.title}>Juego de Scratch</h1>
      <div style={styles.iframeContainer}>
      <iframe src="https://scratch.mit.edu/projects/1097636900/embed" allowtransparency="true" 
      width="730" height="603" frameborder="0" scrolling="no" allowfullscreen></iframe>
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
};

export default JuegoScratch;
