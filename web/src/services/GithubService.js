import axios from 'axios';

const baseUrl = 'https://api.github.com/';

const getContributors = () => {
    const promise = axios.get(baseUrl + "/repos/open-source-at-illinois/cherry/contributors");
    return promise.then(response => response.data)
};

const GithubService = { getContributors };

export default GithubService;