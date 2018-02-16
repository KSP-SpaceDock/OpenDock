function fillIndex() {
    when(getJSON(backend + '/api/users/current'), 
           getJSON(backend + '/api/mods/' + gameshort), 
           getJSON(backend + '/api/users'), 
           getJSON(backend + '/api/browse/' + gameshort)).
      done(function(currentUser, mods, users, browse) {
        app = new Vue({ 
            el: '#site', 
            data: { 
                'currentUser': currentUser.error ? null : currentUser.data, 
                'mods': mods, 
                'users': users, 
                'browse': { 
                    'featured': browse.data.featured, 
                    'top': browse.data.top, 
                    'updated': browse.data.updated, 
                    'new': browse.data.new, 
                    'yours': browse.data.yours 
                }, 
                'window': window 
            }, 
            methods: { 
                'loginUserHotbar': loginUserHotbar,
                'logoutUser': logoutUser
            }, 
            delimiters: ['${', '}'] 
        }); 
        window.setInterval(updateIndex, update_interval);
        $.loadingBlockHide();
    });
}

function updateIndex() {
    when(getJSON(backend + '/api/users/current'), 
           getJSON(backend + '/api/mods/' + gameshort), 
           getJSON(backend + '/api/users'), 
           getJSON(backend + '/api/browse/' + gameshort)).
      done(function(currentUser, mods, users, browse) {
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.mods = mods;
        app.$data.users = users;
        app.$data.browse = {
            'featured': browse.data.featured,
            'top': browse.data.top,
            'updated': browse.data.updated,
            'new': browse.data.new,
            'yours': browse.data.yours
        };
        app.$data.window = window;
    });
}
