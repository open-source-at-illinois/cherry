import axios from 'axios';

const baseUrl = 'https://localhost:5000';

const dummyCourses = [
    {"_id":"AAS-100","name":"Intro Asian American Studies","course_id":"AAS-100","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci"},
    {"_id":"AAS-100","name":"Intro Asian American Studies","course_id":"AAS-100","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci"},
    {"_id":"AAS-100","name":"Intro Asian American Studies","course_id":"AAS-100","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci"},
    {"_id":"ACE-210","name":"Environmental Economics","course_id":"ACE-210","credits":"3","online":false,"geneds":"Social & Beh Sci - Soc Sci"},
]

const dummySections = [
    {"_id":{"$oid":"6189c52ad62cba2600901896"},"crn":{"$numberInt":"30107"},"name":"Intro Asian American Studies","section_id":"AD1","course_id":"AAS-100","instructor":"Boonsripaisal, S","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci","time":"09:00 AM - 09:50 AM","is_open":"UNKNOWN","location":"UNKNOWN"},
    {"_id":{"$oid":"6189c52ad62cba2600901897"},"crn":{"$numberInt":"41729"},"name":"Intro Asian American Studies","section_id":"AD2","course_id":"AAS-100","instructor":"Boonsripaisal, S","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci","time":"10:00 AM - 10:50 AM","is_open":"UNKNOWN","location":"UNKNOWN"},
    {"_id":{"$oid":"6189c52ad62cba2600901898"},"crn":{"$numberInt":"43832"},"name":"Intro Asian American Studies","section_id":"AD3","course_id":"AAS-100","instructor":"Guruparan, A","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci","time":"10:00 AM - 10:50 AM","is_open":"UNKNOWN","location":"UNKNOWN"},
    {"_id":{"$oid":"6189c52ad62cba2600901898"},"crn":{"$numberInt":"43832"},"name":"Intro Asian American Studies","section_id":"AD3","course_id":"AAS-100","instructor":"Guruparan, A","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci","time":"10:00 AM - 10:50 AM","is_open":"UNKNOWN","location":"UNKNOWN"},
    {"_id":{"$oid":"6189c52ad62cba2600901899"},"crn":{"$numberInt":"48232"},"name":"Intro Asian American Studies","section_id":"AD4","course_id":"AAS-100","instructor":"Guruparan, A","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci","time":"11:00 AM - 11:50 AM","is_open":"UNKNOWN","location":"UNKNOWN"},
    {"_id":{"$oid":"6189c52ad62cba260090189a"},"crn":{"$numberInt":"48234"},"name":"Intro Asian American Studies","section_id":"AD5","course_id":"AAS-100","instructor":"Kang, Y","credits":"3","online":false,"geneds":"Cultural Studies - US Minority;Social & Beh Sci - Soc Sci","time":"11:00 AM - 11:50 AM","is_open":"UNKNOWN","location":"UNKNOWN"}
]

const optimizeCourses = (requestData) => {
    console.log(requestData);
    // axios.get(`${baseUrl}/optimize/`, {
    //     params: {
    //         request: requestData
    //     }
    // });
    return dummyCourses;
};

const getSection = (requestData) => {
    console.log(requestData);
    // return axios.get(`${baseUrl}/sections/${requestData.class_id}`);
    return dummySections;
}

const CherryService = { optimizeCourses, getSection };

export default CherryService;