async function getItems(container){
    const query = {
        query: 'SELECT TOP 50 * FROM c ORDER BY c._ts DESC'
    };

    const { resources } = await container.items.query(query).fetchAll();
    return resources;
}

module.exports = {getItems} 