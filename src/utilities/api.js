/*
* Function to check if http request was successful
*
* @param [Object] response. Http response from server.
* @return [Object] response. Http response from server.
*/
export const checkError = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    // if (response.status === 401) logout()
    return Promise.reject(response.status)
  }
}

/*
* Function to check if http request was successful
*
* @param [Object] response. Http response from server.
* @return [Object] response. Http response from server.
*/
export const parseResponse = (response) => {
  if (response.status >= 200 && response.status < 300 && response.status !== 204) {
    return response.json()
  } else {
    // if (response.status === 401) logout()
    return Promise.reject(response.status)
  }
}
