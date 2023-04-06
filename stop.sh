:
if [ -f PID ] ; then
	kill `cat PID`
	rm -f PID
fi
