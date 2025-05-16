import PropTypes from "prop-types"

export const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
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
      </section>
    </form>
  )
}

LoginForm.prototypes = {
  handleLogin:PropTypes.func.isRequired,
  handleLoginVisible:PropTypes.func.isRequired,
  username:PropTypes.string.isRequired,
  setUsername:PropTypes.func.isRequired,
  password:PropTypes.string.isRequired,
  setPassword:PropTypes.func.isRequired,
}