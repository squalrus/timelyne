(function ($) {

    "use strict";

    var fps             = 16.667,
        timelineBasic   = [];


    var TimelineBasic = function (options, parent) {
        var that        = $("<div />", {"class": "tl-basic"}),
            configTitle = options.title,
            configStart = +new Date(options.start),
            configEnd   = +new Date(options.end),
            basicLabel,
            basicTime,
            basicColor;

        basicLabel = $("<div />", {"class": "tl-basic-label"}).text(configTitle);
        that.append(basicLabel);

        basicTime = $("<div />", {"class": "tl-basic-time"}).text(configTitle);
        that.append(basicTime);

        basicColor = $("<div />", {"class": "tl-basic-color"});
        that.append(basicColor);

        parent.append(that);

        return {
            update: function (currentTime) {
                var configTotal = configEnd - configStart,
                    configProgress = (currentTime - configStart) / configTotal * 100;

                basicColor.css("width", configProgress + "%");
            }
        };
    };


    basics.forEach(function (opts) {
        timelineBasic.push(new TimelineBasic(opts, $(".tl-basic-container")));
    });


    setInterval(function () {
        timelineBasic.forEach(function (element) {
            element.update(+Date.now());
        });
    }, fps);

})(jQuery);