import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDeleteProductMutation, useGetProductsQuery } from '../../slices/productSlice';
import { useCreateProductMutation } from '../../slices/productSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/paginate';


const ProductListScreen = () => {
  
  const {pageNumber} = useParams();

  const {data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});  

  console.log("products data" + JSON.stringify(data));

  const [createProduct, {isLoading:loadingCreate}] = useCreateProductMutation();  

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        // eslint-disable-next-line no-undef
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  

  return (
    <div className='mrgnAuto'>
         <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error} </Message>
        
      ) : (
        
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      ) }  
        <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />
    </div>
    
  )
}

export default ProductListScreen
