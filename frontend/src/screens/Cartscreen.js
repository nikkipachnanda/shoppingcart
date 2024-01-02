import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Message } from '@mui/icons-material';
import { addToCart, removeFromCart } from '../slices/cartSlice';


const Cartscreen = () => {
 
 const navigate = useNavigate();
 const dispatch = useDispatch();  
 const cart = useSelector((state)=>  state.cart);    
 const {cartItems} =   cart;  

 const addToCartHandler =(product, qty)=> 
 {
    dispatch(addToCart({...product, qty}));
 }


 const removeFromCartHandler =(id)=> 
 {
    dispatch(removeFromCart(id));
 }

 const checkOutHandler =() => 
 {
    navigate('/login?redirect=/shipping')
 }

 return (
    <div className='mrgnAuto'>
        <Row>
            <Col md={8}>
                <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
                {cartItems.length ===0 ? (
                    <Message>
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ):(
                    <ListGroup variant='flush'>
                        {cartItems.map((item)=>(
                            <ListGroup key={item._id}>
                                <Row className='cartImgCont'>  
                                    <Col md={2}>
                                      <Image src={item.image} alt={item.name} width={150}></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        <Link to={`/product/${item._id}`}>{item.price}</Link>
                                    </Col>

                                    <Col md={2}>
                                    <Form.Control as='select' value={item.qty} onChange={(e)=> addToCartHandler(item, Number(e.target.value))} >
                                            {[...Array(item.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}> {x+1} </option>
                                            ))}
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button type="button" variant='light' onClick={()=> removeFromCartHandler(item._id)} ><FaTrash/></Button>
                                    </Col>

                                </Row>
                            </ListGroup>
                        ))}                      
                    </ListGroup>
                ) };
            </Col>

            <Col md={4}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>
                        Subtotal({cartItems.reduce((acc, item)=> acc + item.qty, 0)})
                        Items
                    </h2>
                    <h2>
                    ${cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)}
                        Items
                    </h2>
                  </ListGroup.Item>
                  <ListGroup.Item type="button" className='btn-block' disabled={cartItems.length ===0}>
                    <Button onClick={checkOutHandler}>Proceed to checkout</Button>                                
                  </ListGroup.Item>  
                </ListGroup>                                        
            </Col>    
        </Row>
    </div>
  )
}

export default Cartscreen
