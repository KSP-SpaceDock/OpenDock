function fillMod() {
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/games/' + gameshort, function(game) {
    getJSON(backend + '/api/games/' + gameshort + '/versions', function(gameversions) {
    getJSON(backend + '/api/mods/' + gameshort + '/' + mod_id, function(mod) {
    getJSON(backend + '/api/users/' + mod.data.user, function(modUser) {
    hasPermission('mod-edit', true, [gameshort, mod_id], function(editable) {
        var mod_users = {}
        mod_users[mod.data.user] = modUser.data;
        mod.data.shared_authors.forEach(function(entry) {
            mod_users[entry.id] = entry;
        });
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'mod': mod.data,
                'game': game.data,
                'game_versions': gameversions.data,
                'mod_users': mod_users,
                'editable': editable,
                'outdated': false,
                'window': window,
                'Enumerable': Enumerable
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'isFollower': isFollower,
                'followMod': followMod,
                'unfollowMod': unfollowMod,
                'updateMod': updateMod,
                'hasPermission': hasPermission,
                'acceptAuthorshipInvite': acceptAuthorshipInvite,
                'rejectAuthorshipInvite': rejectAuthorshipInvite,
                'marked': marked
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateMod, update_interval);
        document.title = mod.data.name + ' on {{ site_name }}';
        $.loadingBlockHide();
    })})})})})});
}

function updateMod() {
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/games/' + gameshort, function(game) {
    getJSON(backend + '/api/games/' + gameshort + '/versions', function(gameversions) {
    getJSON(backend + '/api/mods/' + gameshort + '/' + mod_id, function(mod) {
    getJSON(backend + '/api/users/' + mod.data.user, function(modUser) {
    hasPermission('mod-edit', true, [gameshort, mod_id], function(editable) {
        var mod_users = {}
        mod_users[mod.user] = modUser.data;
        mod.shared_authors.forEach(function(entry) {
            mod_users[entry.id] = entry;
        });
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.mod = mod.data;
        app.$data.game = game.data;
        app.$data.game_versions = gameversions.data;
        app.$data.mod_users = mod_users;
        app.$data.editable = editable;
        app.$data.outdated = false;
        app.$data.window = window;
        app.$data.Enumerable = Enumerable;
    })})})})})});
}