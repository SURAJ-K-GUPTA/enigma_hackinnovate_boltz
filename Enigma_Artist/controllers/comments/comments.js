const Comment = require("../../models/comment/Comment");
const Art = require("../../models/art/Art");
const Artist = require("../../models/artist/Artist");
const appErr = require("../../utils/appErr");
//create
const createCommentCtrl = async(req, res, next) => {
    const { message } = req.body;
    try {
        //Find the art
        const art = await Art.findById(req.params.id)
        //create the comment
        const comment = await Comment.create({
            artist: req.session.artistAuth,
            message,
            art: art._id,
        });

        //push the comment to art
        art.comments.push(comment._id);
        //find the artist
        const artist = await Artist.findById(req.session.artistAuth._id)
        //push the comment into suer
        artist.comments.push(comment._id);
        //disable validation
        //save
        await art.save({validateBeforeSave : false});
        await artist.save({validateBeforeSave : false});

        //redirect
        res.redirect(`/api/v1/arts/${art._id}`)
    } catch (error) {
        next(appErr(error.message))

    }
}

//single
const commentDetailsCtrl = async(req, res, next) => {
    try {
        //find the comment
        const comment = await Comment.findById(req.params.id)
        res.render('comments/updateComment',{
            comment, error:"",
        })
    } catch (error) {
        res.render('comments/updateComment',{
            comment:"", error:error.message,
        })
    }
}

//delete
const deleteCommentCtrl = async(req, res, next) => {
    try {
        //find the comment
        const comment = await Comment.findById(req.params.id)
        //check if the comment belongs to the artist
        if(comment.artist.toString() !== req.session.artistAuth._id.toString()){
            return next(appErr("You are not allowed to delete this art",403))
        } 
        //delete comment
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        //redirect
        res.redirect(`/api/v1/arts/${req.query.artId}`)
    } catch (error) {
        next(appErr(error.message))

    }
}

const updateCommentCtrl = async(req, res, next) => {
    try {
        //find the comment
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            return next(appErr("Comment Not Found"))
        }
        //check if the comment belongs to the artist
        if(comment.artist.toString() !== req.session.artistAuth._id.toString()){
            return next(appErr("You are not allowed to update this comment",403))
        }
        //update artist

        const commentUpdated = await Comment.findByIdAndUpdate(req.params.id,{
            message : req.body.message,
        },{
            new : true,
        })
        //redirect
        res.redirect(`/api/v1/arts/${req.query.artId}`)
    } catch (error) {
        next(appErr(error))
        
    }
}

module.exports = {
    createCommentCtrl,
    commentDetailsCtrl,
    deleteCommentCtrl,
    updateCommentCtrl
    
}