#!/bin/bash

echo "Starting transactions"
echo "---------------------"
echo

echo "Performing GET request to localhost:3000/get"
curl -X GET http://localhost:3000/transaction/get;
sleep 1.5;

echo
echo
echo "Adding a transaction"
echo "--------------------"
echo

echo "Performing POST request to localhost:3000/post"
curl -X POST http://localhost:3000/transaction/post -H "Content-Type: application/json" -d '{"id": 1, "amount": 100, "description": "Test transaction"}';
sleep 1.5;

echo

echo "Performing GET request to localhost:3000/get"
curl -X GET http://localhost:3000/transaction/get;
sleep 1.5;

echo
echo
echo "Updating the transaction"
echo "------------------------"
echo

echo "Performing PUT request to localhost:3000/put/1"
curl -X PUT http://localhost:3000/transaction/put/1 -H "Content-Type: application/json" -d '{"amount": 200, "description": "Updated transaction"}';
sleep 1.5;

echo

echo "Performing GET request to localhost:3000/get"
curl -X GET http://localhost:3000/transaction/get;
sleep 1.5;

echo
echo
echo "Deleting the transaction"
echo "------------------------"
echo

echo "Performing DELETE request to localhost:3000/delete/1"
curl -X DELETE http://localhost:3000/transaction/delete/1;
sleep 1.5;

echo

echo "Performing GET request to localhost:3000/get"
curl -X GET http://localhost:3000/transaction/get;
sleep 1.5;

echo
