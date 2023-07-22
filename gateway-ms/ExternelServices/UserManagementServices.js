var express = require('express');
var router = express.Router()

const clientAxios = require('../axios')

const { checkAuth } = require('../middlewares/CheckAuthentification')
const BASE_URL = process.env.URL_AUTHORIZATION_MS

console.log("BASE_URL", BASE_URL)
const api = clientAxios(BASE_URL)

router.post('/api/user/login', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL).post(req.path, req.body);
    res.send(response.data)
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the login process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
})


router.post('/api/user/addUser', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL).post(req.path, req.body);
    res.send(response.data)
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the login process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
})
router.post('/api/user/register', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).post(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the registration process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
router.post('/api/user/email/send-email-verification', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).post(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with sending the verification email.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});


router.get('/api/user/email/verify-email/:verificationToken', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).get(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to verify email with the provided token.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});


router.get('/api/user', checkAuth, async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).get(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
router.delete('/api/user/:id', checkAuth, async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).delete(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});


router.put('/api/user/:id', checkAuth, async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).put(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
router.post('/api/user/forget-password', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).post(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});

router.post('/api/user/reset-password/:token', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).post(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
module.exports = router