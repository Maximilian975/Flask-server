from flask import Flask,request,render_template
import json
import mysql.connector
from mysql.connector import Error
import logging

def create_app(logger_override=None):
    app = Flask(__name__)

    if logger_override:
        app.logger.handlers = logger_override.handlers
        app.logger.setLevel(logger_override.level)

gunicorn_logger = logging.getLogger('gunicorn.error')

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.post("/send_data")
def recv_data():
    status = 0
    print(request.is_json)
    
    req = request.get_json()
    print(req)
    jsonmsg = json.loads(req)
    print(jsonmsg)
    value = jsonmsg["value"]
    sensorType = jsonmsg["sensorType"]
    sensorID = jsonmsg["sensorID"]
    try:
        connection = mysql.connector.connect(host='localhost',
                                            database='sensorData',
                                            user='root',
                                            password='Baggenq321')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)
            cursor.execute(f"INSERT INTO data (VALUE, SENSORTYPE, SENSORID) VALUES ({value},{sensorType},{sensorID})")
            connection.commit()
            
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")
    
    # assume data is json {sensorID: 2, sensorType: 3, value: 13.4}
    

    return str(status)

@app.get("/get_data")
def get_data():
    try:
        connection = mysql.connector.connect(host='localhost',
                                            database='sensorData',
                                            user='root',
                                            password='Baggenq321')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor=connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)
            cursor.execute("select * from data;")
            resultList = cursor.fetchall()
            responseList = []
            for res in resultList:
                responseList.append({"value": res[2], "sensorType": res[3], "sensorID": res[4]})
                print(res)
            print(responseList)
            return json.dumps(responseList)
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

if __name__ == "__main__":
    app.run(host="0.0.0.0")


    
    