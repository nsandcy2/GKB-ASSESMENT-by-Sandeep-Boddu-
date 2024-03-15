import mysql.connector
__cnx = None
def get_sql_connection():
    global __cnx
    if __cnx is None:
        try:
            __cnx = mysql.connector.connect(user='root', password='xxxxx',
                                host='127.0.0.1',
                                database='gkb')
            print("Data Base Connection successful")
        except Exception as e:
            print(f"Error during db connection: {e}")
    return __cnx


