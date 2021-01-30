import Axios from 'axios';
const URL = 'https://rate-limit-test.herokuapp.com'
export default {
    getEvents: (hourly) => {
        let rate = hourly ? 'hourly' : 'daily';
        return Axios.get(URL + `/events/${rate}`)
            .then(result => result.data)
            .catch(err => err)
    },
    getStats: (hourly) => {
        let rate = hourly ? 'hourly' : 'daily';
        return Axios.get(URL + `/stats/${rate}`)
            .then(result => result.data)
            .catch(err => err)
    },
    getPOI: () => {
        return Axios.get(URL + `/POI`)
            .then(result => result.data)
            .catch(err => err)
    }
}