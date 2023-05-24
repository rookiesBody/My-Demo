const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router()


router.post("/user/add", UserController.addUser)

router.post('/user/update/:id',UserController.updateUser)

router.get('/user/delete/:id', UserController.deleteUser)

router.get('/user/list', UserController.getUser)

//登录校验
router.post('/login', UserController.login)

router.get('/logout', (req, res) => {
  // 销毁session
  req.session.destroy(() => {
    res.send({
      status: 1,
    })
  })
})

module.exports = router