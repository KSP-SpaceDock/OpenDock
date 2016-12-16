$(document).ready () ->
    window.userContext (done) ->   
        if window.user != null
            $('#user-login').show()
            $('#user-noLogin').hide()
            $('#usernameDisplay').html('Welcome, ' + window.user.username + ' <b class="caret"></b>')
            $('#view-user-profile').attr('href', '/profile/' + window.user.username)
            $('#edit-user-profile').attr('href', '/profile/' + window.user.username + '/edit')
        else
            $('#user-login').hide()
            $('#user-noLogin').show()
            $('#return_to').val(window.location.href)            