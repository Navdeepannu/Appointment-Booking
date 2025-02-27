const About = () => {
  const styles = {
    aboutPage: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
    },
    heading: {
      color: '#2c3e50',
      marginBottom: '20px',
    },
    paragraph: {
      marginBottom: '15px',
      fontSize: '16px',
    },
    list: {
      listStyleType: 'disc',
      marginLeft: '20px',
      marginBottom: '15px',
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.aboutPage}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to <strong>HealthCare Plus</strong>, your trusted partner in health and wellness. 
        We are dedicated to providing high-quality medical care and personalized services to our patients.
      </p>

      <h2 style={styles.heading}>Our Mission</h2>
      <p style={styles.paragraph}>
        Our mission is to improve the health and well-being of our community by offering accessible, 
        compassionate, and comprehensive healthcare services.
      </p>

      <h2 style={styles.heading}>Our Team</h2>
      <p style={styles.paragraph}>
        Our team of experienced doctors, nurses, and healthcare professionals is committed to delivering 
        exceptional care. We use the latest medical technologies and treatments to ensure the best outcomes 
        for our patients.
      </p>

      <h2 style={styles.heading}>Why Choose Us?</h2>
      <ul style={styles.list}>
        <li>Experienced and certified medical professionals</li>
        <li>State-of-the-art facilities and equipment</li>
        <li>Personalized care tailored to your needs</li>
        <li>Convenient appointment scheduling</li>
      </ul>

      <h2 style={styles.heading}>Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions or would like to schedule an appointment, please feel free to 
        <a href="/contact" style={styles.link}>contact us</a>. We look forward to serving you!
      </p>
    </div>
  );
};

export default About;