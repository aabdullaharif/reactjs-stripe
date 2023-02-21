import React,{useContext} from 'react';
import { Button, Navbar, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { CartContext } from '../CartContext'
import CartProduct from './CartProduct';

const NavbarComponent = () => {

  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const productsCount = cart.items.reduce((sum, product)=> sum + product.quantity, 0);

  const checkout = async () => {
    await fetch('http://localhost:5000/checkout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); 
            }
        });
    }

  
  return (
    <>
        <Navbar expand="sm">
            <Navbar.Brand href="/">Shopping Cart</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
                <Button onClick={handleShow} variant='warning'>Cart ({productsCount}{productsCount > 1 ? ' Items' : ' Item'})</Button>
            </Navbar.Collapse>
        </Navbar>
        <Modal show={show} onHide={handleHide} >
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Title align="center" className='p-3'>
                {productsCount>0?
                    <>
                        <p>Items in your Cart</p>
                        {cart.items.map((item, idx) =>( 
                            <CartProduct key={idx} item={item} />
                        ))}

                        <h2>Total Cost: {cart.getTotalCost().toFixed(2)}</h2>
                        <Button variant="success" onClick={checkout}>Purchase Items</Button>
                    </>
                : <strong>There are no items in the cart!</strong>}
            </Modal.Title>
        </Modal>
    </>    
  )
}

export default NavbarComponent
