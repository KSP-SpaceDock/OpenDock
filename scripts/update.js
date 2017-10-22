function fillUpdate() {
    getJSON(backend + '/api/adapter/mods/' + mod_id, function (mod) {
    if (mod.error) {
        window.location.href = "{{ path_for('not-found') }}";
        return;
    }
    hasPermission('mods-edit', true, {'gameshort': mod.data.game_short, 'modid': mod_id}, function(canUpdate) {
    if (!canUpdate) {
        window.location.href = "{{ path_for('not-found') }}";
        return;
    }
    when(getJSON(backend + '/api/users/current'), 
         getJSON(backend + '/api/games/' + mod.data.game_short + '/versions')).
    done(function(currentUser, gameversions) {        
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'game_versions': gameversions.data,
                'mod': mod.data,
                'window': window
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'logoutUser': logoutUser,
                'onUploadClick': onUploadClick,
                'selectFile': selectFile,
                'onSubmitClick': onSubmitClick
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateUpdate, update_interval);
        window.addEventListener('dragenter', dragNop, false);
        window.addEventListener('dragleave', dragNop, false);
        window.addEventListener('dragover', dragNop, false);
        window.addEventListener('drop', function(e) {
            dragNop(e);
            selectFile(e.dataTransfer.files[0]);
        }, false);
        $('#submit').removeAttr('disabled');
        $.loadingBlockHide();
    })})});
}
    


function updateUpdate() {
    getJSON(backend + '/api/adapter/mods/' + mod_id, function (mod) {
    if (mod.error) {
        window.location.href = "{{ path_for('not-found') }}";
        return;
    }
    hasPermission('mods-edit', true, {'gameshort': mod.data.game_short, 'modid': mod_id}, function(canUpdate) {
    if (!canUpdate) {
        window.location.href = "{{ path_for('not-found') }}";
        return;
    }
    when(getJSON(backend + '/api/users/current'), 
         getJSON(backend + '/api/games/' + mod.data.game_short + '/versions')).
    done(function(currentUser, gameversions) {
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.game_versions = gameversions.data;
        app.$data.window = window;
    })})});
}

function onUploadClick() {
    $('.upload-mod input').click();
}

function dragNop(e) {
    e.stopPropagation();
    e.preventDefault();
}

var zipFile;
var loading = false;

function onSubmitClick(mod) {
    $('.has-error').removeClass('has-error');
    $('#error-alert').addClass('hidden');
    
    var version = $('#mod-version').val();
    var gameVersion = $('#mod-game-version').val();
    var changelog = $('#changelog').val();
    var notifyFollowers = $('#notify-followers').is(":checked");
    var isBeta = $('#isBeta').is(":checked");

    var valid = true;
    if (version == '') {
        error('mod-version');
        valid = false;
    }
    if (gameVersion == '') {
        error('mod-game-version');
        valid = false;
    }
    if (zipFile == null) {
        valid = false;
    }

    if (!valid) {
        return;
    }
    if (loading) {
        return;
    }
    loading = true;
    showLoading();

    updateMod(mod, version, gameVersion, notifyFollowers, isBeta, changelog, zipFile, function(i, data) {
        $('#progress').removeClass('active');
        if (!data.error) {
            window.location.href = `{{ path_for("mod.view", {"gameshort": "${gameshort}", "id": "${mod.id}", "name": "${mod.name}"}) }}`;W
            return;
        } else {
            $('#error-alert').removeClass('hidden');
            $('#error-alert').text(data.reasons.join('\n'));
            loading = false;
            $.loadingBlockHide();
        }
    });
}

function selectFile(file) {
    zipFile = file;
    var parent = document.querySelector('.upload-mod');
    parent.querySelector('a').classList.add('hidden');
    var p = document.createElement('p');
    p.textContent = 'Ready.';
    parent.appendChild(p);
}

function error(name) {
    document.getElementById(name).parentElement.classList.add('has-error')
    document.getElementById('error-alert').classList.remove('hidden')
}