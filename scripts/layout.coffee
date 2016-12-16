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

$('#loginSubmit').click (e) ->
    $.loadingBlockShow({
        imgPath: '/static/default.svg',
        text: '',
        style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, .8)',
            left: 0,
            top: 0,
            zIndex: 10000
        }
    });
    window.loginUser($('input#username').val(), $('input#password').val(), $('input#remember-me').is(":checked"), window.location.href)
    
    
window.loginUser = (username, password, remember, returnto) ->    
    $.ajax(backend + "/api/login",{
        data: '{"username":"' + username + '","password":"' + password + '", "remember":' + remember + '}',
        type:"POST",
        xhrFields: { withCredentials:true },
        dataType:"json",
        contentType: "application/json",
        success: (data) ->
            $.loadingBlockHide()
            if data.error
                if '3055' in data.codes
                    window.location.href = '/account-pending'
                text = 'Something went wrong with your login request:<br><br>'
                $.each(data.reasons, (index,element) ->
                    text = text + element + '<br>'
                )
                $.Zebra_Dialog(text, {
                    'type':  'error',
                    'title': 'Login failed!'
                })
            else
                window.location.href = returnto      
        ,error: (xhr,a,b) ->
            $.loadingBlockHide()
            data = $.parseJSON(xhr.responseText);
            if '3055' in data.codes
                window.location.href = '/account-pending'
            text = 'Something went wrong with your login request:<br><br>'
            $.each(data.reasons, (index,element) ->
                text = text + element + '<br>'
            )
            $.Zebra_Dialog(text, {
                'type':  'error',
                'title': 'Login failed!'
            })
    })