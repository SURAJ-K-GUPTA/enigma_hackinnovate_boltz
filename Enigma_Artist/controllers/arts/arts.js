const Art = require("../../models/art/Art");
const Artist = require("../../models/artist/Artist");
const appErr = require("../../utils/appErr");
//create
const createArtCtrl =  async(req, res, next) => {
    const {title, description, category, artist} = req.body;
    try {
        if(!title || !description || !category || !req.file){
            return res.render("arts/addArt",{error:"All fields are required"})
        }
        //1. Find the artist
        const artistId = req.session.artistAuth;
        const artistFound = await Artist.findById(artistId);
        //2. Create the art
        const artCreated = await Art.create({
            title,
            description,
            category,
            artist:artistFound._id,
            image: req.file.path,

        });
        //3. push the art created into the array of artist's arts
        artistFound.arts.push(artCreated._id);
        //4. re save
        await artistFound.save(); 
        //redirect
        res.redirect('/api/v1/artists/profile-page')
    } catch (error) {
            return res.render("arts/addArt",{error:error.message})
    }
}

//all
const fetchArtsCtrl = async(req, res, next) => {
    try {
        const arts = await Art.find().populate("comments").populate("artist");

        res.json({
            status : "success",
            artist : "Art list",
            data : arts
        });
    } catch (error) {
        next(appErr(error.message))
    }
}
//details
const fetchArtCtrl = async(req, res, next) => {
    try {
        //get the id from params
        const id = req.params.id
        //find the art
        const art = await Art.findById(id).populate({
            path:"comments",
            populate:{
                path:"artist",
            }
        }).populate("artist");
        res.render("arts/artDetails",{
            art,
            error:""
        })
    } catch (error) {
        next(appErr(error.message))
    }
}

//delete 
const deleteArtCtrl = async(req, res, next) => {
    try {
        //find the art
        const art = await Art.findById(req.params.id)
        //check if the art belongs to the artist
        if(art.artist.toString() !== req.session.artistAuth._id.toString()){
            return res.render('arts/artDetails',{
                error:"You are not authorized to delete this art",
                art,
            })
        } 
        //delete art
        const deletedArt = await Art.findByIdAndDelete(req.params.id);
        //redirect
        res.redirect("/api/v1/artists/profile-page")
    } catch (error) {
        return res.render('arts/artDetails',{
            error:error.message,
            art:""
        })
    }
}
//update
const updateArtCtrl = async(req, res, next) => {
    const {title, description, category} = req.body;

    try {
        //find the art
        const art = await Art.findById(req.params.id)
        //check if the art belongs to the artist
        if(art.artist.toString() !== req.session.artistAuth._id.toString()){
            return res.render('arts/updateArt',{
                art:"",
                error:"You are not authorized to update this art",
            })
        }
        //check if artist is updating
        //update artist
        if(req.file){


        const artUpdated = await Art.findByIdAndUpdate(req.params.id,{
            title,
            description,
            category,
            image: req.file.path
        },{
            new : true,
        })
    }
    else{
        const artUpdated = await Art.findByIdAndUpdate(req.params.id,{
            title,
            description,
            category,
        },{
            new : true,
        })
    }
        //redirect
        res.redirect("/")
    } catch (error) {
        return res.render('arts/updateArt',{
            art:"",
            error:error.message,
        })
        
    }
} 
module.exports = {
    createArtCtrl,
    fetchArtsCtrl,
    fetchArtCtrl,
    deleteArtCtrl,
    updateArtCtrl,
    
}
