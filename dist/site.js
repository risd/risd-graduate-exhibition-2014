(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Nav = require('./overlay/nav'),
    Logo = require('./logo/index'),
    Work = require('./work/index');

site()
    .colors()
    .overlay()
    .logo()
    .work({live: false});

function site () {
    var self = {},
        color_values = {
            purple: 'rgb(38, 34, 98);',
            orange: 'rgb(255, 61, 56);',
            'lt-purple': 'rgb(146, 53, 125)',
            blue: 'rgb(43, 89, 184)'
        },
        use_images_as_overlay_background = true,
        background_image_rotation_method = 'block',
        background_image_rotation_methods = ['fade', 'block'],
        body = d3.select('body');

    var colors = Object.keys(color_values);

    var nav = Nav();
    var logo = Logo();
    var work = Work();

    self.colors = function () {
        var random_index = Math.floor(Math.random() * colors.length);

        var color = colors[random_index];
        var alt_colors = colors.slice(0,random_index)
                               .concat(colors.slice(
                                                random_index + 1,
                                                colors.length));

        var alt_color = alt_colors[
                            Math.floor(
                                Math.random() *
                                alt_colors.length)];

        body.classed('body-' + color, true);
        body.classed('body-alt-' + alt_color, true);

        return self;
    };

    self.overlay = function () {
        var pairs = d3.selectAll('.overlay-nav-item')
            .datum(function () { return this.dataset; });

        nav.selection(pairs)
            .setup();

        // setup click tracking with google analytics
        nav.dispatch
            .on('asteriskClick', function (overlaid_boolean) {
                if (!_gaq) return;
                if (overlaid_boolean) {
                    // opening
                    _gaq.push(['_trackEvent',
                               'GoButton',
                               'Asterisk Click - Open',
                               'Home',
                               1,
                               true]);
                } else {
                    // closing
                    _gaq.push(['_trackEvent',
                               'GoButton',
                               'Asterisk Click - Close',
                               'About',
                               2,
                               true]);
                }
            });

        return self;
    };

    self.logo = function () {
        logo.container(d3.select('.logo-line'))
            .attachResize()
            .render();

        return self;
    };

    self.work = function (args) {
        if (args.live) {
            // set up
            work.container(d3.select('.work'))
                .inifiteScroll(true)
                .initliaze();
        } else {
            d3.select('.work').remove();
        }
        return self;
    };

    return self;
}
},{"./logo/index":2,"./overlay/nav":6,"./work/index":10}],2:[function(require,module,exports){
var connectLogoScale = require('./scale');
var Utility = require('./svg');

module.exports = function logo () {
    var self = {},
        window_sel = d3.select(window),
        logo_container_sel,
        logo_svg,
        logo_text_sel,
        logo_line_merged_sel,
        straight_line = d3.svg.line(),
        connect_logo_scale = connectLogoScale(),
        delay_past_reveal_sel;

    var utility = Utility();

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.delayPastReveal = function (_) {
        if (!arguments.length) return delay_past_reveal_sel;
        delay_past_reveal_sel = _;
        return self;
    };

    self.attachResize = function () {
        window_sel
            .on('resize.logo', function () {
                recalulate_logo_line();
            })
            .on('scroll.logo', function () {
                recalulate_logo_line();
            });
        return self;
    };

    self.render = function () {
        // set up svg
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        // selection of the text that will define the line
        logo_text_sel = d3.select('header')
                          .selectAll('.logo-text-component');

        setup_reveal();

        // verticies for 
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies,
                                              window_width,
                                              window_height);

        var merged_d = merge_lines(text_verticies,
                                   connecting_segments);

        logo_line_merged_sel = logo_svg.selectAll('.logo-line-merged')
            .data([merged_d])
            .enter()
            .append('path')
                .attr('class', 'logo-line-merged')
                .attr('d', function (d) { return d; });

        logo_line_merged_sel.call(tween_in);
    };

    function setup_reveal () {
        d3.select('body').classed('to-reveal', false);

        if (delay_past_reveal_sel) {
            delay_past_reveal_sel
                .datum(function () { return this.dataset; });

            delay_past_reveal_sel
                .on('transitionend', function (d) {
                    d3.select(this).classed(d.delayedclass, true);
                    delay_past_reveal_sel
                        .on('transitionend', null);
                })
                .on('webkitTransitionEnd', function (d) {
                    // console.log('webkitTransitionEnd');
                    d3.select(this).classed(d.delayedclass, true);
                    delay_past_reveal_sel
                        .on('webkitTransitionEnd', null);
                })
                .on('oTransitionEnd', function (d) {
                    // console.log('oTransitionEnd');
                    d3.select(this).classed(d.delayedclass, true);
                    delay_past_reveal_sel
                        .on('oTransitionEnd', null);
                })
                .on('otransitionend', function (d) {
                    // console.log('otransitionend');
                    d3.select(this).classed(d.delayedclass, true);
                    delay_past_reveal_sel
                        .on('otransitionend', null);
                })
                .on('MSTransitionEnd', function (d) {
                    // console.log('MSTransitionEnd');
                    d3.select(this).classed(d.delayedclass, true);
                    delay_past_reveal_sel
                        .on('MSTransitionEnd', null);
                });
        }
    }

    function recalulate_logo_line () {
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg
            .attr('width', window_width)
            .attr('height', window_height);

        if (logo_line_merged_sel) {
            update_logo_line(window_width, window_height);
        }
    }

    function update_logo_line (wwidth, wheight) {
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies,
                                              wwidth,
                                              wheight);

        var merged_d = merge_lines(text_verticies,
                                   connecting_segments);

        logo_line_merged_sel
            .data([merged_d])
            .attr('d', function (d) { return d; });
    }

    function logo_line_text_verticies (sel) {
        var text_verticies = [];

        sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(0.45)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.45)))];
            } else if ((i === 1) | (i === 2)) {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.45)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.45)))];
            } else if (i === 3) {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.55)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.55)))];
            }

            text_verticies.push([first, second]);

        });

        return text_verticies;
    }

    function logo_line_connecting_segments(start_end_points,
                                           wwidth,
                                           wheight) {
        var line_size_to_draw =
                connect_logo_scale.choose_size(wwidth, wheight);

        var connecting_segments = [];
        for (var i = 0; i < start_end_points.length; i++) {

            if ((i+1) < start_end_points.length) {
                var start = start_end_points[i][1],
                    end = start_end_points[i+1][0];

                connecting_segments
                    .push(
                        connect_logo_scale
                            [i]
                            .scale[line_size_to_draw](start, end));
            }
        }
        return connecting_segments;
    }

    function merge_lines(text_verticies, connecting_segments) {
        // takes array of vertex pairs, and path
        // elements of connecting segments.
        // returns on path d attribute
        var d = '';

        var temp_svg = d3.select('body')
            .append('svg');
        var temp_path = temp_svg
            .selectAll('temp-path')
            .data(text_verticies)
            .enter()
            .append('path')
            .attr('d', straight_line)
            .attr('class', 'temp-path')
            .style('display', 'none');

        temp_path.each(function (td, ti) {
            // console.log(td);
            var text_d = d3.select(this).attr('d');
            d += text_d;
            if (connecting_segments[ti]) {
                var connecting_d = connecting_segments[ti];
                d += connecting_d;
            }
        });

        utility.convertToRelative(temp_path.attr('d', d).node());
        // replace all `m` instructions with `l`, except
        // for the first one. this is a reverse regex
        d = temp_path.attr('d').replace(/(?!^)m/g, 'l');

        temp_svg.remove();
        temp_path.remove();

        return d;
    }

    function tween_in(path) {
        path.transition()
            .duration(8000)
            .attrTween('stroke-dasharray', tweenDash)
            .each('end', function () {
                // remove dash array, as resizing
                // the browser will change the length
                // and there is no need to re-compute
                // the dash array to fit it.
                d3.select(this).attr('stroke-dasharray', 'none');
            });
    }

    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString('0,' + l, l + "," + l);
        return function (t) { return i(t); };
    }

    return self;
};
},{"./scale":3,"./svg":4}],3:[function(require,module,exports){
var Utility = require('./svg');

module.exports = function logo_scale () {
    var utility = Utility();

    var segments = [{
            from: 'RISD',
            to: 'Grad',
            scaleUsing: {
                '300': utility.scaleProportional,
                '768': utility.scaleProportionalY,
                // '768': utility.scaleProportional,
                '1024': utility.scaleProportional
            },
            drawn_delta: {
                '300': {
                    x: -55.79398888349533,
                    y: 1033.0799560546875
                },
                '768': {
                    x: -110.04000854492188,
                    y: 389.18499755859375
                    // x: -110.04000854492188,
                    // y: 189.18499755859375
                },
                '1024': {
                    x: -117.3299635052681,
                    y: 389.18597412109375
                }
            },
            paths: {
                '300': 'M0.871,0'+
                  'v16.81'+
                  'c0,0,0,73.155,0,131.916'+
                  'c0,117.428,59.273,204.492,264.763,204.492'+
                  'c208.49,0,211.315-240.987,0-240.987'+
                  'c-48.774,0-99.771,0-99.771,0'+
                  'v389.91'+
                  'c0,0,61.965-1.039,119.994,36.679'+
                  'c59.997,38.998,76.496,134.382,160.492,134.382'+
                  'c95.995,0,93.755-95.734,1.635-107.439'+
                  'c-64.632-8.213-126.448,96.27-162.749,134.057'+
                  'c-41.74,43.447-155.37,103.876-228.725,64.878'+
                  'c-112.632-59.879,2.892-210.494,100.353-97.495'+
                  'C363.853,907.192-54.923,915.788-54.923,921.43'+
                  'c0,18.013,0,111.65,0,111.65',
                '768': 'M0,0'+
                  'h17.482'+
                  'c0,0,0,0,0,36.81'+
                  // 'c0,0,0,28.851,0,36.81'+
                  'c0,28.042-15.901,87.37-61.185,87.37'+
                  'c-53.298,0-79.808,0.005-79.808,0.005l0-52'+
                  'c0,0,35.921-4.393,48.649,3.758'+
                  'c37.861,24.242,24.195,84.909-28.139,152.242'+
                  'c-26.368,33.925-32.734,75.167-31.29,106.653'+
                  'c1.447,31.55,12.136,54.347,24.006,54.347',
                // '768': 'M94.26-15'+
                //   'h29.796'+
                //   'c0,0,0.936,8.851,0.936,16.81'+
                //   'c0,28.042-15.901,67.37-61.185,67.37'+
                //   'C10.51,69.18-16,69.185-16,69.185'+
                //   'v-52'+
                //   'c0,0,35.921-4.393,48.649,3.758'+
                //   'c37.861,24.242,29.645,46.777-3.8,80.242'+
                //   'c-17.027,17.038-44.629,17-44.629,48.653'+
                //   'c0,18.013,0,24.347,0,24.347',
                '1024': 'M0.333,0H1408' +
                  'c0,0,7.37,54.536-56.381,75.629' +
                  'c-49.718,16.45-181.128-16.262-231.989,26.999' +
                  'C989.136,213.622,1149.628,344.18,920.153,344.18' +
                  'c-53.298,0-210.641,0.005-210.641,0.005l0-272' +
                  'c0,0,197.128-16.055,182.129,88.94' +
                  'c-24.768,173.378-452.821-81.513-745.463-71.996' +
                  'c-184.491,6-234.178,65.89-271.848,139.493' +
                  'c-36.104,70.544-10.484,160.564,1.386,160.564' +
                  'c2.241,0,7.284,0,7.284,0'
            }
        }, {
            from: 'Grad',
            to: 'Show',
            scaleUsing: {
                '300': utility.scaleProportionalX,
                '768': utility.scaleProportionalX,
                '1024': utility.scaleProportionalX
            },
            drawn_delta: {
                '300': {
                    x: 344.1400146484375,
                    y: 0
                },
                '768': {
                    x: 1260.9580078125,
                    y: 0.22698596119880676
                },
                '1024': {
                    x: 1260.4999277591705,
                    y: 0.000002384185791015625
                }
            },
            paths: {
                '300': 'M0-0.138' +
                       'c83.627,0.62,238.755,0,344.14,0',
                '768': 'M0,0 ' +
                   'c0,0 18.861,0.044 25.818,0.095 ' +
                   'c59.896,0.444 450.006,0 450.006,0 ' +
                   'c0,0 0,0 0,248.5 ' +
                   'c0,0 -6.799,0 -68,0 ' +
                   'c-148.266,0 -138,-157.5 0,-157.5 ' +
                   'c110,0 189.628,117.65 302,116 ' +
                   'c147.621,-2.167 193.788,-218.705 193.788,-285.657 ' +
                   'c0,-190.343 -161.788,-128.343 -161.788,-44.343 ' +
                   'c0,52.401 48.777,94.638 123.424,106 ' +
                   'c132.894,20.228 285.105,16.936 301.563,17 ' +
                   'c14.744,0.058 94.147,0.132 94.147,0.132',
                '1024': 'M0.701,3.815' +
                  'h11.744'+
                  'v271.17h-154.502'+
                  'c0,0,7.464-82.051,46.198-121.995'+
                  'c47.998-49.498,146.853-67.249,194.99-38.998'+
                  'c121.494,71.304,80.996,232.491,231.016,225.166'+
                  'c197.067-9.622,152.965-397.655,29.971-436.653'+
                  'c-170.167-53.955-179.991,206.067,125.333,206.067'+
                  'c200.489,0,314.145-104.757,667.987-104.757'+
                  'c36.753,0,107.763,0,107.763,0'
            }
        }, {
            from: 'Show',
            to: '2014',
            scaleUsing: {
                '300': utility.scaleProportionalY,
                '768': utility.scaleProportionalY,
                '1024': utility.scaleProportional
            },
            drawn_delta: {
                '300': {
                    x: -75.55600547790527,
                    y: 48.68900680541992
                },
                '768': {
                    x: -130.7449951171875,
                    y: 426.7239990234375
                },
                '1024': {
                    x: -102.24999646097422,
                    y: 410.52901904284954
                }
            },
            paths: {
                '300': 'M73.606-48.689 ' +
                    'c3.037-0.032,5.74-0.052,8.089-0.052 ' +
                    'c15.33,0,6.783-49.626-35.337-51.258 ' +
                    'c-43-1.667-70.75,24-77.333,56 ' +
                    'C-36.526-17.015-14.641,0-1.95,0',
                '768': 'M0,0'+
                  'c0,0-8.201,39.098-44.745,53'+
                  'c-27.514,10.467-40.956,21.087-53,47'+
                  'c-16.5,35.5-6.107,95.933,43.778,96.328'+
                  'C-14.08,196.643-12.745,149-12.745,149'+
                  'h-120'+
                  'v86'+
                  'c0,0,59.121,8.667,59.121,49.5'+
                  'c0,49.911-30.121,45.833-51.028,75.479'+
                  'c-18.247,25.873-16.699,66.745-16.699,66.745'+
                  'h10.606',
                '1024': 'M0.063-0.147'+
                  'c0,0,7.588,0,9.494,0' +
                  'c0,0-13.701-73.226-98.125-62.312'+
                  'c-85.62,11.069-137.62,133.069-227.541,212.611'+
                  'c-127.158,112.481-307.898,201.236-415.567,201.236'+
                  'c-127.502,0-163.512-107.964-83.058-153.371'+
                  'c96.709-54.581,287.125,153.491,431.118,153.491'+
                  'c54.15,0,139.428-18.084,152.395-100.486'+
                  'c15.251-96.92,81.033-133.598,138.59-97.598'+
                  'c25.122,15.713,49.443,72-10.557,117'+
                  'c-43.953,32.965-63.937,53-63.937,97.583'+
                  'c0,42.469,39.198,42.375,48.497,42.375'+
                  'c5.133,0,16.441,0,16.441,0'
            }
        }];

    var temp_svg = d3.select('body')
        .append('svg')
        .style('display', 'none');
    var temp_path = temp_svg
        .append('path');

    var measure_for_ff = true;

    segments.forEach(function (d, i) {
        d.relative_paths_d = {};
        d.relative_paths = {};
        d.scale = {};

        if (measure_for_ff) {
            console.log(segments[i].from + ' ' + segments[i].to);
        }

        for (var path_size in d.paths) {
            temp_path.attr('d', d.paths[path_size]);
            utility.convertToRelative(temp_path.node());
            d.relative_paths_d[path_size] = temp_path.attr('d');
            d.relative_paths[path_size] = temp_path.node();
            
            if (measure_for_ff) {
                console.log('size: ', path_size);
                console.log('delta: ', utility.pathDelta(
                    d.relative_paths[path_size]));
            }

            d.scale[path_size] =
                d.scaleUsing[path_size](d.relative_paths[path_size],
                                        d.drawn_delta[path_size]);
        }
    });

    temp_svg.remove();
    temp_path.remove();

    var sizes = Object.keys(segments[0].paths);
    segments.choose_size = function (window_width, window_height) {
        var chosen = 0;
        sizes.forEach(function (d, i) {
            if (d <= window_width) {
                chosen = d;
            }
        });
        return chosen.toString();
    };

    window.segments = segments;

    return segments;
};
},{"./svg":4}],4:[function(require,module,exports){
module.exports = function svg () {
    var self = {};

    self.convertToRelative = function (path) {
        function set(type) {
            var args = [].slice.call(arguments, 1),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            segs.replaceItem(rseg, i);
        }
        var dx, dy, x0, y0, x1, y1, x2, y2,
            segs = path.pathSegList;
        for (var x = 0, y = 0, i = 0, len = segs.numberOfItems;
             i < len;
             i++) {
            
            var seg = segs.getItem(i),
                c   = seg.pathSegTypeAsLetter;

            if (/[MLHVCSQTAZz]/.test(c)) {
                if ('x1' in seg) x1 = seg.x1 - x;
                if ('x2' in seg) x2 = seg.x2 - x;
                if ('y1' in seg) y1 = seg.y1 - y;
                if ('y2' in seg) y2 = seg.y2 - y;
                if ('x'  in seg) dx = -x + (x = seg.x);
                if ('y'  in seg) dy = -y + (y = seg.y);
                switch (c) {
                    case 'M':
                        set('Moveto',dx,dy);
                        break;
                    case 'L':
                        set('Lineto',dx,dy);
                        break;
                    case 'H':
                        set('LinetoHorizontal',dx);
                        break;
                    case 'V':
                        set('LinetoVertical',dy);
                        break;
                    case 'C':
                        set('CurvetoCubic',dx,dy,x1,y1,x2,y2);
                        break;
                    case 'S':
                        set('CurvetoCubicSmooth',dx,dy,x2,y2);
                        break;
                    case 'Q':
                        set('CurvetoQuadratic',dx,dy,x1,y1);
                        break;
                    case 'T':
                        set('CurvetoQuadraticSmooth',dx,dy);
                        break;
                    case 'A':
                        set('Arc',dx,dy,seg.r1,seg.r2,seg.angle,
                            seg.largeArcFlag,seg.sweepFlag);
                        break;
                    case 'Z': case 'z': x = x0; y = y0; break;
                }
            } else {
                if ('x' in seg) x += seg.x;
                if ('y' in seg) y += seg.y;
            }
            // store the start of a subpath
            if (c == 'M' || c == 'm') {
                x0 = x;
                y0 = y;
            }
        }
        path.setAttribute('d',
                          path.getAttribute('d')
                              .replace(/Z/g, 'z'));
    };

    self.pathDelta = function (path) {
        var delta = {
            x: 0,
            y: 0
        };

        var start = path.getPointAtLength(0),
            end = path.getPointAtLength(path.getTotalLength());

        delta.x = end.x - start.x;
        delta.y = end.y - start.y;

        return delta;
    };

    // pass in a path element
    // and the path segement indicies
    // that will be scaled
    self.scaleAnchorY = function (path, anchors) {
        // console.log('scaleAnchorY');
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        return function (start, end) {
            // current delta
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            for (var name in anchors) {
                var to_replace = segments.getItem(anchors[name]);
                var replace_with =
                    path.createSVGPathSegCurvetoCubicRel(
                        to_replace.x,
                        to_replace.y + ((delta.current.y-
                                         delta.drawn.y)/2),
                        to_replace.x1,
                        to_replace.y1,
                        to_replace.x2,
                        to_replace.y2);
                segments.replaceItem(replace_with, anchors[name]);
            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportional = function (path, drawn_delta) {
        var delta = {
                drawn: drawn_delta
            },
            original_d = path.getAttribute('d');

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            // console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1 * ratio.x;
                if ('x2' in seg) x2 = seg.x2 * ratio.x;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                if ('x'  in seg) dx = seg.x  * ratio.x;
                if ('y'  in seg) dy = seg.y  * ratio.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalY = function (path, drawn_delta) {
        // scale y, fit x
        var delta = {
                drawn: drawn_delta
            },
            original_d = path.getAttribute('d'),
            fit_x = false;

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }
        if (Math.abs(delta.drawn.x) > 0.1) {
            fit_x = true;
        }

        return function (start, end) {
            // console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };

            delta.diff = {
                x: delta.current.x - delta.drawn.x,
                y: delta.current.y - delta.drawn.y
            };

            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1],
                segment_count = segments.numberOfItems;
            for (var i = 1; i < segment_count; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1;
                if ('x2' in seg) x2 = seg.x2;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                if (fit_x) {
                    if ('x' in seg) dx = seg.x +
                                    (delta.diff.x/(segment_count-1));
                } else {
                    if ('x' in seg) dx = seg.x;
                }
                if ('y'  in seg) dy = seg.y  * ratio.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalX = function (path, drawn_delta) {
        var delta = {
                drawn: drawn_delta
            },
            original_d = path.getAttribute('d');

        console.log('drawn delta');
        console.log(delta.drawn);
        console.log(path);

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            // console.log('scaleProportionalX');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            console.log('current delta');
            console.log(delta.current);
            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1 * ratio.x;
                if ('x2' in seg) x2 = seg.x2 * ratio.x;
                if ('y1' in seg) y1 = seg.y1;
                if ('y2' in seg) y2 = seg.y2;
                if ('x'  in seg) dx = seg.x  * ratio.x;
                if ('y'  in seg) dy = seg.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    return self;
};
},{}],5:[function(require,module,exports){
var RotateSvg = require('./rotate');

module.exports = function button () {
    var self = {},
        selection,
        dimensions;

    var rotate_svg = RotateSvg();

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        dimensions = get_dimensions(selection);
        rotate_svg
            .selection(selection.select('#flower'));

        return self;
    };

    self.start = function () {
        // rotate_svg.start();
        return self;
    };

    function get_dimensions (selection) {
        return selection.node().getBoundingClientRect();
    }

    return self;
};
},{"./rotate":7}],6:[function(require,module,exports){
var Button = require('./button');

module.exports = function nav () {
    var self = {},
        target_sel,
        overlaid = false,
        body_sel = d3.select('body'),
        window_sel = d3.select(window),
        removable_text = [{
            text: 'Go!'
        }];

    var button = Button();

    self.dispatch = d3.dispatch('asteriskClick');

    self.selection = function (_) {
        if (!arguments.length) return target_sel;
        target_sel = _;

        button
            .selection(target_sel)
            .start();

        return self;
    };

    self.overlaid = function (_) {
        if (!arguments.length) return overlaid;
        overlaid = _;
        return self;
    };

    self.setup = function () {
        if (!target_sel) throw "requires elements to pair";
        target_sel
            .on('click.nav', function (d, di) {
                target_sel
                    .select('#flower');
                overlaid = overlaid ? false : true;
                activate_deactivate(d);
                self.dispatch.asteriskClick(overlaid);
            });

        
        place_button();

        window_sel
            .on('resize.nav', function () {
                place_button();
            });
    };

    function activate_deactivate (d) {
        var overlay = d3.selectAll(d.activate);
        overlay.classed('overlaid', overlaid);
        body_sel.classed('no-scroll', overlaid);
        body_sel.classed(d.body, overlaid);
        place_button();
    }

    function place_button () {
        var wwidth = window.innerWidth;
        var wheight = window.innerHeight;

        var matching_sel;
        var bbox;

        if (overlaid) {
            bbox = target_sel.node().getBoundingClientRect();
            var p_bbox = target_sel
                                .select('p')
                                .node()
                                .getBoundingClientRect();
            
            var target_height = bbox.height;
            matching_sel =
                d3.select('.logo-text-component--risd');
            
            target_sel.style('left', (wwidth +
                                      p_bbox.width -
                                      bbox.width -
                                      (+matching_sel
                                        .style('left')
                                        .split('p')[0])) +
                                     'px');
            target_sel.style('bottom', (wheight -
                                        bbox.height -
                                        (+matching_sel
                                           .style('top')
                                           .split('p')[0])) +
                                       'px');
        } else {
            if (wwidth < 768) {
                bbox = target_sel.node().getBoundingClientRect();
                matching_sel =
                    d3.select('.logo-text-component--show');
                var matching_box = matching_sel
                                        .node()
                                        .getBoundingClientRect();
                
                target_sel
                    .style('left', ((wwidth - bbox.width)/2) +
                                           'px')
                    .style('bottom', ((+matching_sel
                                        .style('bottom')
                                        .split('p')[0]) -
                                      (bbox.height-
                                       matching_box.height)/2) +
                                     'px');
            } else {
                matching_sel =
                    d3.select('.logo-text-component--2014');
                target_sel
                    .style('left', matching_sel.style('right'))
                    .style('bottom', matching_sel.style('bottom'));
            }
        }
    }

    return self;
};
},{"./button":5}],7:[function(require,module,exports){
module.exports = function rotate () {
    var self = {},
        selection,
        offset = 0,
        speed = 0.2,
        start = Date.now(),
        radius;

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        radius = selection.node().getBoundingClientRect().height/2;

        return self;
    };

    self.start = function () {
        start = Date.now();

        selection
            .on('mouseover', function () {
                speed = 1;
            })
            .on('mouseout', function () {
                speed = 0.2;
            })
            .on('click.rotate', function () {
                setTimeout(function () {
                    speed = 0.2;
                }, 1000);
                speed = 5;
            });


        d3.timer(function () {
            var angle = (Date.now() - start) * speed;
            selection
                .style(vendor+'transform',
                      'rotate('+ (angle/radius) +'deg)');
        });
    };

    function get_position () {
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;

        
    }

    return self;
};
},{}],8:[function(require,module,exports){
module.exports = function bottom () {
    var self = {},
        dirty = false,
        container_sel,
        window_height;

    self.dispatch = d3.dispatch('bottom');

    self.attachWindowEvents = function () {
        d3.select(window)
            .on('resize.bottom', function () {
                // console.log()
                window_height = window.innerHeight;
            })
            .on('scroll.bottom', function () {
                if (!container_sel) throw "Bottom requires container.";
                if (dirty) return;

                var cbox = container_sel
                                .node()
                                .getBoundingClientRect();

                if (cbox.bottom <= window_height) {
                    dirty = true;
                    self.dispatch.bottom();
                }
            });
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    return self;
};
},{}],9:[function(require,module,exports){
module.exports = function data () {
    var self = {};

    self.dispatch = d3.dispatch('data');

    return self;
};
},{}],10:[function(require,module,exports){
var Bottom = require('./bottom');
var Behance = require('./data');

module.exports = function work () {
    var self = {},
        container_sel,
        infinite_scroll_bool = false,
        data = [],
        work_sel;

    var bottom = Bottom();
    var behance = Behance();

    behance.dispatch.on('data', function (behance_data) {
        data.concat(behance_data);
        render();
    });

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.infiniteScroll = function (_) {
        if (!arguments.length) return infinite_scroll_bool;
        infinite_scroll_bool = _;

        if (infinite_scroll_bool === true) {
            bottom
                .container(container_sel)
                .attachWindowEvents();

            bottom.dispatch
                .on('bottom', function () {
                    behance.fetch_data();
                });
        }

        return self;
    };

    self.initialize = function (_) {
        if (!container_sel) throw "Work requires a container";
        behance.fetch_data();
        return self;
    };

    function render ()  {
        console.log('render');
    }

    return self;
};
},{"./bottom":8,"./data":9}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L2J1dHRvbi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L3JvdGF0ZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2JvdHRvbS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIE5hdiA9IHJlcXVpcmUoJy4vb3ZlcmxheS9uYXYnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvL2luZGV4JyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yay9pbmRleCcpO1xuXG5zaXRlKClcbiAgICAuY29sb3JzKClcbiAgICAub3ZlcmxheSgpXG4gICAgLmxvZ28oKVxuICAgIC53b3JrKHtsaXZlOiBmYWxzZX0pO1xuXG5mdW5jdGlvbiBzaXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb2xvcl92YWx1ZXMgPSB7XG4gICAgICAgICAgICBwdXJwbGU6ICdyZ2IoMzgsIDM0LCA5OCk7JyxcbiAgICAgICAgICAgIG9yYW5nZTogJ3JnYigyNTUsIDYxLCA1Nik7JyxcbiAgICAgICAgICAgICdsdC1wdXJwbGUnOiAncmdiKDE0NiwgNTMsIDEyNSknLFxuICAgICAgICAgICAgYmx1ZTogJ3JnYig0MywgODksIDE4NCknXG4gICAgICAgIH0sXG4gICAgICAgIHVzZV9pbWFnZXNfYXNfb3ZlcmxheV9iYWNrZ3JvdW5kID0gdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2QgPSAnYmxvY2snLFxuICAgICAgICBiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZHMgPSBbJ2ZhZGUnLCAnYmxvY2snXSxcbiAgICAgICAgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgdmFyIGNvbG9ycyA9IE9iamVjdC5rZXlzKGNvbG9yX3ZhbHVlcyk7XG5cbiAgICB2YXIgbmF2ID0gTmF2KCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG4gICAgdmFyIHdvcmsgPSBXb3JrKCk7XG5cbiAgICBzZWxmLmNvbG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRvbV9pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9ycy5sZW5ndGgpO1xuXG4gICAgICAgIHZhciBjb2xvciA9IGNvbG9yc1tyYW5kb21faW5kZXhdO1xuICAgICAgICB2YXIgYWx0X2NvbG9ycyA9IGNvbG9ycy5zbGljZSgwLHJhbmRvbV9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KGNvbG9ycy5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9pbmRleCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnMubGVuZ3RoKSk7XG5cbiAgICAgICAgdmFyIGFsdF9jb2xvciA9IGFsdF9jb2xvcnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdF9jb2xvcnMubGVuZ3RoKV07XG5cbiAgICAgICAgYm9keS5jbGFzc2VkKCdib2R5LScgKyBjb2xvciwgdHJ1ZSk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS1hbHQtJyArIGFsdF9jb2xvciwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhaXJzID0gZDMuc2VsZWN0QWxsKCcub3ZlcmxheS1uYXYtaXRlbScpXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuICAgICAgICBuYXYuc2VsZWN0aW9uKHBhaXJzKVxuICAgICAgICAgICAgLnNldHVwKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY2xpY2sgdHJhY2tpbmcgd2l0aCBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIG5hdi5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdhc3Rlcmlza0NsaWNrJywgZnVuY3Rpb24gKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9nYXEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIE9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdIb21lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIENsb3NlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQWJvdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uY29udGFpbmVyKGQzLnNlbGVjdCgnLmxvZ28tbGluZScpKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYud29yayA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmxpdmUpIHtcbiAgICAgICAgICAgIC8vIHNldCB1cFxuICAgICAgICAgICAgd29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKVxuICAgICAgICAgICAgICAgIC5pbmlmaXRlU2Nyb2xsKHRydWUpXG4gICAgICAgICAgICAgICAgLmluaXRsaWF6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcud29yaycpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn0iLCJ2YXIgY29ubmVjdExvZ29TY2FsZSA9IHJlcXVpcmUoJy4vc2NhbGUnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zdmcsXG4gICAgICAgIGxvZ29fdGV4dF9zZWwsXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsLFxuICAgICAgICBzdHJhaWdodF9saW5lID0gZDMuc3ZnLmxpbmUoKSxcbiAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlID0gY29ubmVjdExvZ29TY2FsZSgpLFxuICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWw7XG5cbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG9nb19jb250YWluZXJfc2VsO1xuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kZWxheVBhc3RSZXZlYWwgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZWxheV9wYXN0X3JldmVhbF9zZWw7XG4gICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dGFjaFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93X3NlbFxuICAgICAgICAgICAgLm9uKCdyZXNpemUubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZWNhbHVsYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVjYWx1bGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHNldCB1cCBzdmdcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIC8vIHNlbGVjdGlvbiBvZiB0aGUgdGV4dCB0aGF0IHdpbGwgZGVmaW5lIHRoZSBsaW5lXG4gICAgICAgIGxvZ29fdGV4dF9zZWwgPSBkMy5zZWxlY3QoJ2hlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5sb2dvLXRleHQtY29tcG9uZW50Jyk7XG5cbiAgICAgICAgc2V0dXBfcmV2ZWFsKCk7XG5cbiAgICAgICAgLy8gdmVydGljaWVzIGZvciBcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1tZXJnZWQnKVxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwuY2FsbCh0d2Vlbl9pbik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwX3JldmVhbCAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmNsYXNzZWQoJ3RvLXJldmVhbCcsIGZhbHNlKTtcblxuICAgICAgICBpZiAoZGVsYXlfcGFzdF9yZXZlYWxfc2VsKSB7XG4gICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgLm9uKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoZC5kZWxheWVkY2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbigndHJhbnNpdGlvbmVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3dlYmtpdFRyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoZC5kZWxheWVkY2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignd2Via2l0VHJhbnNpdGlvbkVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdvVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdvVHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdvVHJhbnNpdGlvbkVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdvdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdvdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdvdHJhbnNpdGlvbmVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdNU1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTVNUcmFuc2l0aW9uRW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKGQuZGVsYXllZGNsYXNzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ01TVHJhbnNpdGlvbkVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjYWx1bGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3dfd2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgaWYgKGxvZ29fbGluZV9tZXJnZWRfc2VsKSB7XG4gICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICh3d2lkdGgsIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbFxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyAoc2VsKSB7XG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IFtdO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCArIDMsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoaSA9PT0gMSkgfCAoaSA9PT0gMikpIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCAtIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAzKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGV4dF92ZXJ0aWNpZXMucHVzaChbZmlyc3QsIHNlY29uZF0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0ZXh0X3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyhzdGFydF9lbmRfcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVpZ2h0KSB7XG4gICAgICAgIHZhciBsaW5lX3NpemVfdG9fZHJhdyA9XG4gICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlLmNob29zZV9zaXplKHd3aWR0aCwgd2hlaWdodCk7XG5cbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmICgoaSsxKSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gc3RhcnRfZW5kX3BvaW50c1tpXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gc3RhcnRfZW5kX3BvaW50c1tpKzFdWzBdO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdGluZ19zZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICAucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY2FsZVtsaW5lX3NpemVfdG9fZHJhd10oc3RhcnQsIGVuZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25uZWN0aW5nX3NlZ21lbnRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLCBjb25uZWN0aW5nX3NlZ21lbnRzKSB7XG4gICAgICAgIC8vIHRha2VzIGFycmF5IG9mIHZlcnRleCBwYWlycywgYW5kIHBhdGhcbiAgICAgICAgLy8gZWxlbWVudHMgb2YgY29ubmVjdGluZyBzZWdtZW50cy5cbiAgICAgICAgLy8gcmV0dXJucyBvbiBwYXRoIGQgYXR0cmlidXRlXG4gICAgICAgIHZhciBkID0gJyc7XG5cbiAgICAgICAgdmFyIHRlbXBfc3ZnID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpO1xuICAgICAgICB2YXIgdGVtcF9wYXRoID0gdGVtcF9zdmdcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RlbXAtcGF0aCcpXG4gICAgICAgICAgICAuZGF0YSh0ZXh0X3ZlcnRpY2llcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0ZW1wLXBhdGgnKVxuICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICB0ZW1wX3BhdGguZWFjaChmdW5jdGlvbiAodGQsIHRpKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZCk7XG4gICAgICAgICAgICB2YXIgdGV4dF9kID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2QnKTtcbiAgICAgICAgICAgIGQgKz0gdGV4dF9kO1xuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpbmdfc2VnbWVudHNbdGldKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbm5lY3RpbmdfZCA9IGNvbm5lY3Rpbmdfc2VnbWVudHNbdGldO1xuICAgICAgICAgICAgICAgIGQgKz0gY29ubmVjdGluZ19kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlsaXR5LmNvbnZlcnRUb1JlbGF0aXZlKHRlbXBfcGF0aC5hdHRyKCdkJywgZCkubm9kZSgpKTtcbiAgICAgICAgLy8gcmVwbGFjZSBhbGwgYG1gIGluc3RydWN0aW9ucyB3aXRoIGBsYCwgZXhjZXB0XG4gICAgICAgIC8vIGZvciB0aGUgZmlyc3Qgb25lLiB0aGlzIGlzIGEgcmV2ZXJzZSByZWdleFxuICAgICAgICBkID0gdGVtcF9wYXRoLmF0dHIoJ2QnKS5yZXBsYWNlKC8oPyFeKW0vZywgJ2wnKTtcblxuICAgICAgICB0ZW1wX3N2Zy5yZW1vdmUoKTtcbiAgICAgICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiBkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2luKHBhdGgpIHtcbiAgICAgICAgcGF0aC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDAwKVxuICAgICAgICAgICAgLmF0dHJUd2Vlbignc3Ryb2tlLWRhc2hhcnJheScsIHR3ZWVuRGFzaClcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhc2ggYXJyYXksIGFzIHJlc2l6aW5nXG4gICAgICAgICAgICAgICAgLy8gdGhlIGJyb3dzZXIgd2lsbCBjaGFuZ2UgdGhlIGxlbmd0aFxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIHJlLWNvbXB1dGVcbiAgICAgICAgICAgICAgICAvLyB0aGUgZGFzaCBhcnJheSB0byBmaXQgaXQuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5EYXNoKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZygnMCwnICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuL3N2ZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvZ29fc2NhbGUgKCkge1xuICAgIHZhciB1dGlsaXR5ID0gVXRpbGl0eSgpO1xuXG4gICAgdmFyIHNlZ21lbnRzID0gW3tcbiAgICAgICAgICAgIGZyb206ICdSSVNEJyxcbiAgICAgICAgICAgIHRvOiAnR3JhZCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWwsXG4gICAgICAgICAgICAgICAgJzc2OCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgIC8vICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsLFxuICAgICAgICAgICAgICAgICcxMDI0JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTU1Ljc5Mzk4ODg4MzQ5NTMzLFxuICAgICAgICAgICAgICAgICAgICB5OiAxMDMzLjA3OTk1NjA1NDY4NzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMTAuMDQwMDA4NTQ0OTIxODgsXG4gICAgICAgICAgICAgICAgICAgIHk6IDM4OS4xODQ5OTc1NTg1OTM3NVxuICAgICAgICAgICAgICAgICAgICAvLyB4OiAtMTEwLjA0MDAwODU0NDkyMTg4LFxuICAgICAgICAgICAgICAgICAgICAvLyB5OiAxODkuMTg0OTk3NTU4NTkzNzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMTE3LjMyOTk2MzUwNTI2ODEsXG4gICAgICAgICAgICAgICAgICAgIHk6IDM4OS4xODU5NzQxMjEwOTM3NVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTAuODcxLDAnK1xuICAgICAgICAgICAgICAgICAgJ3YxNi44MScrXG4gICAgICAgICAgICAgICAgICAnYzAsMCwwLDczLjE1NSwwLDEzMS45MTYnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDExNy40MjgsNTkuMjczLDIwNC40OTIsMjY0Ljc2MywyMDQuNDkyJytcbiAgICAgICAgICAgICAgICAgICdjMjA4LjQ5LDAsMjExLjMxNS0yNDAuOTg3LDAtMjQwLjk4NycrXG4gICAgICAgICAgICAgICAgICAnYy00OC43NzQsMC05OS43NzEsMC05OS43NzEsMCcrXG4gICAgICAgICAgICAgICAgICAndjM4OS45MScrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw2MS45NjUtMS4wMzksMTE5Ljk5NCwzNi42NzknK1xuICAgICAgICAgICAgICAgICAgJ2M1OS45OTcsMzguOTk4LDc2LjQ5NiwxMzQuMzgyLDE2MC40OTIsMTM0LjM4MicrXG4gICAgICAgICAgICAgICAgICAnYzk1Ljk5NSwwLDkzLjc1NS05NS43MzQsMS42MzUtMTA3LjQzOScrXG4gICAgICAgICAgICAgICAgICAnYy02NC42MzItOC4yMTMtMTI2LjQ0OCw5Ni4yNy0xNjIuNzQ5LDEzNC4wNTcnK1xuICAgICAgICAgICAgICAgICAgJ2MtNDEuNzQsNDMuNDQ3LTE1NS4zNywxMDMuODc2LTIyOC43MjUsNjQuODc4JytcbiAgICAgICAgICAgICAgICAgICdjLTExMi42MzItNTkuODc5LDIuODkyLTIxMC40OTQsMTAwLjM1My05Ny40OTUnK1xuICAgICAgICAgICAgICAgICAgJ0MzNjMuODUzLDkwNy4xOTItNTQuOTIzLDkxNS43ODgtNTQuOTIzLDkyMS40MycrXG4gICAgICAgICAgICAgICAgICAnYzAsMTguMDEzLDAsMTExLjY1LDAsMTExLjY1JyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00wLDAnK1xuICAgICAgICAgICAgICAgICAgJ2gxNy40ODInK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMCwwLDAsMzYuODEnK1xuICAgICAgICAgICAgICAgICAgLy8gJ2MwLDAsMCwyOC44NTEsMCwzNi44MScrXG4gICAgICAgICAgICAgICAgICAnYzAsMjguMDQyLTE1LjkwMSw4Ny4zNy02MS4xODUsODcuMzcnK1xuICAgICAgICAgICAgICAgICAgJ2MtNTMuMjk4LDAtNzkuODA4LDAuMDA1LTc5LjgwOCwwLjAwNWwwLTUyJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDM1LjkyMS00LjM5Myw0OC42NDksMy43NTgnK1xuICAgICAgICAgICAgICAgICAgJ2MzNy44NjEsMjQuMjQyLDI0LjE5NSw4NC45MDktMjguMTM5LDE1Mi4yNDInK1xuICAgICAgICAgICAgICAgICAgJ2MtMjYuMzY4LDMzLjkyNS0zMi43MzQsNzUuMTY3LTMxLjI5LDEwNi42NTMnK1xuICAgICAgICAgICAgICAgICAgJ2MxLjQ0NywzMS41NSwxMi4xMzYsNTQuMzQ3LDI0LjAwNiw1NC4zNDcnLFxuICAgICAgICAgICAgICAgIC8vICc3NjgnOiAnTTk0LjI2LTE1JytcbiAgICAgICAgICAgICAgICAvLyAgICdoMjkuNzk2JytcbiAgICAgICAgICAgICAgICAvLyAgICdjMCwwLDAuOTM2LDguODUxLDAuOTM2LDE2LjgxJytcbiAgICAgICAgICAgICAgICAvLyAgICdjMCwyOC4wNDItMTUuOTAxLDY3LjM3LTYxLjE4NSw2Ny4zNycrXG4gICAgICAgICAgICAgICAgLy8gICAnQzEwLjUxLDY5LjE4LTE2LDY5LjE4NS0xNiw2OS4xODUnK1xuICAgICAgICAgICAgICAgIC8vICAgJ3YtNTInK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MwLDAsMzUuOTIxLTQuMzkzLDQ4LjY0OSwzLjc1OCcrXG4gICAgICAgICAgICAgICAgLy8gICAnYzM3Ljg2MSwyNC4yNDIsMjkuNjQ1LDQ2Ljc3Ny0zLjgsODAuMjQyJytcbiAgICAgICAgICAgICAgICAvLyAgICdjLTE3LjAyNywxNy4wMzgtNDQuNjI5LDE3LTQ0LjYyOSw0OC42NTMnK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MwLDE4LjAxMywwLDI0LjM0NywwLDI0LjM0NycsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiAnTTAuMzMzLDBIMTQwOCcgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsNy4zNyw1NC41MzYtNTYuMzgxLDc1LjYyOScgK1xuICAgICAgICAgICAgICAgICAgJ2MtNDkuNzE4LDE2LjQ1LTE4MS4xMjgtMTYuMjYyLTIzMS45ODksMjYuOTk5JyArXG4gICAgICAgICAgICAgICAgICAnQzk4OS4xMzYsMjEzLjYyMiwxMTQ5LjYyOCwzNDQuMTgsOTIwLjE1MywzNDQuMTgnICtcbiAgICAgICAgICAgICAgICAgICdjLTUzLjI5OCwwLTIxMC42NDEsMC4wMDUtMjEwLjY0MSwwLjAwNWwwLTI3MicgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMTk3LjEyOC0xNi4wNTUsMTgyLjEyOSw4OC45NCcgK1xuICAgICAgICAgICAgICAgICAgJ2MtMjQuNzY4LDE3My4zNzgtNDUyLjgyMS04MS41MTMtNzQ1LjQ2My03MS45OTYnICtcbiAgICAgICAgICAgICAgICAgICdjLTE4NC40OTEsNi0yMzQuMTc4LDY1Ljg5LTI3MS44NDgsMTM5LjQ5MycgK1xuICAgICAgICAgICAgICAgICAgJ2MtMzYuMTA0LDcwLjU0NC0xMC40ODQsMTYwLjU2NCwxLjM4NiwxNjAuNTY0JyArXG4gICAgICAgICAgICAgICAgICAnYzIuMjQxLDAsNy4yODQsMCw3LjI4NCwwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBmcm9tOiAnR3JhZCcsXG4gICAgICAgICAgICB0bzogJ1Nob3cnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFgsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMzQ0LjE0MDAxNDY0ODQzNzUsXG4gICAgICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDEyNjAuOTU4MDA3ODEyNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMC4yMjY5ODU5NjExOTg4MDY3NlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDEyNjAuNDk5OTI3NzU5MTcwNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMC4wMDAwMDIzODQxODU3OTEwMTU2MjVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ00wLTAuMTM4JyArXG4gICAgICAgICAgICAgICAgICAgICAgICdjODMuNjI3LDAuNjIsMjM4Ljc1NSwwLDM0NC4xNCwwJyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00wLDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgMTguODYxLDAuMDQ0IDI1LjgxOCwwLjA5NSAnICtcbiAgICAgICAgICAgICAgICAgICAnYzU5Ljg5NiwwLjQ0NCA0NTAuMDA2LDAgNDUwLjAwNiwwICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCwwIDAsMCAwLDI0OC41ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCwwIC02Ljc5OSwwIC02OCwwICcgK1xuICAgICAgICAgICAgICAgICAgICdjLTE0OC4yNjYsMCAtMTM4LC0xNTcuNSAwLC0xNTcuNSAnICtcbiAgICAgICAgICAgICAgICAgICAnYzExMCwwIDE4OS42MjgsMTE3LjY1IDMwMiwxMTYgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MxNDcuNjIxLC0yLjE2NyAxOTMuNzg4LC0yMTguNzA1IDE5My43ODgsLTI4NS42NTcgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLC0xOTAuMzQzIC0xNjEuNzg4LC0xMjguMzQzIC0xNjEuNzg4LC00NC4zNDMgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDUyLjQwMSA0OC43NzcsOTQuNjM4IDEyMy40MjQsMTA2ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTMyLjg5NCwyMC4yMjggMjg1LjEwNSwxNi45MzYgMzAxLjU2MywxNyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzE0Ljc0NCwwLjA1OCA5NC4xNDcsMC4xMzIgOTQuMTQ3LDAuMTMyJyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMC43MDEsMy44MTUnICtcbiAgICAgICAgICAgICAgICAgICdoMTEuNzQ0JytcbiAgICAgICAgICAgICAgICAgICd2MjcxLjE3aC0xNTQuNTAyJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDcuNDY0LTgyLjA1MSw0Ni4xOTgtMTIxLjk5NScrXG4gICAgICAgICAgICAgICAgICAnYzQ3Ljk5OC00OS40OTgsMTQ2Ljg1My02Ny4yNDksMTk0Ljk5LTM4Ljk5OCcrXG4gICAgICAgICAgICAgICAgICAnYzEyMS40OTQsNzEuMzA0LDgwLjk5NiwyMzIuNDkxLDIzMS4wMTYsMjI1LjE2NicrXG4gICAgICAgICAgICAgICAgICAnYzE5Ny4wNjctOS42MjIsMTUyLjk2NS0zOTcuNjU1LDI5Ljk3MS00MzYuNjUzJytcbiAgICAgICAgICAgICAgICAgICdjLTE3MC4xNjctNTMuOTU1LTE3OS45OTEsMjA2LjA2NywxMjUuMzMzLDIwNi4wNjcnK1xuICAgICAgICAgICAgICAgICAgJ2MyMDAuNDg5LDAsMzE0LjE0NS0xMDQuNzU3LDY2Ny45ODctMTA0Ljc1NycrXG4gICAgICAgICAgICAgICAgICAnYzM2Ljc1MywwLDEwNy43NjMsMCwxMDcuNzYzLDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdTaG93JyxcbiAgICAgICAgICAgIHRvOiAnMjAxNCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmF3bl9kZWx0YToge1xuICAgICAgICAgICAgICAgICczMDAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC03NS41NTYwMDU0Nzc5MDUyNyxcbiAgICAgICAgICAgICAgICAgICAgeTogNDguNjg5MDA2ODA1NDE5OTJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMzAuNzQ0OTk1MTE3MTg3NSxcbiAgICAgICAgICAgICAgICAgICAgeTogNDI2LjcyMzk5OTAyMzQzNzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMTAyLjI0OTk5NjQ2MDk3NDIyLFxuICAgICAgICAgICAgICAgICAgICB5OiA0MTAuNTI5MDE5MDQyODQ5NTRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ003My42MDYtNDguNjg5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzMuMDM3LTAuMDMyLDUuNzQtMC4wNTIsOC4wODktMC4wNTIgJyArXG4gICAgICAgICAgICAgICAgICAgICdjMTUuMzMsMCw2Ljc4My00OS42MjYtMzUuMzM3LTUxLjI1OCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MtNDMtMS42NjctNzAuNzUsMjQtNzcuMzMzLDU2ICcgK1xuICAgICAgICAgICAgICAgICAgICAnQy0zNi41MjYtMTcuMDE1LTE0LjY0MSwwLTEuOTUsMCcsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNMCwwJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTguMjAxLDM5LjA5OC00NC43NDUsNTMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMjcuNTE0LDEwLjQ2Ny00MC45NTYsMjEuMDg3LTUzLDQ3JytcbiAgICAgICAgICAgICAgICAgICdjLTE2LjUsMzUuNS02LjEwNyw5NS45MzMsNDMuNzc4LDk2LjMyOCcrXG4gICAgICAgICAgICAgICAgICAnQy0xNC4wOCwxOTYuNjQzLTEyLjc0NSwxNDktMTIuNzQ1LDE0OScrXG4gICAgICAgICAgICAgICAgICAnaC0xMjAnK1xuICAgICAgICAgICAgICAgICAgJ3Y4NicrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw1OS4xMjEsOC42NjcsNTkuMTIxLDQ5LjUnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDQ5LjkxMS0zMC4xMjEsNDUuODMzLTUxLjAyOCw3NS40NzknK1xuICAgICAgICAgICAgICAgICAgJ2MtMTguMjQ3LDI1Ljg3My0xNi42OTksNjYuNzQ1LTE2LjY5OSw2Ni43NDUnK1xuICAgICAgICAgICAgICAgICAgJ2gxMC42MDYnLFxuICAgICAgICAgICAgICAgICcxMDI0JzogJ00wLjA2My0wLjE0NycrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw3LjU4OCwwLDkuNDk0LDAnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLTEzLjcwMS03My4yMjYtOTguMTI1LTYyLjMxMicrXG4gICAgICAgICAgICAgICAgICAnYy04NS42MiwxMS4wNjktMTM3LjYyLDEzMy4wNjktMjI3LjU0MSwyMTIuNjExJytcbiAgICAgICAgICAgICAgICAgICdjLTEyNy4xNTgsMTEyLjQ4MS0zMDcuODk4LDIwMS4yMzYtNDE1LjU2NywyMDEuMjM2JytcbiAgICAgICAgICAgICAgICAgICdjLTEyNy41MDIsMC0xNjMuNTEyLTEwNy45NjQtODMuMDU4LTE1My4zNzEnK1xuICAgICAgICAgICAgICAgICAgJ2M5Ni43MDktNTQuNTgxLDI4Ny4xMjUsMTUzLjQ5MSw0MzEuMTE4LDE1My40OTEnK1xuICAgICAgICAgICAgICAgICAgJ2M1NC4xNSwwLDEzOS40MjgtMTguMDg0LDE1Mi4zOTUtMTAwLjQ4NicrXG4gICAgICAgICAgICAgICAgICAnYzE1LjI1MS05Ni45Miw4MS4wMzMtMTMzLjU5OCwxMzguNTktOTcuNTk4JytcbiAgICAgICAgICAgICAgICAgICdjMjUuMTIyLDE1LjcxMyw0OS40NDMsNzItMTAuNTU3LDExNycrXG4gICAgICAgICAgICAgICAgICAnYy00My45NTMsMzIuOTY1LTYzLjkzNyw1My02My45MzcsOTcuNTgzJytcbiAgICAgICAgICAgICAgICAgICdjMCw0Mi40NjksMzkuMTk4LDQyLjM3NSw0OC40OTcsNDIuMzc1JytcbiAgICAgICAgICAgICAgICAgICdjNS4xMzMsMCwxNi40NDEsMCwxNi40NDEsMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV07XG5cbiAgICB2YXIgdGVtcF9zdmcgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHZhciB0ZW1wX3BhdGggPSB0ZW1wX3N2Z1xuICAgICAgICAuYXBwZW5kKCdwYXRoJyk7XG5cbiAgICB2YXIgbWVhc3VyZV9mb3JfZmYgPSB0cnVlO1xuXG4gICAgc2VnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2QgPSB7fTtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRocyA9IHt9O1xuICAgICAgICBkLnNjYWxlID0ge307XG5cbiAgICAgICAgaWYgKG1lYXN1cmVfZm9yX2ZmKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWdtZW50c1tpXS5mcm9tICsgJyAnICsgc2VnbWVudHNbaV0udG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgcGF0aF9zaXplIGluIGQucGF0aHMpIHtcbiAgICAgICAgICAgIHRlbXBfcGF0aC5hdHRyKCdkJywgZC5wYXRoc1twYXRoX3NpemVdKTtcbiAgICAgICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLm5vZGUoKSk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2RbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0gPSB0ZW1wX3BhdGgubm9kZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWVhc3VyZV9mb3JfZmYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2l6ZTogJywgcGF0aF9zaXplKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsdGE6ICcsIHV0aWxpdHkucGF0aERlbHRhKFxuICAgICAgICAgICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZC5zY2FsZVtwYXRoX3NpemVdID1cbiAgICAgICAgICAgICAgICBkLnNjYWxlVXNpbmdbcGF0aF9zaXplXShkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5kcmF3bl9kZWx0YVtwYXRoX3NpemVdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgdmFyIHNpemVzID0gT2JqZWN0LmtleXMoc2VnbWVudHNbMF0ucGF0aHMpO1xuICAgIHNlZ21lbnRzLmNob29zZV9zaXplID0gZnVuY3Rpb24gKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCkge1xuICAgICAgICB2YXIgY2hvc2VuID0gMDtcbiAgICAgICAgc2l6ZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPD0gd2luZG93X3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2hvc2VuID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaG9zZW4udG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LnNlZ21lbnRzID0gc2VnbWVudHM7XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ZnICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5jb252ZXJ0VG9SZWxhdGl2ZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNldCh0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocnNlZywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGR4LCBkeSwgeDAsIHkwLCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgIHNlZ3MgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICBmb3IgKHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwLCBsZW4gPSBzZWdzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICAgaSA8IGxlbjtcbiAgICAgICAgICAgICBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ3MuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICBjICAgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgaWYgKC9bTUxIVkNTUVRBWnpdLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IC14ICsgKHggPSBzZWcueCk7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IC15ICsgKHkgPSBzZWcueSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdNb3ZldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b0hvcml6b250YWwnLGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdWJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvVmVydGljYWwnLGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljJyxkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpY1Ntb290aCcsZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljJyxkeCxkeSx4MSx5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWNTbW9vdGgnLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQXJjJyxkeCxkeSxzZWcucjEsc2VnLnIyLHNlZy5hbmdsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWcubGFyZ2VBcmNGbGFnLHNlZy5zd2VlcEZsYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1onOiBjYXNlICd6JzogeCA9IHgwOyB5ID0geTA7IGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIHggKz0gc2VnLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyBpbiBzZWcpIHkgKz0gc2VnLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgc3RhcnQgb2YgYSBzdWJwYXRoXG4gICAgICAgICAgICBpZiAoYyA9PSAnTScgfHwgYyA9PSAnbScpIHtcbiAgICAgICAgICAgICAgICB4MCA9IHg7XG4gICAgICAgICAgICAgICAgeTAgPSB5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1ovZywgJ3onKSk7XG4gICAgfTtcblxuICAgIHNlbGYucGF0aERlbHRhID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RhcnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoMCksXG4gICAgICAgICAgICBlbmQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcblxuICAgICAgICBkZWx0YS54ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICBkZWx0YS55ID0gZW5kLnkgLSBzdGFydC55O1xuXG4gICAgICAgIHJldHVybiBkZWx0YTtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBhIHBhdGggZWxlbWVudFxuICAgIC8vIGFuZCB0aGUgcGF0aCBzZWdlbWVudCBpbmRpY2llc1xuICAgIC8vIHRoYXQgd2lsbCBiZSBzY2FsZWRcbiAgICBzZWxmLnNjYWxlQW5jaG9yWSA9IGZ1bmN0aW9uIChwYXRoLCBhbmNob3JzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZUFuY2hvclknKTtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY3VycmVudCBkZWx0YVxuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBhbmNob3JzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvX3JlcGxhY2UgPSBzZWdtZW50cy5nZXRJdGVtKGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlX3dpdGggPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkgKyAoKGRlbHRhLmN1cnJlbnQueS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEuZHJhd24ueSkvMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkyKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlX3dpdGgsIGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54ICAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFkgPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgLy8gc2NhbGUgeSwgZml0IHhcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpLFxuICAgICAgICAgICAgZml0X3ggPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS5kcmF3bi54KSA+IDAuMSkge1xuICAgICAgICAgICAgZml0X3ggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlbHRhLmRpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54IC0gZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkgLSBkZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV0sXG4gICAgICAgICAgICAgICAgc2VnbWVudF9jb3VudCA9IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRfY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxO1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDI7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdF94KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkZWx0YS5kaWZmLngvKHNlZ21lbnRfY291bnQtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2RyYXduIGRlbHRhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlbHRhLmRyYXduKTtcbiAgICAgICAgY29uc29sZS5sb2cocGF0aCk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsWCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IGRlbHRhJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkZWx0YS5jdXJyZW50KTtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTE7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBSb3RhdGVTdmcgPSByZXF1aXJlKCcuL3JvdGF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1dHRvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc2VsZWN0aW9uLFxuICAgICAgICBkaW1lbnNpb25zO1xuXG4gICAgdmFyIHJvdGF0ZV9zdmcgPSBSb3RhdGVTdmcoKTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIGRpbWVuc2lvbnMgPSBnZXRfZGltZW5zaW9ucyhzZWxlY3Rpb24pO1xuICAgICAgICByb3RhdGVfc3ZnXG4gICAgICAgICAgICAuc2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3QoJyNmbG93ZXInKSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHJvdGF0ZV9zdmcuc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9kaW1lbnNpb25zIChzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBCdXR0b24gPSByZXF1aXJlKCcuL2J1dHRvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5hdiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgdGFyZ2V0X3NlbCxcbiAgICAgICAgb3ZlcmxhaWQgPSBmYWxzZSxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICByZW1vdmFibGVfdGV4dCA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnR28hJ1xuICAgICAgICB9XTtcblxuICAgIHZhciBidXR0b24gPSBCdXR0b24oKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYXN0ZXJpc2tDbGljaycpO1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0YXJnZXRfc2VsO1xuICAgICAgICB0YXJnZXRfc2VsID0gXztcblxuICAgICAgICBidXR0b25cbiAgICAgICAgICAgIC5zZWxlY3Rpb24odGFyZ2V0X3NlbClcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm92ZXJsYWlkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3ZlcmxhaWQ7XG4gICAgICAgIG92ZXJsYWlkID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGFyZ2V0X3NlbCkgdGhyb3cgXCJyZXF1aXJlcyBlbGVtZW50cyB0byBwYWlyXCI7XG4gICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgIC5vbignY2xpY2submF2JywgZnVuY3Rpb24gKGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCcjZmxvd2VyJyk7XG4gICAgICAgICAgICAgICAgb3ZlcmxhaWQgPSBvdmVybGFpZCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZV9kZWFjdGl2YXRlKGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYXN0ZXJpc2tDbGljayhvdmVybGFpZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBcbiAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG5cbiAgICAgICAgd2luZG93X3NlbFxuICAgICAgICAgICAgLm9uKCdyZXNpemUubmF2JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlX2RlYWN0aXZhdGUgKGQpIHtcbiAgICAgICAgdmFyIG92ZXJsYXkgPSBkMy5zZWxlY3RBbGwoZC5hY3RpdmF0ZSk7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NlZCgnb3ZlcmxhaWQnLCBvdmVybGFpZCk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZChkLmJvZHksIG92ZXJsYWlkKTtcbiAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VfYnV0dG9uICgpIHtcbiAgICAgICAgdmFyIHd3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB2YXIgd2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICB2YXIgbWF0Y2hpbmdfc2VsO1xuICAgICAgICB2YXIgYmJveDtcblxuICAgICAgICBpZiAob3ZlcmxhaWQpIHtcbiAgICAgICAgICAgIGJib3ggPSB0YXJnZXRfc2VsLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBwX2Jib3ggPSB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJ3AnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHRhcmdldF9oZWlnaHQgPSBiYm94LmhlaWdodDtcbiAgICAgICAgICAgIG1hdGNoaW5nX3NlbCA9XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcubG9nby10ZXh0LWNvbXBvbmVudC0tcmlzZCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0YXJnZXRfc2VsLnN0eWxlKCdsZWZ0JywgKHd3aWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBfYmJveC53aWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJib3gud2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoK21hdGNoaW5nX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgICAgICB0YXJnZXRfc2VsLnN0eWxlKCdib3R0b20nLCAod2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmJveC5oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgrbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAod3dpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICAgICAgYmJveCA9IHRhcmdldF9zZWwubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIG1hdGNoaW5nX3NlbCA9XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmxvZ28tdGV4dC1jb21wb25lbnQtLXNob3cnKTtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hpbmdfYm94ID0gbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsICgod3dpZHRoIC0gYmJveC53aWR0aCkvMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgKCgrbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChiYm94LmhlaWdodC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nX2JveC5oZWlnaHQpLzIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcubG9nby10ZXh0LWNvbXBvbmVudC0tMjAxNCcpO1xuICAgICAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdyaWdodCcpKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIG1hdGNoaW5nX3NlbC5zdHlsZSgnYm90dG9tJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm90YXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzZWxlY3Rpb24sXG4gICAgICAgIG9mZnNldCA9IDAsXG4gICAgICAgIHNwZWVkID0gMC4yLFxuICAgICAgICBzdGFydCA9IERhdGUubm93KCksXG4gICAgICAgIHJhZGl1cztcblxuICAgIHZhciB2ZW5kb3IgPSBbXCJcIiwgXCItd2Via2l0LVwiLCBcIi1tb3otXCIsIFwiLW1zLVwiLCBcIi1vLVwiXS5yZWR1Y2UoXG4gICAgICAgIGZ1bmN0aW9uIChwLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gdiArIFwidHJhbnNmb3JtXCIgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSA/IHYgOiBwO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIHJhZGl1cyA9IHNlbGVjdGlvbi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LzI7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gMTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gMC4yO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2sucm90YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzcGVlZCA9IDAuMjtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICBzcGVlZCA9IDU7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIGQzLnRpbWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IChEYXRlLm5vdygpIC0gc3RhcnQpICogc3BlZWQ7XG4gICAgICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAuc3R5bGUodmVuZG9yKyd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICdyb3RhdGUoJysgKGFuZ2xlL3JhZGl1cykgKydkZWcpJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfcG9zaXRpb24gKCkge1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJvdHRvbSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGlydHkgPSBmYWxzZSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgd2luZG93X2hlaWdodDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYm90dG9tJyk7XG5cbiAgICBzZWxmLmF0dGFjaFdpbmRvd0V2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLmJvdHRvbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygpXG4gICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5ib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcIkJvdHRvbSByZXF1aXJlcyBjb250YWluZXIuXCI7XG4gICAgICAgICAgICAgICAgaWYgKGRpcnR5KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB2YXIgY2JveCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2JveC5ib3R0b20gPD0gd2luZG93X2hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYm90dG9tKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXRhICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdkYXRhJyk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEJvdHRvbSA9IHJlcXVpcmUoJy4vYm90dG9tJyk7XG52YXIgQmVoYW5jZSA9IHJlcXVpcmUoJy4vZGF0YScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIGluZmluaXRlX3Njcm9sbF9ib29sID0gZmFsc2UsXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgd29ya19zZWw7XG5cbiAgICB2YXIgYm90dG9tID0gQm90dG9tKCk7XG4gICAgdmFyIGJlaGFuY2UgPSBCZWhhbmNlKCk7XG5cbiAgICBiZWhhbmNlLmRpc3BhdGNoLm9uKCdkYXRhJywgZnVuY3Rpb24gKGJlaGFuY2VfZGF0YSkge1xuICAgICAgICBkYXRhLmNvbmNhdChiZWhhbmNlX2RhdGEpO1xuICAgICAgICByZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmluZmluaXRlU2Nyb2xsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gaW5maW5pdGVfc2Nyb2xsX2Jvb2w7XG4gICAgICAgIGluZmluaXRlX3Njcm9sbF9ib29sID0gXztcblxuICAgICAgICBpZiAoaW5maW5pdGVfc2Nyb2xsX2Jvb2wgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGJvdHRvbVxuICAgICAgICAgICAgICAgIC5jb250YWluZXIoY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgICAgICAuYXR0YWNoV2luZG93RXZlbnRzKCk7XG5cbiAgICAgICAgICAgIGJvdHRvbS5kaXNwYXRjaFxuICAgICAgICAgICAgICAgIC5vbignYm90dG9tJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBiZWhhbmNlLmZldGNoX2RhdGEoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwiV29yayByZXF1aXJlcyBhIGNvbnRhaW5lclwiO1xuICAgICAgICBiZWhhbmNlLmZldGNoX2RhdGEoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlciAoKSAge1xuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
