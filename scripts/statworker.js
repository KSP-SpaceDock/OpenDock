var colors;
var months;
var processDownloads;
var processFollowers;
var thirty_days_ago = null;
var versions = null;

importScripts("{{ path_for('scripts', {'filename': 'underscore.min.js'}) }}");

months = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

colors = [
    ['rgba(222,93,93,0.7)', 'rgba(179,74,74,1)'],
    ['rgba(93,222,93,0.7)', 'rgba(74,177,74,1)'],
    ['rgba(93,93,222,0.7)', 'rgba(74,74,177,1)'],
    ['rgba(222,158,93,0.7)', 'rgba(177,126,74,1)'],
    ['rgba(222,93,222,0.7)', 'rgba(177,74,177,1)'],
    ['rgba(222,222,93,0.7)', 'rgba(177,177,74,1)'],
    ['rgba(93,222,222,0.7)', 'rgba(74,177,177,1)']
];

self.addEventListener('message', function(e) {
    switch (e.data.action) {
      case "set_versions":
        return versions = e.data.data;
      case "set_timespan":
        return thirty_days_ago = e.data.data;
      case "process_downloads":
        return processDownloads(e.data.data);
      case "process_followers":
        return processFollowers(e.data.data);
    }
}, false);

function processDownloads(download_stats) {
    var color = 0;
    var entries = [];
    var key = [];
    var labels = [];
        
    var i;
    var j;
    for (i = j = 0; j <= 30; i = ++j) {
        var a = new Date(thirty_days_ago.getTime());
        a.setDate(a.getDate() + i);
        labels.push(months[a.getMonth()] + " " + (a.getDate()));
    }
    for (var k = 0, len = versions.length; k < len; k++) {
        var l = 0;
        var v = versions[k];
        var data = [];
        for (i = l = 0; l <= 30; i = ++l) {
            var a = new Date(thirty_days_ago.getTime());
            a.setDate(a.getDate() + i);
            var events = _.filter(download_stats, function(d) {
                var b = new Date(d.created);
                return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && d.version === v.id;
            });
            var downloads = 0;
            if (events != null) {
                downloads = _.reduce(events, function(m, e) {
                    return m + e.downloads;
                }, 0);
            }
            data.push(downloads);
        }
        if (_.some(data, function(d) { return d !== 0; })) {
            entries.push({
                fillColor: colors[color][0],
                pointColor: colors[color][1],
                pointStrokeColor: '#fff',
                pointHighlightFill: colors[color][0],
                pointHighlightStroke: '#fff',
                data: data
            });
            key.push({
                name: v.friendly_version,
                color: colors[color][0]
            });
            color++;
            if (color >= colors.length) {
                color = 0;
            }
        }
    }
    entries.reverse();
    key.reverse();
    postMessage({
        action: "downloads_ready",
        data: {
            key: key,
            entries: entries,
            labels: labels
        }
    });
}

function processFollowers(follower_stats) {
    var i, j, k;
    var labels = [];
    var entries = [];
    var color = 0;
    for (i = j = 0; j <= 30; i = ++j) {
        var a = new Date(thirty_days_ago.getTime());
        a.setDate(a.getDate() + i);
        labels.push(months[a.getMonth()] + " " + (a.getDate()));
    }
    var data = [];
    for (i = k = 0; k <= 30; i = ++k) {
        a = new Date(thirty_days_ago.getTime());
        a.setDate(a.getDate() + i);
        var events = _.filter(follower_stats, function(d) {
            var b = new Date(d.created);
            return a.getDate() === b.getDate() && a.getMonth() === b.getMonth();
        });
        var delta = 0;
        if (events != null) {
            delta = _.reduce(events, function(m, e) {
                return m + e.delta;
            }, 0);
        }
        data.push(delta);
    }
    if (_.some(data, function(d) { return d !== 0; })) {
        entries.push({
            fillColor: colors[color][0],
            strokeColor: colors[color][1],
            pointColor: colors[color][1],
            pointStrokeColor: '#fff',
            data: data
        });
        color++;
        if (color >= colors.length) {
            color = 0;
        }
    }
    entries.reverse();
    postMessage({
        action: "followers_ready",
        data: {
            entries: entries,
            labels: labels
        }
    });
};

