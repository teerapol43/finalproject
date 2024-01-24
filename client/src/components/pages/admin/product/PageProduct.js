import React, { useState, useEffect } from 'react';
import { listProduct, removeProduct } from '../../../functions/product';
import ProductCard from '../../../card/ProductCard';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PageProduct = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData(100);
    }, []);

    const loadData = (count) => {
        setLoading(true);
        listProduct(count)
            .then(res => {
                setLoading(false);
                setProduct(res.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            removeProduct(user.user.token, id)
                .then(res => {
                    loadData(100);
                    console.log(res);
                    toast.success("Product deleted successfully");
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Error deleting product");
                });
        }
    };

    return (
        <div className='col'>
            {loading ? <h1>Loading....</h1> : <h1>Product</h1>}
            <div className='row'>
                {product.map((item) => (
                    <div className='col-md-3 pb-3' key={item._id}>
                        <ProductCard handleRemove={handleRemove} product={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageProduct;
