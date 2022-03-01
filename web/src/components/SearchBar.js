import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { useEffect } from "react";


const SearchBar = ({searchTerm, setSearchTerm}) => {
    const [query, setQuery] = useState("");
    // Debounce the search term
    useEffect(() => {
        const timeOutId = setTimeout(() => setSearchTerm(query), 500);
        return () => clearTimeout(timeOutId);
    // This is because adding setSearchTerm as a dependency causes an infinite loop of rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <TextField 
            label="Search (eg: ANTH, CS)" 
            sx={{ minWidth: '90%', 
                backgroundColor: 'white'
            }} 
            onChange={event => setQuery(event.target.value)}
            value={query}/>
    )
}

export default SearchBar;
