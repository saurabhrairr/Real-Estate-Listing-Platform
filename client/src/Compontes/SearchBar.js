import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Propertylist.css";

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

    return (
        <div className="property-list">
            <h1>Property Listings</h1>

            <div className="search-form">
                <h2>Search Listings</h2>
                <form onSubmit={handleSearch}>
                    <label>Location:</label>
                    <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />

                    <label>Min Price:</label>
                    <input type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />

                    <label>Max Price:</label>
                    <input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

                    <label>Property Type:</label>
                    <input type="text" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} />

                    <button type="submit">Search</button>
                </form>
            </div>

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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Propertylist;
