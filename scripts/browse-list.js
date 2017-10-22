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
    when(getJSON(backend + '/api/users/current'), 
         getJSON(backend + '/api/mods/' + gameshort), 
         getJSON(backend + browseURL)).
    done(function(currentUser, mods, browse) {
        app = new Vue({
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
                'logoutUser': logoutUser
            },
            delimiters: ['${', '}']
        });
        window.setInterval(updateBrowseList, update_interval);
        $.loadingBlockHide();
    });
}

function updateBrowseList() {
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
    when(getJSON(backend + '/api/users/current'), 
         getJSON(backend + '/api/mods/' + gameshort), 
         getJSON(backend + browseURL)).
    done(function(currentUser, mods, browse) {
        app.$data.currentUser = currentUser.error ? null : currentUser.data;
        app.$data.mods = mods;
        app.$data.browse = browse;
        app.$data.window = window;
        app.$data.page = page;
        app.$data.url = url;
        app.$data.search = search;
    });
}