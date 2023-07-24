const axios = require('axios');

module.exports = (baseURL, authorizationHeader) => {
  return axios.create({
    baseURL: baseURL ,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': authorizationHeader,
      
    }
  });
}