$(document).ready () ->
    window.userContext (done) ->  
        $.getJSON backend + '/api/mods/' + gameshort + '/' + mod_id, (data) ->
            if data.error
                window.location.href = '/not-found' # 404
            else
                $('#modname').attr('title', data.data.name)
                if data.data.meta.hasOwnProperty('ckan') && data.data.meta['ckan'] == true
                    $('#modname').html(data.data.name + '\n<span class="badge" title="This mod is listed in CKAN.">CKAN</span>')
                else
                    $('#modname').text(data.data.name)
                if data.data.meta.hasOwnProperty('background')
                    $('#backgroundHeader').attr('style', 'background-image: url(' + backend + data.data.meta['background'] + ')')
                $('#download-link-primary').attr('href', backend + '/api/mods/' + gameshort + '/' + mod_id + '/download/' + data.data.default_version.friendly_version)
                $('#modLicense').attr('title', data.data.license)
                $('#modLicense').html($('#modLicense').html() + '\n' + data.data.license)
                $('#modVersion').html($('#modVersion').html() + '\n' + data.data.default_version.game_version)
            done()
            
            if window.user == null
                $('#downloadWrapper').attr('class', 'col-md-4')
            else
                $('#downloadWrapper').attr('class', 'col-md-2')
                

