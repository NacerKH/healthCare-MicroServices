const router = require('express').Router();
const clientAxios = require('../axios');
const { checkAuth } = require('../middlewares/CheckAuthentification');

const BASE_URL = process.env.URL_APPOINTEMENT_MS;

console.log("BASE_URL", BASE_URL);
const api = clientAxios(BASE_URL);

router.post('/api/v1/appointments/addAppointment', checkAuth, async (req, res) => {
  try {

    console.log("req.body", req.body)
    const response = await clientAxios(BASE_URL, req.headers.authorization).post('/api/v1/addAppointment', req.body);
    res.send(response.data)
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the appointments process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  };
});


router.get('/api/v1/appointments', checkAuth, async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).get('/api/v1/appointments');
    res.send(response.data);
  } catch (error) {
    console.log(error)
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the appointments process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  };
});

router.get('/api/v1/appointments/:id', checkAuth, async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).get(`/api/v1/appointment/${req.params.id}`);

    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the appointments process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  };
});


router.delete('/api/v1/appointment/:id', checkAuth, async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).delete(`/api/v1/appointment/${req.params.id}`);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the appointments process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  };
});



router.put('/api/v1/appointments/:id', checkAuth, async (req, res) => {

  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).put(`/api/v1/appointment/${req.params.id}`, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the appointments process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  };
});



router.get('/api/v1/appointments/medicalSituation', checkAuth, async (req, res) => {
  const medicalSituation = req.query.medicalSituation;

  try {

    const response = await clientAxios(BASE_URL, req.headers.authorization).get(`/api/v1/appointments/medicalSituation?medicalSituation=${medicalSituation}`)
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the appointments process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  };
});


router.get('/api/v1/appointments/user/:userId', checkAuth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).get(`/api/v1/appointments/user/${userId}`);
    res.send(response.data);

  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the appointments process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  };
});

router.get('/api/v1/appointments/medicine/:medicineId', checkAuth, async (req, res) => {
  const medicineId = req.params.medicineId;

  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).get(`/api/v1/appointments/medicine/${medicineId}`);
    res.send(response.data);

  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the appointments process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  };
});
module.exports = router;
