const express = require('express');
const fetchData = require('../utils/fetchData');
const scraping = require('../scrapping/scrapping');

const blogRouter = express.Router();


blogRouter.post('/', async (req, res) => {
    const { url } = req.body;
    try {

        const article = await scraping(url)
        res.send(article);
    } catch (error) {
        res.status(404).send({ ok: false, status: 404, error: error.message });
    }
});


module.exports = blogRouter