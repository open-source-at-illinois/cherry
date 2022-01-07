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

const s3Uri = 'https://cherry-static.opensourceatillinois.com';

const getAllCourses = async (params) => {
    const promise = axios.get( params.page ? `${s3Uri}/2021-sp/${params.page}` : `${s3Uri}/2021-sp/0`);
    return await promise.then(response => response.data);
}

const CherryService = { getAllCourses };

export default CherryService;