const { CosmosClient } = require('@azure/cosmos');
const express = require('express')
const path = require('path')
const DataDAO = require('./dataDAO')
require('dotenv').config()

// Replace these values with your own Azure Cosmos DB credentials and endpoint
const endpoint = process.env.END_POINT;
const key = process.env.KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

const app = express()
app.use(express.static(path.join(__dirname, 'public')));

const cors = require('cors');
app.use(cors());

const cosmosClient = new CosmosClient({ endpoint, key });

const dataDAO = new DataDAO(cosmosClient, databaseId, containerId)
dataDAO.init();

// async function connectToCosmosDB() {
//   // Create or retrieve the database
//   const { database } = await client.databases.createIfNotExists({ id: databaseId });
//   console.log(`Connected to database: ${database.id}`);

//   // Create or retrieve the container
//   const { container } = await database.containers.createIfNotExists({ id: containerId });
//   console.log(`Connected to container: ${container.id}`);

//   return container;
// }

// connectToCosmosDB().catch((error) => {
//   console.error('Error connecting to Cosmos DB:', error);
// });


app.listen(process.env.PORT || 8080, () => {
  console.log("Server successfully running on port 8080");
});

app.get('/api/getItems', async(req, res) => {
  
  const resources = await dataDAO.getAllItems();

  return res.json(resources)
});

app.get('/', (req, res) => {
  res.sendfile('./index.html');
}); 
