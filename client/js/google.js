function onSignIn(googleUser) {
    const idToken= googleUser.getAuthResponse().id_token
    $.ajax({
        url: `http://localhost:3000/users/glogin`,
        type: 'POST',
        data: {
            idToken
        }
    })
    .done(function(data){
        localStorage.setItem('token', data.token)
    })
    .fail(function(err){
        console.log(err)
    })
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem("token")
    }); 
   
}


