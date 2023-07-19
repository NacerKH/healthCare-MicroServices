

const clientAxios = require('../axios')

const maxAge = 3 * 24 * 60 * 60 * 1000;

const BASE_URL = process.env.URL_AUTHORIZATION_MS

module.exports.checkAuth = async (req, res, next) => {
  

    const api = clientAxios(BASE_URL,req.headers.authorization)
  
    api.get('/jwtid')
        .then(response => {
            if (response.status === 401) {
                throw new Error('authorisation_ms_error');
            }

            if (!response.data) {
                return res.status(500).json({ 'ExternalServerError': 'AuthMS', ...response.data });
            }
             console.log(response.data)
             res.cookie('user_id', response.data, { httpOnly: true, maxAge });
            next();
        })
        .catch(error => {
            return res.status(500).json({ 'ExternalServerError': 'AuthMS', error: error.message });
        });

}




