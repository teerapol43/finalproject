import React from 'react';
import { Card, Descriptions, Tabs, } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProductCard = ({ product }) => {
    const dispatches = useDispatch()
    const { _id, id, name, detail, images, price, sold, category } = product
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
                        <Link to={'/'}>
                            <HeartOutlined className='text-info' /><br />
                            Add to wishlist
                        </Link>,
                        <>
                            <ShoppingCartOutlined
                                onClick={handleAddtoCart}
                                className='text-danger'
                            />
                            <br />
                            Add to cart
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
