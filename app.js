var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require('connect-flash'),
    passport   = require('passport'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override'),
    Campground = require('./models/campground'),
    Comment    = require('./models/comment'),
    User       = require('./models/user'),
    seedDB     = require('./seeds');

// requiring routes
var commentRoutes    = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes      = require('./routes/index')

console.log(process.env.DATABASEURL)

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"

mongoose.connect(url);
// mongoose.connect("mongodb://Mitchell:password@ds053688.mlab.com:53688/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: "Once again, Rusty wins cutest dog",
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(passport.initialize())
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
})

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
//     description: "This is a hunge granite hill, no bathrooms. No Water. Beautiful granite!"
//   }, function(err, campground) {
//     if(err){
//       console.log(err)
//     } else {
//       console.log("Newly created campground: ")
//       console.log(campground)
//     }
//   }
// )

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// ===========================================================

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started");
})

