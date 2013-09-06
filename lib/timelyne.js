var timelyne = function (options) {

    "use strict";

    var fps                 = 16.667,
        second              = 1000,
        minute              = second * 60,
        hour                = minute * 60,
        day                 = hour * 24,

        tlStart             = options.start,
        tlEnd               = options.end,
        tlDiff              = tlEnd - tlStart,

        tlProgressBar       = document.getElementById("tl-test-01").children[1],
        tlProgressFull      = tlProgressBar.children[0],
        tlProgressLabel     = tlProgressFull.children[0],

        tlPhaseDev          = "tl-phase-dev",
        tlPhaseReview       = "tl-phase-review",
        tlPhaseTest         = "tl-phase-test",

        tlLengthReview      = 1 * day,
        tlLengthTest        = 3 * day,
        tlLengthDev         = tlDiff - tlLengthTest - tlLengthReview,

        tlThreshholdDev     = (tlLengthDev / tlDiff),
        tlThreshholdReview  = tlThreshholdDev + (tlLengthReview / tlDiff),
        tlThreshholdTest    = tlThreshholdDev + tlThreshholdReview + (tlLengthTest / tlDiff),

        tlHexDev            = "#178DE3",
        tlHexReview         = "#B0B000",
        tlHexTest           = "#E7322E";

    // Determine the phase color
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

    // Format the remaining time
    function dateFormatter (remaining) {
        var remDays,
            remHours,
            remMins,
            remSecs;

        remDays = Math.floor(remaining / day);
        remaining -= (remDays * day);

        remHours = Math.floor(remaining / hour);
        remaining -= (remHours * hour);

        remMins = Math.floor(remaining / minute);
        remaining -= (remMins * minute);

        remSecs = Math.floor(remaining / second);
        remaining -= (remSecs * second);

        return leadingZero(remDays) + ":" + leadingZero(remHours) + ":" + leadingZero(remMins) + ":" + leadingZero(remSecs);
    }

    function leadingZero (num) {
        if (num < 10 ) return "0" + num;
        else return num;
    }

    // Set the phases
    function initilizePhases () {
        var tlElementDev    = document.getElementById(tlPhaseDev),
            tlElementReview = document.getElementById(tlPhaseReview),
            tlElementTest   = document.getElementById(tlPhaseTest);

        tlElementDev.style.width = (tlLengthDev / tlDiff * 100) + "%";
        tlElementDev.style.backgroundColor = tlHexDev;

        tlElementReview.style.width = (tlLengthReview / tlDiff * 100) + "%";
        tlElementReview.style.backgroundColor = tlHexReview;

        tlElementTest.style.width = (tlLengthTest / tlDiff * 100) + "%";
        tlElementTest.style.backgroundColor = tlHexTest;
    }

    initilizePhases();

    function updateSomething () {
        var updateNow   = Date.now(),
            updateLeft  = tlEnd - updateNow,
            updatePast  = updateNow - tlStart;

        tlProgressLabel.innerHTML = dateFormatter(updateLeft) + " <span class='tl-progress-fin'></span>";
        tlProgressLabel.style.backgroundColor = calculatePhase(updatePast / tlDiff);
        tlProgressLabel.children[0].style.borderTopColor = calculatePhase(updatePast / tlDiff);

        tlProgressFull.style.width = ((updatePast / tlDiff) * 100) + "%";
    }

    setInterval(updateSomething, fps);
};

var opts = {
    start: new Date("Sep 01, 2013 08:00"),
    end: new Date("Sep 07, 2013 18:00")
};

timelyne(opts);