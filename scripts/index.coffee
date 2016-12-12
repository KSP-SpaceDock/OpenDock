$(document).ready () ->
    $.getJSON backend + '/api/mods/' + gameshort + '?callback=?', (data) ->
        $('#mod-count').text(data.count);