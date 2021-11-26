import storage from './storage'

export class LoginAsService {
  login(username) {
    storage.set('adminLoggedInAs', username)

    window.location.reload()
  }

  clear() {
    storage.remove('adminLoggedInAs')

    window.location.reload()
  }

  getUsername() {
    return storage.get('adminLoggedInAs')
  }

  getHeaders() {
    const username = this.getUsername()

    return username ? { 'x-admin-logged-in-as': username } : {}
  }
}

const loginAsService = new LoginAsService()

// eslint-disable-next-line no-underscore-dangle
window.__loginAs__ = loginAsService

export default loginAsService
