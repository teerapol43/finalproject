import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../functions/user';
import { updateStatusOrder, getOrdersAdmin } from '../../functions/admin';
import { toast } from 'react-toastify'
const Order = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getOrdersAdmin(user.user.token)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((error) => {
                console.error('Error loading orders:', error);
            });
    };

    const handleChangeStatus = (orderId, orderstatus) => {
        updateStatusOrder(user.user.token, orderId, orderstatus)
            .then(res => {
                console.log(res.data)
                toast.info('Updated ' + res.data.orderstatus + ' Success')
                loadData()
            })
    };

    return (
        <div className='col text-center'>
            <div className='row'>
                <h1>Order </h1>
                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className='cart m-3'>
                            <p>Order by <b>{order.orderBy.username}</b>
                                <br />
                                Status: {order.orderstatus}</p>
                            <select
                                value={order.orderstatus}
                                onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                                className='form form-control'>
                                <option value="Not Process">Not Process</option>
                                <option value="Processing">Processing</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products.map((product, i) => (
                                        <tr key={i}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.count}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3}>ราคาสุทธิ : {" "}<b><u>{order.cartTotal}</u></b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Order;
