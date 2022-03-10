import React from "react";
import Preferences from "../components/Preferences";
import { Box } from "@mui/material";
import CourseTable from '../components/CourseTable';
import { useState } from "react";
import useWindowDimensions from '../useWindowDimensions';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Disclaimer = () => {
    const [open, setOpen] = useState(true);

    const alertStyle = {
        marginLeft: "15%",
        marginRight: "15%",
    }

    return (
        <Collapse in={open}>
            <Alert sx={alertStyle} severity="info" action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }>
            Information displayed on Cherry is not academic advice.
            Speak with your advisor and select courses which fit your career and academic goals    
        </Alert>
        </Collapse>
    )
}

const HomePage = () => {

    const [preferences, setPreferences] = useState({
        geneds: {
            AC: false,
            WCC: false,
            NWC: false,
            USMC: false,
            HA: false,
            NST: false,
            QRA: false,
            QRB: false,
            SBS: false
        },
        searchTerm: "",
    }
    );

    const { height, width } = useWindowDimensions();

    const containerStyle = {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        maxHeight:"80vh",
    };
    const preferencesStyle = {
        padding: 1,
        display: "flex",
        height: "fit-content",
    };
    const tableStyle = {
        paddingLeft: 1,
        display: "flex",
    };
    
    return (
        <>
            {
                (width > 900) ?
                    <>
                    <Disclaimer />
                    <Box container sx={containerStyle}>
                        <Box item sx={preferencesStyle}>
                            <Preferences preferences={preferences} setPreferences={setPreferences} />
                        </Box>
                        <Box item sx={tableStyle}>
                            <CourseTable preferences={preferences} />
                        </Box>
                    </Box> 
                    <div className="spacer curve1"></div>
                    </>
                    :
                    <>
                        <Disclaimer />
                        <Box item sx={{diplay: 'flex'}}>
                            <Preferences preferences={preferences} setPreferences={setPreferences} />
                        </Box>
                        <Box container sx={containerStyle}>
                            <Box item sx={tableStyle}>
                                <CourseTable preferences={preferences} />
                            </Box>
                        </Box>
                    </>
            }
        </>
    )
}
export default HomePage;
