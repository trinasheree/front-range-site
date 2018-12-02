var express = require("express");
var router  = express.Router();
var Gallery = require("../models/gallery");
var middleware = require("../middleware");


//INDEX - show all gallerys
router.get("/", function(req, res){
    // Get all gallerys from DB
    Gallery.find({}, function(err, allGallery){
       if(err){
           console.log(err);
       } else {
          res.render("gallery/index",{gallery:allGallery});
       }
    });
});

//CREATE - add new gallery to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to gallerys array
    var name = req.body.name;
    var image = req.body.image;
    var album = req.body.album;    
    var year = req.body.year;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newGallery = {name: name, image: image, album: album, year: year, description: desc,  author:author}
    // Create a new gallery and save to DB
    Gallery.create(newGallery, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            //redirect back to gallerys page
            console.log(newlyCreated);
            res.redirect("/gallery");
        }
    });
});

//NEW - show form to create new gallery
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("gallery/new"); 
});

// SHOW - shows more info about one gallery
router.get("/:id", function(req, res){
    //find the gallery with provided ID
    Gallery.findById(req.params.id).populate("comments").exec(function(err, foundgalleries){
        if(err){
            console.log(err);
        } else {
            console.log(foundgalleries)
            //render show template with that gallery
            res.render("gallery/show", {gallery:foundgalleries});
        }
    });
});

// EDIT gallery ROUTE
router.get("/:id/edit", middleware.checkGalleryOwnership, function(req, res){
    Gallery.findById(req.params.id, function(err, foundGallery){
        res.render("gallery/edit", {gallery: foundGallery});
    });
});

// UPDATE gallery ROUTE
router.put("/:id",middleware.checkGalleryOwnership, function(req, res){
    // find and update the correct gallery
    Gallery.findByIdAndUpdate(req.params.id, req.body.gallery, function(err, updatedGallery){
       if(err){
           res.redirect("/gallery");
       } else {
           //redirect somewhere(show page)
           res.redirect("/gallery/" + req.params.id);
       }
    });
});

// DESTROY gallery ROUTE
router.delete("/:id",middleware.checkGalleryOwnership, function(req, res){
   Gallery.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/gallery");
      } else {
          res.redirect("/gallery");
      }
   });
});



module.exports = router;