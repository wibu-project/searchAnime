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
        $('#searchForm').show()
        $('#signinBtn').hide()
        $('#signoutBtn').show()
        $('#homepage').hide()
        $('#navbar').show()
    })
    .fail(function(err){
        console.log(err)
    })
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    $('#searchForm').hide()
    $('#list-anime').hide()
    $('#list-card').hide()
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem("token")
    }); 
    $('#signinBtn').show()
    $('#signoutBtn').hide()
   
}


