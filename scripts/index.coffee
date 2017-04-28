$(document).ready () ->
    window.userContext (done) ->    
        $.getJSON backend + '/api/mods/' + gameshort, (data) ->
            if window.user == null
                $('#mod-count-nologin').text(data.count)
            else
                $('#mod-count-login').text(data.count)
        $.getJSON backend + '/api/users', (data) ->
            if window.user == null
                $('#user-count-nologin').text(data.count)
            else
                $('#user-count-login').text(data.count - 1)
        $.getJSON backend + '/api/browse/' + gameshort, (data) ->
            $.each data.data.featured, (index, element) ->                    
                if index > 2 && window.user != null
                    return
                $('#featured-row').append(mod_box(element.mod))
            $.each data.data.top, (index, element) ->
                $('#top-row').append(mod_box(element))
            $.each data.data.updated, (index, element) ->
                $('#recent-row').append(mod_box(element))
            $.each data.data.new, (index, element) ->
                $('#new-row').append(mod_box(element))
            if data.data.yours.length > 2
                $('#yours-row-wrapper').show()
                $('#featured-div-edit-me').attr('style', 'margin-bottom: 0; margin-top: 20px;')
                $.each data.data.yours, (index, element) ->
                    $('#yours-row').append(mod_box(element))
            else                
                $('#yours-row-wrapper').hide()
            done()
        
        # Current user
        if window.user != null
            $('#username-display').text(window.user.username)
            $('#user-profile-link').attr('href', '{{ path_for("profile", {"filename": ""}) }}' + window.user.username); 
            $('#login-container').show()
            $('#noLogin-container').hide()
            $('#about-wrapper').hide()   
            $('#row-login').show()
            $('#row-noLogin').hide()   
        else
            $('#login-container').hide()
            $('#noLogin-container').show()
            $('#about-wrapper').show()     
            $('#row-login').hide()
            $('#row-noLogin').show()


mod_box = (mod) ->
    '<div class="item col-md-4">
    <div class="thumbnail">
        <div class="ksp-update">KSP ' + mod.default_version.gameversion.friendly_version + '</div>
        ' + (if window.user != null && mod.id in window.user.following then '<div class="following-mod">Following</div>' else '') + '
        <a href="{{ url_for("mods.mod", id=mod.id, mod_name=mod.name) }}">
            <div class="header-img" style="
            ' + (if !mod.meta.hasOwnProperty('background') then 'background-image: url(/static/background.png);' else 'background-image: url(' + backend + mod.meta['background'].replace(/.jpg/g, '_thumb.jpg').replace(/.png/g, '_thumb.png') + ');') + '
            "></div>
        </a>
        <div class="caption">
            <h2 class="group inner list-group-item-heading">
                ' + mod.name + '
            </h2>
            <p style="height: 75px; overflow: hidden;">
            ' + mod.short_description + '
            </p>
        </div>
    </div>
</div>'        
    