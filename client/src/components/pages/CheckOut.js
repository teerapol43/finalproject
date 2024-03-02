import React, { useState, useEffect } from 'react';
import { getUserCart, saveOrder, emptyCart } from '../functions/user';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../address/AddressForm';
import axios from 'axios';
import './CheckOut.css';
import SlipUpload from './SlipUpload';
import QRCode from 'qrcode.react';
import styled from 'styled-components';

// Checkout
const Checkout = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [subdistrict, setSubDistrict] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [fullAddress, setFullAddress] = useState({});
    const [forOthers, setForOthers] = useState(false);
    const [sliptFile, setSliptFile] = useState(null);

    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [addressSaved, setAddressSaved] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Move initialstate declaration before its usage
    const initialstate = {
         images: [],
    fullAddress: {
        houseNumber: "",
        subdistrict: "",
        district: "",
        province: "",
        zipcode: "",
    },
    name: "",
    phoneNumber: "",
    };

    const [values, setValues] = useState(initialstate);
    const [loading, setLoading] = useState(false);

    const onNext = async (e) => {
        e.preventDefault();

        if (!houseNumber || !subdistrict || !district || !province || !zipcode) {
            setError("กรอกข้อมูลไม่ครบ");
            return;
        }

        if (page === 0) {
            setPage(page + 1);
        } else {
            try {
                // Save order
                await saveOrder(user.user.token, {
                    ...values,
                    fulladdress: {
                        houseNumber,
                        subdistrict,
                        district,
                        province,
                        zipcode,
                    },
                });
                
                emptyCart(user.user.token);
                dispatch({
                    type: 'addToCart',
                    payload: [],
                });
                if (typeof window !== "undefined") {
                    localStorage.removeItem("cart");
                }
                toast.success("Save Order Success");

                // Removed the calls to saveAddress, savePhoneNumber, and saveName

                // Set values including fullAddress, name, and phoneNumber
                // Upload slip image to Cloudinary

                // Redirect to the history page
                navigate('/user/history');
            } catch (error) {
                console.error('Error during checkout:', error);
                toast.error('Error during checkout. Please try again.');
            }
        }
    };
    
    
    console.log("values",values)
    useEffect(() => {
        getUserCart(user.user.token)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            });
    }, [user.user.token]);

    function onSelect(fulladdress) {
        const { subdistrict, district, province, zipcode } = fulladdress;
        setSubDistrict(subdistrict);
        setDistrict(district);
        setProvince(province);
        setZipcode(zipcode);
        setFullAddress({ houseNumber, subdistrict, district, province, zipcode });
        setError("");
        console.log("some fulladdress: ", fullAddress);
        setValues({
            ...values,
            fullAddress: {
                houseNumber,
                subdistrict,
                district,
                province,
                zipcode,
            },
            name,
        phoneNumber,
        });

    }

    // Payment
    const generatePayload = require('promptpay-qr');
    const Title = styled.h1`
        font-size: 3em;
        text-align: center;
        color: palevioletred;
        margin-bottom: 20px;
    `;

    const Container = styled.div`
        max-height: 100vh;
        padding: 4em;
        background: papayawhip;
    `;

    const FlexContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    `;

    const QRWrapper = styled.div`
        margin: auto;
        text-align: center;
        padding: 20px;
        background-color: white;
        border: 2px solid palevioletred;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    `;

    const InputWrapper = styled.div`
        margin: auto;
        text-align: center;
        padding: 20px;
    `;

    const [qrCode, setQRCode] = useState("");
    const [promptpay, setPromptPay] = useState("062-671-8672");

    useEffect(() => {
        handleQR();
    }, []);

    function handleQR() {
        setQRCode(generatePayload(promptpay, { total: total.toFixed(2) }));
    }

    return (
        <div className='container-fluid'>
            <div className='row' style={{ margin: '50px' }}>
                <div className="col-md-6">
                    <div className="checkout-container">
                        <div className="checkout-section">
                            <div className="checkout-content">
                                <div className="checkout-header">
                                    <div
                                        className={`header-tab ${page === 0 ? 'active' : ''}`}
                                    >
                                        กรอกที่อยู่
                                    </div>
                                    <div
                                        className={`header-tab ${page === 1 ? 'active' : ''}`}
                                    >
                                        ชำระค่าสินค้า
                                    </div>
                                </div>
                                {error && (
                                    <div className="error-message">{error}</div>
                                )}
                                {page === 0 ? (
                                    <AddressForm
                                        name={name}
                                        setName={setName}
                                        phone={phoneNumber}
                                        setPhone={setPhoneNumber}
                                        setError={setError}
                                        houseNumber={houseNumber}
                                        setHouseNumber={setHouseNumber}
                                        subdistrict={subdistrict}
                                        setSubDistrict={setSubDistrict}
                                        district={district}
                                        setDistrict={setDistrict}
                                        province={province}
                                        setProvince={setProvince}
                                        zipcode={zipcode}
                                        setZipcode={setZipcode}
                                        fullAddress={fullAddress}
                                        setFullAddress={setFullAddress}
                                        onSelect={onSelect}
                                        setForOthers={setForOthers}
                                        forOthers={forOthers}
                                    />
                                ) : (
                                    <div className="payment-section">
                                        <Container>
                                            <Title>ชำระเงินที่นี้</Title>
                                            <FlexContainer>
                                                <QRWrapper>
                                                    <QRCode value={qrCode} />
                                                    <InputWrapper>
                                                        <p>ชื่อบัญชี อาทิตยา ฆารเลิศ</p>
                                                        <p>โปรดตรวจสอบจำนวนเงินให้ถูกต้องก่อนทำรายการ จำนวนเงิน {total} บาท</p>
                                                    </InputWrapper>
                                                </QRWrapper>
                                            </FlexContainer>
                                        </Container>
                                        <p id='image-preview'></p>
                                        <div className="upload-slip-section">
                                            <label htmlFor="slipt" className="upload-slip-btn">
                                                {sliptFile ? (
                                                    <span className="image-preview" />
                                                ) : (
                                                    <div className="upload-slip-text">
                                                        อัพโหลดสลิป
                                                        <SlipUpload values={values} setValues={setValues} loading={loading} setLoading={setLoading} />
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className="payment-button"
                                    onClick={onNext}
                                >
                                    ชำระเงิน
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" style={{ marginTop: '35px', fontSize: '20px' }}>
                    <h4>ข้อมูลสินค้าทั้งหมด</h4>
                    <hr />
                    <p>จำนวนสินค้า: {products.length} ชิ้น</p>
                    <hr />
                    <p>รายการสินค้า</p>
                    {products.map((item, i) => (
                        <div key={i}>
                            <p>
                                {item.name} x {item.count} = {item.price * item.count}
                            </p>
                        </div>
                    ))}
                    <hr />
                    ราคาสุทธิ: <b>{total}</b> บาท
                    <br />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Checkout;