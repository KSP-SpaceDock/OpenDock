function fillRegister() {
    getJSON(backend + '/api/users/current', function(currentUser) {
        if (!currentUser.error) {
            window.location.href = "{{ path_for('index') }}";
            return
        }
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'emailError': null,
                'usernameError': null,
                'passwordError': null,
                'repeatPasswordError': null,
                'email': '',
                'username': '',
                'password': '',
                'repeatPassword': '',
                'window': window
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'registerUser': registerUser
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateRegister, update_interval);
        $.loadingBlockHide();
    });
}

function updateRegister() {
    getJSON(backend + '/api/users/current', function(currentUser) {
        if (!currentUser.error) {
            window.location.href = "{{ path_for('index') }}";
            return
        }
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.window = window;
    });
}