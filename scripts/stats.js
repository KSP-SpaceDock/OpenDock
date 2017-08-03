function activateStats(versions, download_stats, follower_stats) {
    var worker = new Worker("{{ path_for('scripts', {'filename': 'statworker.js'}) }}");
    worker.addEventListener('message', function(e) {
        switch (e.data.action) {
        case "downloads_ready":
            var data_entries = (e.data.data.entries.length > 0 ? e.data.data.entries : [{
                data:[]
            }]);
            new Chart(document.getElementById('downloads-over-time').getContext("2d")).Line({
                labels: e.data.data.labels,
                datasets: data_entries
            }, {
                animation: false
            });
            var keyUI = document.getElementById('downloads-over-time-key');
            var ref = e.data.data.key;
            var results = [];
            for (var i = 0, len = ref.length; i < len; i++) {
                var k = ref[i];
                var li = document.createElement('li');
                var keyColor = document.createElement('span');
                var keyText = document.createElement('span');
                keyColor.className = 'key-color';
                keyText.className = 'key-text';
                keyColor.style.backgroundColor = k.color;
                keyText.textContent = k.name;
                li.appendChild(keyColor);
                li.appendChild(keyText);
                results.push(keyUI.appendChild(li));
            }
            return results;
            break;
        case "followers_ready":
            var data_entries = (e.data.data.entries.length > 0 ? e.data.data.entries : [{
                data:[]
            }]);
            return new Chart(document.getElementById('followers-over-time').getContext("2d")).Line({
                labels: e.data.data.labels,
                datasets: data_entries
            }, {
                animation: false
            });
        }
    }, false);
    worker.postMessage({
        action: "set_versions",
        data: versions
    });
    var thirty_days_ago = new Date();
    thirty_days_ago.setDate(thirty_days_ago.getDate() - 30);
    worker.postMessage({
        action: "set_timespan",
        data: thirty_days_ago
    });
    worker.postMessage({
        action: "process_downloads",
        data: download_stats
    });
    worker.postMessage({
        action: "process_followers",
        data: follower_stats
    });
  }