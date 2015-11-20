module.exports = function(app, passport) {

    app.get('/', function(req, res){
        res.sendFile('html/index.html', { root : './client' })
    });

    app.get('/login', function(req, res) {
        res.sendFile('html/login.html', { root: './client', message: req.flash('loginMessage')}); 
    });

    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true
    }));
    
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.sendFile('html/signup.html', { message: req.flash('signupMessage'), root: './client' });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(req.user)
        // res.send(req.user)
        res.sendFile('html/profile.html', {
            root: './client' // get the user out of session and pass to template
        });
    });

    app.get('/user', isLoggedIn, function(req, res){
        console.log(req.user)
        res.send("hello")
    })

    // =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
	   passport.authenticate('facebook', {
	       successRedirect : '/profile',
	       failureRedirect : '/'
	   }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}