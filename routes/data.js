const express = require('express')
const router = express.Router()
const { getItems } = require("../public/scripts/databaseConnection.js")
const { container } = require("../public/scripts/cosmosConfig.js");

router.get('/', async (req, res) => {
    try{
        const items = await getItems(container);
        res.json(items);
    } catch (error){
        res.status(500).send(error.message);
    }
});

module.exports = router