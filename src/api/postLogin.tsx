// Implementation code where T is the returned data shape
export function postLogin(url: string, username: string, password: string): Promise<User> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ "username": username, "password": password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}

/*

    // Consumer
    postLogin<{ title: string; message: string }>('http://localhost:3000/auth/login')
      .then(({ title, message }) => {
        console.log(title, message)
        setToken(token)
      })
      .catch(error => {
        // show error message
      })
    
    postLogin<User>('http://localhost:3000/auth/login', username, password)
      .then(({ token }) => {
        console.log(token)
        this.setState({ token: token })
      })
      .catch(error => {
        // show error message
        console.log(error)
        this.setState({ error: error })
      })
*/