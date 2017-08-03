function fillMod() {
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/mods/' + gameshort + '/' + mod_id, function(mod) {
    if (mod.error) {
        window.location.href = "{{ path_for('not-found') }}";
    }
    getJSON(backend + '/api/games/' + gameshort, function(game) {
    getJSON(backend + '/api/games/' + gameshort + '/versions', function(gameversions) {
    getJSON(backend + '/api/users/' + mod.data.user, function(modUser) {
    getJSON(backend + '/api/mods/' + gameshort + '/' + mod_id + '/stats/downloads', function(download_stats) {
    getJSON(backend + '/api/mods/' + gameshort + '/' + mod_id + '/stats/follower', function(follower_stats) {
    getJSON(backend + '/api/featured/' + gameshort, function(featured) {
    hasPermission('mods-edit', true, {'gameshort': gameshort, 'modid': mod_id}, function(editable) {
    hasPermission('mods-remove', true, {'gameshort': gameshort, 'modid': mod_id}, function(deletable) {
    hasPermission('mods-feature', true, {'gameshort': gameshort}, function(featureable) {
        var mod_users = {}
        mod_users[mod.data.user] = modUser.data;
        mod.data.shared_authors.forEach(function(entry) {
            mod_users[entry.id] = entry;
        });
        var isFeatured = false;
        featured.data.forEach(function(entry) {
            if (entry.mod_id == mod.data.id) {
                isFeatured = true;
            }
        });
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'mod': mod.data,
                'game': game.data,
                'game_versions': gameversions.data,
                'mod_users': mod_users,
                'editable': findGetParameter('noedit') ? false : editable,
                'deletable': findGetParameter('noedit') ? false : deletable,
                'featureable': findGetParameter('noedit') ? false : featureable,
                'isFeatured': isFeatured,
                'isFollower': currentUser.error ? false : isFollower(currentUser.data, mod.data),
                'outdated': false,
                'window': window,
                'Enumerable': Enumerable,
                'version_to_delete': 0,
                'version_to_edit': 0,
                'version_edit_changelog': ''
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'followMod': followMod,
                'unfollowMod': unfollowMod,
                'updateMod': updateMod,
                'hasPermission': hasPermission,
                'acceptAuthorshipInvite': acceptAuthorshipInvite,
                'rejectAuthorshipInvite': rejectAuthorshipInvite,
                'marked': marked,
                'onDownloadLinkClick': onDownloadLinkClick,
                'createCookie': createCookie,
                'editVersionPopup': editVersionPopup,
                'deleteVersionPopup': deleteVersionPopup,
                'deleteVersion': deleteVersion,
                'editVersion': editVersion,
                'deleteMod': deleteMod,
                'featureMod': featureMod,
                'unfeatureMod': unfeatureMod,
                'setDefaultVersion': setDefaultVersion,
            },
            delimiters: ['${', '}']
        });
        activateStats(gameversions.data, download_stats.data, follower_stats.data);
        window.setInterval(updateMod, update_interval);
        document.title = mod.data.name + ' on {{ site_name }}';
        $.loadingBlockHide();
    })})})})})})})})})})});
}

function updateMod() {
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/mods/' + gameshort + '/' + mod_id, function(mod) {
    getJSON(backend + '/api/games/' + gameshort, function(game) {
    getJSON(backend + '/api/games/' + gameshort + '/versions', function(gameversions) {
    getJSON(backend + '/api/users/' + mod.data.user, function(modUser) {    
    getJSON(backend + '/api/featured/' + gameshort, function(featured) {
    hasPermission('mods-edit', true, {'gameshort': gameshort, 'modid': mod_id}, function(editable) {
    hasPermission('mods-remove', true, {'gameshort': gameshort, 'modid': mod_id}, function(deletable) {
    hasPermission('mods-feature', true, {'gameshort': gameshort}, function(featureable) {
        var mod_users = {}
        mod_users[mod.data.user] = modUser.data;
        mod.data.shared_authors.forEach(function(entry) {
            mod_users[entry.id] = entry;
        });        
        var isFeatured = false;
        featured.data.forEach(function(entry) {
            if (entry.mod_id == mod.data.id) {
                isFeatured = true;
            }
        });
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.mod = mod.data;
        app.$data.game = game.data;
        app.$data.game_versions = gameversions.data;
        app.$data.mod_users = mod_users;
        app.$data.editable = findGetParameter('noedit') ? false : editable;
        app.$data.deletable = findGetParameter('noedit') ? false : deletable;
        app.$data.featureable = findGetParameter('noedit') ? false : featureable;
        app.$data.isFeatured = isFeatured;
        app.$data.isFollower = currentUser.error ? false : isFollower(currentUser.data, mod.data);
        app.$data.outdated = false;
        app.$data.window = window;
        app.$data.Enumerable = Enumerable;
    })})})})})})})})});
}

function onDownloadLinkClick(user) {
    if (readCookie('do-not-offer-registration') == null && user == null) {
        setTimeout(function() {
            $("#register-for-updates").modal()
        }, 2000);
    }
}

function editVersionPopup(version) {
    if (version == null) {
        $("#editVersionDismiss").click();
        return;
    }
    app.$data.version_to_edit = version.id;
    app.$data.version_edit_changelog = version.changelog;
    $('#version-edit-modal').modal();
}

function deleteVersionPopup(version) {
    if (version == null) {
        $("#deleteVersionDismiss").click();
        return;
    }
    app.$data.version_to_delete = version.id;
    $('#confirm-delete-version').modal();
}