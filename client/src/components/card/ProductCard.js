import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const ProductCard = ({ data }) => {
    console.log(data)
    return (
        <Card
            style={{
                width: 300,
                height: 400
            }}
            cover={
                <img
                    alt="example"
                    src={'http://localhost:5000/uploads/' + data.file}
                    style={{ width: '100%', height: 200 }}
                />
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                title={data.name}
                description={data.detail + " ราคา " + data.price}
            />
        </Card>
    );
}

export default ProductCard