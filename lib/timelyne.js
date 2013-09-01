var timelyne = function(options) {

    'use strict';

    var fps                 = 16.667,
        second              = 1000,
        // minute              = 1000 * 60,
        tlStart             = options.start,
        tlEnd               = options.end,
        tlDiff              = tlEnd - tlStart,
        tlProgressBar       = document.getElementById('tl-test'),
        tlProgressFull      = tlProgressBar.children[0],
        tlProgressLabel     = tlProgressFull.children[0];

    console.log(tlDiff);

    function updateSomething () {
        var updateNow   = Date.now(),
            updateLeft  = tlEnd - updateNow,
            updatePast  = updateNow - tlStart;

        tlProgressLabel.innerHTML = parseInt(updateLeft / second, 10);

        tlProgressFull.style.width = ((updatePast / tlDiff) * 100) + '%';
    }

    setInterval(updateSomething, fps);

};

var opts = {
    start: new Date('Sun Sep 01, 2013 16:00'),
    end: new Date('Sun Sep 01, 2013 16:10')
};

timelyne(opts);