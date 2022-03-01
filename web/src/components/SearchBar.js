import React from "react";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';



const SearchBar = (props) => {
    return (
        <TextField label="Search (eg: ANTH, CS)" sx={{ minWidth: '90%', backgroundColor: 'white'}} />
    )
}

export default SearchBar;
