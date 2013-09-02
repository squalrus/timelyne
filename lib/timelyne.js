var timelyne = function(options) {

    'use strict';

    var fps                 = 16.667,
        second              = 1000,
        // minute              = second * 60,
        // hour                = minute * 60,
        // day                 = hour * 24,

        tlStart             = options.start,
        tlEnd               = options.end,
        tlDiff              = tlEnd - tlStart,

        tlProgressBar       = document.getElementById('tl-test-01'),
        tlProgressFull      = tlProgressBar.children[0],
        tlProgressLabel     = tlProgressFull.children[0],

        tlPhaseDev          = 'tl-phase-dev',
        tlPhaseReview       = 'tl-phase-review',
        tlPhaseTest         = 'tl-phase-test',

        tlLengthReview      = 20 * second,
        tlLengthTest        = 20 * second,
        tlLengthDev         = tlDiff - tlLengthTest - tlLengthReview,

        tlThreshholdDev     = (tlLengthDev / tlDiff),
        tlThreshholdReview  = tlThreshholdDev + (tlLengthReview / tlDiff),
        tlThreshholdTest    = tlThreshholdDev + tlThreshholdReview + (tlLengthTest / tlDiff),

        tlHexDev            = '#178DE3',
        tlHexReview         = '#B0B000',
        tlHexTest           = '#E7322E';

    function calculatePhase (something) {

        if (something < tlThreshholdDev) {
            return tlHexDev;
        }

        if (something < tlThreshholdReview) {
            return tlHexReview;
        }

        if (something < tlThreshholdTest) {
            return tlHexTest;
        }

    }

    // Set the phases
    function initilizePhases () {
        var tlElementDev    = document.getElementById(tlPhaseDev),
            tlElementReview = document.getElementById(tlPhaseReview),
            tlElementTest   = document.getElementById(tlPhaseTest);

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
        tlProgressLabel.style.backgroundColor = calculatePhase(updatePast / tlDiff);

        tlProgressFull.style.width = ((updatePast / tlDiff) * 100) + '%';
    }

    setInterval(updateSomething, fps);
};

var opts = {
    start: new Date('Sun Sep 01, 2013 22:11'),
    end: new Date('Tue Sep 01, 2013 22:13')
};

timelyne(opts);