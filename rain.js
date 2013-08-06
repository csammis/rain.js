(function() {
    var canvas = document.getElementById("main");
    var cxt = canvas.getContext("2d");

    var HEIGHT = canvas.height;
    var WIDTH = canvas.width;
    cxt.fillStyle = "#ffffff";
    
    function raindrop(init_x, init_y, init_wind, init_length) {
        var x = init_x, y = init_y, wind = init_wind, length = init_length;

        this.update = function() {
            y += 3;
            x += wind;
        };

        this.draw = function() {
            cxt.beginPath();
            cxt.moveTo(x, y);
            cxt.lineTo(x + wind, y + length);
            cxt.stroke();
        };

        this.isDone = function() {
            return y > HEIGHT + 1;
        };
    };

    var r = new raindrop(100, 0, 1, 10);

    function timer() {
        var t = setTimeout(function () { timer(); }, 2);
        cxt.fillRect(0, 0, canvas.width, canvas.height);
        r.update();
        r.draw();
        if (r.isDone()) {
            clearTimeout(t);
        }
    };

    window.onload = timer();
})();
