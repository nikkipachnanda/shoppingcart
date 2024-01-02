import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
// import products from '../Products';
import Product from '../components/Product';
import axios from 'axios';
import { useGetProductsQuery } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/paginate';
import ProductCarousel from '../components/ProductCarousel';

const Homescreen = () => {
  // const [products, setProducts] = useState([]);
   const { pageNumber, keyword } = useParams();
   const {data, isLoading, error} = useGetProductsQuery({ keyword, pageNumber});

  // useEffect(()=> {
  //   const fetchProducts = async()=> 
  //   {
  //     const {data} = await axios.get('/api/products');
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // },[])
  return (
    <>
    {isLoading ? (<h2><Loader/></h2>) : error ? (
    <Message variant='danger'>{error?.data?.message} </Message>
    ) : (   
      <><div className='mrgnAuto'>

      {!keyword ? (
              <ProductCarousel/>
            ) : (
              <Link to='/' className='btn btn-light mb-4'>
                Go Back
              </Link>
            )} 

        <h2>Latest Products</h2>
        <Row>
            {data.products?.map((products)=> (
              <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={products}></Product>
              </Col>     
             ))}
        </Row>

         <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />      

    </div>
    </>
    )}
   
   </>
  )
}

export default Homescreen
