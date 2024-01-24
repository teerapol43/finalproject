import React from 'react';
import { Card, Descriptions, Tabs, } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
import { addToWishList } from '../functions/user';
import { toast } from 'react-toastify';
const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProductCard = ({ product }) => {
    const dispatches = useDispatch()
    const { _id, id, name, detail, images, price, sold, category } = product
    const { user } = useSelector((state) => ({ ...state }));
    const handleAddtoCart = () => {
        let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...product,
            count: 1
        })
        let unique = _.uniqWith(cart, _.isEqual)
        localStorage.setItem("cart", JSON.stringify(unique))
        dispatches({
            type: "ADD_TO_CART",
            payload: unique
        })
    }
    const handleAddtoWishList = (e) => {
        if (user) {
            addToWishList(user.user.token, _id)
                .then(res => {
                    console.log(res.data)
                    toast.success('Add to wishlist Success')
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            toast.error('Go to Login')
        }
    }
    return (
        <>
            <div className='col-md-4'>
                <Carousel autoPlay showArrows={true} infiniteLoop>
                    {images && images.map(item => <img src={item.url} alt={name} key={item.public_id} />)}
                </Carousel>

                <Tabs>
                    <TabPane tab="Description" key="1">
                        {detail}
                    </TabPane>
                    <TabPane tab="More..." key="2">
                        More...
                    </TabPane>
                </Tabs>
            </div>
            <div className='col-md-5'>
                <h1 className='bg-info p-3'>{name}</h1>
                <Card
                    actions={[
                        <a onClick={handleAddtoWishList}>
                            <HeartOutlined className='text-info' /><br />
                            Add to wishlist
                        </a>,
                        <>
                            <a onClick={handleAddtoCart}>
                                <ShoppingCartOutlined
                                    className='text-danger'
                                />
                                <br />
                                Add to cart
                            </a>
                        </>

                    ]}
                >
                    <ul class="list-group">
                        <li class="list-group-item">
                            Price
                            <span className='float-end'>{price}</span>
                        </li>
                        <li class="list-group-item">
                            Detail
                            <span className='float-end'>{detail}</span>
                        </li>
                        <li class="list-group-item">
                            Sold
                            <span className='float-end'>{sold}</span>
                        </li>
                        {category &&

                            <li class="list-group-item">
                                Category
                                <span className='float-end'>{category.name}</span>
                            </li>
                        }
                    </ul>
                </Card>
            </div>
        </>
    )
}

export default SingleProductCard;
