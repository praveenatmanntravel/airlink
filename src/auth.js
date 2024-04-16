var express = require('express');
var validator = require('validator');
const mongodbClient = require('./_helpers/db');
const { ObjectId } = require("mongodb");
require('dotenv').config()


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
    delete req.session.postBackMsg
  }


  return res.send(`
<!doctype html>
<html lang="en">

  <head>
    <meta charset="utf-8" />
    <title>Log In | Airlink Services Group</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
    <meta content="Coderthemes" name="author" />

    <!-- App favicon -->
    <link rel="shortcut icon" href="/images/favicon.ico">

    <!-- Theme Config Js -->
    <script src="/js/hyper-config.js"></script>

    <!-- App css -->
    <link href="/css/app-saas.css" rel="stylesheet" type="text/css" id="app-style" />

    <!-- Icons css -->
    <link href="/css/icons.min.css" rel="stylesheet" type="text/css" />
  </head>

  <body class="authentication-bg position-relative">
  <!-- Pre-loader -->
  <div id="preloader">
      <div id="status">
          <div class="bouncing-loader"><div ></div><div ></div><div ></div></div>
      </div>
  </div>
  <!-- End Preloader-->
  <div class="position-absolute start-0 end-0 start-0 bottom-0 w-100 h-100">
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 800 800'>
          <g fill-opacity='0.22'>
              <circle style="fill: rgba(var(--ct-primary-rgb), 0.1);" cx='400' cy='400' r='600'/>
              <circle style="fill: rgba(var(--ct-primary-rgb), 0.2);" cx='400' cy='400' r='500'/>
              <circle style="fill: rgba(var(--ct-primary-rgb), 0.3);" cx='400' cy='400' r='300'/>
              <circle style="fill: rgba(var(--ct-primary-rgb), 0.4);" cx='400' cy='400' r='200'/>
              <circle style="fill: rgba(var(--ct-primary-rgb), 0.5);" cx='400' cy='400' r='100'/>
          </g>
      </svg>
  </div>
  <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-xxl-4 col-lg-5">
              <div class="card">

                  <!-- Logo -->
                  <div class="card-header py-3 text-center bg-primary ">
                      <a href="#">
                          <span><img src="/images/logo/${process.env.LOGO}.png" class="rounded" alt="logo" height="45"></span>
                      </a>
                  </div>
                  
                  <div class="card-body p-4">
                      ${_postBackMsg}
                      ${JSON.stringify(req.session?.postBackMsg) ?? ''}
                      <form action="" method="POST" class="">
                          <div class="mb-3">
                              <label for="companyname" class="form-label">Company</label>
                              <select class="form-select" name="agency" >
                                ${_agentsOption}
                              </select>
                          </div>
                          <div class="mb-3">
                              <label for="emailaddress" class="form-label">Email address</label>
                              <input type="email" class="form-control" name="email" >
                          </div>

                          <div class="mb-3">
                              <a href="forgot-password.html" class="text-muted float-end"><small>Forgot your password?</small></a>
                              <label for="password" class="form-label">Password</label>
                              <div class="input-group input-group-merge">
                                  <input type="password"  id="password" class="form-control"  name="password" placeholder="Enter your password">
                                  <div class="input-group-text" data-password="false">
                                      <span class="password-eye"></span>
                                  </div>
                              </div>
                          </div>

                          <div class="mb-3 mb-3">
                              <div class="form-check">
                                  <input type="checkbox" class="form-check-input" id="checkbox-signin" checked>
                                  <label class="form-check-label" for="checkbox-signin">Remember me</label>
                              </div>
                          </div>

                          <div class="mb-3 mb-0 text-center">
                              <button type="submit" class="btn btn-primary" type="submit">Log In</button>
                          </div>

                      </form>
                  </div> <!-- end card-body -->
              </div>
              <!-- end card -->
              <!-- end row -->

          </div> <!-- end col -->
      </div>
      <!-- end row -->
  </div>
  <!-- end container -->
</div>
        <footer class="footer footer-alt">
            <script>document.write(new Date().getFullYear())</script> © AIRLINK. All rights reserved.
        </footer>
        <!-- Vendor js -->
        <script src="/js/vendor.min.js"></script>
        
        <!-- App js -->
        <script src="/js/app.min.js"></script>
</body>
</html>
`)
});

router.post('/', async function (req, res, next) {

  var post = req.body;
  const { email, agency, password } = post;
  console.log('email', email, 'password', password)
  if (validator.isEmail(email) && /*ObjectId.isValid(agent), */ password.length > 2 /* && password.length < 10 */ ) {
    const _user = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('users').findOne({ agency: new ObjectId(agency), email: email, password: password });
    console.log('_user', _user)
    if (_user != null) {

      req.session.auth = _user;

      const _agency = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('agency').findOne({ _id: new ObjectId(agency), status: `Active` });
      console.log('_agency', { _id: new ObjectId(agency), status: `Active` }, _agency)
      req.session.agency = _agency;

      const _interface = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('interface').find({ type: 'nav', agency: _user.agency }, { projection: { agency: 0 }, }).sort({ disp_seq: 1 }).toArray();
      req.session.interface = _interface

      console.log(_interface);
      if (_interface.length > 0) {
        return res.redirect(`/${_interface[0]._id}`)
      } else {
        // not authrised
        return res.send('No interfaces defined')
      }
      console.log(req.session)
      return res.redirect(`/`)

    } else {
      postBackMsg = { t: 'warning', h: 'Credential not found', time: Date() }
      req.session['postBackMsg'] = postBackMsg;
      return res.redirect('/auth')
    }
  } else {
    postBackMsg = { t: 'warning', h: 'Validation Error!', time: Date() }
    req.session['postBackMsg'] = postBackMsg;
    return res.redirect('/auth')
  }
})

router.get('/remove', async function (req, res, next) {
  req.session.auth = null
  postBackMsg = { t: 'info', h: 'Logout Successfully!', time: Date() }
  req.session['postBackMsg'] = postBackMsg;
  return res.redirect('/auth')
})

module.exports = router;
