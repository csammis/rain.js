(function() {
    var canvas = document.getElementById("main");
    var cxt = canvas.getContext("2d");

    // Set up constants
    var HEIGHT = canvas.height;
    var WIDTH = canvas.width;
    var SPLASH_SIZE = 20;
    var FALLING_STOP = HEIGHT - (SPLASH_SIZE / 4);
    var RAINDROP_VERTICAL_SPEED = 10;
    var RAINDROP_MAX_LENGTH = 10;

    // Adjustable variables
    var raindropCount = 25;
    var windSpeed = 1;


    function raindrop(init_x, init_y, init_wind, init_length) {
        var x = init_x, 
            y = init_y,
            wind = init_wind, 
            length = init_length,
            splashRadius = 2;

        this.update = function() {
            if (this.isFalling()) {
                y += RAINDROP_VERTICAL_SPEED;
                x += wind;
            } else {
                splashRadius++;
            }

            if (this.isDone()) {
                raindrops.remove(this);
            }
        };

        this.draw = function() {
            cxt.beginPath();
            if (this.isFalling()) {
                cxt.moveTo(x, y);
                cxt.lineTo(x + wind, y + length);
                cxt.lineWidth = 2;
            } else {
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

    function animateRain() {
        for (var r in raindrops) {
            if (raindrops.hasOwnProperty(r) && raindrops.contains(raindrops[r])) {
                raindrops[r].draw();
                raindrops[r].update();
            }
        }
    };

    function animateSky() {
        cxt.fillStyle = "#cccccc";
        cxt.fillRect(0, 0, WIDTH, 20);
    };

    function timer() {
        requestAnimationFrame(timer);

        // We got enough rain? Good.
        while (raindrops.size() < raindropCount) {
            var x = Math.floor(Math.random() * WIDTH);
            var y = Math.floor(Math.random() * 150) * -1;
            raindrops.add(new raindrop(x, y, windSpeed, RAINDROP_MAX_LENGTH));
        }

        cxt.fillStyle = "#ffffff";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        animateRain();
        animateSky();
    };

    $(function() {
        // Bind the sliders to the respective labels and variables
        var raindropCountValue = $("#raindropCountValue");
        $("#raindropCount").change(function () {
            raindropCount = this.value * 1.0;
            raindropCountValue.html("(" + this.value + ")");
        });
        $("#raindropCount").val(raindropCount);
        $("#raindropCount").change();

        var windSpeedValue = $("#windSpeedValue");
        $("#windSpeed").change(function() {
            windSpeed = this.value * 1.0;
            windSpeedValue.html("(" + this.value + ")");
        });
        $("#windSpeed").val(windSpeed);
        $("#windSpeed").change();
    });

    window.onload = timer();
})();
