# files for json-server

## db.json
```
  {
    "posts": [
      { "id": 1, "title": "json-server", "author": "typicode" }
    ],
    "comments": [
      { "id": 1, "body": "some comment", "postId": 1 }
    ],
    "profile": { "name": "typicode" }
  }
```
Now if you go to http://localhost:3000/posts/1, you'll get

## routes.json
Create a routes.json file. Pay attention to start every route with /.
```
  {
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
    "/blog/:category": "/posts?category=:category"
  }
```

Now you can access resources using additional routes.

  /api/posts # → /posts
  /api/posts/1  # → /posts/1
  /blog/posts/1/show # → /posts/1
  /blog/javascript # → /posts?category=javascript
