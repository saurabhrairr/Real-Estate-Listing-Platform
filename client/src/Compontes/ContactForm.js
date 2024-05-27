import React, { useState } from 'react';
import axios from 'axios';
import '../css/ContactForm.css';
import bigCityImage from '../assest/big-city.jpg'; 
import Swal from 'sweetalert2';
const ContactForm = () => {
    const [formData, setFormData] = useState({
        propertype: '',
        name: '',
        emailid: '',
        message: '',
        contact: ''
    });
    const [loading, setLoading] = useState(false); // State variable for loading state
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post('http://localhost:8004/api/listings/Contacts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage(response.data.message);
            setFormData({
                propertype: '',
                name: '',
                emailid: '',
                message: '',
                contact: ''
            });
            // Show success message using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });
        } catch (error) {
            setErrorMessage('Failed to submit contact form. Please try again later.');
            console.error('Error submitting contact form:', error);
            // Show error message using SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to submit contact form. Please try again later.',
            });
        }
        setLoading(false); // Set loading state to false after submission
    };
    return (
        <div className="contact-form-container" style={{ backgroundImage: `url(${bigCityImage})` }}>
      
            <h2>Contact Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="propertype">Property Type:</label>
                    <input
                        type="text"
                        id="propertype"
                        name="propertype"
                        value={formData.propertype}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="emailid">Email:</label>
                    <input
                        type="email"
                        id="emailid"
                        name="emailid"
                        value={formData.emailid}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact Number:</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Additional Elements */}
            <div className="additional-elements">
                <h3>Follow Us</h3>
                <div className="social-media-icons">
                    {/* Add social media icons here */}
                </div>
                <h3>Contact Information</h3>
                <p>Email: example@example.com</p>
                <p>Phone: +1234567890</p>
                <p>Office Address: 123 Main Street, City, Country</p>
            </div>
        </div>
    );
};

export default ContactForm;


