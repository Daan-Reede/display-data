const { CosmosClient } = require('@azure/cosmos');
const express = require('express')
const path = require('path')
const DataDAO = require('./dataDAO');
require('dotenv').config();

// Retrieve configuration values from environment variables
const port = process.env.PORT || 8080;
const endpoint = process.env.END_POINT;
const key = process.env.KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

// Initialize Express application
const app = express()

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Cosmos DB client and DataDAO
const cosmosClient = new CosmosClient({ endpoint, key });
const dataDAO = new DataDAO(cosmosClient, databaseId, containerId)

// Initialize Cosmos DB database and container
dataDAO.init()
  .catch(err => {
    console.error(err)
    console.error(
      'Shutting down because there was an error settinig up the database.'
    )
    process.exit(1)
  });

// Start Express server and listen on the specified port
app.listen(port, () => {
  console.log("Server successfully running on port 8080, visit http://localhost:8080");
});

// Define API endpoint to get items
app.get('/api/getItems', async (req, res) => {
  try {
    // Retrieve items using DataDAO
    const resources = await dataDAO.getAllItems();
    // Return items as JSON response
    return res.json(resources);
  } catch (error) {
    // Handle errors during item retrieval
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});