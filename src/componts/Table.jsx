import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import '../css/table.css';

const Table = () => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/users');
                setData(res.data);
            } catch (err) {
                console.error(err);
                swal("Error", "Failed to fetch users.", "error");
            }
        };
        fetchData();
    }, []);

    // Function to delete a user by ID
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        await axios.delete(`http://localhost:3000/api/users/${id}`);
                        setData(data.filter(user => user._id !== id));  // Remove the deleted user from the state
                        swal("User has been deleted!", {
                            icon: "success",
                        });
                    } catch (err) {
                        console.error('Error deleting user:', err);
                        swal("Error", "Failed to delete user.", "error");
                    }
                } else {
                    swal("User is safe!");
                }
            });
    };

    // Function to open the modal and set the selected user
    const openModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    // Function to handle updating user details
    const handleUpdate = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/api/users/${selectedUser._id}`;

        try {
            await axios.put(url, selectedUser);
            setData(data.map(user => (user._id === selectedUser._id ? selectedUser : user))); // Update user in state
            swal("Success", "User details updated successfully!", "success");
            closeModal();  // Close modal after successful update
        } catch (err) {
            console.error('Error updating user:', err);
            swal("Error", "Failed to update user. Please try again.", "error");
        }
    };

    // Close modal function
    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);  // Reset selected user
    };

    // Close modal on clicking outside of it
    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    };

    // Close modal with Esc key
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);
    return (
        <div className='container mt-5 bg-light p-2 rounded'>
            <h3 className='text-center text-primary'>Crud Data</h3>
            <table className={`container table table-striped table-hover table-bordered ${modalOpen ? 'blur-background' : ''}`}>
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user, i) => (
                            <tr key={user._id}>
                                <th scope="row">{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td className='text-center'><img src={user.uploadImg} alt="" height={50} width={50} style={{ borderRadius: '10%' }} /></td>
                                <td className='d-flex gap-3'>
                                    <button className='btn btn-primary' onClick={() => openModal(user)}>Edit</button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {modalOpen && (
                <div className="modal fade show justify-content-center align-items-center" style={{ display: 'block' }} onClick={handleModalClick}>
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between align-items-center">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="close gap-3 btn btn-danger" onClick={closeModal}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdate}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={selectedUser?.name || ''}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={selectedUser?.email || ''}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="password"
                                            value={selectedUser?.password || ''}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="uploadImg">Image</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="uploadImg"
                                            value={selectedUser?.uploadImg || ''}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, uploadImg: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update User</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Table;
