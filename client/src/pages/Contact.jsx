const Contact = () => {
  const styles = {
    contactPage: {
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
    formGroup: {
      marginBottom: '15px',
    }, 
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      resize: 'vertical',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#2980b9',
    },
  };

  return (
    <div style={styles.contactPage}>
      <h1 style={styles.heading}>Contact Us</h1>
      <p style={styles.paragraph}>
        We are here to help! If you have any questions, concerns, or would like to schedule an appointment, 
        please reach out to us using the information below.
      </p>

      <h2 style={styles.heading}>Our Location</h2>
      <p style={styles.paragraph}>
        <strong>HealthCare Plus</strong><br />
        123 Wellness Street<br />
        Cityville, State 12345<br />
        Country
      </p>

      <h2 style={styles.heading}>Contact Information</h2>
      <ul style={{ ...styles.paragraph, listStyleType: 'disc', marginLeft: '20px' }}>
        <li><strong>Phone:</strong> +1 (123) 456-7890</li>
        <li><strong>Email:</strong> info@healthcareplus.com</li>
        <li><strong>Fax:</strong> +1 (123) 456-7891</li>
      </ul>

      <h2 style={styles.heading}>Office Hours</h2>
      <p style={styles.paragraph}>
        <strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM<br />
        <strong>Saturday:</strong> 9:00 AM - 4:00 PM<br />
        <strong>Sunday:</strong> Closed
      </p>

      <h2 style={styles.heading}>Send Us a Message</h2>
      <form>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input type="text" id="name" name="name" style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input type="email" id="email" name="email" style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message:</label>
          <textarea id="message" name="message" rows="5" style={styles.textarea} required></textarea>
        </div>
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;