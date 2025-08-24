export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token)
}

export const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

export const removeAuthToken = () => {
  localStorage.removeItem('authToken')
}

export const isUserAuthenticated = () => {
  const token = getAuthToken()
  return !!token && token !== 'undefined' && token !== 'null' && token !== '[]'
}

export const setUserInfo = (userData) => {
  localStorage.setItem('userInfo', JSON.stringify(userData))
}

export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

export const removeUserInfo = () => {
  localStorage.removeItem('userInfo')
}

export const clearAuthData = () => {
  removeAuthToken()
  removeUserInfo()
}

export const saveAuthData = (responseData) => {
  if (responseData.user && responseData.user.token) {
    setAuthToken(responseData.user.token)
    setUserInfo(responseData.user)
  }
}

export const getValidToken = () => {
  const token = getAuthToken()
  if (!isUserAuthenticated()) {
    throw new Error('Требуется авторизация. Пожалуйста, войдите в систему.')
  }
  return token
}

export const checkAuthAndRedirect = (router) => {
  if (!isUserAuthenticated()) {
    router.push('/login')
    return false
  }
  return true
}
