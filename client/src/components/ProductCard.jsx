import React, { useContext } from 'react';
import { Card, Button, Form, Row, Col} from 'react-bootstrap';
import { CartContext } from '../CartContext'
 
const ProductCard = ({product}) => {

  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);  

  return (
    <Card>
    <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {productQuantity > 0 ?
            <>
                <Form as={Row}>
                    <Form.Label sm="6" column="true">In Cart: {productQuantity}</Form.Label>
                    <Col sm="6">
                        <Button variant='warning' sm="6" onClick={()=> cart.addOneToCart(product.id)} className='mx-2'>+</Button>
                        <Button variant='warning' sm="6" onClick={()=> cart.removeOneFromCart(product.id)} className='mx-2'>-</Button>
                    </Col>
                    <Button sm="6" className='my-3' variant='danger' onClick={()=> cart.deleteFromCart(product.id)}>Remove from Cart</Button>
                </Form>
            </>
        :
            <Button variant='warning' onClick={()=> cart.addOneToCart(product.id)} >Add To Cart</Button>
        }
    </Card.Body>
    </Card>
  )
}

export default ProductCard
