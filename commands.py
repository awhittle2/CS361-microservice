from flask import Flask
import requests
import time

app = Flask(__name__)

# Helper function for GET
def getRequest(url):
    print(f"Performing GET request to {url}")
    response = requests.get(url)
    print(response.text)

# Helper function for POST, PUT, and DELETE
def sendDataRequest(method, url, data):
    print(f"Performing {method} request to {url}")
    response = requests.request(method, url, json=data)
    print(response.text)

@app.route('/run-transactions')
def run_transactions():
    print("Starting transactions")
    print("---------------------")
    print()

    getRequest('http://localhost:3000/transaction/get')
    time.sleep(1.5)

    print()
    print("Adding a transaction")
    print("--------------------")
    print()
    
    sendDataRequest('post', 'http://localhost:3000/transaction/post', {'id': 1, 'amount': 100, 'description': 'Test transaction'})
    time.sleep(1.5)

    getRequest('http://localhost:3000/transaction/get')
    time.sleep(1.5)

    print()
    print("Updating the transaction")
    print("------------------------")
    print()
    
    sendDataRequest('put', 'http://localhost:3000/transaction/put/1', {'amount': 200, 'description': 'Updated transaction'})
    time.sleep(1.5)

    get_request('http://localhost:3000/transaction/get')
    time.sleep(1.5)

    print()
    print("Deleting the transaction")
    print("------------------------")
    print()
    
    sendDataRequest('delete', 'http://localhost:3000/transaction/delete/1', {})
    time.sleep(1.5)

    getRequest('http://localhost:3000/transaction/get')
    time.sleep(1.5)

    return "Transactions Completed"

if __name__ == '__main__':
    app.run(debug=True)
