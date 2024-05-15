const express = require('express')
const router = express.Router()
const {getAllNews,addNewNews, updateNews} = require('../controllers/newsController')

router.route('/').get(getAllNews).post(addNewNews).patch(updateNews)

module.exports = router