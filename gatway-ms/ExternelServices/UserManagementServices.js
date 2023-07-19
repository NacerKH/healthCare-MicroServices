var express = require('express');
var router = express.Router()

const clientAxios = require('../axios')

const { checkAuth } = require('../middlewares/CheckAuthentification')
const BASE_URL = process.env.URL_AUTHORIZATION_MS

console.log("BASE_URL", BASE_URL)
const api = clientAxios(BASE_URL)

router.post('/api/user/login', (req, res) => {
  clientAxios(BASE_URL, req.headers.authorization).api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})
router.post('/api/user/register', (req, res) => {
  clientAxios(BASE_URL, req.headers.authorization).api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})

router.post('/api/user/email/send-email-verification', checkAuth, (req, res) => {

  clientAxios(BASE_URL, req.headers.authorization).api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})
router.get('/api/user',checkAuth,(req, res) => {
  clientAxios(BASE_URL, req.headers.authorization).get(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})

module.exports = router