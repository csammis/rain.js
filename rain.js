(function() {
    var canvas = document.getElementById("main");
    var cxt = canvas.getContext("2d");

    // Set up constants
    var HEIGHT = canvas.height;
    var WIDTH = canvas.width;
    var SPLASH_SIZE = 20;
    var FALLING_STOP = HEIGHT - (SPLASH_SIZE / 4);

    cxt.fillStyle = "#ffffff";

    function raindrop(init_x, init_y, init_wind, init_length) {
        var x = init_x, 
            y = init_y,
            wind = init_wind, 
            length = init_length,
            splashRadius = 2;

        this.update = function() {
            if (this.isFalling())
            {
                y += 4;
                x += wind;
            }
            else
            {
                splashRadius++;
            }

            if (this.isDone())
            {
                raindrops.remove(this);
            }
        };

        this.draw = function() {
            cxt.beginPath();
            if (this.isFalling())
            {
                cxt.moveTo(x, y);
                cxt.lineTo(x + wind, y + length);
                cxt.lineWidth = 2;
            }
            else
            {
                cxt.save();
                cxt.translate(x - splashRadius, y - (splashRadius / 4));
                cxt.scale(splashRadius, splashRadius / 4);
                cxt.arc(1, 1, 1, 0, 2 * Math.PI);
                cxt.restore();
            }
            cxt.stroke();
        };

        this.isFalling = function() {
            return y < FALLING_STOP;
        };

        this.isDone = function() {
            return splashRadius > SPLASH_SIZE || x > WIDTH + 1;
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
