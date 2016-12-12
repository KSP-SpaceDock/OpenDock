$(document).ready () ->
    $.getJSON backend + '/api/mods/' + gameshort + '?callback=?', (data) ->
        $('#mod-count').text(data.count);
    $.getJSON backend + '/api/users?callback=?', (data) ->
        $('#user-count').text(data.count);