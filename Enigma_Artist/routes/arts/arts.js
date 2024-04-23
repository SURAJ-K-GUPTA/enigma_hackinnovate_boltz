const express=require('express');
const multer = require("multer");
const storage = require('../../config/cloudinary');
const {
        createArtCtrl,
        fetchArtsCtrl,
        fetchArtCtrl,
        deleteArtCtrl,
        updateArtCtrl
    } = require('../../controllers/arts/arts');

const artRoutes=express.Router();
const protected = require('../../middlewares/protected');
const Art = require('../../models/art/Art');

//isntance of multer
const upload = multer({
    storage,
})

//forms

artRoutes.get('/get-art-form',(req,res)=>{
    res.render('arts/addArt',{error:""})
})

artRoutes.get('/get-form-update/:id',async (req,res)=>{
    try {
        const art = await Art.findById(req.params.id)
        res.render('arts/updateArt',{art, error:""});
    } catch (error) {
        res.render('arts/updateArt',{error,art:""})
    }
})
//POST/api/v1/arts
artRoutes.post('/',protected, upload.single('file'), createArtCtrl);

//GET/api/v1/arts
artRoutes.get('/', fetchArtsCtrl);

//GET/api/v1/arts/:id
artRoutes.get('/:id', fetchArtCtrl);

//DELETE/api/v1/arts/:id
artRoutes.delete('/:id', protected, deleteArtCtrl);

//PUT/api/v1/arts/:id
artRoutes.put('/:id', protected, upload.single('file'), updateArtCtrl);



module.exports = artRoutes;