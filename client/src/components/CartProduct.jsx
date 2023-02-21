import React,{useContext}  from 'react';
import { Button, Table } from 'react-bootstrap'
import { CartContext } from '../CartContext';
import { getProductData } from '../storeProducts';

const CartProduct = ({item}) => {

  const id = item.id;
  const quantity = item.quantity;  
  const cart = useContext(CartContext);
  const productData = getProductData(id);
  console.log(productData)

  return (
    <>
        <Table className='table-wrapper' striped bordered hover>
            <thead>
                <tr style={{fontSize: '14px'}}>
                    <th>Item Name</th>
                    <th>Item Quantity</th>
                    <th>Item Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr style={{fontSize: '14px'}}>
                    <td>{productData.title}</td>
                    <td>{quantity}</td>
                    <td>${ (quantity * productData.price).toFixed(2)}</td>
                    <td>
                        <Button className='my-3' sm="6" variant='danger' onClick={()=>cart.deleteFromCart(id)}>Remove</Button>
                    </td>
                </tr> 
            </tbody>
        </Table>
    </>
  )
}

export default CartProduct