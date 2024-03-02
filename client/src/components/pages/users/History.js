import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAddress, getName, getOrders, getPhoneNumber } from '../../functions/user';

import { PDFDownloadLink } from '@react-pdf/renderer';
import Receipt from '../../order/Receipt';

export const History = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState({});
    const [name, setName] = useState({});
    const [address, setAddress] = useState({});
    const [phoneNumber, setPhoneNumber] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        // Set loading state
        setOrders({});
        setName({});
        setAddress({});
        setPhoneNumber({});

        // Fetching orders, address, phone number, and name concurrently
        Promise.all([
            getOrders(user.user.token),
            getAddress(user.user.token),
            getPhoneNumber(user.user.token),
            getName(user.user.token)
        ])
            .then(([ordersRes, addressRes, phoneNumberRes, nameRes]) => {
                console.log("Orders response:", ordersRes.data); // Log orders response
                setOrders(ordersRes.data);
                setName(nameRes.data && typeof nameRes.data === 'object' ? nameRes.data : { name: nameRes.data });
                setAddress(addressRes.data);
                setPhoneNumber(phoneNumberRes.data && typeof phoneNumberRes.data === 'object' ? phoneNumberRes.data : { phoneNumber: phoneNumberRes.data });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                // Handle errors, e.g., set an error state or display an error message
            });
    };


    return (
        <div className='col text-center'>
            <div className='row' style={{ marginTop: '30px' }}>
                <h1>ประวัติการสั่งซื้อ</h1>
                {Object.keys(orders).length === 0 ? (
                    <p>ไม่มีสินค้า</p>
                ) : (
                    Object.keys(orders).map((index) => (
                        <div key={index} className='cart m-3'>
                            <p>สถานะสินค้า: {orders[index].orderstatus}</p>
                            <p>ชื่อ: {orders[index].name}</p>
                            <p>ที่อยู่: {orders && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.houseNumber : orders[index].fulladdress}</p>
                            <p>ตำบล: {orders && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.subdistrict : ''}</p>
                            <p>อำเภอ: {orders && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.district : ''}</p>
                            <p>จังหวัด: {orders && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.province : ''}</p>
                            <p>รหัสไปรษณีย์: {orders && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.zipcode : ''}</p>
                            <p>เบอร์โทร: {orders[index].phoneNumber }</p>
        
                            <table className='table table-bordered' style={{ marginBottom: '50px' }}>
                                <thead>
                                    <tr>
                                        <th>ชื่อ</th>
                                        <th>ราคา</th>
                                        <th>ชิ้น</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders[index].products.map((product, i) => (
                                        <tr key={i}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.count}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3}>ราคาสุทธิ: <b><u>{(orders[index].cartTotal * 1.07).toFixed(2)}</u></b> (รวม VAT 7% แล้ว)</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="row" style={{ marginBottom: '50px' }}>
                                <div className="col">
                                    <PDFDownloadLink
                                        document={<Receipt order={orders[index]} />}
                                        fileName="ใบเสร็จคำสั่งซื้อ.pdf"
                                        className="btn btn-primary m-1"
                                    >
                                        ใบเสร็จคำสั่งซื้อ
                                    </PDFDownloadLink>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div >
    );
};

export default History;