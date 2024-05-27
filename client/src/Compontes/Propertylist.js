import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Propertylist.css";
import ContactForm from './ContactForm';
import Bottomcpt from './Bottomcpt';

const Propertylist = () => {
    const [listings, setListings] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:8004/api/listings', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setListings(response.data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:8004/api/listings/listings', {
                params: {
                    location: searchLocation,
                    min_price: minPrice,
                    max_price: maxPrice,
                    property_type: propertyType
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setListings(response.data.listings);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async (listingId) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                navigate('/login');
                return;
            }

            // Fetch the details of the listing to be updated
            const response = await axios.get(`http://localhost:8004/api/listings/listing/${listingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle updating the listing using the fetched data
            // You can show a modal or navigate to a different route to display the update form
            console.log('Listing to be updated:', response.data);

            // Example: Navigate to a route where the update form is displayed
            navigate(`/update-listing/${listingId}`);
        } catch (error) {
            console.error('Error updating listing:', error);
            setError(error.message);
        }
    };

    return (
        <div className="property-list">
        

            <div className="property-cards">
                {listings.map(listing => (
                    <div key={listing._id} className="property-card">
                        <img src={`http://localhost:8004/profile/${listing.image}`} alt="Property" className="property-image" />
                        <div className="property-details">
                            <h2>{listing.location}</h2>
                            <p><strong>Price Range:</strong> {listing.price_range}</p>
                            <p><strong>Description:</strong> {listing.description}</p>
                            <p><strong>Property Type:</strong> {listing.property_type}</p>
                            <p><strong>Amenities:</strong> {listing.amenities.join(', ')}</p>
                            
                            {/* Button to trigger the update process */}
                            <button onClick={() => handleUpdate(listing._id)}>Update</button>
                        </div>
                    </div>
                ))}
            </div>
            <Bottomcpt/>
        </div>
    );
};

export default Propertylist;






