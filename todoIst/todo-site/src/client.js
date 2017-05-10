import * as superagent from 'superagent'

const url = 'http://localhost:8100/todos'

export function get() {
  return new Promise((resolve, reject) => {
    
    superagent
      .get(url)
      .end((error, result) => {
        error ? reject(error) : resolve(result.body)
      })
  })
}

export function add(text) {
  return new Promise((resolve, reject) => {
    superagent
      .post(url)
      .send({'text': text})
      .end((error, result) => {
        error ? reject(error) : resolve(result.body)
      })
  })
}

export function toggle(id) {
  return new Promise((resolve, reject) => {
    superagent
      .patch(`${url}/${id}`)
      .end((error, result) => {
        error ? reject(error) : resolve(result.body)
      })
  })
}
