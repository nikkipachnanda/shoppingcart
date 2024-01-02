import React from 'react'
import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';

const Header = () => {

  const {cartItems} = useSelector((state)=> state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  console.log("userinfo" + JSON.stringify(userInfo));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async ()=> {
    try {
       await logoutApiCall().unwrap();
       dispatch(logout());
       navigate('/login');
     } catch (error) {

     }
   }


  return (
    <div>
     <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to="/" > <span style={{color:"#fff"}}>ProShop</span></Link>
          {/* <Navbar.Brand href='/'></Navbar.Brand> */}
       
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            <SearchBox />
              
                <FaShoppingCart />  
                {
                  cartItems?.length > 0 ? (
                    <span>
                    <Nav.Link href='/cart'>
                      Cart
                    <Badge pill='success' style={{'margin-left':'5px'}}>
                      {cartItems.reduce((a,c)=> a + c.qty, 0)}
                    </Badge>
                    </Nav.Link>
                    </span>
                  ):(
                    <span className='wClr'>Cart</span>  
                  )
                }
             
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

               {/* Admin Links */}
               {userInfo && userInfo?.isAdmin && (
                <>
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </div>
  )
}

export default Header
