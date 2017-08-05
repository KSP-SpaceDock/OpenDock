// Set vue settings
Vue.config.debug = {{ debug }};

// Vue instance
var app = null;
var update_interval = {{ update_interval }};

// <mod-box> - Displays a modbox
Vue.component('mod-box', {
    delimiters: ['${', '}'],
    props: ['mod', 'currentUser'],
    template: '<div class="item col-md-4">\
    <div class="thumbnail">\
        <div class="ksp-update">KSP ${mod.default_version.gameversion.friendly_version}</div>\
        <div class=\"following-mod\" v-if=\"currentUser != null && currentUser.following.hasObject(mod.id)\">Following</div>\
        <a v-bind:href="\'{{ path_for("mod.view", {"id": "<id>", "name": "<name>"}) }}\'.replace(/<id>/, mod.id).replace(/<name>/, mod.name)">\
            <div class="header-img" v-if="mod.meta.hasOwnProperty(\'background\')" v-bind:style="\'background-image: url(//{{ backend_url }}\' + mod.meta[\'background\'].replace(/.jpg/g, \'_thumb.jpg\').replace(/.png/g, \'_thumb.png\') + \');\'"></div>\
            <div class="header-img" v-else style="background-image: url({{ path_for('images', {'filename': 'background.png'}) }});"></div>\
        </a>\
        <div class="caption">\
            <h2 class="group inner list-group-item-heading">\
            ${mod.name}\
            </h2>\
            <p style="height: 75px; overflow: hidden;">\
            ${mod.short_description}\
            </p>\
        </div>\
    </div>\
</div>'
});

Array.prototype.hasObject = (
  !Array.indexOf ? function (o)
  {
    var l = this.length + 1;
    while (l -= 1)
    {
        if (this[l - 1] === o)
        {
            return true;
        }
    }
    return false;
  } : function (o)
  {
    return (this.indexOf(o) !== -1);
  }
);

function findGetParameter(parameterName) {
    var result = null;
    var tmp = [];
    var items = location.search.substr(1).split("&");
    var index = 0;
    while (index < items.length) {
        tmp = items[index].split("=");
        if (tmp[0] == parameterName) {
            result = decodeURIComponent(tmp[1]);
        }
        index++;
    }
    return result;
}

function showLoading() {
    $.loadingBlockShow({
        imgPath: "{{ path_for('images', {'filename': 'default.svg'}) }}",
        text: '',
        style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            background: '#333',
            left: 0,
            top: 0,
            zIndex: 10000
        }
    });
}

function loginUserHotbar() {
    loginUser($('input#username').val(), $('input#password').val(), $('input#remember-me').is(":checked"), window.location.href)
}

// Base method for *JSON methods (get, post, put, delete)
function requestJSON(url, data, method, callback) {
    return $.ajax(url, {
        data: data,
        xhrFields: {
            withCredentials: true
        },
        type: method,
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            if (callback) {
                callback(data);
            }
        },error: function(xhr, a, b) {
            if (callback) {
                callback($.parseJSON(xhr.responseText));
            }
        }
    }).then(null, function(jqXHR, textStatus, errorThrown) {
        return $.parseJSON(jqXHR.responseText);
    }).then(function (data) {
        return data;
    }, function (err) {
        console.log(err);
    });  
}

// Submits a GET request to the URL
function getJSON(url, data, callback) {
    if (callback == null) {
        callback = data;
        data = '';
    }
    return requestJSON(url, '', 'GET', callback);
}

// Submits a POST request to the URL
function postJSON(url, data, callback) {
    if (callback == null) {
        callback = data;
        data = '';
    } else {
        data = JSON.stringify(data);
    }
    return requestJSON(url, data, 'POST', callback);
}

// Submits a PUT request to the URL
function putJSON(url, data, callback) {
    if (callback == null) {
        callback = data;
        data = '';
    } else {
        data = JSON.stringify(data);
    }
    return requestJSON(url, data, 'PUT', callback);
}

// Submits a DELETE request to the URL
function deleteJSON(url, data, callback) {
    if (callback == null) {
        callback = data;
        data = '';
    } else {
        data = JSON.stringify(data);
    }
    return requestJSON(url, data, 'DELETE', callback);
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var c in ca) {
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = ";expires=" + date.toGMTString();
    } else {
        expires = "; expires=session"
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}