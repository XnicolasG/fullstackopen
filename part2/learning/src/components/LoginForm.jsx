
export const LoginForm = ({
    handleLogin, 
    username, 
    setUsername, 
    password, 
    setPassword
}) => {
  return (
    <form onSubmit={handleLogin}>
    <div>
      Username
      <input
        type="text"
        value={username}
        name='username'
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      Password
      <input
        type="text"
        value={password}
        name='password'
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type='submit'>Login</button>
  </form>
  )
}
