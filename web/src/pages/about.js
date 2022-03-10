import React from "react";
import { useState, useEffect } from "react"
import logo from "./OSAI-Logo.png";
import { Grid } from "@mui/material";
import GithubService from "../services/GithubService";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import useWindowDimensions from '../useWindowDimensions';

const AboutPage = () => {
    const [contributors, setContributors] = useState([]);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        const response = GithubService.getContributors();
        console.log('Contributors', response);
        response.then(data => {
            setContributors(data);
        });
    }, [])

    const containerStyle = {
        padding: 2,
        display: 'flex',
        textAlign: 'left',
    };
    const itemStyle = {
        marginLeft: '1.5%',
        padding: 1,
        float: 'right',
        width: '75%'
    };
    const imgStyle = {
        height: '20%',
        width: '20%',
        borderRadius: '10px',
        float: 'left',
    };
    const contributorStyle = {
        marginTop: '0%',
        marginLeft: '1.5%',
        marginRight: '1.5%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: '1.5%',
        display: 'flex',
    }

    return (
        <>
            <Grid container sx={containerStyle}>
                {
                    width > 900 ?
                        <img src={logo} alt="Logo" style={imgStyle} />
                        : <></>
                }
                <Grid item sx={itemStyle}>
                    <Typography variant="h4">Welcome to Cherry!</Typography>
                    <br />
                    <Typography>
                        With the vast number of courses on offer at UIUC and the wide variation in average GPA,
                        instructor quality, prereqs, and number of GenEds fulfilled, picking the best course to take is hard.
                    </Typography>
                    <br />
                    <Typography>
                        Cherry aims to solve this to make course picking super easy.
                        Just open Cherry, and see a list of all the courses at UIUC sorted by highest to lowest GPA. You can search by departments and even filter courses based on Gen-Eds you'd like to fulfill, with tons of more planned features coming soon!
                    </Typography>
                    <br />
                    <Typography variant="h4" sx={{ leftMargin: '20%' }}> Cherry Contributors</Typography>
                </Grid>
            </Grid>
            <Grid container sx={contributorStyle}>
                {contributors.map(contributor =>
                    <Card sx={{ margin: 2, minWidth: '10%' }}>
                        <CardMedia
                            component="img"
                            height="120"
                            image={contributor.avatar_url}
                            alt={contributor.login}
                        />
                        <Link color="inherit" underline="hover" href={`https://github.com/${contributor.login}`}>
                            <CardContent>
                                <Typography sx={{ textAlign: 'center' }}>
                                    {contributor.login}
                                </Typography>
                            </CardContent>
                        </Link>
                    </Card>)}
            </Grid>
        </>
    )
}

export default AboutPage;
