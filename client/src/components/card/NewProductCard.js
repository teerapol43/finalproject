import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const NewProductCard = ({ product }) => {
    const { _id, id, name, detail, images } = product
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img
                className='P-1'
                style={{ height: "150px", objectFit: "cover" }}
                alt="example" src={images && images.length
                    ? images[0].url
                    : ""
                } />}
            actions={[
                <Link to={'/product/' + _id}>
                    < EyeOutlined className='text-warning' />
                </Link>
                ,
                <ShoppingCartOutlined
                    //onClick={() => handleRemove(_id)}
                    className='text-danger' />,

            ]}
        >
            <Meta title={name} description={detail} />
        </Card>
    );
}

export default NewProductCard