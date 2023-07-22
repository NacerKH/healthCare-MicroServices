var express = require('express');
var router = express.Router()

const clientAxios = require('../axios')

const { checkAuth } = require('../middlewares/CheckAuthentification')
const BASE_URL = process.env.URL_COMPLAINT_MS

console.log("BASE_URL", BASE_URL)
const api = clientAxios(BASE_URL)

router.post('/api/complaint/addComplaint', async (req, res) => {
    try {
        const response = await clientAxios(BASE_URL).post(req.path, req.body);
        res.send(response.data)
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Something went wrong witha add complaint process.';
        res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
    }
})



router.get('/api/complaint', async (req, res) => {
    try {
        const response = await clientAxios(BASE_URL, req.headers.authorization).get(req.path, req.body);
        res.send(response.data);
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Failed to get all complaint .';
        res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
    }
});


router.get('/api/complaint/user/:id', checkAuth, async (req, res) => {
    try {
        const response = await clientAxios(BASE_URL, req.headers.authorization).get(req.path, req.body);
        res.send(response.data);
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Failed to fetch complaint with user id .';
        res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
    }
});


router.put('/api/complaint/:id', checkAuth, async (req, res) => {
    try {
        const response = await clientAxios(BASE_URL, req.headers.authorization).put(req.path, req.body);
        res.send(response.data);
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Failed to update complaint with id .';
        res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
    }
});
router.delete('/api/complaint/:id', checkAuth, async (req, res) => {
    try {
        const response = await clientAxios(BASE_URL, req.headers.authorization).delete(req.path, req.body);
        res.send(response.data);
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Failed to update complaint with id .';
        res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
    }
});
router.get('/api/complaint/medecin/:id', async (req, res) => {
    try {
        const response = await clientAxios(BASE_URL, req.headers.authorization).get(req.path, req.body);
        res.send(response.data);
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Failed to fetch complaint with user id .';
        res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
    }
});



module.exports = router