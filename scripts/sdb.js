function loginUser(username, password, remember, returnto) {
    if (returnto == null) {
        returnto = "/";
    }
    showLoading();
    $.ajax(backend + "/api/login", {
        data: '{"username":"' + username + '","password":"' + password + '","remember":' + remember + '}',
        type: "POST",
        xhrFields: { withCredentials:true },
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            $.loadingBlockHide();
            if (data.error) {
                if (data.codes.hasObject(3055)) {
                    window.location.href = "/account-pending";
                }
                var text = "";
                $.each(data.reasons, function(index,element) {
                    text = text + element + "<br>";
                });
                $.Zebra_Dialog(text, {
                    'type': 'error',
                    'title': 'Login failed!'
                });
                $.loadingBlockHide();
            } else {
                window.location.href = returnto;
            }
        },error: function(xhr, a, b) {
            $.loadingBlockHide();
            var data = $.parseJSON(xhr.responseText);
            if (data.codes.hasObject(3055)) {
                window.location.href = "/account-pending";
            }
            var text = "";
            $.each(data.reasons, function(index,element) {
                text = text + element + "<br>";
            });
            $.Zebra_Dialog(text, {
                'type':  'error',
                'title': 'Login failed!'
            });
            $.loadingBlockHide();
        }
    });
}

function resetPassword(email) {
    if (email == "" || email == null) {
        return
    }
    showLoading();
    $.ajax(backend + "/api/reset", {
        data: '{"email":"' + email + '"}',
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            $.loadingBlockHide();
            if (data.error) {
                var text = "";
                if (data.codes.hasObject(2520)) {
                    text = "You didn't provide an email address<br>";
                }
                if (data.codes.hasObject(2115)) {
                    text = "Double check your email address, we don't recognize you.<br>";
                }
                $.Zebra_Dialog(text, {
                    'type': 'error',
                    'title': 'Password reset failed!'
                });
            } else {
                app.$data.resetSuccessfull = true;
            }
            $.loadingBlockHide();
        },error: function(xhr, a, b) {
            var data = $.parseJSON(xhr.responseText);
            var text = "";
            if (data.codes.hasObject(2520)) {
                text = "You didn't provide an email address<br>";
            }
            if (data.codes.hasObject(2115)) {
                text = "Double check your email address, we don't recognize you.<br>";
            }
            $.Zebra_Dialog(text, {
                'type': 'error',
                'title': 'Password reset failed!'
            });
            $.loadingBlockHide();
        }
    });
}

function isFollower(user, mod) {
    user.following.forEach(function(entry) {
        if (entry == mod.id) {
            return true;
        }
    });
    return false;
}

function followMod(user, mod, callback) {
    if (user == null) {
        window.location.href = "path_for('register')";
        return;
    }
    getJSON(backend + '/api/mods/' + gameshort + '/' + mod.id + '/follow', callback)
}

function unfollowMod(mod, callback) {
    getJSON(backend + '/api/mods/' + gameshort + '/' + mod.id + '/unfollow', callback);
}

function hasPermission(permission, pub, params, callback) {
    postJSON(backend + "/api/access/check", extend({"permission": permission, "public": pub, "params": Object.keys(params)}, params), function(data) {
        callback(!data.error);
    });
}

function acceptAuthorshipInvite(user, mod, callback) {
    postJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/grant/accept', callback);
}

function rejectAuthorshipInvite(user, mod, callback) {
    postJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/grant/reject', callback);
}

function editVersion(mod, version, edit) {
    // TODO(Thomas): Add the route in SDB
}

function deleteVersion(mod, version, callback) {
    deleteJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/versions', {'version-id': version.id}, callback);
}

function deleteMod(mod, callback) {
    deleteJSON(backend + '/api/mods', {'modid': mod.id, 'gameshort': mod.game_short}, callback);
}