import React from "react";
import Preferences from "../components/Preferences";
import { Box } from "@mui/material";
import CourseTable from '../components/CourseTable';
import { useState } from "react";
import useWindowDimensions from '../useWindowDimensions';

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
