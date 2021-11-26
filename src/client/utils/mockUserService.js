import storage from './storage'

const FALLBACK_USER = {
  username: 'mluukkai',
  firstName: 'Matti',
  lastName: 'Luukkainen',
  email: 'matti.luukkainen@helsinki.fi',
}

export class MockUserService {
  constructor({ fallbackUser = FALLBACK_USER } = {}) {
    this.fallbackUser = fallbackUser
  }

  getUser() {
    return storage.get('mockUser') ?? this.fallbackUser
  }

  getHeaders() {
    const { username, firstName, lastName, email } = this.getUser()

    return {
      uid: username,
      givenname: firstName,
      sn: lastName,
      mail: email,
    }
  }

  setUser(user) {
    storage.set('mockUser', user)

    window.location.reload()
  }
}

const mockUserService = new MockUserService()

// eslint-disable-next-line no-underscore-dangle
window.__mockUser__ = mockUserService

export default mockUserService
