const router = require('express').Router();
const clientAxios = require('../axios');
const { checkAuth } = require('../middlewares/CheckAuthentication');

const BASE_URL = process.env.URL_APPOINTEMENT_MS;

console.log("BASE_URL", BASE_URL);
const api = clientAxios(BASE_URL);

router.post('/api/v1/appointments/addAppointment', checkAuth, (req, res) => {
  clientAxios(BASE_URL, req.headers.authorization).post('/addAppointment', req.body).then(resp => {
    res.send(resp.data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

router.get('/api/v1/appointments', checkAuth, (req, res) => {
  clientAxios(BASE_URL, req.headers.authorization).get('/appointments').then(resp => {
    res.send(resp.data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

router.get('/api/v1/appointments/:id', checkAuth, (req, res) => {
  clientAxios(BASE_URL, req.headers.authorization).get(`/appointment/${req.params.id}`).then(resp => {
    res.send(resp.data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

router.delete('/api/v1/appointments/:id', checkAuth, (req, res) => {
  clientAxios(BASE_URL, req.headers.authorization).delete(`/appointment/${req.params.id}`).then(resp => {
    res.send(resp.data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

router.put('/api/v1/appointments/:id', checkAuth, (req, res) => {
  clientAxios(BASE_URL, req.headers.authorization).put(`/appointment/${req.params.id}`, req.body).then(resp => {
    res.send(resp.data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

router.get('/api/v1/appointments/medicalSituation', checkAuth, (req, res) => {
  const medicalSituation = req.query.medicalSituation;
  clientAxios(BASE_URL, req.headers.authorization).get(`/appointments/medicalSituation?medicalSituation=${medicalSituation}`).then(resp => {
    res.send(resp.data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

router.get('/api/v1/appointments/user/:userId', checkAuth, (req, res) => {
  const userId = req.params.userId;
  clientAxios(BASE_URL, req.headers.authorization).get(`/appointments/user/${userId}`).then(resp => {
    res.send(resp.data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

router.get('/api/v1/appointments/medicine/:medicineId', checkAuth, (req, res) => {
  const medicineId = req.params.medicineId;
  clientAxios(BASE_URL, req.headers.authorization).get(`/appointments/medicine/${medicineId}`).then(resp => {
    res.send(resp.data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

module.exports = router;
