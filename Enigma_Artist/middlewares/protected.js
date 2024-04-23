const appErr = require("../utils/appErr");

const protected = (req,res,next) =>{
    //check if artist is login
    if(req.session.artistAuth){
        next();
    }
    else{
        res.render('artists/notAuthorize')
    }
};
module.exports = protected