from flask import Flask,request,render_template
import json
import mysql.connector
from mysql.connector import Error
import datetime

app = Flask(__name__)

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
        if "connection" in locals():
            if connection.is_connected():
                cursor.close()
                connection.close()
                print("MySQL connection is closed")
        else:
            print("Database not found")
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
            cursor.execute("SELECT * FROM data ORDER BY DATE DESC LIMIT 1000;")
            resultList = cursor.fetchall()
            responseList = []
            print(resultList)
            for res in resultList:
                date = res[1].strftime('%Y-%m-%d %H:%M:%S')
                responseList.append({"value": res[2], "date":date , "sensorType": res[3], "sensorID": res[4]})
            print(responseList)
            return json.dumps(responseList)
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if "connection" in locals():
            if connection.is_connected():
                cursor.close()
                connection.close()
                print("MySQL connection is closed")
        else:
            print("Database not found")

if __name__ == "__main__":
    app.run(host="0.0.0.0")