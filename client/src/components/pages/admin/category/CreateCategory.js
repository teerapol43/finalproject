import React, { useState, useEffect } from 'react';
import { createCategory, listCategory, deleteCategory } from '../../../../functions/Category';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState({
        name: '',
    });
    const [category, setCategory] = useState([]);

    useEffect(() => {
        loadData(user.user.token);
    }, []);

    const loadData = (authtoken) => {
        listCategory(authtoken)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => console.log(err));
    };

    const handleRemove = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (confirmDelete) {
            deleteCategory(user.user.token, id)
                .then((res) => {
                    console.log(res);
                    loadData(user.user.token);
                    toast.success('Category deleted successfully');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Error deleting category');
                });
        }
    };

    const handleChangeCategory = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(user.user.token, values)
            .then((res) => {
                loadData(user.user.token);
                toast.success('Category created successfully');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error creating category');
            });
    };

    return (
        <div className="col">
            <h1>CreateCategory</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>เพิ่มหมวดหมู่สินค้า</label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChangeCategory}
                        className="form-control"
                    />
                    <button className="btn btn-outline-primary"> เพิ่ม</button>
                </div>
            </form>
            <hr />
            <ul className="list-group">
                {category.map((item) => (
                    <li key={item.id} className="list-group-item ">
                        {item.name}
                        <span
                            style={{ float: 'right' }}
                            className="badge bg-primary rounded-pill"
                            onClick={() => handleRemove(item._id)}
                        >
                            X
                        </span>
                        <span style={{ float: 'right' }} className="badge bg-primary rounded-pill">
                            <Link to={`/admin/update-category/${item._id}`}>Edit</Link>
                        </span>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default CreateCategory;
