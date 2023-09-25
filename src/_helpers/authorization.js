var validator = require('validator');

module.exports = {
    auth: async (req, res, next) => {
        //console.log('req.session>>>', req.session)

        // code to check Agency Active/InActive
        // check to get intercace authrization
        
        if (validator.isEmail(req?.session?.auth?.email || '')) {
            if(req.session.auth?.agency){
                next()
            }else{
                return res.redirect(`/myaccounts`)
            } 
        } else {
            return res.redirect(`/auth`)
        }
    }
}