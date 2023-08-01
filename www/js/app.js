var $ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
  name: 'sample game', // App name
  theme: 'auto', // Automatic theme detection
  colors: {
    primary: '#000000',
  },

  el: '#app', // App root element

  // App store
  store: store,
  // App routes
  routes: routes,



  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova,
    scrollIntoViewCentered: device.cordova,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});
// Login Screen Demo
$('#my-login-screen .login-button').on('click', function () {
  var username = $('#my-login-screen [name="username"]').val();
  var password = $('#my-login-screen [name="password"]').val();

  // Store login details in local storage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br/>Password: ' + password);
});