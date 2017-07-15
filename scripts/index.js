function fillIndex() {
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/mods/' + gameshort, function(mods) {
    getJSON(backend + '/api/users', function(users) {
    getJSON(backend + '/api/browse/' + gameshort, function(browse) {
        new Vue({
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
                'showLoading': showLoading
            },
            delimiters: ['${', '}']
        });
        $.loadingBlockHide();
    })})})});
}