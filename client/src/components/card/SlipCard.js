import React from 'react';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';  // Keep only one import statement for Card
import { Link } from 'react-router-dom';

const { Meta } = Card;

const SlipCard = ({ order, handleRemove }) => {
    const { images } = order;

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img
                className='m-2'
                style={{ height: "150px", objectFit: "cover" }}
                alt="example" src={images && images.length ? images[0].url : ""} />}

        >
        </Card>
    );
}

export default SlipCard;
