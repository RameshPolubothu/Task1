import React from 'react';
import './Page.css'
const Pagination = (props) => {
    const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);
    const goToNextPage = () => {
        if(props.currentPage !== nPages) 
            setCurrentPage(props.currentPage + 1)
    }
    const goToPrevPage = () => {
        if(props.currentPage !== 1) 
            props.setCurrentPage(props.currentPage - 1)
    }
    return (
        <div>
            <nav className="navbar">
            <ul className="navbar-center">
                <li className="page-item"> {/* Previous page button */}
                    <a className="page-link" 
                        onClick={goToPrevPage}  // Click event handler for navigating to previous page
                        href='#'>
                        Previous
                    </a>
                </li>
                 {/* Mapping through each page number */}
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${props.currentPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => props.setCurrentPage(pgNumber)}  // Click event handler for setting the current page
                            className='page-link' 
                            href='#'> 
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item"> {/* Next page button */}
                    <a className="page-link" 
                        onClick={goToNextPage} // Click event handler for navigating to next page
                        href='#'>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
        </div>
    );
}

export default Pagination;
