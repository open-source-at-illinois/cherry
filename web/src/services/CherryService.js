import axios from 'axios';

const baseUrl = 'https://localhost:5000';

// const optimizeCourses = (requestData) => {
//     console.log(requestData);
//     // axios.get(`${baseUrl}/optimize/`, {
//     //     params: {
//     //         request: requestData
//     //     }
//     // });
//     return dummyCourses;
// };

// const getSection = (requestData) => {
//     console.log(requestData);
//     // return axios.get(`${baseUrl}/sections/${requestData.class_id}`);
//     return dummySections;
// }

// const s3Uri = 'https://cherry-static.opensourceatillinois.com';
const apiUri = 'https://cherry-api.opensourceatillinois.com';

const getAllCourses = async (params) => {
    var queryParams = {};
    // Create a comma separated list of geneds that are marked true
    const genedList = Object.entries(params.options.geneds)
        .filter(gened => gened[1])
        .map(gened => gened[0]).join(',');
    if (genedList) {
        queryParams.geneds = genedList;
    }
    if(params.options.searchTerm) {
        queryParams.searchTerm = params.options.searchTerm.trim();
        // get rid of all spaces
        queryParams.searchTerm = queryParams.searchTerm.replace(/\s/g, '');
        // convert to uppercase
        queryParams.searchTerm = queryParams.searchTerm.toUpperCase();
    }
    const promise = axios.get(params.page ? `${apiUri}/2021/spring/${params.page}` : `${apiUri}/2021/spring/1`, {
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
