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


    function Raindrop(init_x, init_y, init_length) {
        var x = init_x, 
            y = init_y,
            length = init_length,
            splashRadius = 2;

        this.update = function() {
            if (this.isFalling()) {
                y += RAINDROP_VERTICAL_SPEED;
                x += windSpeed;
            } else {
                splashRadius += 2;
            }

            if (this.isDone()) {
                raindrops.remove(this);
            }
        };

        this.draw = function() {
            cxt.beginPath();
            if (this.isFalling()) {
                cxt.moveTo(x, y);
                cxt.lineTo(x + windSpeed, y + length);
                cxt.lineWidth = 2;
            } else {
                cxt.save();
                cxt.translate(x - splashRadius, y - (splashRadius / 4));
                cxt.scale(splashRadius, splashRadius / 4);
                cxt.arc(1, 1, 1, 0, 2 * Math.PI);
                cxt.restore();
                cxt.lineWidth = 1;
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

    function SmallCloudLine() {
        var radius = 20;
        var offset = 0;

        this.update = function() {
            offset += windSpeed / 2;
            if (offset > radius) {
                offset = 0;
            }
        };

        this.draw = function() {
            cxt.fillStyle = "#cccccc";
            for (var i = ((radius / 2) + offset) - radius; i <= WIDTH + radius; i += radius) {
                cxt.beginPath();
                cxt.arc(i, 0, radius, 0, Math.PI * 2);
                cxt.fill();
            }
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

    var smallClouds = new SmallCloudLine();
    function animateSky() {
        smallClouds.draw();
        smallClouds.update();
    };

    function timer() {
        requestAnimationFrame(timer);

        // We got enough rain? Good.
        while (raindrops.size() < raindropCount) {
            var x = Math.floor(Math.random() * WIDTH);
            var y = Math.floor(Math.random() * 150) * -1;
            raindrops.add(new Raindrop(x, y, RAINDROP_MAX_LENGTH));
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
            windSpeed = this.value * 0.1;
            windSpeedValue.html("(" + Math.floor(this.value / 10) + ")");
        });
        $("#windSpeed").val(windSpeed * 10);
        $("#windSpeed").change();
    });

    window.onload = timer();
})();
