const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="text"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="submit" type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
