import cookie from 'react-cookies'

// 获取当前用户cookie
export const myCookieGet = (key) => {
  return cookie.load(key)
}

// 用户登录，保存cookie
export const myCookieSave = (key, value) => {
  cookie.remove(key, {
    path: '/'
  })
  cookie.save(key, value, {
    path: '/'
  })
}

// 用户登出，删除cookie
export const myCookieDel = (key) => {
  cookie.remove(key, {
    path: '/'
  })
}