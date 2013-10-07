var timelyne = function (options) {

    "use strict";

    var that = this;

    this._lines             = [];           // Array of timelines

    // Timing
    this._fps               = 16.667;       // Frames per second
    this._second            = 1000;         // 1 second
    this._minute            = second * 60;  // 1 minute
    this._hour              = minute * 60;  // 1 hour
    this._day               = hour * 24;    // 1 day

    tlStart             = options.start;
    tlEnd               = options.end;
    tlDiff              = tlEnd - tlStart;

    tlProgressBar       = document.getElementById("tl-test-01").children[1];
    tlProgressFull      = tlProgressBar.children[0];
    tlProgressLabel     = tlProgressFull.children[0];

    tlPhaseDev          = "tl-phase-dev";
    tlPhaseReview       = "tl-phase-review";
    tlPhaseTest         = "tl-phase-test";

    tlThreshholdDev     = (tlLengthDev / tlDiff);
    tlThreshholdReview  = tlThreshholdDev + (tlLengthReview / tlDiff);
    tlThreshholdTest    = tlThreshholdDev + tlThreshholdReview + (tlLengthTest / tlDiff);

    // Test Phase
    this._test               = {
        color:                  options.test.color || "#E7322E",
        length:                 options.test.length || 3 * this._day
    };

    // Review Phase
    this._review             = {
        color:                  options.review.color || "#B0B000",
        length:                 options.review.length || 1 * this._day
    };

    // Development Phase
    this._development        = {
        color:                  options.development.color || "#178DE3",
        length:                 options.development.length || 0     // tlDiff - tlLengthTest - tlLengthReview
    };

    this.buildLines = function (lines) {
        function saveLines (element) {
            that._lines.push(element);
        }

        lines.forEach(saveLines);
    };

    // Return the phase color
    this.findPhase = function (something) {
        if (something < tlThreshholdDev) return tlHexDev;

        if (something < tlThreshholdReview) return tlHexReview;

        if (something < tlThreshholdTest) return tlHexTest;
    };

    // Format the remaining time
    this.formatDate = function (remaining) {
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
    };

    this.addLeadingZero = function (num) {
        if (num < 10 ) return "0" + num;
        else return num;
    };

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

    this.buildLines(options.data);
    setInterval(this.update, this._fps);
};

timelyne.prototype.update = function () {

    "use strict";

    var updateNow   = Date.now(),
        updateLeft  = tlEnd - updateNow,
        updatePast  = updateNow - tlStart;

    tlProgressLabel.innerHTML = dateFormatter(updateLeft) + " <span class='tl-progress-fin'></span>";
    tlProgressLabel.style.backgroundColor = calculatePhase(updatePast / tlDiff);
    tlProgressLabel.children[0].style.borderTopColor = calculatePhase(updatePast / tlDiff);

    tlProgressFull.style.width = ((updatePast / tlDiff) * 100) + "%";
};

var opts = {
    defaults: {
        development: {
            color: "#178DE3"
        },
        review: {
            color: "#B0B000",
            length: "1 day"
        },
        test: {
            color: "#E7322E",
            length: "3 day"
        }
    },
    data: [{
        title: "Milestone 1",
        start: "Sep 01, 2013 08:00",
        end: "Sep 29, 2013 18:00"
    },{
        title: "Milestone 2",
        start: "Sep 08, 2013 08:00",
        end: "Sep 29, 2013 18:00"
    },{
        title: "Milestone 3",
        start: "Sep 16, 2013 08:00",
        end: "Sep 29, 2013 18:00"
    }]
};

window.timelyne = window.timelyne || timelyne(opts);