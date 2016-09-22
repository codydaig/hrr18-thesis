cd /var/app/
npm start & pid=$!
( sleep $TIMEOUT && kill -HUP $pid ) 2>/dev/null & watcher=$!
wait $pid 2>/dev/null && pkill -HUP -P $watcher
