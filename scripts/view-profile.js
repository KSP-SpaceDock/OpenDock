function fillViewProfile() {    
    getJSON(backend + '/api/users/' + user_id, function(user) { 
    if (user.error) {
        window.location.href = "{{ path_for('not-found') }}";
    }
    when(getJSON(backend + '/api/users/current'),
           hasPermission('user-edit', false, {'userid': user_id}),
           hasPermission('admin-impersonate', true, {'userid': user_id}),
           hasPermission('admin-confirm', true, {}),
           hasPermission('view-users-full', false, {})).
      done(function (currentUser, editable, canImpersonate, canConfirm, viewFull) {
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'user': user.data,
                'editable': editable,
                'canImpersonate': canImpersonate,
                'canConfirm': canConfirm,
                'viewFull': viewFull,
                'window': window
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'logoutUser': logoutUser,
                'marked': marked,
                'confirmUserManually': confirmUserManually,
                'makeUserPublic': makeUserPublic,
                'impersonateUser': impersonateUser
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateViewProfile, update_interval);
        document.title = user.data.username + ' on {{ site_name }}';
        $.loadingBlockHide();
    })});
}

function updateViewProfile() {
    getJSON(backend + '/api/users/' + user_id, function(user) { 
    if (user.error) {
        window.location.href = "{{ path_for('not-found') }}";
    }
    when(getJSON(backend + '/api/users/current'),
           hasPermission('user-edit', false, {'userid': user_id}),
           hasPermission('admin-impersonate', true, {'userid': user_id}),
           hasPermission('admin-confirm', true, {}),
           hasPermission('view-users-full', false, {})).
      done(function (currentUser, editable, canImpersonate, canConfirm, viewFull) {
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.user = user.data;
        app.$data.editable = editable;
        app.$data.canImpersonate = canImpersonate;
        app.$data.canConfirm = canConfirm;
        app.$data.viewFull = viewFull;
        app.$data.window = window;
        document.title = user.data.username + ' on {{ site_name }}';
    })});
}