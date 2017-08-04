function fillLogin() {
    getJSON(backend + '/api/users/current', function(currentUser) {        
        if (currentUser.data != null) {
            window.location.href = "{{ path_for('index') }}";
        }
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'username': '',
                'password': '',
                'rememberMe': false,
                'window': window
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'loginUser': loginUser,
                'logoutUser': logoutUser,
                'findGetParameter': findGetParameter
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateLogin, update_interval);
        $.loadingBlockHide();
    });
}

function updateLogin() {
    getJSON(backend + '/api/users/current', function(currentUser) {
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.window = window;
    });
}