import React, { useState, useEffect } from 'react';
import { getUserCart, saveAddress, saveOrder, emptyCart, getAddress } from '../functions/user';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const CheckOut = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("")
    const [addressSaved, setAddressSaved] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getUserCart(user.user.token)
            .then(res => {
                console.log(res.data);
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            })
        getAddress(user.user.token)
            .then(res => {
                if (res.data) {
                    setAddress(res.data.address);
                    setAddressSaved(true);
                }
                console.log(address)
            });
    }, []);
    const handleSaveAddress = () => {
        console.log(address)
        saveAddress(user.user.token, address)
            .then(res => {
                console.log(res.data)
                if (res.data.ok) {
                    toast.success('Address Saved')
                    setAddressSaved(true)
                }
            })
    }
    const handleCreateOrder = (id) => {
        saveOrder(user.user.token)
            .then(res => {
                console.log()
                emptyCart(user.user.token)
                dispatch({
                    type: 'addToCart',
                    payload: []
                })
                if (typeof window !== "undefined") {
                    localStorage.removeItem("cart");
                }

                toast.success("Save Order Success");
                navigate('/user/history')
            })
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-md-6">
                    <h4>Address</h4>
                    <br />
                    {address ? (
                        <div>{address}</div>
                    ) : (
                        <>
                            <ReactQuill value={address} onChange={setAddress} />
                            <button
                                className='btn btn-primary mt-2'
                                onClick={handleSaveAddress}>Save Address</button>
                        </>
                    )}
                </div>
                <div className="col-md-6">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products: {products.length}</p>
                    <hr />
                    <p>List of Products:</p>
                    {products.map((item, i) =>
                        <div key={i}>
                            <p>
                                {item.name} x {item.count} = {item.price * item.count}
                            </p>
                        </div>
                    )}
                    <hr />
                    Total:<b> {total}</b>
                    <br />
                    <button
                        onClick={handleCreateOrder}
                        disabled={!addressSaved || !products.length}
                        className='btn btn-primary mt-3'>Check Out</button>
                </div>
            </div>
        </div >
    );
};

export default CheckOut;
