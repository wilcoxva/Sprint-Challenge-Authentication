const router = require('express').Router();

const bcrypt = require("bcryptjs");

const model = require("./auth-model");

router.post('/register', (req, res) => {
  const userInfo = req.body;

  const ROUNDS = 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS)

  userInfo.password = hash;

  if (!userInfo.username) {
    res.json({ message: "No username" })
  }

  if (!userInfo.password) {
    res.json({ message: "No password" })
  }

  model.add(userInfo)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  model.findBy(username)
  .then(([user]) => {
      if(user && bcrypt.compareSync(password, user.password)) {
          req.session.user = {
              id: user.id,
              username: user.username
          };
            
          res.status(200).json({ hello: user.username });
      } else {
          res.status(401).json({ message: "invalid credentials" });
      }
  }).catch(error => {
      res.status(500).json({ errormessage: "error finding the user" });
  })
});

module.exports = router;
