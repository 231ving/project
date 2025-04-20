// Name: Phuc Le

const apiURL = 'http://localhost:3001'

export default class ConnectionAPI {

  static fetchConnections() {
    // You can configure a delay on the API if you 
    // want to see what happens if the server is slow.
    console.log('Fetching')
    return fetch(`${apiURL}/connections?delay=1`).then(response => {
      return response.json()
    })
  }

  static addConnection(connection, user) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({item: connection, user: user})
    }
    console.log('Attempting to post new connection')
    console.log(connection)

    return fetch(`${apiURL}/connections/`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok')
        return response.json()
      } else {
        console.log('There was a error')
        throw new Error(`Problem with POST:  ${(await response.json()).message}`)
      }
    })
  }

  static deleteConnection(connection, user) {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({item: connection, user: user})
    }
    console.log('Attempting to post delete to connection')
    console.log(connection)

    return fetch(`${apiURL}/connections/${connection.id}`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok')
        return response.json()
      } else {
        console.log('There was a error')
        throw new Error(`Problem with POST:  ${(await response.json()).message}`)
      }
    })
  }
}