const axios = require('axios')

// Helper function for sleep
const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000))

// Helper function for GET
const getRequest = async (url) => {
    console.log(`\nPerforming GET request to ${url}\n`)
    try {
        const response = await axios.get(url)
        console.log(response.data)
    } catch (error) {
        console.error(`Error: ${error}`)
    }
};

// Helper function for POST, PUT, and DELETE
const sendDataRequest = async (method, url, data) => {
    console.log(`\nPerforming ${method.toUpperCase()} request to ${url}\n`)
    try {
        const response = await axios({ method, url, data, headers: {'Content-Type': 'application/json'} })
        console.log(response.data)
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

// Main function to run the transactions
const runTransactions = async () => {
    console.log("\nStarting transactions")
    console.log("---------------------")
    await getRequest('http://localhost:3000/transaction/get')
    await sleep(1.5)

    console.log("\nAdding a transaction")
    console.log("--------------------")
    await sendDataRequest('post', 'http://localhost:3000/transaction/post', { id: 1, amount: 100, description: 'Test transaction' })
    await sleep(1.5)

    await getRequest('http://localhost:3000/transaction/get')
    await sleep(1.5)

    console.log("\nUpdating the transaction")
    console.log("------------------------")
    await sendDataRequest('put', 'http://localhost:3000/transaction/put/1', { amount: 200, description: 'Updated transaction' })
    await sleep(1.5)

    await getRequest('http://localhost:3000/transaction/get')
    await sleep(1.5)

    console.log("\nDeleting the transaction")
    console.log("------------------------")
    await sendDataRequest('delete', 'http://localhost:3000/transaction/delete/1')
    await sleep(1.5)

    await getRequest('http://localhost:3000/transaction/get')
    await sleep(1.5)

    console.log("\n")
}

runTransactions()

