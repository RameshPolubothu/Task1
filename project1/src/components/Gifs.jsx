import React, { useState, useEffect } from 'react';
const Gifs = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);
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
    // console.log(query);
    return (
        
        <div>
            <div>
                <input
                    type="search"
                    value={query}
                    onChange={(e) => (setQuery(e.target.value))}
                    placeholder="Search for GIFs"
                />
            </div>
            {data ? (
                <div>
                    {data.map((gif) => (
                        <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
                    ))}
                </div>
            ) : (
                <p>Enter the name</p>
            )}
        </div>
    );
};
export default Gifs;
