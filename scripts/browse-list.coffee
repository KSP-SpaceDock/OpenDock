$(document).ready () ->
    window.userContext (done) -> 
        if !search && page > 1
            $('#previous-button').attr('href', url + '?page=' + (page - 1))
        $.getJSON backend + '/api/mods/' + gameshort, (data) ->
            if !search && page < (data.count / 30)
                $('#next-button').attr('href', url + '?page=' + (page + 1))
        if url == '/browse/new'
            $.getJSON backend + '/api/browse/' + gameshort + '/new?site=' + page + '&count=30', (data) ->
                $.each data.data, (index, element) ->
                    $('#modcontainer').append(mod_box(element))
                    done()
        if url == '/browse/updated'
            $.getJSON backend + '/api/browse/' + gameshort + '/updated?site=' + page + '&count=30', (data) ->
                $.each data.data, (index, element) ->
                    $('#modcontainer').append(mod_box(element))
                    done()
        if url == '/browse/top'
            $.getJSON backend + '/api/browse/' + gameshort + '/top?site=' + page + '&count=30', (data) ->
                $.each data.data, (index, element) ->
                    $('#modcontainer').append(mod_box(element))
                    done()
        if url == '/browse/featured'
            $.getJSON backend + '/api/browse/' + gameshort + '/featured?site=' + page + '&count=30', (data) ->
                $.each data.data, (index, element) ->
                    $('#modcontainer').append(mod_box(element.mod))
                    done()
        $('#nosearchresult').hide() # Temp
        
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