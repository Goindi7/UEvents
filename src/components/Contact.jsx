import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import "./Refferal.css";
import contactImage from '../assets/images/contactu.png'; 
<head>
  <script src="https://www.google.com/recaptcha/enterprise.js?render=6LeS-zoqAAAAAG5kZkpVzWoDMGilqYLdUIXR9aux"></script>
</head>

const Contact = () => {
  const [result, setResult] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    // Check if CAPTCHA is verified
    if (!captchaVerified) {
      setResult("Please complete the CAPTCHA.");
      return;
    }

    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "2cb8eca8-e466-4876-9151-f32fdad97da0"); // Your Web3 Forms access key

    // Sending the form data to Web3 Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    // Handling the response
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset(); // Reset the form after successful submission
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  // Handle CAPTCHA verification
  const handleCaptcha = (value) => {
    if (value) {
      setCaptchaVerified(true); // If CAPTCHA is successful, allow form submission
    } else {
      setCaptchaVerified(false);
    }
  };

  return (
    <div className="contact-us-section">
      <div className="colorcon">
        <h2 className="contact-us-title">Contact Us</h2>
        <div className="contact-us-content">
          <form className="contact-us-form" onSubmit={onSubmit}>
            <input type="text" className="contact-us-input" name="name" placeholder="Name" required />
            <input type="email" className="contact-us-input" name="email" placeholder="Email" required />
            <input type="tel" className="contact-us-input" name="phone number" placeholder="Phone Number" required />
            <textarea className="contact-us-textarea" name="message" placeholder="Message" required></textarea>

            {/* Google reCAPTCHA Component */}
            <ReCAPTCHA
              sitekey="6LeS-zoqAAAAAG5kZkpVzWoDMGilqYLdUIXR9aux"  // Replace with your actual site key
              onChange={handleCaptcha}
            />

            {/* Submit button disabled if CAPTCHA is not verified */}
            <button className="contact-us-button" disabled={!captchaVerified}>
              Contact Us
            </button>
          </form>

          {/* Contact image */}
          <div className="contact-us-image">
            <img src={contactImage} alt="Contact Us" />
          </div>
        </div>

        {/* Result message */}
        {result && <p className="result-message">{result}</p>}
      </div>
    </div>
  );
};

export default Contact;
