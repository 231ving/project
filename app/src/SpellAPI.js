// Name: Phuc Le

const apiURL = 'http://localhost:3001'

export default class SpellAPI {

  static fetchSpells() {
    // You can configure a delay on the API if you 
    // want to see what happens if the server is slow.
    return fetch(`${apiURL}/spells?delay=1`).then(response => {
      return response.json()
    })
  }

  static fetchCollectionsWithSpell(spell) {
    // You can configure a delay on the API if you 
    // want to see what happens if the server is slow.
    let parameters = new URLSearchParams(spell).toString()
    return fetch(`${apiURL}/spells/:id/collections?${parameters}`).then(async response => {
      return response.json()
    })
  }

  static fetchCollectionsWithOutSpell(spell) {
    // You can configure a delay on the API if you 
    // want to see what happens if the server is slow.
    let parameters = new URLSearchParams(spell).toString()
    return fetch(`${apiURL}/spells/:id/not_collections?${parameters}`).then(async response => {
      return response.json()
    })
  }

  static fetchsearchSpells(spell) {
    // You can configure a delay on the API if you 
    // want to see what happens if the server is slow.
    let parameters = new URLSearchParams(spell).toString()
    return fetch(`${apiURL}/spells_search?${parameters}`).then(response => {
      return response.json()
    })
  }

  static addSpell(spell, user) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({item: spell, user: user})
    }
    console.log('Attempting to post new spell')
    //console.log(spell)

    return fetch(`${apiURL}/spells/`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok')
        return response.json()
      } else {
        console.log('There was a error')
        throw new Error(`Problem with POST:  ${(await response.json()).message}`)
      }
    })
  }

  static modifySpell(spell, user) {
    if (!spell.id) {
      throw new Error('spell must have an id to update')
    }

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({item: spell, user: user})
    }
    console.log('Attempting to post modification to spell')
    console.log(spell)

    return fetch(`${apiURL}/spells/${spell.id}`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok')
        return response.json()
      } else {
        console.log('There was a error')
        throw new Error(`Problem with POST:  ${(await response.json()).message}`)
      }
    })
  }

  static deleteSpell(spell, user) {
    if (!spell.id) {
      throw new Error('spell must have an id to update')
    }

    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({item: spell, user: user})
    }
    console.log('Attempting to delete spell')
    console.log(spell)

    return fetch(`${apiURL}/spells/${spell.id}`, options).then(async response => {
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