const jwt = require('jsonwebtoken')

const createUserToken = async (user, customer, req, res) => {
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '5d'
    }
  )

  const data = {
    email: user.email,
    status: user.status,
    role: user.role,
    customer
  }

  res.status(200).json({
    accessToken: token,
    user: data
  })
}

module.exports = createUserToken
