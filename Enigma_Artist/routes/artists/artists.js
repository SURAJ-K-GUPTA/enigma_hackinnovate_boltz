const express=require('express');
const multer = require('multer');
const storage = require('../../config/cloudinary');

const {
    resgisterCtrl,
    loginCtrl,
    artistDetailsCtrl, 
    profileCtrl, 
    uploadProfilePhotoCtrl, 
    uploadCoverPhotoCtrl, 
    updatePasswordCtrl, 
    updateArtistCtrl, 
    logoutCtrl 
} = require('../../controllers/artists/artists');
const protected = require('../../middlewares/protected');

const artistRoutes=express.Router();

//instance of multer
const upload = multer({storage})

//------
//Rendering forms
//------
//login form
artistRoutes.get('/login',(req,res)=>{
    res.render('artists/login',{
        error:""
    })
})
//register form
artistRoutes.get('/register',(req,res)=>{
    res.render('artists/register',{
        error:""
    })
})

//upload-profile-photo
artistRoutes.get('/upload-profile-photo-form',(req,res)=>{
res.render('artists/uploadProfilePhoto',{error:""})
})
//upload-profile-photo
artistRoutes.get('/upload-Cover-photo-form',(req,res)=>{
    res.render('artists/uploadCoverPhoto',{error:""})
    })
//update artist form
artistRoutes.get('/update-artist-password',(req,res)=>{
res.render('artists/updatePassword',{error:""})
})


//POST/api/v1/artists/register
artistRoutes.post('/register', resgisterCtrl);

//POST/api/v1/artists/login
artistRoutes.post('/login', loginCtrl);


//GET/api/v1/artists/profile/
artistRoutes.get('/profile-page', protected, profileCtrl);

//PUT/api/v1/artists/profile-photo-upload/
artistRoutes.put('/profile-photo-upload/', protected, upload.single('profile'), uploadProfilePhotoCtrl);

//PUT/api/v1/artists/cover-photo-upload/
artistRoutes.put('/cover-photo-upload/',protected, upload.single('cover'), uploadCoverPhotoCtrl);

//PUT/api/v1/artists/update-password
artistRoutes.put('/update-password', updatePasswordCtrl);

//PUT/api/v1/artists/update/:id
artistRoutes.put('/update', updateArtistCtrl)

//GET/api/v1/artists/logout
artistRoutes.get('/logout', logoutCtrl);

//GET/api/v1/artists/:id
artistRoutes.get('/:id', artistDetailsCtrl);






module.exports = artistRoutes;