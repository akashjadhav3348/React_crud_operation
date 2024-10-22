import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import '../css/Form.css';


const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const setValues = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const registerUser = (e) => {
        e.preventDefault();
        const form = e.target;

        // Check form validity
        if (form.checkValidity() === false) {
            e.stopPropagation();
            swal("Error", "Please fill out all required fields correctly.", "error");
            return;
        }

        const url = 'http://localhost:3000/api/users';

        // Validate password length
        if (formData.password.length < 6) {
            swal("Error", "Password must be at least 6 characters long", "error");
            return;
        }

        // Submit user registration
        axios.post(url, formData)
            .then(res => {
                if (res.status === 201) {
                    swal("Success", `User ${res.data.user.name} Registered successfully!`, "success");
                }
                // Reset form data after successful submission
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    uploadImg: ''

                });
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.message) {
                    // Use the server error message if available
                    swal("Error", err.response.data.message, "error");
                } else {
                    // Fallback error message
                    swal("Error", "Something went wrong. Please try again later.", "error");
                }
            });

        form.classList.add('was-validated');
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card p-4 shadow-lg">
                    <h2 className="mb-4 text-center">User Registration</h2>
                    <form id="userForm" onSubmit={registerUser} className='needs-validation' noValidate>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                onChange={setValues}
                                value={formData.name}
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter your name.
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                onChange={setValues}
                                value={formData.email}
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter a valid email address.
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                onChange={setValues}
                                value={formData.password}
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter a password with at least 6 characters.
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="uploadImg" className="form-label">Upload Image</label>
                            <input
                                type="text"
                                className="form-control"
                                name="uploadImg"
                                id="uploadImg"
                                placeholder='Upload Image'
                                onChange={setValues}
                                value={formData.uploadImg}
                                required
                            />
                            <div className="invalid-feedback">
                                Upload Image
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 my-3">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;
