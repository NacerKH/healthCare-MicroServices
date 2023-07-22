var express = require('express');
var router = express.Router()

const clientAxios = require('../axios')

const { checkAuth } = require('../middlewares/CheckAuthentification')
const BASE_URL = process.env.URL_FORUM_MS

console.log("BASE_URL", BASE_URL)
const api = clientAxios(BASE_URL)

router.post('/api/v1/createpost', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL).post(req.path, req.body);
    res.send(response.data)
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Something went wrong with the login process.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
})



router.get('/api/v1/posts', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).get(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to verify email with the provided token.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});

router.get('/api/v1/posts/:posterId', checkAuth, async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).get(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});


router.put('/api/v1/:id', checkAuth, async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).put(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
router.delete('/api/v1/:id', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).delete(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});

router.patch('/api/v1/like-post/:id', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).patch(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
router.patch('/api/v1/unlike-post/:id', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).patch(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
router.patch('/api/v1/comment-post/:id', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).patch(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});

router.patch('/api/v1/edit-comment-post/:id', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).patch(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
router.patch('/api/v1/delete-comment-post/:id', async (req, res) => {
  try {
    const response = await clientAxios(BASE_URL, req.headers.authorization).patch(req.path, req.body);
    res.send(response.data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Failed to fetch user data.';
    res.status(error.response ? error.response.status : 500).send({ error: errorMessage });
  }
});
module.exports = router