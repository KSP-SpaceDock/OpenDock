function fillIndex() {
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/mods/' + gameshort, function(mods) {
    getJSON(backend + '/api/users', function(users) {
    getJSON(backend + '/api/browse/' + gameshort, function(browse) {
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
                'loginUserHotbar': loginUserHotbar
            }, 
            delimiters: ['${', '}'] 
        }); 
        window.setInterval(updateIndex, update_interval);
        $.loadingBlockHide();
    })})})});
}

function updateIndex() {
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/mods/' + gameshort, function(mods) {
    getJSON(backend + '/api/users', function(users) {
    getJSON(backend + '/api/browse/' + gameshort, function(browse) {
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
    })})})});
}