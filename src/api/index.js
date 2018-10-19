import axios from 'axios'
const config = require('../../src/config')
var apiUrl = config.get('API_URL')

const http = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

export const ping = () => {
  return http.get('/ping')
}

export const takePicture = async (sessionId, captureId) => {
  return http.post(`/picture`, {
    sessionId,
    captureId
  })
}

export const getPicture = (id) => {
  return http.get('/picture/' + id)
}

export const getAllpictures = () => {
  return http.get('/picture')
}

export const fortuneCookie = () => {
  return axios.get('http://fortunecookieapi.herokuapp.com/v1/cookie')
}
