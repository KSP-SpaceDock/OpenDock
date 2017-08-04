function fillCreate() {
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/games/' + gameshort + '/versions', function(gameversions) {
        if (currentUser.error) {
            window.location.href = "{{ path_for('accounts.login') }}";
            return;
        }
        app = new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'game_versions': gameversions.data,
                'window': window
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'logoutUser': logoutUser,
                'onLicenseChange': onLicenseChange,
                'onUploadClick': onUploadClick,
                'selectFile': selectFile,
                'onSubmitClick': onSubmitClick
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateCreate, update_interval);
        window.addEventListener('dragenter', dragNop, false);
        window.addEventListener('dragleave', dragNop, false);
        window.addEventListener('dragover', dragNop, false);
        window.addEventListener('drop', function(e) {
            dragNop(e);
            selectFile(e.dataTransfer.files[0]);
        }, false);
        $('#submit').removeAttr('disabled');
        $('[data-toggle="tooltip"]').tooltip();
        $.loadingBlockHide();
    })});
}

function updateCreate() {
    getJSON(backend + '/api/users/current', function(currentUser) {    
    getJSON(backend + '/api/games/' + gameshort + '/versions', function(gameversions) {
        if (currentUser.error) {
            window.location.href = "{{ path_for('accounts.login') }}";
            return;
        }
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.game_versions = gameversions.data;
        app.$data.window = window;
    })});
}

function onLicenseChange() {
    var license = $('#mod-license').val()
    if (license == 'Other') {
        $('#mod-other-license').removeClass('hidden');
    } else {
        $('#mod-other-license').addClass('hidden');
    }
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

function onSubmitClick() {
    $('.has-error').removeClass('has-error');
    $('#error-alert').addClass('hidden');

    var name = $('#mod-name').val()
    var shortDescription = $('#mod-short-description').val();
    var license = $('#mod-license').val();
    if (license == "Other") {
        license = $('#mod-other-license').val()
    }
    var version = $('#mod-version').val();
    var gameVersion = $('#mod-game-version').val();
    var ckan = $('#ckan').is(":checked");

    var valid = true;
    if (name == '') {
        error('mod-name');
        valid = false;
    }
    if (shortDescription == '') {
        error('mod-short-description');
        valid = false;
    }
    if (license == '') {
        error('mod-license');
        valid = false;
    }
    if (version == '') {
        error('mod-version');
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

    createMod(name, gameshort, shortDescription, license, version, gameVersion, zipFile, function(i, data) {
        $('#progress').removeClass('active');
        if (!data.error) {
            
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