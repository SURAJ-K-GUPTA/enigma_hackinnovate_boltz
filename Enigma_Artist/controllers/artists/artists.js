const Artist = require('../../models/artist/Artist')
const bcrypt = require("bcryptjs");
const appErr = require('../../utils/appErr');

//register
const resgisterCtrl = async (req, res, next) => {
    const { fullname, email, password } = req.body
    //check if field is empty
    if (!fullname || !email || !password) {
        // return next(appErr("All fields are required"))
        return res.render('artists/register', {
            error: "All fields are required",
        })
    }
    try {
        //1. check if artist exist (email)
        const artistFound = await Artist.findOne({ email })
        //throw an error
        if (artistFound) {
            // return next(appErr('Artist already Exist'))
            return res.render('artists/register', {
                error: "Artist already Exist",
            })
        }
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(password, salt)

        //register artist
        const artist = await Artist.create({
            fullname,
            email,
            password: passwordHashed,
        });
        //redirect
        res.redirect('/api/v1/artists/login')
    } catch (error) {
        res.json(error);
    }
};

//login
const loginCtrl = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        // return next(appErr("Email and password fields are required"));
        return res.render('artists/login', {
            error: "Email and password fields are required",
        })
    }
    try {
        //check if email exist
        const artistFound = await Artist.findOne({ email });
        if (!artistFound) {
            //throw an error
            // return next(appErr("Invalid Artist Credentials"))
            return res.render('artists/login', {
                error: "Invalid Artist Credentials",
            })
        }
        //verify password
        const isPasswordValid = await bcrypt.compare(password, artistFound.password)
        if (!isPasswordValid) {
            //throw an error
            // return next(appErr("Invalid Artist Credentials"))
            return res.render('artists/login', {
                error: "Invalid Artist Credentials",
            })
        }
        //save the artist into session
        req.session.artistAuth = artistFound;
        //redirect
        res.redirect('/api/v1/artists/profile-page')

    } catch (error) {
        res.json(error);
    }
};

//details
const artistDetailsCtrl = async (req, res) => {
    try {
        //get artistId from params
        const artistId = req.params.id
        //find the artist
        const artist = await Artist.findById(artistId)

        res.render("artists/updateArtist", {
            artist,
            error: "",
        })
    } catch (error) {
        res.render("artists/updateArtist", {
            artist:null,
            error: error.message,
        })
    }
}

//profile
const profileCtrl = async (req, res) => {
    try {
        //get the login artist
        const artistID = req.session.artistAuth;
        //find the artist
        const artist = await Artist.findById(artistID).populate('arts').populate("comments");
        res.render('artists/profile', { artist })
    } catch (error) {
        res.json(error);
    }
}

//upload profile photo
const uploadProfilePhotoCtrl = async (req, res) => {
    try {
        // Check if file exists in the request
        if (!req.file) {
            return res.render('artists/uploadProfilePhoto', {
                error: "Please upload an image"
            });
        }

        // Find the artist to be updated
        const artistId = req.session.artistAuth;
        const artistFound = await Artist.findById(artistId);

        // Check if artist is found
        if (!artistFound) {
            return res.render('artists/uploadProfilePhoto', {
                error: "Artist not found"
            });
        }

        // Update profile photo
        await Artist.findByIdAndUpdate(artistId, {
            profileImage: req.file.path,
        }, {
            new: true,
        });

        // Redirect to profile page
        res.redirect('/api/v1/artists/profile-page');
    } catch (error) {
        // Render the upload form with the error message
        res.render('artists/uploadProfilePhoto', {
            error: error.message,
        });
    }
}


//upload cover photo
const uploadCoverPhotoCtrl = async (req, res) => {

    try {//check if file exist
        if (!req.file) {
            res.render('artists/uploadProfilePhoto', {
                error: "Please upload image"
            })
        }
        //1. Find the artist to be updated
        const artistId = req.session.artistAuth;
        const artistFound = await Artist.findById(artistId);
        //2. Check if artist is found
        if (!artistFound) {
            res.render('artists/uploadProfilePhoto', {
                error: "Artist not found"
            })
        }
        //3. Update cover photo
        await Artist.findByIdAndUpdate(artistId, {
            coverImage: req.file.path,
        }, {
            new: true,
        });
        //redirect
        res.redirect('/api/v1/artists/profile-page')


    } catch (error) {
        res.render('artists/uploadProfilePhoto', {
            error: error.message,
        })
    }
}

//update password
const updatePasswordCtrl = async (req, res, next) => {
    const { password } = req.body;
    try {
        //Check if artist is updation the password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            //update artist
            await Artist.findByIdAndUpdate(
                req.session.artistAuth,
                {
                    password: passwordHashed,
                },
                {
                    new: true,
                }
            );
            //redirect
            res.redirect('/api/v1/artists/profile-page')

        }

    } catch (error) {
        res.render('artists/updatePassword', {
            error: error.message,
        })
    }
}

//update artist
const updateArtistCtrl = async (req, res, next) => {
    const { fullname, email, role, bio } = req.body;

    try {
        if (!fullname || !email) {
            res.render('artists/updateArtist', {
                error: "Please provide details",
                artist,
            })
        }
        //Check if email is not taken
        if (email!==req.session.artistAuth.email) {
            const emailTaken = await Artist.findOne({ email });
            if (emailTaken) {
                res.render('artists/updateArtist', {
                    error: "Email is Taken",
                    artist,
                })
            }
        }
        //update the artist
        await Artist.findByIdAndUpdate(req.session.artistAuth, {
            fullname,
            email,
            role,
            bio,
        }, {
            new: true,
        })
        //redirect
        res.redirect('/api/v1/artists/profile-page')

    } catch (error) {
        res.render('artists/updateArtist', {
            error: error.message,
            artist: "",
        })
    }
}

//logout
const logoutCtrl = async (req, res) => {
    try {
        //destroy session
        req.session.destroy(() => {
            res.redirect('/api/v1/artists/login');
        })
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    resgisterCtrl,
    loginCtrl,
    artistDetailsCtrl,
    profileCtrl,
    uploadProfilePhotoCtrl,
    uploadCoverPhotoCtrl,
    updatePasswordCtrl,
    updateArtistCtrl,
    logoutCtrl
}