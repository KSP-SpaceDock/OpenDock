function registerUser(email, username, password, repeatPassword, callback) {
    showLoading();
    postJSON(backend + '/api/users', {'email': email, 'username': username, 'password': password, 'repeatPassword': repeatPassword}, function(data) {
        var emailError = null;
        var usernameError = null;
        var passwordError = null;
        var repeatPasswordError = null;
        if (!data.error) {
            window.location.href = "{{ path_for('accounts.account_pending') }}";
            return;
        }
        if (data.codes.hasObject(4000)) {
            emailError = data.reasons[data.codes.indexOf(4000)];
        }
        if (data.codes.hasObject(4010)) {
            usernameError = data.reasons[data.codes.indexOf(4010)];
        }
        if (data.codes.hasObject(2515)) {
            passwordError = data.reasons[data.codes.indexOf(2515)];
        }
        if (data.codes.hasObject(3005)) {
            repeatPasswordError = data.reasons[data.codes.indexOf(3005)];
        }
        if (data.codes.hasObject(2101)) {
            passwordError = data.reasons[data.codes.indexOf(2101)];
        }
        if (data.codes.hasObject(2102)) {
            passwordError = data.reasons[data.codes.indexOf(2102)];
        }
        callback(emailError, usernameError, passwordError, repeatPasswordError);
        $.loadingBlockHide();
    });
}

function loginUser(username, password, remember, returnto) {
    if (returnto == null) {
        returnto = "{{ path_for('index') }}";
    }
    showLoading();
    $.ajax(backend + "/api/login", {
        data: '{"username":"' + username + '","password":"' + password + '","remember":' + remember + '}',
        type: "POST",
        xhrFields: { withCredentials:true },
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            if (data.error) {
                if (data.codes.hasObject(3055)) {
                    window.location.href = "{{ path_for('accounts.account_pending') }}";
                    return;
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
            var data = $.parseJSON(xhr.responseText);
            if (data.codes.hasObject(3055)) {
                window.location.href = "{{ path_for('accounts.account_pending') }}";
                return;
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

function logoutUser(user, callback) {
    if (user == null) {
        return;
    }
    postJSON(backend + '/api/logout', callback);
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
    var found = false;
    user.following.forEach(function(entry) {
        if (entry == mod.id) {
            found = true;
        }
    });
    return found;
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
    return $.ajax(backend + '/api/access/check', {
        data: JSON.stringify(extend({"permission": permission, "public": pub, "params": Object.keys(params)}, params)),
        xhrFields: {
            withCredentials: true
        },
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            if (callback) {
                callback(!data.error);
            }
        },error: function(xhr, a, b) {
            if (callback) {
                callback(!$.parseJSON(xhr.responseText).error);
            }
        }
    }).then(function (data) {
        return !data.error;
    }, function(jqXHR, textStatus, errorThrown) {
        return !jqXHR.responseJSON.error;
    });
}

function acceptAuthorshipInvite(user, mod, callback) {
    postJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/grant/accept', callback);
}

function rejectAuthorshipInvite(user, mod, callback) {
    postJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/grant/reject', callback);
}

function editVersion(mod, versionid, edit, callback) {
    putJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/versions/' + versionid, edit, function(data) { 
        if (data.error) {
            $.Zebra_Dialog('Your request failed. You may have submitted a changelog that is too long. (10000 chars)', {
                'type': 'error',
                'title': 'Version update failed!'
            });
        }
        callback(data);
    });
}

function deleteVersion(mod, version, callback) {
    deleteJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/versions', {'version-id': version.id}, callback);
}

function deleteMod(mod, callback) {
    deleteJSON(backend + '/api/mods', {'modid': mod.id, 'gameshort': mod.game_short}, callback);
}

function featureMod(mod, callback) {
    postJSON(backend + '/api/featured/' + mod.game_short, {'modid': mod.id}, callback);
}

function unfeatureMod(mod, callback) {
    deleteJSON(backend + '/api/featured', {'modid': mod.id, 'gameshort': mod.game_short}, callback);
}

function setDefaultVersion(mod, version, callback) {
    console.log(callback);
    postJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/versions/' + version.id + '/set-default', callback);
}

function publishMod(mod, callback) {
    postJSON(backend + '/api/mods/' + mod.game_short + '/' + mod.id + '/publish', callback);
}

function createMod(name, gameshort, shortDescription, license, version, gameVersion, _zipFile, callback) {
    postJSON(backend + '/api/mods', {'name': name, 'gameshort': gameshort, 'license': license}, function(data) {
        if (data.error) {
            callback(0, data.data.id, data);
            return;
        }
        putJSON(backend + '/api/mods/' + gameshort + '/' + data.data.id, {'short_description': shortDescription}, function(_data) {
            if (_data.error) {
                callback(1, data.data.id, _data);
                return;
            }
            postJSON(backend + '/api/mods/' + gameshort + '/' + data.data.id + '/versions', {
                'version': version,
                'game-version': gameVersion,
                'notify-followers': false, 
                'is-beta': false
            }, function(__data) {
                if (__data.error) {
                    callback(2, data.data.id, __data);
                }
                var form = new FormData();
                form.append("file", _zipFile);
                $.ajax(backend + '/upload/' + __data.data.token, {
                    data: form,
                    xhrFields: {
                        withCredentials: true
                    },
                    type: "POST",
                    processData: false,
                    contentType: false,
                    success: function(retData) {
                        callback(3, data.data.id, retData);
                    },error: function(xhr, a, b) {
                        callback(3, data.data.id,  xhr.responseJSON);
                    }
                });
            });
        });
    });
}

function updateMod(mod, version, gameVersion, notifyFollowers, isBeta, changelog, _zipFile, callback) {
    postJSON(backend + '/api/mods/' + gameshort + '/' + mod.id + '/versions', {
        'version': version,
        'game-version': gameVersion,
        'notify-followers': notifyFollowers, 
        'is-beta': isBeta,
        'changelog': changelog
    }, function(data) {
        if (data.error) {
            callback(0, data);
        }
        var form = new FormData();
        form.append("file", _zipFile);
        $.ajax(backend + '/upload/' + data.data.token, {
            data: form,
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            processData: false,
            contentType: false,
            success: function(retData) {
                callback(1, retData);
            },error: function(xhr, a, b) {
                callback(1, xhr.responseJSON);
            }
        });
    });
}

function confirmUserManually(user, callback) {
    postJSON(backend + '/api/admin/manual-confirmation/' + user.id, callback);
}

function makeUserPublic(user, callback) {
    putJSON(backend + '/api/users/' + user.id, {'public': true}, callback);
}

function impersonateUser(user, callback) {
    postJSON(backend + '/api/admin/impersonate/' + user.id, callback);
}