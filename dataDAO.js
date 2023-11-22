class DataDAO {
    constructor(cosmosClient, databaseId, containerId) {
        this.client = cosmosClient
        this.databaseId = databaseId
        this.collectionId = containerId
   
        this.database = null
        this.container = null
      }
   
      async init() {
        console.log('Setting up the database...')
        const dbResponse = await this.client.databases.createIfNotExists({
          id: this.databaseId
        })
        this.database = dbResponse.database
        console.log('Setting up the database...done!')
        console.log('Setting up the container...')
        const coResponse = await this.database.containers.createIfNotExists({
          id: this.collectionId
        })
        this.container = coResponse.container
        console.log('Setting up the container...done!')
      }

      async getAllItems() {
        const querySpec = {
            query: 'SELECT TOP 50 * FROM c',
            parameters: [],
        };
          
        const { resources } = await this.container.items.query(querySpec).fetchAll();
        console.log('Getting an item from the database')

        return resources
      }
}

module.exports = DataDAO;