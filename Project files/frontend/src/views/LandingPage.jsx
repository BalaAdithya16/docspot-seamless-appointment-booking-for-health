import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #ebf8ff, #ffffff, #bee3f8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 24px",
      position: "relative", // To position top-left brand
    },
    brand: {
      position: "absolute",
      top: "20px",
      left: "30px",
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#3182ce", // same as styles.highlight
    },
    content: {
      textAlign: "center",
      maxWidth: "700px",
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: "800",
      color: "#2b6cb0",
      marginBottom: "20px",
      textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
    },
    highlight: {
      color: "#3182ce",
    },
    description: {
      fontSize: "1.25rem",
      color: "#2c5282",
      marginBottom: "40px",
      fontWeight: "500",
    },
    button: {
      backgroundColor: "#3182ce",
      color: "white",
      fontSize: "1.1rem",
      padding: "14px 32px",
      border: "none",
      borderRadius: "999px",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#2b6cb0",
      transform: "scale(1.05)",
    },
    imageContainer: {
      marginTop: "60px",
    },
    image: {
      maxWidth: "100%",
      width: "400px",
      borderRadius: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    },
  };

  const handleHover = (e, hover) => {
    Object.assign(e.target.style, hover ? styles.buttonHover : styles.button);
  };

  return (
    <div style={styles.container}>
      {/* 🔷 DocSpot brand on top-left */}
      <div style={styles.brand}>DocSpot</div>

      <div style={styles.content}>
        <h1 style={styles.title}>
          Welcome to <span style={styles.highlight}>DocSpot</span>
        </h1>
        <p style={styles.description}>
          Book appointments with trusted doctors. Fast. Easy. Secure.
        </p>
        <button
          style={styles.button}
          onClick={() => navigate("/login")}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          🚀 Get Started
        </button>
        <div style={styles.imageContainer}>
          <img
            src="https://t4.ftcdn.net/jpg/06/32/90/79/360_F_632907942_M6CVHD1ivhUrWK1X49PkBlSH3ooNPsog.jpg"
            alt="Doctor"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
