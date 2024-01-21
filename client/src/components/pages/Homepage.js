import React from 'react'
import NewProduct from '../home/NewProduct'
import BastSeller from '../home/BastSeller'


const Homepage = () => {
    return (
        <>
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>New Product</h4>
            <NewProduct />
            {/*New Product*/}
            {/*Best Seller*/}
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>Bast Seller</h4>
            <BastSeller />

        </>
    )
}

export default Homepage