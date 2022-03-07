import axios from 'axios';

const apiUri = 'https://cherry-api.opensourceatillinois.com';
// const apiUri = 'http://127.0.0.1:5000/';

const getAllCourses = async (params) => {
    var queryParams = {};
    // Create a comma separated list of geneds that are marked true
    const genedList = Object.entries(params.options.geneds)
        .filter(gened => gened[1])
        .map(gened => gened[0]).join(',');
    if (genedList) {
        queryParams.geneds = genedList;
    }
    const promise = axios.get(params.page ? `${apiUri}/2021/spring/${params.page}` : `${apiUri}`, {
        params: queryParams
    });
    return await promise.then(response => response.data);
}

const getCourseListMeta = () => {
    const promise = axios.get(`${apiUri}/2021-sp/summary`);
    return promise.then(response => response.data);
}

const CherryService = { getAllCourses, getCourseListMeta };

export default CherryService;
