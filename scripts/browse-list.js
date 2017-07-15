function fillBrowseList() {
    var browseURL = "";
    if (url == "/browse/new") {
        browseURL = "/api/browse/" + gameshort + "/new?site=" + page + "&count=30";
    }
    if (url == "/browse/updated") {
        browseURL = "/api/browse/" + gameshort + "/updated?site=" + page + "&count=30";
    }
    if (url == "/browse/top") {
        browseURL = "/api/browse/" + gameshort + "/top?site=" + page + "&count=30";
    }
    if (url == "/browse/featured") {
        browseURL = "/api/browse/" + gameshort + "/featured?site=" + page + "&count=30";
    }    
    getJSON(backend + '/api/users/current', function(currentUser) {
    getJSON(backend + '/api/mods/' + gameshort, function(mods) {
    getJSON(backend + browseURL, function (browse) {
        new Vue({
            el: '#site',
            data: {
                'currentUser': currentUser.error ? null : currentUser.data,
                'mods': mods,
                'browse': browse,
                'window': window,
                'page': page,
                'url': url,
                'search': search
            },
            methods: {
                'loginUserHotbar': loginUserHotbar,
                'showLoading': showLoading
            },
            delimiters: ['${', '}']
        });
        $.loadingBlockHide();
    })})});
}