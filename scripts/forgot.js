function fillForgot() {
    getJSON(backend + '/api/users/current', function(currentUser) {
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'email': '',
                'resetSuccessfull': false,
                'window': window
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'logoutUser': logoutUser,
                'resetPassword': resetPassword
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateForgot, update_interval);
        $.loadingBlockHide();
    });
}

function updateForgot() {
    getJSON(backend + '/api/users/current', function(currentUser) {
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.window = window;
    });
}