function fillLayout() {
    getJSON(backend + '/api/users/current', function(currentUser) {
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'window': window
            },
            methods: {
                'loginUserHotbar': loginUserHotbar
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateLayout, update_interval);
        $.loadingBlockHide();
    });
}

function updateLayout() {
    getJSON(backend + '/api/users/current', function(currentUser) {
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.window = window;
    });
}