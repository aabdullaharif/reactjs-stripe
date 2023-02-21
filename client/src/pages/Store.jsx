import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { productsArray } from '../storeProducts'

const Store = () => {
  return (
    <>
      <h2 align="center" className='mb-4 pt-4'>Welcome to the store!</h2>
      <div className="wrapper">
        <Row sx={1} md={3}>
            {productsArray.map( product =>(
                <Col key={product.id} align="center">
                    <ProductCard product={product} />
                </Col> 
            ))}
        </Row>
      </div>
    </>
  )
}

export default Store
