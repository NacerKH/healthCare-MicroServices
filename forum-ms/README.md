GET /api/v1/posts/:posterId

Fetch all posts

Test:

curl -v http://127.0.0.1:5012/api/v1/
============================================
GET /api/v1/posts/:posterId

Fetch a post by posterId

Test:

curl -v http://127.0.0.1:5012/api/v1/posts/102
============================================
POST /api/v1/createpost

->Create a post without a comment and likes

Test:

curl -v -i -s -k -X $'POST'     -H $'Host: 127.0.0.1:5012' -H $'User-Agent: Medest' -H $'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8' -H $'Accept-Language: en-US,en;q=0.5' -H $'Accept-Encoding: gzip, deflate' -H $'Connection: close' -H $'Upgrade-Insecure-Requests: 1' -H $'Content-Type: application/json' --data-binary $'{\"posterId\":\"2\",\"message\": \"This is my new post!\",\"likers\":[],\"comments\":[]}'     $'http://127.0.0.1:5012/api/v1/createpost'

============================================

DELETE /api/v1/:_id

Delete a post by _id

test:

curl -v -X DELETE http://127.0.0.1:5012/api/v1/posts/64ab2ea0a968159324099785
============================================

