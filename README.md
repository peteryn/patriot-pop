# Patriot Pop (SWE 432) Project
Manger (Peter Yuan)

Producer (Gaurav Sehgal)

DJ (Yash Pravin Waikar)

## Setup Database
Start mongodb in a separate tab with `mongosh`
```
cd models/json

mongoimport --db patriotPop --collection day --file days.json --jsonArray
mongoimport --db patriotPop --collection dj --file djs.json --jsonArray
mongoimport --db patriotPop --collection song --file songs.json --jsonArray

```