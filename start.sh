:
sh stop.sh
sleep 0.2
nohup python3 app.py > logs.txt 2>&1 &
PID=$!
echo $PID > PID
tail -f logs.txt
