import { textAlign } from "@mui/system";
import React from "react";
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { styled, Box } from '@mui/system';
import Image1 from "../images/Average_Difficulty_vs_Number_of_Instructors_Without_0.png";
import Image2 from "../images/Average_Rating_vs_Number_of_Instructors_Without_0.png";
import styles from './analytics.module.css';

const AnalyticsPage = () => {

    const [open, setOpen] = React.useState(false);
    const [popupImage, setPopupImage] = React.useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const StyledModal = styled(ModalUnstyled)`
        position: fixed;
        z-index: 1300;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;
    const Backdrop = styled('div')`
        z-index: -1;
        position: fixed;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-tap-highlight-color: transparent;
    `;

    const style = {
    bgcolor: 'background.paper',
    border: '2px solid #000',
    };  

    const image = {
        flex: "1",
        width: "500px",  
        cursor: "pointer",       
        // border: "solid 1px red"
        '&:hover': {
            border: "solid 1px red",
            cursor: "pointer"
       }, 

    }
    const image_popup = {
        flex: "1",
        width: "800px",
    }
    
    
    const desc_container = {
        flex: "1",
        marginTop: "30px"
        // border: "solid 2px green",
        // textAlign: "left"
    }
    const description = {
        fontSize: 14
    }



    return (
        <>
            <div  className={styles.container}>
                <div className = {styles.img_container}>
                    <div >
                        <img
                            src={Image1}
                            // style={img1clicked ? styles.infoIcon : ''}
                            alt="info"
                            className = {styles.image123}
                            onClick={handleOpen}
                        />
                    </div>
                    <div style={desc_container}>
                        <span style = {description}>Notice that the graph does this shit</span>
                    </div>
                </div>
                <div className = {styles.img_container}>
                    <div >
                        <img
                            src={Image2}
                            // style={img1clicked ? styles.infoIcon : ''}
                            alt="info"
                            className = {styles.image123}
                            onClick={handleOpen}
                        />
                    </div>
                    <div style={desc_container}>
                        <span style = {description}>Notice that the graph does this shit</span>
                    </div>
                </div>

            </div>
            <StyledModal

            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                        <img
                            src={Image1}
                            // style={img1clicked ? styles.infoIcon : ''}
                            alt="info"
                            style = {image_popup}
                            onClick={handleOpen}
                        />
        </Box>

            </StyledModal>
        </>
    )
}

export default AnalyticsPage;
