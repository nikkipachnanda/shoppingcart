import { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory ,useLocation, useParams } from 'react-router-dom';


const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    const pathname = window.location.pathname;
    const { key } = useParams();

    useEffect(() => {
        // Accessing the current URL
        const currentUrl = window.location.href;
        console.log('Current URL:', currentUrl);
    
        // Accessing specific parts of the URL
        const pathname = window.location.pathname;
        const searchParams = window.location.search;
        const hash = window.location.hash;
    
        console.log('Pathname:', pathname);
        console.log('Search Params:', searchParams);
        console.log('Hash:', hash);
      }, []);


    return (
    pages > 1 && (
        
      <Pagination>
        {pathname.includes("productlist") ? (<h1>

            {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                // eslint-disable-next-line no-useless-concat
                : `/admin/productlist/${x + 1}`
                
            }
          >
            <Pagination.Item active={x + 1 === page}>{x +1}</Pagination.Item>
          </LinkContainer>
        ))}  

        </h1>):(<h2>
            
            
            {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                // eslint-disable-next-line no-useless-concat
                : `/admin/orderlist/${x + 1}`
                
            }
          >
            <Pagination.Item active={x + 1 === page}>{x +1}</Pagination.Item>
          </LinkContainer>
        ))}  



        </h2>)};

     
      </Pagination>
    )
  );
};

export default Paginate;