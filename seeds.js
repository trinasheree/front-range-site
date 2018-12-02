var mongoose = require("mongoose");
var Gallery = require("./models/gallery");
var Comment   = require("./models/comment");

var data = [
    {
        Name: "Cumulonimbus",
        Image: "https://images.unsplash.com/photo-1508697014387-db70aad34f4d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=68ed213f4a28b499c2173f546575895d&auto=format&fit=crop&w=500&q=60",
        album: "Head in the Clouds",
        year: "2018",
        description: "A strike of lightning through the dark colored cumulonimbus clouds."
   }
    // {
    //     name: "Canyon Floor", 
    //     image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    // }
]

function seedDB(){
   //Remove all gallerys
   Gallery.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed gallery!");
         //add a few gallerys
        data.forEach(function(seed){
            Gallery.create(seed, function(err, gallery){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a gallery");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                gallery.comments.push(comment);
                                gallery.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;