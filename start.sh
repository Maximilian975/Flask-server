:
sh stop.sh
sleep 0.2
nohup gunicorn --bind 0.0.0.0:5000 wsgi:app > logs.txt 2>&1 &
PID=$!
echo $PID > PID
tail -f logs.txt
