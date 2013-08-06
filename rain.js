(function() {
    var canvas = document.getElementById("main");
    var cxt = canvas.getContext("2d");

    var HEIGHT = canvas.height;
    var WIDTH = canvas.width;
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
                y += 3;
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
                cxt.arc(x, y, splashRadius, 0, 2 * Math.PI);
            }
            cxt.stroke();
        };

        this.isFalling = function() {
            return y < HEIGHT;
        };

        this.isDone = function() {
            return splashRadius > 10 || x > WIDTH + 1;
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
