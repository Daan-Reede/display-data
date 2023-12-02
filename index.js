const { CosmosClient } = require('@azure/cosmos');
const express = require('express')
const path = require('path')
const DataDAO = require('./dataDAO');
require('dotenv').config()

const port = process.env.PORT || 8080;
const endpoint = process.env.END_POINT;
const key = process.env.KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

const app = express()
app.use(express.static(path.join(__dirname, 'public')));

const cosmosClient = new CosmosClient({ endpoint, key });
const dataDAO = new DataDAO(cosmosClient, databaseId, containerId)

dataDAO.init()
  .catch(err => {
    console.error(err)
    console.error(
      'Shutting down because there was an error settinig up the database.'
    )
    process.exit(1)
  });

app.listen(port, () => {
  console.log("Server successfully running on port 8080, visit http://localhost:8080");
});

app.get('/api/getItems', async (req, res) => {
  const resources = await dataDAO.getAllItems();
  return res.json(resources)
});