import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateListingForm = ({ id }) => {
    const [formData, setFormData] = useState({
        location: '',
        price_range: '',
        property_type: '',
        description: '',
        image: '',
        amenities: []
    });

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://localhost:8004/api/listings/listing/${id}`);
                const { data } = response;
                setFormData(data);
            } catch (error) {
                console.error('Error fetching listing:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch listing. Please try again later.',
                });
            }
        };

        fetchListing();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.put(`http://localhost:8004/api/listings/listing/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Listing updated successfully!',
            });
        } catch (error) {
            console.error('Error updating listing:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update listing. Please try again later.',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="price_range">Price Range:</label>
                <input
                    type="text"
                    id="price_range"
                    name="price_range"
                    value={formData.price_range}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="property_type">Property Type:</label>
                <input
                    type="text"
                    id="property_type"
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="amenities">Amenities:</label>
                <input
                    type="text"
                    id="amenities"
                    name="amenities"
                    value={formData.amenities.join(', ')}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value.split(', ') })}
                    required
                />
            </div>
            <button type="submit">Update Listing</button>
        </form>
    );
};

export default UpdateListingForm;
