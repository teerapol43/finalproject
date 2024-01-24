import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getOrders } from '../../functions/user'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});
export const History = () => {

    const { user } = useSelector((state) => ({ ...state }))
    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getOrders(user.user.token)
            .then((res) => {
                setOrders(res.data)
            })
    }

    return (
        <div className='col text-center'>
            <div className='row'>
                <h1>Order History</h1>
                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className='cart m-3'>
                            <p>Order Status: {order.orderstatus}</p>
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
                                        <td colSpan={3}>ราคาสุทธิ:<b><u>{order.cartTotal}</u></b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default History
