from flask import Flask, request, jsonify, render_template
from sql_connection import get_sql_connection
from gevent.pywsgi import WSGIServer
from flask_cors import CORS
from mysql.connector import Error
import users_dao
import mysql.connector
import json

app = Flask(__name__, template_folder='../ui/templates')
CORS(app)  # Enable CORS for all routes
connection = get_sql_connection()

@app.route('/')
def index():
    return render_template('index.html')

#POST call to submit user details

@app.route("/submit", methods=['POST'])
def Submit():
    request_payload = request.get_json()
    response = users_dao.insert_user(connection, request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Get call to fetch  users list

@app.route('/getAllUsers', methods=['GET'])
def getAllUsers():
    try:
        users = users_dao.get_all_user_details(connection)
        users_list = []
        for user in users:
            user_dict = {
                'id': user['Id'],
                'name': user['Name'],
                'email': user['Email'],
                'age': user['Age'],
                'dob': user['DOB']
            }
            users_list.append(user_dict)
        return jsonify(users_list)
    except Exception as e:
        print(f"Error while retrieving data from DATABASE: {e}")
        return jsonify({"error": "An error occurred while retrieving data from DATABASE."})
    


if __name__ == "__main__":
    print("Starting GKB assignment ")
    http_server = WSGIServer(("127.0.0.1", 5000), app)
    http_server.serve_forever()




    
# CODE WRITTEN BY SANDEEP B