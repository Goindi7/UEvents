import React, { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile'; // Import Cloudflare Turnstile
import "./Refferal.css";
import contactImage from '../assets/images/contactu.png'; 

const Contact = () => {
  const [result, setResult] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(""); // Store the Turnstile token

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
    formData.append("captchaToken", captchaToken); // Include Turnstile token in formData

    try {
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
        setCaptchaVerified(false); // Reset captcha verification status
      } else {
        setResult(data.message || "Submission failed.");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("An error occurred during form submission.");
    }
  };

  // Handle CAPTCHA success
  const handleCaptchaSuccess = (token) => {
    console.log("handling success");
    setCaptchaVerified(true);
    setCaptchaToken(token); // Store the token from Cloudflare Turnstile
  };

  // Handle CAPTCHA error
  const handleCaptchaError = () => {
    setCaptchaVerified(false);
    setCaptchaToken(""); // Reset the token on failure
    setResult("CAPTCHA verification failed.");
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

            {/* Cloudflare Turnstile Captcha Component */}
            <Turnstile
              siteKey="0x4AAAAAAAjqz2cXcj3zoprh" // Replace with your actual site key
              onSuccess={handleCaptchaSuccess}
              onError={handleCaptchaError}
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
