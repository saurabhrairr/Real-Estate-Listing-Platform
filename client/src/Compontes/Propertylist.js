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

    return (
        <div className="property-list">
            {/* <h1>Property Listings</h1> */}

            <nav className="navbar navbar-light bg-light">
    <form onSubmit={handleSearch}>
        <div className="form-group">
            <input 
                className="form-control mr-sm-2" 
                type="search" 
                placeholder="Location" 
                aria-label="Search Location"
                value={searchLocation} 
                onChange={(e) => setSearchLocation(e.target.value)} 
            />
        </div>
        <div className="form-group">
            <input 
                className="form-control mr-sm-2" 
                type="search" 
                placeholder="Min Price" 
                aria-label="Search Min Price"
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)} 
            />
        </div>
        <div className="form-group">
            <input 
                className="form-control mr-sm-2" 
                type="search" 
                placeholder="Max Price" 
                aria-label="Search Max Price"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)} 
            />
        </div>
        <div className="form-group">
            <input 
                className="form-control mr-sm-2" 
                type="search" 
                placeholder="Property Type" 
                aria-label="Search Property Type"
                value={propertyType} 
                onChange={(e) => setPropertyType(e.target.value)} 
            />
        </div>
        <button 
            className="btn btn-outline-success my-2 my-sm-0" 
            type="submit"
        >
            Search
        </button>
    </form>
</nav>

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
            <Bottomcpt/>
        </div>
    );
};

export default Propertylist;
