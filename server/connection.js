const elasticsearch = require('@elastic/elasticsearch')

// Core ES variables for this project
const index = 'library'
const type = 'novel'
const node = 'http://elasticsearch:9200'
const client = new elasticsearch.Client({ 
  node: node,
})

/** Check the ES connection status */
async function checkConnection () {
  let isConnected = false
  while (!isConnected){
    console.log('Connecting to ES')
    try {
      const health = await client.cluster.health({})
      console.log(health)
      isConnected = true
    } catch (err) {
      console.log('Connection Failed, Retrying...', err)
    }
  }
}

checkConnection()