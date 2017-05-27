$(document).ready () ->
    window.userContext (done) ->  
        if window.findGetParameter('reset') == '1'
            $('#resetNotice').show()
        else
            $('#resetNotice').hide()
        if window.user != null
            window.location.href = '/'
        done()
        
$('#loginSubmit2').click (e) ->
    $.loadingBlockShow({
        imgPath: './static/default.svg',
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
    returnto = window.findGetParameter('return_to')
    if returnto == null
        returnto = '/'
    window.loginUser($('input#username2').val(), $('input#password2').val(), $('input#remember-me2').is(":checked"), returnto)