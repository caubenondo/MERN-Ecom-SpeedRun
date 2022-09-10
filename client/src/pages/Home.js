import React, {useState,useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'

// mock products - replace with backend
// import products from '../products-mock'
// temporary fetch with express
import axios from 'axios'

function Home() {
    // set Global State for PRODUCTS
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async()=>{
            const {data} = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    },[])
  return (
    <>
        <h1>Lastest Product</h1>
        <Row>
            {products.map((product =>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}>

                    </Product>
                </Col>
            )))}
        </Row>
    </>
  )
}

export default Home