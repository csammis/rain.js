(function() {
    var canvas = document.getElementById("main");
    var cxt = canvas.getContext("2d");

    var HEIGHT = canvas.height;
    var WIDTH = canvas.width;
    cxt.fillStyle = "#ffffff";

    // Set implementation from http://matt.stumpnet.net/
    function Set(name) {
        var setName = name, index = 0, count = 0;

        this.size = function() {
            return count;
        };

        this.add = function(item) {
            if (this.contains(item)) {
                return;
            }
            item[setName] = index;
            this[index] = item;
            index++;
            count++;
        };

        this.remove = function(item) {
            if (!this.contains(item)) {
                return;
            }
            delete this[item[setName]];
            delete item[setName];
            count--;
        };

        this.clear = function() {
            for (var p in this) {
                if (this.contains(this[p])) {
                    this.remove(this[p]);
                }
                index = 0;
            }
        };

        this.contains = function(item) {
            return item.hasOwnProperty(setName)
                    && this.hasOwnProperty(item[setName])
                    && item === this[item[setName]];
        };
    };
    
    function raindrop(init_x, init_y, init_wind, init_length) {
        var x = init_x, y = init_y, wind = init_wind, length = init_length;

        this.update = function() {
            y += 3;
            x += wind;

            if (this.isDone())
            {
                raindrops.remove(this);
            }
        };

        this.draw = function() {
            cxt.beginPath();
            cxt.moveTo(x, y);
            cxt.lineTo(x + wind, y + length);
            cxt.stroke();
        };

        this.isDone = function() {
            return y > HEIGHT + 1 || x > WIDTH + 1;
        };
    };

    var raindrops = new Set("raindrops");

    function timer() {
        var t = setTimeout(function () { timer(); }, 2);
        
        while (raindrops.size() < 10) {
            var x = Math.floor(Math.random() * WIDTH);
            var y = Math.floor(Math.random() * 5) * -1;
            raindrops.add(new raindrop(x, y, 1, 10));
        }

        cxt.fillRect(0, 0, canvas.width, canvas.height);
        for (var r in raindrops)
        {
            if (raindrops.hasOwnProperty(r) && raindrops.contains(raindrops[r]))
            {
                raindrops[r].draw();
                raindrops[r].update();
            }
        }
    };

    window.onload = timer();
})();
