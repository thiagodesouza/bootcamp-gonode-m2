const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user || !(await user.checkPassword(password))) {
      req.flash('error', 'Invalid credentials')
      return res.redirect('/')
    }

    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  async destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      res.redirect('/')
    })
  }
}

module.exports = new SessionController()
