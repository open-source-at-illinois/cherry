import React from "react";
import {useState, useEffect} from "react"
import logo from "./OSAI-Logo.png";
import { Grid } from "@mui/material";
import GithubService from "../services/GithubService";

const AboutPage = () => {
    const [contributors, setContributors] = useState([{
        "login": "raulington",
        "id": 68880159,
        "node_id": "MDQ6VXNlcjY4ODgwMTU5",
        "avatar_url": "https://avatars.githubusercontent.com/u/68880159?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/raulington",
        "html_url": "https://github.com/raulington",
        "followers_url": "https://api.github.com/users/raulington/followers",
        "following_url": "https://api.github.com/users/raulington/following{/other_user}",
        "gists_url": "https://api.github.com/users/raulington/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/raulington/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/raulington/subscriptions",
        "organizations_url": "https://api.github.com/users/raulington/orgs",
        "repos_url": "https://api.github.com/users/raulington/repos",
        "events_url": "https://api.github.com/users/raulington/events{/privacy}",
        "received_events_url": "https://api.github.com/users/raulington/received_events",
        "type": "User",
        "site_admin": false,
        "contributions": 3
      }]);
    
    useEffect( () => {
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
        padding: 2,
        display: 'flex',
    }
    const contritbutorImg = {
        borderRadius: '10px',
        width: '100px',
        marginLeft: '1.5%',
        border: '4px solid #000',
    }
    return (
        <>
        <Grid container sx={containerStyle}>
                <img src={logo} alt="Logo" style={imgStyle}/>
                <Grid item sx={itemStyle}>
                    <b>Welcome to Cherry!</b>
                    <br></br>
                    <div>
                        Cherry is a project created by the Open Source at Illinois RSO. 
                        The purpose of this project is to allow users to optimize their course selections based on 
                        their academic needs.
                    </div>
                    <br></br>
                    <b>"How do I use Cherry?"</b>
                    <div>
                        In order to find courses based on your preferences, you must move the slider of a characteristic
                        depending on how much you want this characteristic to hold true for the course you want. Once you have
                        specified which characteristics you prefer the most along with which general education requirments
                        you want the courses to satisfy, the courses that match your characteristics will be displayed to the
                        right of the preferences sliders.
                    </div>
                </Grid>
        </Grid>
        <br></br>
        <div style={{textAlign: 'left', marginLeft: '1.5%'}}>
            <b>Project Contributors:</b>
        </div>
        <Grid container sx={contributorStyle}>
            {contributors.map(contributor => 
                    <div>
                        <img src={contributor.avatar_url} alt={contributor.login} style={contritbutorImg}></img>
                        {contributor.login}
                    </div>) }
        </Grid>
        </>
    )
}

export default AboutPage;
