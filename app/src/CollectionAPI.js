// Name: Phuc Le

const apiURL = 'http://localhost:3001'

export default class CollectionAPI {

  static fetchCollections() {
    // You can configure a delay on the API if you 
    // want to see what happens if the server is slow.
    console.log('Fetching')
    return fetch(`${apiURL}/collections?delay=1`).then(response => {
      return response.json()
    })
  }

  static fetchsearchCollections(collection) {
    // You can configure a delay on the API if you 
    // want to see what happens if the server is slow.
    let parameters = new URLSearchParams(collection).toString()
    return fetch(`${apiURL}/collections_search?${parameters}`).then(response => {
      return response.json()
    })
  }

  static addCollection(collection) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(collection)
    }
    console.log('Attempting to post new collection')
    //console.log(collection)

    return fetch(`${apiURL}/collections/`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok')
        return response.json()
      } else {
        console.log('There was a error')
        throw new Error(`Problem with POST:  ${(await response.json()).message}`)
      }
    })
  }

  static modifyCollection(collection) {
    if (!collection.id) {
      throw new Error('collection must have an id to update')
    }

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(collection)
    }
    console.log('Attempting to post modification to collection')
    console.log(collection)

    return fetch(`${apiURL}/collections/${collection.id}`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok')
        return response.json()
      } else {
        console.log('There was a error')
        throw new Error(`Problem with POST:  ${(await response.json()).message}`)
      }
    })
  }

  static deleteCollection(collection) {
    if (!collection.id) {
      throw new Error('collection must have an id to update')
    }

    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(collection)
    }
    console.log('Attempting to post modification to collection')
    console.log(collection)

    return fetch(`${apiURL}/collections/${collection.id}`, options).then(async response => {
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