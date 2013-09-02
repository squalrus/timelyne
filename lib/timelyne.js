var timelyne = function(options) {

    'use strict';

    var fps                 = 16.667,
        second              = 1000,
        minute              = second * 60,
        hour                = minute * 60,
        day                 = hour * 24,

        tlStart             = options.start,
        tlEnd               = options.end,
        tlDiff              = tlEnd - tlStart,

        tlProgressBar       = document.getElementById('tl-test-01'),
        tlProgressFull      = tlProgressBar.children[0],
        tlProgressLabel     = tlProgressFull.children[0],

        tlPhaseDev          = 'tl-phase-dev',
        tlPhaseReview       = 'tl-phase-review',
        tlPhaseTest         = 'tl-phase-test',

        tlLengthReview      = 1 * day,
        tlLengthTest        = 3 * day,

        tlHexDev            = '#178DE3',
        tlHexReview         = '#B0B000',
        tlHexTest           = '#E7322E';

    // Set the phases
    function initilizePhases () {
        var tlElementDev    = document.getElementById(tlPhaseDev),
            tlElementReview = document.getElementById(tlPhaseReview),
            tlElementTest   = document.getElementById(tlPhaseTest),
            tlLengthDev     = tlDiff - tlLengthTest - tlLengthReview;

        tlElementDev.style.width = (tlLengthDev / tlDiff * 100) + '%';
        tlElementDev.style.backgroundColor = tlHexDev;

        tlElementReview.style.width = (tlLengthReview / tlDiff * 100) + '%';
        tlElementReview.style.backgroundColor = tlHexReview;

        tlElementTest.style.width = (tlLengthTest / tlDiff * 100) + '%';
        tlElementTest.style.backgroundColor = tlHexTest;
    }

    initilizePhases();

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
    start: new Date('Sun Sep 01, 2013 08:00'),
    end: new Date('Tue Sep 10, 2013 18:00')
};

timelyne(opts);