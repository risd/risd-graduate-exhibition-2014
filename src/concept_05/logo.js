module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_components = [{
            text: 'RISD',
            cls: 'logo-component--risd text-left',
            start: {
                top: '30%',
                bottom: 'auto',
                left: '30%',
                right: 'auto',
                'font-size': '50px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px'
            },
            rules: function (width, height) {
                return {
                    start: {
                        top: (height * 0.3) + 'px',
                        bottom: 'auto',
                        left: (width * 0.3) + 'px',
                        right: 'auto',
                        'font-size': '50px'
                    },
                    end: {
                        top: '50px',
                        bottom: 'auto',
                        left: '50px',
                        right: 'auto',
                        'font-size': '20px'
                    }
                };
            }
        }, {
            text: 'Grad',
            cls: 'logo-component--grad text-left',
            start: {
                top: '40%',
                bottom: 'auto',
                left: '30%',
                'font-size': '50px',
                right: 'auto'
            },
            end: {
                top: '50%',
                bottom: 'auto',
                left: '50px',
                'font-size': '20px',
                right: 'auto'
            },
            rules: function (width, height) {
                return {
                    start: {
                        top: (height * 0.4) + 'px',
                        bottom: 'auto',
                        left: (width * 0.3) + 'px',
                        right: 'auto',
                        'font-size': '50px'
                    },
                    end: {
                        top: (height * 0.5) + 'px',
                        bottom: 'auto',
                        left: '50px',
                        right: 'auto',
                        'font-size': '20px'
                    }
                };
            }
        }, {
            text: 'Show',
            cls: 'logo-component--show text-right',
            start: {
                top: 'auto',
                bottom: '60%',
                left: 'auto',
                right: '30%',
                'font-size': '50px'
            },
            end: {
                top: 'auto',
                bottom: '50%',
                left: 'auto',
                right: '50px',
                'font-size': '20px'
            },
            rules: function (width, height) {
                return {
                    start: {
                        top: 'auto',
                        bottom: (height * 0.6) + 'px',
                        left: 'auto',
                        right: (width * 0.3) + 'px',
                        'font-size': '50px'
                    },
                    end: {
                        top: 'auto',
                        bottom: (height * 0.5) + 'px',
                        left: 'auto',
                        right: '50px',
                        'font-size': '20px'
                    }
                };
            }
        }, {
            text: '2014',
            cls: 'logo-component--2014 text-right',
            start: {
                top: 'auto',
                bottom: '40%',
                left: 'auto',
                right: '30%',
                'font-size': '50px'
            },
            end: {
                top: 'auto',
                bottom: '50px',
                left: 'auto',
                right: '50px',
                'font-size': '20px'
            },
            rules: function (width, height) {
                return {
                    start: {
                        top: 'auto',
                        bottom: (height * 0.4) + 'px',
                        left: 'auto',
                        right: (width * 0.3) + 'px',
                        'font-size': '50px'
                    },
                    end: {
                        top: 'auto',
                        bottom: '50px',
                        left: 'auto',
                        right: '50px',
                        'font-size': '20px'
                    }
                };
            }
        }],
        logo_svg,
        logo_line,
        line = d3.svg.line(),
        transitionable = true;

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true);

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            update_logo_line();


            // update logo components per window
            if (logo_sel) {
                logo_sel.data.each(function (d) {
                    var updated = d.rules(window_width,
                                          window_height);

                    d.start = updated.start;
                    d.end = updated.end;
                    d.interpolator =
                        add_interpolator(updated)
                            .interpolator;

                    console.log(d);
                });
            }
        })
        .on('scroll.logo', function () {
            if (transitionable) {
                console.log(window.scrollY);
                update_logo_components(
                    scroll_scale(
                        window.scrollY));
                update_logo_line();
            }
        });

    self.scrollOverSel = function (_) {
        if (!arguments.length) return scroll_over_sel;
        scroll_over_sel = _;
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.render = function () {
        // update logo components per window
        var window_width = window.innerWidth,
            window_height = window.innerHeight;
        logo_components.forEach(function (d, i) {
            var updated = d.rules(window_width,
                                  window_height);

            d.start = updated.start;
            d.end = updated.end;
            d.interpolator =
                add_interpolator(updated)
                    .interpolator;

            console.log(d);
        });

        distance_to_scroll = calc_distance_to_scroll();
        scroll_scale.domain([0, distance_to_scroll]);

        update_logo_components(
            scroll_scale(
                window.scrollY));


        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .style('top', function (d) {
                return d.start.top;
            })
            .style('bottom', function (d) {
                return d.start.bottom;
            })
            .style('left', function (d) {
                return d.start.left;
            })
            .style('right', function (d) {
                return d.start.right;
            })
            .style('font-size', function (d) {
                return d.start['font-size'];
            })
            .text(function (d) {
                return d.text;
            });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        logo_line = logo_svg.selectAll('path')
            .data([logo_verticies()])
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', line);
    };

    function update_logo_components (percent_progress) {
        console.log(percent_progress);
        if (!logo_sel) return;
        logo_sel
            .style('top', function (d) {
                return d.interpolator.top(percent_progress);
            })
            .style('bottom', function (d) {
                return d.interpolator.bottom(percent_progress);
            })
            .style('left', function (d) {
                return d.interpolator.left(percent_progress);
            })
            .style('right', function (d) {
                return d.interpolator.right(percent_progress);
            })
            .style('font-size', function (d) {
                return d.interpolator
                        ['font-size'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = [logo_verticies()];
        logo_line.data(verticies);
        logo_line.attr('d', line);
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        logo_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            if (i === 0) {
                logo_line_verticies.push(
                    [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))]);
            } else {
                logo_line_verticies.push(
                    [bounds.left - 10,
                     (bounds.top + (bounds.height*(2/3)))]);
            }

            logo_line_verticies.push(
                [bounds.right + 10,
                 (bounds.top + (bounds.height*(2/3)))]);

        });
        return logo_line_verticies;
    }

    function calc_distance_to_scroll () {
        var scrolling_distance = window.innerHeight;
        scroll_over_sel.style('margin-top', scrolling_distance +
                                            'px');
        return scrolling_distance;
    }

    function add_interpolator (states) {
        states.interpolator = {};
        for (var key in states.start) {
            states.interpolator[key] =
                d3.interpolateString(
                    states.start[key],
                    states.end[key]);
                
        }
        return states;
    }

    return self;
};