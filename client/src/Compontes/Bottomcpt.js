import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Bottomcpt.css';
import ContactForm from './ContactForm';

function Bottomcpt() {
  return (
    <>
      <div className="footerbox">
        <div className="footercontainer">
          <p>
            We strive to reach the individuals goals as <br />
            well as the practitioners goals of <br />
            effectiveness in treatment and efficacy of <br />
            care
          </p>
        </div>
        <div className="footercontainer grey-background">
          <h1>Office</h1>
          <p>
            123 Fake Streetc.<br />
            Suite 101, 15th Floor<br />
            New York, NY 10019<br />
            rsaurabh@gmail.com<br />
          </p>

          <h1>Hours</h1>
          <p>Monday - Friday</p>
          <p>800am - 5:00pm</p>
          <p>Saturday by Appointment</p>

          <h1>Phone</h1>
          <p>8369322308</p>
        </div>
        <div className="footerinputcontainer">
          <p>
            you should specific properties <br />
            so click here and submit your all detail
          </p>
          <button className="contact-button">
            <Link to="/ContactForm" className="contact-link">Contact Us</Link>
          </button>
        </div>
      </div>
      <div className="footertag">
        <p>
          © 2023 - 2025 RealEstate.com. All Rights Reserved.
        </p>
      </div>
    </>
  );
}

export default Bottomcpt;
