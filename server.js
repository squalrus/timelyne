var express      = require( 'express' )
    ,http        = require( 'http' )
    ,path        = require( 'path' )
    ,app         = express()
    ,io
    ,server;

// Environment Settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// Middleware
app.use( express.favicon() );
app.use( express.bodyParser() );
app.use( express.compress() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( express.static( path.join( __dirname, 'lib' ) ) );

// Routing
app.get( '/', function( req, res ){
    res.render( 'index' );
});

app.get( '/basic', function( req, res ){
    res.render( 'basic' );
});


// Create Server
server = http.createServer( app )

// Start Server
server.listen( app.get( 'port' ), function( ){
    console.log( 'Server listening on port ' + app.get( 'port' ) );
});
