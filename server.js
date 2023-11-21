const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000

app.use(bodyParser.json())

let transactions = []

// Function to print out the list
// Get function utilizes this
function readList() {
    fs.readFile('transactions.json', function(err, data) {
        if (!err && data.length) {
            transactions = JSON.parse(data)
        }
    })
}

// Function to update the list
// Post, put, and delete functions utilize this
function updateList(res) {
    fs.writeFile('transactions.json', JSON.stringify(transactions, null, 2), function(err) {
        if (err) {
            res.status(500).send('Error writing to file')
        } else {
        res.send('Transaction updated successfully')
	}
    })
}

// Function to print out all transactions from the list
app.get('/transaction/get', function(req, res) {
    readList()
    res.json(transactions)
})

// Function to add a transaction to the list
app.post('/transaction/post', function(req, res) {
    const transaction = req.body
    transactions.push(transaction)
    updateList(res)
})

// Function to update a transaction from the list
// Needs to make sure transaction exists because it searches the whole file for that one transaction
app.put('/transaction/put/:id', function(req, res) {
    const transactionId = parseInt(req.params.id)
    const updatedTransaction = req.body

    let found = false
    
    for(let i=0; i < transactions.length; i++) {
        if(transactions[i].id === transactionId) {
            found = true;
	    console.log(`Updating transaction with ID ${transactionId}`)

	    if(updatedTransaction.amount != undefined) {
	        transactions[i].amount = updatedTransaction.amount
	    }
	
	    if(updatedTransaction.description != undefined) {
	        transactions[i].description = updatedTransaction.description
	    }

	    break
	}
    }

    if (!found) {
        console.log(`Transaction with ID ${transactionId} not found`)
        res.status(404).send('Transaction not found')
        return
    }

    updateList(res)
})

// Function to delete transactions from the list
// Does not need to make sure the transaction exists since it is just filtering
app.delete('/transaction/delete/:id', function(req, res) {
    const transactionId = parseInt(req.params.id)
    transactions = transactions.filter(t => t.id !== transactionId)
    updateList(res)
})

app.listen(port, function() {
    console.log(`Server running on port 3000`)
})
