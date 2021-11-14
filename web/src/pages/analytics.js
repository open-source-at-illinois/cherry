import React from "react";
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { styled, Box } from '@mui/system';
import styles from './analytics.module.css';
import Image1 from "../images/Average_Difficulty_vs_Number_of_Instructors_Without_0.png";
import Image2 from "../images/Average_Rating_vs_Number_of_Instructors_Without_0.png";

const AnalyticsPage = () => {

    const [open, setOpen] = React.useState(false);
    const [popupImage, setPopupImage] = React.useState(Image1);

    const handleOpen = (selectedImage) => { 
        setPopupImage(selectedImage);
        setOpen(true); 
    };

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
        border: '3px solid #0E0063',
        borderRadius: '5px',
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.img_container}>
                    <div >
                        <img
                            src={Image2}
                            alt="Graph 2"
                            className={styles.image}
                            onClick={() => handleOpen(Image2)}
                        />
                    </div>
                    <div className={styles.desc_container}>
                        <span className={styles.description}>This graph displays the number of instructors versus the average rating 
                        of the instructors as provided by RateMyProfessors. The graph is an increasing graph with expected increases 
                        at intervals of 0.5, since people use rating systems with intervals of 0.5 instead of decimal values. his 
                        pattern in the graph supports why the RateMyProfessors data is accurate and can be used as a good measure of 
                        an instructors teaching skills.</span>
                    </div>
                </div>  

                <div className={styles.img_container}>
                    <div >
                        <img
                            src={Image1}
                            alt="Graph 1"
                            className={styles.image}
                            onClick={() => handleOpen(Image1)}
                        />
                    </div>
                    <div className={styles.desc_container}>
                        <span className={styles.description}>This graph displays the number of instructors versus the average difficulty
                         of the instructors as provided by RateMyProfessors. The graph approximately follows a normal distribution graph
                          - higher values in the middle and approaching zero at the extrema. The few exception to this pattern are at the
                           whole numbers values, which is to be expected since most people rate professors by whole numbers rather than 
                           using decimal values. This pattern in the graph supports why the RateMyProfessors data is accurate and can be 
                           used as a good measure of an instructors difficulty.</span>
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
                        src={popupImage}
                        alt="Popup Image"
                        className={styles.image_popup}
                    />
                </Box>
            </StyledModal>
        </>
    )
}

export default AnalyticsPage;