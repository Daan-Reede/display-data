const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config()

const endpoint = process.env.END_POINT;
const key = process.env.KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

const client = new CosmosClient({endpoint, key});
const container = client.database(databaseId).container(containerId);

module.exports = {container}