// import axios from 'axios'
const config = require('../../src/config')

// const http = axios.create({
//   baseURL: apiConfig.apiUrl,
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*'
//   }
// })

var apiUrl = config.get('apiUrl')
export const ping = (cb) => {
  setTimeout(() => { console.log('pong'); cb() }, 100)
}

export const takePicture = async (sessionId, captureId) => {
  // return http.post(`/picture`, {
  //   sessionId,
  //   captureId
  // }).catch((err) => {
  //   console.log(JSON.stringify(err))
  // })

  return fetch(`${apiUrl}/picture`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({
      sessionId,
      captureId
    })// body data type must match "Content-Type" header
  }).then(response => response.json())
}
