import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Slider, Switch } from 'antd';
//function
import { listProduct, searchFilters } from '../../functions/product'
import NewProductCard from '../card/NewProductCard'

const Shop = () => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false)
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search

    //load All Data
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        listProduct(12)
            .then((res) => {
                setProduct(res.data)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }
    //load text
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchDataFilter({ query: text })
            if (!text) {
                loadData()
            }
        }, 300)
        return () => clearTimeout(delay)
    }, [text])
    const fetchDataFilter = (arg) => {
        searchFilters(arg)
            .then((res) => {
                setProduct(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    // load slider
    useEffect(() => {
        fetchDataFilter({ price })
    }, [ok])
    const handlePrice = (value) => {
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)

    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        Filter / Search
                        <hr />
                        <h4>ค้นหาด้วยราคาสินค้า</h4>
                        <Slider
                            value={price}
                            onChange={handlePrice}
                            range max={100000} />
                    </div>
                    <div className='col-md-9'>
                        {loading
                            ? <h4 className='text-danger'>Loading....</h4>
                            : <h4 className='text-info'>Product</h4>
                        }

                        {product.length < 1 && <p>No Product found</p>}

                        <div className='row pb-5'>
                            {product.map((item, index) =>
                                <div key={index} className='col-md-4 mt-3'>
                                    <NewProductCard product={item} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop