# users_dao.py
# Function to Get all users List
def get_all_user_details(connection):
    cursor = connection.cursor(dictionary=True)
    query = 'SELECT * FROM gkb.users'    #sql query to get all users
    cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    return result

# Function to Check Existing User Using Email

def check_user(connection, user_email):
    cursor = connection.cursor()
    query = 'SELECT Email FROM gkb.users WHERE Email = %s'    #sql query to get user by email
    cursor.execute(query, (user_email,))
    result = cursor.fetchone()
    cursor.close()
    return result is not None
# Function to Instert User Deatils into DataBase

def insert_user(connection, data):
    name = data.get('name')
    email = data.get('email')
    age = data.get('age')
    dob = data.get('dob')
    cursor = connection.cursor()
    query = "INSERT INTO gkb.users (Name, Email, Age, DOB) VALUES (%s, %s, %s, %s)"   #sql query to insert user details into users table
    data = (name, email, age, dob)
    validate_user = {}
    if not check_user(connection, email):             #if new user
        try:
            cursor.execute(query, data)
            connection.commit()
            validate_user = {
                "message": "Details entered successfully.",
                "status": 'success'
            }
        except Exception as e:
            print(f"Error during user submission: {e}")
            connection.rollback()
            validate_user = {
                "message": "Error during user submission.",
                "status": 'failure'
            }
    else:                                            #if new user
        validate_user = {
            "message": "User already present",
            "status": 'failure'
        }
    cursor.close()
    return validate_user



# CODE WRITTEN BY SANDEEP B