var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment    = require('./models/comment')

var data = [
    {
        name: "Cloud's Rest",
        image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        name: 'Desert Mesa',
        image: 'https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        name: 'Canyon Floor',
        image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("remove campground!");
    })
    // Add a few campgrounds
    data.forEach(function (seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            } else {
                console.log("added a campground")
                // Create a comment
                Comment.create(
                    {
                        text: "This place is great",
                        author: 'Homer'
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        } else {
                            campground.comments.push(comment._id)
                            campground.save()
                            console.log("created new comment")
                        }
                    }
                )
            }
        })
    })
    // Add a few comments
}


module.exports = seedDB;