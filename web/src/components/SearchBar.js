import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const SearchBar = (props) => {
    const navStyle = {
        display: 'flex',
        alignItems: 'left',
        color: '#0E0063',
        paddingTop: 1,
        paddingBottom: 3,
        justifyContent: 'flex-start',
    };

    const navStyle2 = {
        display: 'flex',
        alignItems: 'center',
        color: '#0B062A',
        paddingTop: 1,
        paddingBottom: 3,
        justifyContent: 'flex-start',
    };

    


    
    const navVariant2 = "h5";

    return (
        <>
        <Box sx={navStyle}>
        <TextField id="filled-basic" label="Input (Eg: ANTH, CS)" variant="filled" />
        </Box>
        </>
    )
}

export default SearchBar;
