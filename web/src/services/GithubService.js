import axios from 'axios';

const baseUrl = 'https://api.github.com';

const getContributors = async () => {
    const promise = axios.get(baseUrl + "/repos/open-source-at-illinois/cherry/contributors");
    return await promise.then(response => response.data)
};

const GithubService = { getContributors };

export default GithubService;