
export const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  handleLoginVisible
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
      <section>
        <button type='submit'>Login</button>
        <button onClick={handleLoginVisible}>cancel</button>
      </section>
    </form>
  )
}
