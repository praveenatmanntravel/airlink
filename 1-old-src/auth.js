var express = require('express');
var validator = require('validator');
const mongodbClient = require('./_helpers/db');
const { ObjectId } = require("mongodb");


var router = express.Router();
/* GET home page. */
router.get('/', async function (req, res, next) {

  var _agents = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('agency').find({}).toArray();
  var _agentsOption = '';
  _agents.forEach((x, i) => {
    _agentsOption += `<option value="${x._id}">${x.name}</option>`;
  })

  var _postBackMsg = '';
  if (req.session?.postBackMsg) {
    _postBackMsg = `
  <div class="alert alert-${req.session?.postBackMsg?.t} alert-dismissible fade show  mb-3" role="alert">
    ${req.session?.postBackMsg?.h}
    <button type="button" class="btn-close btn-sm " data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  }


  res.send(`
<!doctype html>
<html lang="en">

  <head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link rel="stylesheet" href="/stylesheets/5.3.0-alpha3_dist_css_bootstrap.min.css">
    <link rel="stylesheet" href="/stylesheets/font-awesome_6.3.0_css_all.min.css">
  </head>

<body class="m-0 p-0 align-items-center" style="background-image: linear-gradient(to right, rgb(156, 3, 3), rgb(1, 1, 121));">

  <div style="max-width: 444px; width:99%; min-height: 444px;" class="bg-white mx-auto my-5 shadow border rounded p-3">
    <div class="d-flex flex-column">
      <img src="https://airlinkservicesgroup.com.au/images/logo.jpg" width="100px" />
      <h3 class="fw-bold" >Sign in to your account</h3>
      ${_postBackMsg}
      ${JSON.stringify(req.session?.postBackMsg)}
      <form action="" method="POST" class="">
        <input type="hidden" name="do" value="auth" />
        <div class="mb-3">
          <label class="form-label">Company</label>
          <select class="form-select" name="agent" >
            ${_agentsOption}
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control" name="email" >
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control"  name="password" >
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" >
          <label class="form-check-label">Remember Me</label>
        </div>
        <button type="submit" class="btn btn-primary ms-auto">Submit</button>
      </form>
    </div>
  </div>
  <script src="/javascripts/5.3.0-alpha3_dist_js_bootstrap.bundle.min.js"></script>
</body>
</html>
`)
});

router.post('/', async function (req, res, next) {

  var post = req.body;
  const { email, agent, password } = post;
  console.log('email', email, 'password', password)
  if (validator.isEmail(email) && /*ObjectId.isValid(agent), */ password.length > 2 && password.length < 10) {
    const _user = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('users').findOne({ email: email, password: password });
    console.log('_user', _user)
    if (_user != null) {
      req.session.auth = _user;
      //req.session.cookie.domain = '.localhost'
      console.log(req.session)
      return res.redirect(`/user/myaccounts`)

    } else {
      postBackMsg = { t: 'warning', h: 'Credential not found', time: Date() }
      req.session['postBackMsg'] = postBackMsg;
      return res.redirect('/')
    }
  } else {
    postBackMsg = { t: 'warning', h: 'Validation Error!', time: Date() }
    req.session['postBackMsg'] = postBackMsg;
    return res.redirect('/')
  }
})

router.get('/myaccounts', async function (req, res, next) {
  // check user is login 
  console.log('req.session>>>', req.session)
  if (validator.isEmail(req?.session?.auth?.email)) {
    next()
  } else {
    //return res.redirect(`${process.env.ROOT_DOMAIN}://auth.${process.env.ROOT_DOMAIN}`)
  }
  res.send('as')
})
module.exports = router;