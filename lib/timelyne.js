var Timelyne = function (options) {

    "use strict";

    var _lines              = [],           // Array of timelines

        // Timing
        _fps                = 16.667,       // Frames per second
        _second             = 1000,         // 1 second
        _minute             = _second * 60, // 1 minute
        _hour               = _minute * 60, // 1 hour
        _day                = _hour * 24,   // 1 day

        tlStart             = new Date(options.data[0].start),
        tlEnd               = new Date(options.data[0].end),
        tlDiff              = tlEnd - tlStart,

        tlProgressBar       = document.getElementById("tl-test-01").children[1],
        tlProgressFull      = tlProgressBar.children[0],
        tlProgressLabel     = tlProgressFull.children[0],

        // Test Phase
        tlPhaseTest         = {
            class:              "tl-phase-test",
            color:              options.defaults.test.color || "#E7322E",
            length:             options.defaults.test.length || 3 * _day
        },

        // Review Phase
        tlPhaseReview       = {
            class:              "tl-phase-review",
            color:              options.defaults.review.color || "#B0B000",
            length:             options.defaults.review.length || 1 * _day
        },

        // Development Phase
        tlPhaseDevelopment  = {
            class:              "tl-phase-dev",
            color:              options.defaults.development.color || "#178DE3",
            length:             options.defaults.development.length || tlDiff - tlPhaseTest.length - tlPhaseReview.length
        },

        tlThreshholdDev     = (tlPhaseDevelopment.length / tlDiff),
        tlThreshholdReview  = tlThreshholdDev + (tlPhaseReview.length / tlDiff),
        tlThreshholdTest    = tlThreshholdDev + tlThreshholdReview + (tlPhaseTest.length / tlDiff)
        ;

    /**
     * Take milestone data and convert to line objects
     */
    function buildLines (lines) {

        function saveLines (element) {
            _lines.push(element);
        }

        lines.forEach(saveLines);
        console.log("TIMELYNE: buildLines");
    }

    // Return the phase color
    function findPhase (something) {
        console.log("HELPER: findPhase");
        if (something < tlThreshholdDev) return tlPhaseDevelopment.color;
        if (something < tlThreshholdReview) return tlPhaseReview.color;
        if (something < tlThreshholdTest) return tlPhaseTest.color;
    }

    // Format the remaining time
    function formatDate (remaining) {
        var remDays,
            remHours,
            remMins,
            remSecs;

        remDays = Math.floor(remaining / _day);
        remaining -= (remDays * _day);

        remHours = Math.floor(remaining / _hour);
        remaining -= (remHours * _hour);

        remMins = Math.floor(remaining / _minute);
        remaining -= (remMins * _minute);

        remSecs = Math.floor(remaining / _second);
        remaining -= (remSecs * _second);

        console.log("HELPER: formatDate");
        return addLeadingZero(remDays) + ":" + addLeadingZero(remHours) + ":" + addLeadingZero(remMins) + ":" + addLeadingZero(remSecs);
    }

    // Add a leading zero if needed
    function addLeadingZero (num) {
        console.log("HELPER: addLeadingZero");
        if (num < 10 ) {
            return "0" + num;
        } else {
            return num;
        }
    }

    // Set the phases
    function initilizePhases () {
        var tlElementDev    = document.getElementById(tlPhaseDevelopment.class),
            tlElementReview = document.getElementById(tlPhaseReview.class),
            tlElementTest   = document.getElementById(tlPhaseTest.class),
            tlElementTitle  = document.getElementById("tl-label");

        tlElementTitle.innerText =

        tlElementDev.style.width = (tlPhaseDevelopment.length / tlDiff * 100) + "%";
        tlElementDev.style.backgroundColor = tlPhaseDevelopment.color;

        tlElementReview.style.width = (tlPhaseReview.length / tlDiff * 100) + "%";
        tlElementReview.style.backgroundColor = tlPhaseReview.color;

        tlElementTest.style.width = (tlPhaseTest.length / tlDiff * 100) + "%";
        tlElementTest.style.backgroundColor = tlPhaseTest.color;
        console.log("TIMELYNE: initilizePhases");
    }

    function update () {

        var updateNow   = Date.now(),
            updateLeft  = tlEnd - updateNow,
            updatePast  = updateNow - tlStart;

        tlProgressLabel.innerHTML = formatDate(updateLeft) + " <span class='tl-progress-fin'></span>";
        tlProgressLabel.style.backgroundColor = findPhase(updatePast / tlDiff);
        tlProgressLabel.children[0].style.borderTopColor = findPhase(updatePast / tlDiff);

        tlProgressFull.style.width = ((updatePast / tlDiff) * 100) + "%";
    }

    initilizePhases();

    buildLines(options.data);
    setInterval(update, _fps);
};

var opts = {
    defaults: {
        development: {
            color: "#178DE3"
        },
        review: {
            color: "#B0B000",
            // length: "1 day"
        },
        test: {
            color: "#E7322E",
            // length: "3 day"
        }
    },
    data: [{
        title: "Milestone 1",
        start: "Oct 22, 2013 08:00",
        end: "Oct 31, 2013 18:00"
    },{
        title: "Milestone 2",
        start: "Sep 08, 2013 08:00",
        end: "Oct 31, 2013 18:00"
    },{
        title: "Milestone 3",
        start: "Sep 16, 2013 08:00",
        end: "Oct 31, 2013 18:00"
    }]
};

window.Timelyne = new Timelyne(opts);