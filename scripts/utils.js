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
        <a href="">\
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
        imgPath: '{{ path_for('images', {'filename': 'default.svg'}) }}',
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

// $.getJSON clone that doesn't fail on 403
function getJSON(url, callback) {
    return $.ajax(url, {
        data: '',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            callback(data);
        },error: function(xhr, a, b) {
            callback($.parseJSON(xhr.responseText));
        }
    });    
}