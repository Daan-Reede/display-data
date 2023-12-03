const { CosmosClient, Container, Database } = require("@azure/cosmos");

/**
 * Represents a Data Access Object (DAO) for interacting with a Cosmos DB database.
 *
 * @class DataDAO
 * @constructor
 * @param {CosmosClient} cosmosClient - The Cosmos DB client for connecting to the database.
 * @param {string} databaseId - The ID of the Cosmos DB database.
 * @param {string} containerId - The ID of the container within the database.
 *
 * @property {CosmosClient} client - The Cosmos DB client.
 * @property {string} databaseId - The ID of the Cosmos DB database.
 * @property {string} collectionId - The ID of the container within the database.
 * @property {Database} database - Reference to the initialized Cosmos DB database.
 * @property {Container} container - Reference to the initialized container within the database.
 */
class DataDAO {
  constructor(cosmosClient, databaseId, containerId) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.collectionId = containerId;

    this.database = null;
    this.container = null;
  }

  /**
   * Initializes the Cosmos DB database and container. If they do not exist, it creates them.
   *
   * @async
   * @method init
   * @returns {Promise<void>}
   */

  async init() {
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId,
    });
    this.database = dbResponse.database;
    console.log("Setting up the database...done!");

    const coResponse = await this.database.containers.createIfNotExists({
      id: this.collectionId,
    });
    this.container = coResponse.container;
    console.log("Setting up the container...done!");
  }

  /**
   * Retrieves the top 50 items from the container using a SQL query.
   *
   * @async
   * @method getAllItems
   * @returns {Promise<Array>} - A promise that resolves with an array of items from the container.
   */
  async getAllItems() {
    const querySpec = {
      query: "SELECT TOP 50 * FROM c",
    };

    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();
    console.log("Getting an item from the database");

    return resources;
  }
}

module.exports = DataDAO;
