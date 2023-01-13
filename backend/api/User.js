const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const createHash = (password, callback) => {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password,
                        salt,
                        null,
                        (error, hash) => callback(hash)
            )
        })
    }
    const save = (req, res) => {
        createHash(req.body.password, hash => {
            const password = hash

            app.db('users')
               .insert({ name: req.body.name,
                         email: req.body.email,
                         password,
                         role: req.body.role,
                         status: req.body.status                 
               })
               .then(_ => res.status(204).send())
               .catch(err => res.status(400).json(err))
        })   
    }
}