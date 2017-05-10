const uuid = require('uuid')
const serverBuilder = require('rest-api-starter').server
const todos = []

const router = (app) => {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.options("/todos", (request, response) => response.status(200).send())

  app.post("/todos", (request, response) => {
    const todo = {
      "id": uuid.v4(),
      "isDone": false,
      "text": request.body.text
    }
    todos.push(todo)
    response.send(todo)
  })

  app.get("/todos", (request, response) => {
    response.send(todos)
  })

  app.options("/todos/:id", (request, response) => response.status(200).send())

  app.patch("/todos/:id", (request, response) => {
    let result = null
    todos.forEach(todo => {
      if (todo.id === request.params.id) {
        todo.isDone = !todo.isDone
        result = todo
      }
    })

    if (!result) {
      response.status(404).send({"message": "todo not found"})
    } else {
      response.send(result)
    }
  })
}

serverBuilder(router)
