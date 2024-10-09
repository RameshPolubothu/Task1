import React, { useState, useEffect } from 'react';
import './Gifs.css'
import Pagination from './Pagination';
const Gifs = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(20);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    let nPages = 0;
    let currentRecords;
    if(data != null) {
        currentRecords = data?.slice(indexOfFirstRecord,indexOfLastRecord);
        nPages = Math.ceil(data.length / recordsPerPage)
    }
    useEffect(() => {
        if (query) {
            fetchData();
        }
        else{
            setData(null);
        }
    }, [query]);
    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };
    const toggleFavorite = (gif) =>{
        if (favorites.includes(gif.id)) {
            setFavorites(favorites.filter(id => id !== gif.id)); 
        } else {
            setFavorites([...favorites, gif.id]); 
        }
    }
    return (
        
        <div>
            <div style={{margin:20}}>
                <input 
                    type="search"
                    value={query}
                    onChange={(e) => (setQuery(e.target.value))}
                    placeholder="Search for GIFs"
                />
            </div>
            {currentRecords ? (
                <div className="gallery">
                    {currentRecords.map((gif) => (
                        <div key={gif.id} className="gif-container">
                        <img src={gif.images.fixed_height.url} alt={gif.title} />
                        <button onClick={() => toggleFavorite(gif)}
                        style={{
                                    backgroundColor: favorites.includes(gif.id) ? 'yellow' : '',
                                    color: favorites.includes(gif.id) ? 'black' : 'initial',
                                }} 
                        >
                                {favorites.includes(gif.id) ? 'Unmark Favorite' : 'Mark as Favorite'}
                        </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Enter the name</p>
            )}
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div>
                <h2>Favorite GIFs</h2>
                <div className="gallery">
                    {data?.filter(gif => favorites.includes(gif.id)).map((gif) => (
                        <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Gifs;
