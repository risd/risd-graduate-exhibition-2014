(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <section id="about" class="about">' +
'        <hgroup class="title">' +
'            <h1 class="heading school">RISD</h1>' +
'            <h1 class="heading event">Grad Show</h1>' +
'        </hgroup>' +
'        <hgroup class="subtitle">' +
'            <h3 class="heading school">Rhode Island School of Design</h3>' +
'            <h3 class="heading event">Graduate Thesis Exhibition</h3>' +
'        </hgroup>' +
'        <p>Da. z show.</p>' +
'    </section>' +
'    <section id="where" class="where">' +
'        <div class="map">' +
'            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="500px"' +
'                 height="407.023px" viewBox="0 0 500 407.023" enable-background="new 0 0 500 407.023" xml:space="preserve">' +
'            <defs>' +
'                <marker id="marker-poi" class="marker-poi"  viewBox="0 0 50 50" markerWidth="50" markerHeight="50" markerUnits="userSpaceonUse" refX="25" refY="25">' +
'                    <polygon points="31.338,16.828 45.657,11.38 50,24.455 35.446,29.176 45.423,41.283 34.39,50 25,37.045 15.611,50 4.578,41.283 ' +
'                        14.554,29.176 0,24.455 4.343,11.38 18.662,16.828 18.31,0 31.691,0 "/>' +
'                </marker>' +
'            </defs>' +
'            <g class="streets">' +
'                <path d="M0,81.404c0,0,51.334,2.84,68.372,8.046s62.947,15.146,62.947,15.146' +
'                    s51.115,8.52,79.512-0.947c28.397-9.465,129.68-54.902,129.68-54.902s39.756-8.52,68.626,7.572l53.008,51.115' +
'                    c0,0,16.566,28.87,21.299,42.596c4.732,13.725,11.832,24.389,12.778,41.064s0,51.699,0,51.699S500,274.502,500,282.074' +
'                    s-4.725,36.443-5.198,47.328c-0.474,10.887-1.42,48.275-1.42,48.275s3.313,23.668,3.313,29.346"/>' +
'                <path d="M107.182,0L41.869,239.48c0,0-20.352,66.734-5.68,114.535' +
'                    c14.672,47.803,21.771,53.008,21.771,53.008"/>' +
'                <path d="M31.072,304.764l59.261-25.336l50.667-28l70.667-84.001c0,0,4.667-10.667,27.333-22' +
'                    s63.333-28,63.333-28l65.333-31.333l34.356-33.182"/>' +
'                <path d="M221.667,0c0,0-3.333,41.426-5.119,58.093s3.786,35.333,3.786,35.333s1.333,12.667,18.667,40' +
'                    c17.333,27.334,3.333,37.334,3.333,37.334l-22,22.584L199,223.426c0,0-26.667,39.334-29.333,42.668s-15.333,14-29.333,6.666' +
'                    s-22,0-22,0s-7.333,4-22.667,10.666c-15.333,6.668-39.781,10.729-39.781,10.729"/>' +
'                <path d="M67.702,144.758l16.147,6.724c0,0,14.797,4.337,30.87,2.093l76.026-1.582l25.802,1.582' +
'                    l24.712-1.328c0,0,4.454-0.033,8.74-2.758c1.603-1.018,3.761,0.207,7.843,1.738l13.011,2.992l31.381,8.232' +
'                    c0,0,13.266,1.276,20.92,10.971s31.381,32.145,31.381,32.145l38.522,40.564l33.166,33.678l25.257,22.705l25.768,22.961' +
'                    l17.147,15.564"/>' +
'            </g>' +
'            <g class="poi">' +
'                <path d="M194.96,167.895"/>' +
'            </g>' +
'            </svg>' +
'        </div>' +
'        <div class="location-written">' +
'            <div class="building">' +
'                <p>RI Convention Center</p>' +
'                <p>Exhibit Hall A</p>' +
'                <p>One Sabin Street, Providence</p>' +
'            </div>' +
'        </div>' +
'    </section>' +
'</div>';
},{}],2:[function(require,module,exports){
var html = require('./html'),
    SVGMap = require('./map')();

module.exports = function concept_01 () {
    var self = {
        map: undefined
    };

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        // load the map
        self.map = SVGMap.paths(d3.selectAll('.streets path'));
        return self;
    };

    return self;
};
},{"./html":1,"./map":3}],3:[function(require,module,exports){
module.exports = function Map () {
    var self = {},
        map,
        paths_selection,
        state = 'hidden';

    self.paths = function (x) {
        if (!arguments.length) return paths_selection;
        paths_selection = x;
        return self;
    };

    self.state = function (x) {
        if (!arguments.length) return state;
        state = x;
        apply_state();
        return self;
    };

    function apply_state () {
        var tween_dashs = {
            'hidden':  tween_dash_hide,
            'showing': tween_dash_show
        };
        
        paths_selection
            .transition()
            .duration(500)
            .attrTween("stroke-dasharray", tween_dashs[state]);
    }

    function tween_dash_hide() {
        var l = this.getTotalLength(),
            i = d3.interpolateString(l + "," + l, "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    console.log('------');
    console.log('Toggle map state:');
    console.log('exhibition.map.state("hidden")');
    console.log('exhibition.map.state("showing")');
    console.log('------');

    return self;
};
},{}],4:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'</div>';
},{}],5:[function(require,module,exports){
var html = require('./html');

module.exports = function concept_01 () {
    var self = {},
        svg,
        paths,
        pois = {},
        named_paths = {},
        named_text = {},
        window_sel = d3.select(window);

    var tween_dashs = {
        'hidden':  tween_dash_hide,
        'showing': tween_dash_show
    };

    window_sel.on('scroll', function () {
        var poi_bbox = pois['convention-center-marker']
                            .node()
                            .getBoundingClientRect();

        var poi_relationship_to_window =
            poi_bbox.top - window.innerHeight;

        if ((named_paths['second-section'].state === 'hidden') &
            (poi_relationship_to_window < 0)) {

            self.dispatch.animateSecond('showing');
        } else if ((named_paths['second-section']
                                    .state === 'showing') &
                   (poi_relationship_to_window > 0)) {

            self.dispatch.animateSecond('hidden');
        }
    });
    
    self.dispatch = d3.dispatch('animateFirst', 'animateSecond');

    self.dispatch.on('animateFirst', function (transition_to_state) {
        console.log('dispatched animateFirst');
        
        named_paths['first-section']
            .transition()
            .duration(3000)
            .ease('cubic-inout')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);

        named_text['first-section']
            .transition()
            .duration(800)
            .delay(2700)
            .style('opacity', 1);

        named_paths['first-section'].state = transition_to_state;
    });

    self.dispatch.on('animateSecond',
                     function (transition_to_state) {
        named_paths['second-section']
            .transition()
            .duration(3000)
            .ease('cubic-inout')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);

        named_paths['second-section'].state = transition_to_state;

        named_text['second-section']
            .transition()
            .duration(800)
            .delay(2700)
            .style('opacity',
                (transition_to_state === 'hidden') ? 0 : 1);
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_01/concept-1.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            named_paths['first-section'] =
                svg.select('#line_1_ path');
            named_paths['second-section'] =
                svg.select('#line path');

            named_paths['first-section'].state = 'hidden';
            named_paths['second-section'].state = 'hidden';

            named_paths['first-section'].attr('stroke-dasharray',
                '0,' +
                named_paths['first-section'].node()
                                            .getTotalLength());
            named_paths['second-section'].attr('stroke-dasharray',
                '0,' +
                named_paths['second-section'].node()
                                            .getTotalLength());


            pois['convention-center-marker'] =
                svg.select('#drop_pin path');


            named_text['first-section'] =
                svg.selectAll('#home #text_2_');
            named_text['first-section'].style('opacity', 0);

            named_text['second-section'] =
                svg.selectAll('#map #text_1_, ' +
                              '#map #land, ' +
                              '#map #street, ' +
                              '#map #drop_pin');
            named_text['second-section'].style('opacity', 0);


            self.dispatch.animateFirst('showing');
        });

        return self;
    };

    function tween_dash_hide() {
        var l = this.getTotalLength(),
            i = d3.interpolateString(l + "," + l, "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    return self;
};
},{"./html":4}],6:[function(require,module,exports){
module.exports=require(4)
},{}],7:[function(require,module,exports){
var html = require('./html');

module.exports = function concept_01a () {
    var self = {},
        svg,
        paths,
        named_paths = {},
        named_text = {},
        window_sel = d3.select(window);

    var tween_dashs = {
        'hidden':  tween_dash_hide,
        'showing': tween_dash_show
    };
    
    self.dispatch = d3.dispatch('animateFirst', 'animateSecond');

    self.dispatch.on('animateFirst', function (transition_to_state) {
        console.log('dispatched animateFirst');
        
        named_paths['first-section']
            .transition()
            .duration(3000)
            .ease('cubic-inout')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);

        named_text['first-section']
            .transition()
            .duration(800)
            .delay(2700)
            .style('opacity', 1);

        named_paths['first-section'].state = transition_to_state;
    });

    window_sel.on('scroll', function () {
        var svg_bbox = svg.node().getBoundingClientRect(),
            path_bbox = named_paths['second-section'].node()
                            .getBoundingClientRect(),
            current_length = 0;

        if (svg_bbox.top  < 0) {
            current_length =
                named_paths['second-section']
                    .scale(window.innerHeight - path_bbox.top);
        }

        named_paths['second-section'].transition()
            .attr('stroke-dasharray',
                  current_length + ',' +
                  named_paths['second-section'].total_length);

        named_text['second-section']
            .transition()
            .style('opacity', (current_length/
                                named_paths['second-section']
                                    .total_length));
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_01/concept-1.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            named_paths['first-section'] =
                svg.select('#line_1_ path');
            named_paths['second-section'] =
                svg.select('#line path');

            for (var path in named_paths) {
                var l = named_paths[path].node()
                                .getTotalLength(),
                    h = named_paths[path].node()
                                .getBoundingClientRect().height;

                named_paths[path].state = 'hidden';

                named_paths[path].attr('stroke-dasharray',
                                        '0,' + l );
                named_paths[path].total_length = l;
                named_paths[path].scale = d3.scale.linear()
                    .domain([0, h])
                    .range([0, l])
                    .clamp(true);
            }

            named_text['first-section'] =
                svg.selectAll('#home #text_2_');
            named_text['second-section'] =
                svg.selectAll('#map #text_1_, ' +
                              '#map #drop_pin');

            svg.selectAll('#map #land, ' +
                          '#map #street')
                .style('opacity', 1);

            for (var text in named_text) {
                named_text[text].style('opacity', 0);
            }

            self.dispatch.animateFirst('showing');
        });

        return self;
    };

    function tween_dash_hide() {
        var l = this.getTotalLength(),
            i = d3.interpolateString(l + "," + l, "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    return self;
};
},{"./html":6}],8:[function(require,module,exports){
module.exports=require(4)
},{}],9:[function(require,module,exports){
var html = require('./html');

module.exports = function concept_01 () {
    var self = {},
        svg,
        paths,
        named_paths = {},
        named_text = {},
        logos = {},
        window_sel = d3.select(window);

    var tween_dashs = {
        'hidden':  tween_dash_hide,
        'showing': tween_dash_show
    };
    var tween_dash_opposite = {
        'hidden':  tween_dash_show_reverse,
        'showing': tween_dash_hide_reverse
    };

    window_sel.on('scroll', function () {
        
    });
    
    self.dispatch = d3.dispatch('animateFirst', 'animateSecond');

    self.dispatch.on('animateFirst', function (transition_to_state) {
        console.log('dispatched animateFirst');
        
        named_paths['first-section']
            .transition()
            .duration(2000)
            .ease('cubic-inout')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);

        named_text['first-section']
            .transition()
            .duration(800)
            .delay(1700)
            .style('opacity', 1);

        logos['first-section']
            .transition()
            .duration(2000)
            .delay(function (d, i) {
                return i * 400;
            })
            .style('opacity', 1);


        named_paths['first-section'].state = transition_to_state;

        setTimeout(function () {
            self.dispatch.animateSecond('showing');
        }, 3000);
    });

    self.dispatch.on('animateSecond', function (transition_to_state) {
        console.log('dispatched animateSecond');

        named_paths['first-section']
            .transition()
            .duration(2000)
            .ease('cubic-in')
            .attrTween('stroke-dasharray',
                  tween_dash_opposite[transition_to_state]);

        logos['first-section']
            .transition()
            .duration(2000)
            .ease('cubic-out')
            .delay(function (d, i) {
                return i * 400;
            })
            .style('opacity', 0);

        logos['second-section']
            .transition()
            .duration(2000)
            .ease('cubic-in')
            .delay(function (d, i) {
                return i * 400;
            })
            .style('opacity', 1);

        named_paths['second-section']
            .transition()
            .duration(2000)
            .ease('cubic-in')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);


        named_text['first-section']
            .transition()
            .duration(1800)
            .delay(function (d, i) {
                return i * 400;
            })
            .ease('cubic-out')
            .style('opacity', 0);

        named_text['second-section']
            .transition()
            .duration(1800)
            .delay(function (d, i) {
                return i * 400;
            })
            .ease('cubic-in')
            .style('opacity', 1);




        named_paths['second-section'].state = transition_to_state;
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_02/concept-2.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            named_paths['first-section'] =
                            svg.select('#line_1_ path');
            named_paths['second-section'] =
                svg.select('#line path');

            named_paths['first-section'].state = 'hidden';
            named_paths['second-section'].state = 'hidden';

            named_paths['first-section'].attr('stroke-dasharray',
                '0,' +
                named_paths['first-section'].node()
                                            .getTotalLength());
            named_paths['second-section'].attr('stroke-dasharray',
                '0,' +
                named_paths['second-section'].node()
                                            .getTotalLength());

            named_text['first-section'] =
                svg.selectAll('#home #text_1_');
            named_text['first-section'].style('opacity', 0);

            named_text['second-section'] =
                svg.selectAll('#map #text, ' +
                              '#map #land, ' +
                              '#map #street, ' +
                              '#map #drop_pin');
            named_text['second-section'].style('opacity', 0);

            logos['first-section'] =
                svg.selectAll('#logo text');
            logos['second-section'] =
                svg.selectAll('#logo_1_ text');

            logos['first-section'].style('opacity', 0);
            logos['second-section'].style('opacity', 0);

            self.dispatch.animateFirst('showing');
        });

        return self;
    };

    function tween_dash_hide() {
        var l = this.getTotalLength(),
            i = d3.interpolateString(l + "," + l, "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_hide_reverse() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0,0," + l + "," + l,
                                     "0," + l + "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show_reverse() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l + "0," + l,
                                     "0,0," + l + "," + l);
        return function(t) { return i(t); };
    }

    return self;
};
},{"./html":8}],10:[function(require,module,exports){
module.exports=require(4)
},{}],11:[function(require,module,exports){
var html = require('./html');

module.exports = function concept_01 () {
    var self = {},
        svg,
        paths = {},
        window_sel = d3.select(window);

    var tween_dashs = {
        'hidden':  tween_dash_hide,
        'showing': tween_dash_show
    };
    var tween_dash_opposite = {
        'hidden':  tween_dash_show_reverse,
        'showing': tween_dash_hide_reverse
    };

    window_sel.on('scroll', function () {
        
    });
    
    self.dispatch = d3.dispatch('animateFirst', 'animateSecond');

    self.dispatch.on('animateFirst', function (transition_to_state) {
        
        paths.line.first
            .transition()
            .duration(2000)
            .ease('cubic-inout')
            .attrTween('stroke-dasharray',
                       tween_dashs[transition_to_state]);

        paths.hide_show.first.all
            .transition()
            .duration(800)
            .delay(1700)
            .style('opacity', 1);

        paths.logo.first.all
            .transition()
            .duration(2000)
            .ease('cubic-inout')
            .delay(function (d,i) {
                return i * 400;
            })
            .style('opacity', 1);

        d3.select('body').on('click', function () {
            self.dispatch.animateSecond('showing');
        });
    });

    self.dispatch.on('animateSecond', function (transition_to_state) {
        console.log('dispatched animateSecond');

        d3.select('body').on('click', null);

        paths.line.first
            .transition()
            .duration(1000)
            .attrTween('d',
                       pathTween(paths.line.second.attr('d')), 4);


        delete paths.logo.first['all'];
        for (var item in paths.logo.first) {
            paths.logo.first[item]
                .transition()
                .duration(1000)
                .attrTween('transform', function () {
                    return d3.interpolateString(
                        paths.logo.first[item].attr('transform'),
                        paths.logo.second[item].attr('transform'));
                });
        }
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_02/concept-2.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            paths.logo = {
                first: {
                    risd: svg.select('#home #logo '+
                                     'text:nth-child(1)'),
                    grad: svg.select('#home #logo '+
                                     'text:nth-child(2)'),
                    show: svg.select('#home #logo '+
                                     'text:nth-child(3)'),
                    year: svg.select('#home #logo '+
                                     'text:nth-child(4)'),
                    all: svg.selectAll('#home #logo '+
                                     'text:nth-child(1),'+
                                     '#home #logo '+
                                     'text:nth-child(2),'+
                                     '#home #logo '+
                                     'text:nth-child(3),'+
                                     '#home #logo '+
                                    'text:nth-child(4)')
                },
                second: {
                    risd: svg.select('#map #logo_1_ '+
                                     'text:nth-child(1)'),
                    grad: svg.select('#map #logo_1_ '+
                                     'text:nth-child(2)'),
                    show: svg.select('#map #logo_1_ '+
                                     'text:nth-child(3)'),
                    year: svg.select('#map #logo_1_ '+
                                     'text:nth-child(4)')
                }
            };

            for (var section in paths.logo) {
                for (var item in paths.logo[section]) {
                    paths.logo[section][item]
                        .style('opacity', 0);
                }
            }



            paths.line = {
                first: svg.select('#line_1_ path'),
                second: svg.select('#line path')
            };

            for (var cur in paths.line) {
                paths.line[cur].attr('stroke-dasharray',
                    '0,'+
                    paths.line[cur].node()
                        .getTotalLength());

                paths.line[cur].state = 'hidden';
            }

            

            paths.hide_show = {
                first: {
                    subhead: svg.select('#home #text_1_ '+
                                         'g:nth-child(1) text'),
                    date: svg.select('#home #text_1_ '+
                                     '> *:nth-child(6)'),
                    all: svg.selectAll('#home #text_1_ '+
                                     '> *:nth-child(6),' +
                                     '#home #text_1_ '+
                                      'g:nth-child(1) text')
                },
                second: {
                    loc_date: svg.select('#text > *:nth-child(6)'),
                    all: svg.select('#text > *:nth-child(6)')
                }
            };

            paths.hide_show.first.all.style('opacity', 0);
            paths.hide_show.second.all.style('opacity', 0);



            paths.map = {
                drop_pin: svg.select('#drop_pin'),
                text: svg.selectAll('#text > *:nth-child(2),' +
                                 '#text > *:nth-child(4)')
            };

            paths.map.drop_pin.attr('transform', 'scale(0)');
            paths.map.text.style('opacity', 0);


            self.dispatch.animateFirst('showing');
        });

        return self;
    };

    function tween_dash_hide() {
        var l = this.getTotalLength(),
            i = d3.interpolateString(l + "," + l, "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_hide_reverse() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0,0," + l + "," + l,
                                     "0," + l + "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show_reverse() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l + "0," + l,
                                     "0,0," + l + "," + l);
        return function(t) { return i(t); };
    }

    function pathTween(d1, precision) {
      return function() {
        var path0 = this,
            path1 = path0.cloneNode(),
            n0 = path0.getTotalLength(),
            n1 = (path1.setAttribute("d", d1), path1).getTotalLength();
     
        // Uniform sampling of distance based on specified precision.
        var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
        while ((i += dt) < 1) distances.push(i);
        distances.push(1);
     
        // Compute point-interpolators at each distance.
        var points = distances.map(function(t) {
          var p0 = path0.getPointAtLength(t * n0),
              p1 = path1.getPointAtLength(t * n1);
          return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
        });
     
        return function(t) {
          return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
        };
      };
    }

    return self;
};
},{"./html":10}],12:[function(require,module,exports){
module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel,
        logo_container_sel,
        logo_sel,
        logo_components = [{
            text: 'RISD',
            cls: 'logo-component--risd'
        }, {
            text: 'Grad',
            cls: 'logo-component--grad'
        }, {
            text: 'Show',
            cls: 'logo-component--show'
        }, {
            text: '2014',
            cls: 'logo-component--2014'
        }],
        logo_svg,
        logo_line,
        line = d3.svg.line();

    window_sel.on('resize', function () {
        logo_svg
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);

        update_logo_line();
    });

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04', true)
            .html('');


        logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
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

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
        });

        return self;
    };

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

    return self;
};
},{}],13:[function(require,module,exports){
// requires d3

// pass it a container, whose relationship to the bottom
// of the window you'd like to know. and if its container
// has a margin bottom, pass that in as
// additional_margin_bottom_sel.

// will self.dispatch will dispatch the message 'bottom'
// when the container is at the bottom of the window
// it sets the `dirty` flag to true.

// else where, grab more data, and then reset
// the `dirty` flag to false.

module.exports = function bottom () {
    var self = {},
        dirty = false,
        additional_margin_bottom = 0,
        additional_margin_bottom_sel,
        container_sel;

    self.dispatch = d3.dispatch('bottom');

    d3.select(window)
        .on('resize.bottom', function () {
            if (!additional_margin_bottom_sel) return;

            additional_margin_bottom =
                +additional_margin_bottom_sel
                    .style('margin-bottom')
                    .split('p')[0];
        })
        .on('scroll.bottom', function () {
            if (!container_sel) return;
            if (dirty) return;

            var cbox = container_sel.node().getBoundingClientRect();

            if ((cbox.bottom + additional_margin_bottom) <=
                (window.innerHeight)) {

                dirty = true;
                self.dispatch.bottom();
            }
        });

    self.additionalMarginBottomSel = function (_) {
        if (!arguments.length) return additional_margin_bottom_sel;
        additional_margin_bottom_sel = _;

        // side effect of updating
        additional_margin_bottom =
            +additional_margin_bottom_sel
                .style('margin-bottom')
                .split('p')[0];

        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.dirty = function (_) {
        if (!arguments.length) return dirty;
        dirty = _;
        return self;
    };

    return self;
};
},{}],14:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04a', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":77,"./logo":15,"./work":16}],15:[function(require,module,exports){
module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        logo_container_sel,
        logo_sel,
        logo_components = [{
            text: 'RISD',
            cls: 'logo-component--risd'
        }, {
            text: 'Grad',
            cls: 'logo-component--grad'
        }, {
            text: 'Show',
            cls: 'logo-component--show'
        }, {
            text: '2014',
            cls: 'logo-component--2014'
        }],
        logo_svg,
        logo_line,
        line = d3.svg.line();

    window_sel.on('resize.logo', function () {
        logo_svg
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);

        update_logo_line();
    });

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.render = function () {
        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
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

    return self;
};
},{}],16:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('../concept_04b/lightbox_zoom_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 10;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return d.cover.height + masonic_gutter;
        })
        .columnWidth(202 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program) + " " +
                        d.cover.clss;
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {
        var cover_options = ['202', '404'];
        var cover_dimensions = {
            'cover115': {
                width: 115,
                height: 90
            },
            'cover202': {
                width: 202,
                height: 158
            },
            'cover230': {
                width: 230,
                height: 180
            },
            'cover404': {
                width: (404 + masonic_gutter),
                height: (316 + masonic_gutter)
            }
        };

        var formatted_work = [];

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            var random_cover_option =
                cover_options[Math.floor(Math.random() *
                                   cover_options.length)];

            var random_cover = {
                width: cover_dimensions[
                            'cover'+random_cover_option].width,
                height: cover_dimensions[
                            'cover'+random_cover_option].height,
                src: d.covers[random_cover_option],
                clss: 'cover'+random_cover_option
            };

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"../concept_04b/lightbox_zoom_up":19,"./bottom":13}],17:[function(require,module,exports){
module.exports=require(13)
},{}],18:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04b', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04b/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":77,"./logo":20,"./work":21}],19:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        original_container,
        lightbox_sel,
        lightbox_img_sel,
        selected_sel,
        to_transition = {
            div: {
                start: {
                    position: 'fixed'
                },
                end: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    '-webkit-transform': 'matrix(1,0,0,1,0,0)',
                    width: window.innerWidth + 'px',
                    height: window.innerHeight + 'px'
                }
            },
            img: {
                start: {
                    top: '0px',
                    left: '0px'
                },
                end: {
                    width: 600 + 'px'
                }
            }
        };

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            console.log('clicked lightbox');
            close();
        });
    });

    self.originalContainer = function (_) {
        if (!arguments.length) return original_container;
        original_container = _;
        return self;
    };
    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var original_container_box =
            original_container
                .node()
                .getBoundingClientRect();

        var copy = sel.node().cloneNode(true);
        var copy_sel = d3.select(copy);

        var lightbox_copy = container.node().appendChild(copy);
        lightbox_sel = container.select('.piece');
        lightbox_img_sel = lightbox_sel.select('img');


        to_transition.div.start.width = sel.style('width');

        to_transition.div.start.height = sel.style('height');
        to_transition.div.start.top =
            (+sel
                .style('top')
                .split('p')[0] +
            original_container_box.top) + 'px';
        to_transition.div.start.left =
            (+sel
                .style('left')
                .split('p')[0] +
            original_container_box.left) + 'px';
        to_transition.div.start['-webkit-transform'] =
            sel.style('-webkit-transform');


        to_transition.img.start.width =
            lightbox_img_sel
                 .style('width');
        to_transition.img.start.height =
            lightbox_img_sel
                 .style('height');


        var data = sel.datum();


        container.classed('active', true);

        lightbox_sel
            .style(to_transition.div.start);

        d3.transition()
            .duration(280)
            .each('start', function () {
                selected_sel.style('display', 'none');
            })
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.end);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.start);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
            });
    }

    return self;
};
},{}],20:[function(require,module,exports){
module.exports=require(15)
},{}],21:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_zoom_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = -20;

    self.dispatch = d3.dispatch('dataLoaded');

    
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    // deal with window bottom loading more
    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window


    var masonic = d3.masonic()
        .width(function (d) {
            return d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return d.cover.height + masonic_gutter;
        })
        .columnWidth(202 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program) + " " +
                        d.cover.clss;
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {
        var cover_options = ['202', '404'];
        var cover_dimensions = {
            'cover115': {
                width: 115,
                height: 90
            },
            'cover202': {
                width: 202,
                height: 158
            },
            'cover230': {
                width: 230,
                height: 180
            },
            'cover404': {
                width: (404 + masonic_gutter),
                height: (316 + masonic_gutter)
            }
        };

        var formatted_work = [];

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            var random_cover_option =
                cover_options[Math.floor(Math.random() *
                                   cover_options.length)];

            var random_cover = {
                width: cover_dimensions[
                            'cover'+random_cover_option].width,
                height: cover_dimensions[
                            'cover'+random_cover_option].height,
                src: d.covers[random_cover_option],
                clss: 'cover'+random_cover_option
            };

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":17,"./lightbox_zoom_up":19}],22:[function(require,module,exports){
module.exports=require(13)
},{}],23:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04a concept_04c', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":77,"./logo":25,"./work":26}],24:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        original_container,
        lightbox_sel,
        lightbox_img_sel,
        selected_sel,
        to_transition = {
            div: {
                start: {
                    position: 'fixed'
                },
                end: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    '-webkit-transform': 'matrix(1,0,0,1,0,0)',
                    width: window.innerWidth + 'px',
                    height: window.innerHeight + 'px'
                }
            },
            img: {
                start: {
                    top: '0px',
                    left: '0px'
                },
                end: {}
            }
        },
        calc_to_transition_img = function (d) {
            to_transition.img.start.width = d.width + 'px';
            to_transition.img.start.height = d.height + 'px';

            to_transition.img.end.width = d.original_width + 'px';
            to_transition.img.end.height = d.original_height + 'px';


            if (d.original_height > window.innerHeight) {
                to_transition.img.end.top = '0px';
            } else {
                to_transition.img.end.top =
                    ((window.innerHeight -
                      d.original_height) / 2) + 'px';
            }

            if (d.original_width > window.innerWidth) {
                to_transition.img.end.left = '0px';
            } else {
                to_transition.img.end.left =
                    ((window.innerWidth -
                      d.original_width) / 2) + 'px';
            }
        };

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.originalContainer = function (_) {
        if (!arguments.length) return original_container;
        original_container = _;
        return self;
    };
    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var original_container_box =
            original_container
                .node()
                .getBoundingClientRect();

        var copy = sel.node().cloneNode(true);
        var copy_sel = d3.select(copy);

        var lightbox_copy = container.node().appendChild(copy);
        lightbox_sel = container.select('.piece');
        lightbox_img_sel = lightbox_sel.select('img');


        to_transition.div.start.width = sel.style('width');

        to_transition.div.start.height = sel.style('height');
        to_transition.div.start.top =
            (+sel
                .style('top')
                .split('p')[0] +
            original_container_box.top) + 'px';
        to_transition.div.start.left =
            (+sel
                .style('left')
                .split('p')[0] +
            original_container_box.left) + 'px';
        to_transition.div.start['-webkit-transform'] =
            sel.style('-webkit-transform');


        var data = sel.datum();

        calc_to_transition_img(data.cover);


        container.classed('active', true);

        lightbox_img_sel
            .style(to_transition.img.start);
        lightbox_sel
            .style(to_transition.div.start);

        console.log(to_transition.div);

        d3.transition()
            .duration(280)
            .each('start', function () {
                selected_sel.style('display', 'none');
            })
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.end);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.start);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
            });
    }

    return self;
};
},{}],25:[function(require,module,exports){
module.exports=require(15)
},{}],26:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_zoom_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 20;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return +d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return +d.cover.height + masonic_gutter;
        })
        .columnWidth(200 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);

        window.widths = widths;

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module =
                modules_to_include[Math.floor(Math.random() *
                                   modules_to_include.length)];

            var random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":22,"./lightbox_zoom_up":24}],27:[function(require,module,exports){
module.exports=require(13)
},{}],28:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04d', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":77,"./logo":30,"./work":31}],29:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        original_container,
        lightbox_sel,
        lightbox_img_sel,
        selected_sel,
        to_transition = {
            div: {
                start: {
                    position: 'fixed'
                },
                end: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    '-webkit-transform': 'matrix(1,0,0,1,0,0)',
                    width: window.innerWidth + 'px',
                    height: window.innerHeight + 'px'
                }
            },
            img: {
                start: {
                    top: '0px',
                    left: '0px'
                },
                end: {}
            },
            container: {
                start: {
                    'background-color': 'rgba(38, 34, 98, 0)'
                },
                end: {
                    'background-color': 'rgba(38, 34, 98, 0.8)'
                }
            }
        },
        calc_to_transition_img = function (d) {
            to_transition.img.start.width = d.width + 'px';
            to_transition.img.start.height = d.height + 'px';

            to_transition.img.end.width = d.original_width + 'px';
            to_transition.img.end.height = d.original_height + 'px';


            if (d.original_height > window.innerHeight) {
                to_transition.img.end.top = '0px';
            } else {
                to_transition.img.end.top =
                    ((window.innerHeight -
                      d.original_height) / 2) + 'px';
            }

            if (d.original_width > window.innerWidth) {
                to_transition.img.end.left = '0px';
            } else {
                to_transition.img.end.left =
                    ((window.innerWidth -
                      d.original_width) / 2) + 'px';
            }
        };

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.originalContainer = function (_) {
        if (!arguments.length) return original_container;
        original_container = _;
        return self;
    };
    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var original_container_box =
            original_container
                .node()
                .getBoundingClientRect();

        var copy = sel.node().cloneNode(true);
        var copy_sel = d3.select(copy);

        var lightbox_copy = container.node().appendChild(copy);
        lightbox_sel = container.select('.piece');
        lightbox_img_sel = lightbox_sel.select('img');


        to_transition.div.start.width = sel.style('width');

        to_transition.div.start.height = sel.style('height');
        to_transition.div.start.top =
            (+sel
                .style('top')
                .split('p')[0] +
            original_container_box.top) + 'px';
        to_transition.div.start.left =
            (+sel
                .style('left')
                .split('p')[0] +
            original_container_box.left) + 'px';
        to_transition.div.start['-webkit-transform'] =
            sel.style('-webkit-transform');


        var data = sel.datum();

        calc_to_transition_img(data.cover);


        container.classed('active', true);

        lightbox_img_sel
            .style(to_transition.img.start);
        lightbox_sel
            .style(to_transition.div.start);
        container
            .style(to_transition.container.start);

        console.log(to_transition.div);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each('start', function () {
                selected_sel.style('display', 'none');
            })
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.end);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.end);

                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.start);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.start);

                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
            });
    }

    return self;
};
},{}],30:[function(require,module,exports){
module.exports=require(15)
},{}],31:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 20;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return +d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return +d.cover.height + masonic_gutter;
        })
        .columnWidth(200 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);

        window.widths = widths;

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module =
                modules_to_include[Math.floor(Math.random() *
                                   modules_to_include.length)];

            var random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":27,"./lightbox_fade_up":29}],32:[function(require,module,exports){
module.exports=require(13)
},{}],33:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04d', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04e/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":77,"./logo":35,"./work":36}],34:[function(require,module,exports){
module.exports=require(29)
},{}],35:[function(require,module,exports){
module.exports=require(15)
},{}],36:[function(require,module,exports){
module.exports=require(31)
},{"./bottom":32,"./lightbox_fade_up":34}],37:[function(require,module,exports){
module.exports=require(13)
},{}],38:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04g', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04g/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
       // departments
           // .wrapper(d3.select('.departments'))
           // .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":77,"./logo":39,"./work":40}],39:[function(require,module,exports){
module.exports=require(15)
},{}],40:[function(require,module,exports){
module.exports=require(16)
},{"../concept_04b/lightbox_zoom_up":19,"./bottom":37}],41:[function(require,module,exports){
var Departments = require('../departments'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid'))
            .render();
    });

    return self;
};
},{"../departments":77,"./logo":42}],42:[function(require,module,exports){
var logoComponents = require('./logo_components');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
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
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
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
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = [logo_verticies()];
        logo_line.data(verticies);
        logo_line.attr('d', line);
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        logo_line_sel.each(function (d, i) {
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
},{"./logo_components":43}],43:[function(require,module,exports){
module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left',
    start: {
        top: '30%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Grad',
    cls: 'logo-component--grad text-left',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Show',
    cls: 'logo-component--show text-right',
    type: 'line',
    start: {
        top: 'auto',
        bottom: '60%',
        left: 'auto',
        right: '30%',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: 'auto',
        bottom: '50%',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: 'auto',
                bottom: (height * 0.6) + 'px',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: 'auto',
                bottom: (height * 0.5) + 'px',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: '2014',
    cls: 'logo-component--2014 text-right',
    type: 'line',
    start: {
        top: 'auto',
        bottom: '40%',
        left: 'auto',
        right: '30%',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: 'auto',
        bottom: '50px',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: 'auto',
                bottom: (height * 0.4) + 'px',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: 'auto',
                bottom: '50px',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Rhode Island School of Design<br>'+
          'Annual Grad Thesis Exhibition',
    cls: 'logo-component--subheadline text-left',
    type: 'subsidiary',
    start: {
        top: '50%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '60%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}];
},{}],44:[function(require,module,exports){
module.exports=require(13)
},{}],45:[function(require,module,exports){
var Departments = require('../departments'),
    Logo = require('./logo'),
    Work = require('./work'),
    Translate = require('./translate');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);
    var translate = Translate();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05a', true)
            .classed('full-width-work', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid-wrapper');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid'))
            .render();

        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        var work_background_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work-background');

        var work_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work');
        work.container(work_sel)
            .render();

            
        work.lightbox
            .container(lightbox_container);


        translate
            .translated(work_sel)
            .over(d3.select('.grid'))
            .background(work_background_sel)
            .setup();
    });

    return self;
};
},{"../departments":77,"./logo":47,"./translate":49,"./work":50}],46:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        selected_sel,
        to_transition = {
            container: {
                start: {
                    'background-color': 'rgba(239, 65, 54, 0)',
                    opacity: 0
                },
                end: {
                    'background-color': 'rgba(239, 65, 54, 0.9)',
                    opacity: 1
                }
            }
        },
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var data = sel.datum();
        console.log('data');
        console.log(data);
        console.log('data.modules');
        console.log(data.modules);

        var lightbox_grid_sel = container
            .append('div')
            .attr('class', 'grid');

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta col-2-10');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-work offset-2-10 col-8-10');

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        lightbox_work_sel
            .append('p')
            .attr('class', 'lightbox-description')
            .text(data.description);

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .append('img')
            .attr('src', function (d) {
                return d.sizes.max_1240 ? d.sizes.max_1240 : d.src;
            });

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('img')
            .attr('src', data.avatar);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        lightbox_meta_info_sel
            .append('a')
            .attr('class', 'lightbox-meta-info--personal-link')
            .attr('href', data.url)
            .text('Behance');


        container
            .style(to_transition.container.start);

        container.classed('active', true);
        body_sel.classed('lightbox-open', true);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
                body_sel.classed('lightbox-open', false);
            });
    }

    return self;
};
},{}],47:[function(require,module,exports){
var logoComponents = require('./logo_components');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
        logo_svg,
        logo_line,
        line = d3.svg.line();

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true),
        prev_scroll_progress = 0;

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            // update logo components per window
            if (logo_sel) {
                logo_sel.each(function (d) {
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
            update_logo_components(prev_scroll_progress);
            update_logo_line();
        })
        .on('scroll.logo', function () {
            var scroll_progress = scroll_scale(window.scrollY);
            if (scroll_progress != prev_scroll_progress) {
                update_logo_components(scroll_progress);
                update_logo_line();
            }
            prev_scroll_progress = scroll_progress;
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
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
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
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = [logo_verticies()];
        logo_line.data(verticies);
        logo_line.attr('d', line);
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        logo_line_sel.each(function (d, i) {
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
},{"./logo_components":48}],48:[function(require,module,exports){
module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left logo-component--title',
    start: {
        top: '30%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Grad',
    cls: 'logo-component--grad text-left logo-component--title',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Show',
    cls: 'logo-component--show text-right logo-component--title',
    type: 'line',
    start: {
        top: '45%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.45) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: '2014',
    cls: 'logo-component--2014 text-right logo-component--title',
    type: 'line',
    start: {
        top: '60%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '95%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height - 80) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Rhode Island School of Design<br>'+
          'Annual Grad Thesis Exhibition',
    cls: 'logo-component--subheadline text-left',
    type: 'subsidiary',
    start: {
        top: '50%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '60%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: 'RI Convention Center<br>'+
          'Exhibition Hall A<br>' +
          'One Sabin Street, Providence<br><br>' +
          'Open 12–5pm Daily<br>'+
          'May 16–31',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
    start: {
        top: '30%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: '<svg>' +
          '</svg>',
    cls: 'logo-component--asterisk text-left',
    type: 'subsidiary',
    start: {
        top: '30%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}];
},{}],49:[function(require,module,exports){
module.exports = function translate () {
    var self = {},
        // the selection that is being translated
        translated_sel,
        // the selection that is being translated over
        // this will determine the height that must be
        // scroll passed, before the translated_sel
        // is translated over
        over_sel,
        over_sel_height = 0,
        // the selection for the full screen element
        // whose z-index and opacity get adjusted
        // instead of just sliding in, the images
        // slide in over the new background.
        background_sel,
        opacity_scale = d3.scale.linear()
            .domain([0, 200])  // distance to scroll
            .range([0,1])      // opacity values
            .clamp(true);

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    self.translated = function (_) {
        if (!arguments.length) return translated_sel;
        translated_sel = _;
        return self;
    };

    self.over = function (_) {
        if (!arguments.length) return over_sel;
        over_sel = _;

        over_sel_height = get_over_sel_height();

        return self;
    };

    self.background = function(_) {
        if (!arguments.length) return background_sel;
        background_sel = _;
        return self;
    };

    self.setup = function () {
        d3.select(window)
            .on('scroll.translate', function () {
                if (pageYOffset > over_sel_height) {
                    over_sel
                        .style(vendor+'transform',
                               'translate(0px,' +
                                (-(over_sel_height - pageYOffset)) +
                                'px)');
                    translated_sel
                        .style(vendor+'transform',
                               'translate(0px,' +
                               (over_sel_height - pageYOffset) +
                               'px)');
                }
                var opacity_val = opacity_scale(pageYOffset-
                                                over_sel_height);
                background_sel
                    .style('opacity', opacity_val)
                    .classed("active", (opacity_val > 0) ? 1: 0);
            })
            .on('resize.translate', function () {
                over_sel_height = get_over_sel_height();
            });
    };

    function get_over_sel_height () {
        if (!over_sel) return 0;
        return over_sel.node()
                .getBoundingClientRect()
                .height;
    }


    

    return self;
};
},{}],50:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 120;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    d3.select(window)
        .on('resize.work', function () {
            resize_masonic();
        });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return +d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return +d.cover.height + masonic_gutter;
        })
        .columnWidth(200 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true);
            // .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        var work_sel_enter_meta =
            work_sel_enter
                .append('div')
                .attr('class', 'piece-meta-wrapper');
        work_sel_enter_meta
            .append('img')
            .attr('class', 'list-avatar')
            .attr('src', function (d) {
                return d.avatar;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'student_name piece-meta')
            .text(function (d) {
                return d.student_name;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'risd_program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);
        // var widths = d3.scale.identity()
        //     .domain(width_extent);

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module_index = Math.floor(Math.random() *
                                   modules_to_include.length),
                random_module =
                    modules_to_include[random_module_index],
                reorder_modules_to_include = [];

            reorder_modules_to_include.push(random_module);
            modules_to_include
                .slice(0,random_module_index)
                .forEach(function (md, mi) {
                    reorder_modules_to_include
                        .push(md);
                });

            modules_to_include.slice(
                    random_module_index+1,
                    modules_to_include.length)
                .forEach(function (md, mi) {
                    reorder_modules_to_include
                        .push(md);
                });



            var max_1240_height =
                (random_module.height/random_module.width) *
                1240;
            var random_cover = {
                original_width: 1240,
                original_height: max_1240_height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': reorder_modules_to_include,
                'cover': random_cover,
                description: d.details.description,
                avatar: d.owners[0].images['138'],
                url: d.owners[0].url
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":44,"./lightbox_fade_up":46}],51:[function(require,module,exports){
module.exports=require(13)
},{}],52:[function(require,module,exports){
module.exports = function department () {
    var self = {},
        wrapper,
        cls = 'department',
        departments,
        activator,
        activator_text,
        blanket_sel,
        grid_sel,
        active_state = false,
        body_sel = d3.select('body');

    var data = [
        'Architecture',
        'Ceramics',
        'Digital + Media',
        'Furniture',
        'Glass',
        'Graphic Design',
        'Industrial Design',
        'Interior Architecture',
        'Jewelry + Metalsmithing',
        'Landscape Architecture',
        'Painting',
        'Photography',
        'Printmaking',
        'Sculpture',
        'Textiles',
        'All'
    ];

    self.dispatch = d3.dispatch('filter');

    self.wrapper = function (_) {
        if (!arguments.length) return wrapper;
        wrapper = _;
        return self;
    };
    self.departments = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.grid = function (_) {
        if (!arguments.length) return grid_sel;
        grid_sel = _;
        return self;
    };

    self.render = function () {
        if (!wrapper) throw "requires a wrapper";

        activator = wrapper.append('div')
            .attr('class', 'button department-activator col-10-10')
            .on('click' , function () {
                toggle_state();
            });

        activator_text = activator.append('p')
            .attr('class', 'department-activator-text')
            .text('filter by department');

        blanket_sel = wrapper.append('div')
            .attr('class', 'department-blanket');


        departments = wrapper.append('div')
            .attr('class', 'department-list');
        
        departments
            .append('ul')
            .selectAll(cls)
            .data(data)
            .enter()
            .append('li')
            .append('p')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                console.log('filter', d);
                var program = d;
                if (program === 'All') program = 'Departments';
                activator_text.text(program);
                self.dispatch.filter(d);
                toggle_state();
            });

        blanket_sel.on('click', function () {
            toggle_state();
        });
    };

    function toggle_state () {
        console.log('toggle');
        active_state = active_state ? false : true;
        wrapper.classed('departments--active', active_state);
        body_sel.classed('no-scroll', active_state);
        grid_sel.classed('z-index-30', active_state);
    }


    return self;
};
},{}],53:[function(require,module,exports){
var Departments = require('./departments'),
    Logo = require('./logo'),
    Work = require('./work'),
    Translate = require('./translate'),
    Nav = require('./section_nav');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);
    var translate = Translate();
    var nav = Nav();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05b', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid-wrapper');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05b/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid-about'))
            .render();

        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');

        var work_background_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work-background');

        var grid_work_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'grid grid-work');
        
        var work_wrapper = grid_work_sel
            .append('div')
            .attr('class', 'work-wrapper row');


        var top_nav_sel = d3.select('.grid-wrapper')
            .append('nav')
            .attr('class', 'nav-section');

        work.bottom
            .additionalMarginBottomSel(d3.select('.grid-work'));

        var department_sel = work_wrapper
            .append('div')
            .attr('class', 'departments col-2-10');

        departments
            .wrapper(department_sel)
            .grid(grid_work_sel)
            .render();


        var work_sel = work_wrapper
            .append('div')
            .attr('id', 'work')
            .attr('class', 'work col-8-10 offset-2-10');

        work.container(work_sel)
            .render();

            
        work.lightbox
            .container(lightbox_container);


        translate
            .translate(work_sel)
            .over(d3.select('.intro-wrapper'))
            .background(work_background_sel)
            .fixed(department_sel)
            .nav(top_nav_sel)
            .scrollLead(d3.select('.scroll-lead'))
            .setup();

        departments.dispatch
            .on('filter.work', function (d) {
                work.filter(d);
            });

        nav.wrapper(top_nav_sel)
            .render();
    });

    return self;
};
},{"./departments":52,"./logo":55,"./section_nav":58,"./translate":59,"./work":60}],54:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        selected_sel,
        to_transition = {
            container: {
                start: {
                    'background-color': 'rgba(239, 65, 54, 0)',
                    opacity: 0
                },
                end: {
                    'background-color': 'rgba(239, 65, 54, 0.9)',
                    opacity: 1
                }
            }
        },
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var data = sel.datum();
        console.log('data');
        console.log(data);
        console.log('data.modules');
        console.log(data.modules);

        var lightbox_grid_sel = container
            .append('div')
            .attr('class', 'grid');

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta col-2-10');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-work offset-2-10 col-8-10');

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        lightbox_work_sel
            .append('p')
            .attr('class', 'lightbox-description')
            .text(data.description);

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .append('img')
            .attr('src', function (d) {
                return d.sizes.max_1240 ? d.sizes.max_1240 : d.src;
            });

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        lightbox_meta_info_sel
            .append('a')
            .attr('class', 'lightbox-meta-info--personal-link')
            .attr('href', data.url)
            .text('Behance');


        container
            .style(to_transition.container.start);

        container.classed('active', true);
        body_sel.classed('no-scroll', true);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
                body_sel.classed('no-scroll', false);
            });
    }

    return self;
};
},{}],55:[function(require,module,exports){
var logoComponents = require('./logo_components'),
    logoConnecting = require('./logo_connecting');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
        logo_connecting_paths = logoConnecting,
        logo_svg,
        logo_line,
        logo_connecting,
        straight_line = d3.svg.line();

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true),
        prev_scroll_progress = 0;

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            // update logo components per window
            if (logo_sel) {
                logo_sel.each(function (d) {
                    var updated = d.rules(window_width,
                                          window_height);

                    d.start = updated.start;
                    d.end = updated.end;
                    d.interpolator =
                        add_interpolator(updated)
                            .interpolator;
                });
            }
            update_logo_components(prev_scroll_progress);
            update_logo_line();
        })
        .on('scroll.logo', function () {
            var scroll_progress = scroll_scale(window.scrollY);
            if (scroll_progress != prev_scroll_progress) {
                update_logo_components(scroll_progress);
                update_logo_line();
            }
            prev_scroll_progress = scroll_progress;

            logo_container_sel
                .classed('logo-svg--end',
                         (scroll_progress === 1) ? true : false);
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
            .style('line-height', function (d) {
                return d.start['line-height'];
            })
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
        });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        var verticies = logo_verticies();

        logo_line = logo_svg.selectAll('path')
            .data(verticies.straight)
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', straight_line);

        logo_connecting =
            logo_svg
                .selectAll('.logo-connecting')
                .data(verticies.connecting)
                .enter()
                .append('path')
                    .attr('class', 'logo-connecting')
                    .attr('d', function (d) {
                        return d;
                    });
    };

    function update_logo_components (percent_progress) {
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
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = logo_verticies();

        logo_line
            .data(verticies.straight)
            .attr('d', straight_line);

        logo_connecting
            .data(verticies.connecting)
            .attr('d', function (d) {
                    return d;
                });
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        var logo_connecting_segments = [];

        logo_line_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))];
            } else {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(2/3)))];
            }

            second = [bounds.right + 6,
                 (bounds.top + (bounds.height*(2/3)))];

            logo_line_verticies.push([first, second]);

        });

        for (var i = 0; i < logo_line_verticies.length; i++) {
            if ((i+1) < logo_line_verticies.length) {
                var start = logo_line_verticies[i][1],
                    end = logo_line_verticies[i+1][0];

                logo_connecting_segments
                    .push(
                        logo_connecting_paths[i]
                            .segment(start, end));
            }
        }
        return {
            straight: logo_line_verticies,
            connecting: logo_connecting_segments
        };
    }

    function calc_distance_to_scroll () {
        var scrolling_distance = window.innerHeight;
        scroll_over_sel.style('margin-top', scrolling_distance +
                                            'px');
        return scrolling_distance;
    }

    function add_interpolator (states) {
        // sizes
        // { min1400: {},  min1024: {}, min768: {}, min300: {}}
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
},{"./logo_components":56,"./logo_connecting":57}],56:[function(require,module,exports){
module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left logo-component--title',
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: (width * 0.2) + 'px',
                    right: 'auto',
                    'font-size': '40px',
                    'line-height': '42px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Grad',
    cls: 'logo-component--grad text-left logo-component--title',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '20%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1400) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.2) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Show',
    cls: 'logo-component--show text-right logo-component--title',
    type: 'line',
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.45) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.85) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.52) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.85) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.52) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.85) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: '2014',
    cls: 'logo-component--2014 text-right logo-component--title',
    type: 'line',
    start: {
        top: '60%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '95%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.6) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height - 80) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.6) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height - 80) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height - 80) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
},
// {
//     html: 'Rhode Island School of Design<br>'+
//           'Annual Grad Thesis Exhibition',
//     cls: 'logo-component--subheadline text-left',
//     type: 'subsidiary',
//     start: {
//         top: '50%',
//         bottom: 'auto',
//         left: '30%',
//         right: 'auto',
//         'font-size': '20px',
//         'line-height': '28px'
//     },
//     end: {
//         top: '88%',
//         bottom: 'auto',
//         left: '50px',
//         right: 'auto',
//         'font-size': '13px',
//         'line-height': '17px'
//     },
//     rules: function (width, height) {
//         if (width < 768) {
//             return {
//                 start: {
//                     top: (height * 0.5) + 'px',
//                     bottom: 'auto',
//                     left: (width * 0.3) + 'px',
//                     right: 'auto',
//                     'font-size': '20px',
//                     'line-height': '28px'
//                 },
//                 end: {
//                     top: (height * 0.88) + 'px',
//                     bottom: 'auto',
//                     left: '50px',
//                     right: 'auto',
//                     'font-size': '13px',
//                     'line-height': '17px'
//                 }
//             };
//         }
//         if (width < 1024) {
//             return {
//                 start: {
//                     top: (height * 0.5) + 'px',
//                     bottom: 'auto',
//                     left: (width * 0.3) + 'px',
//                     right: 'auto',
//                     'font-size': '20px',
//                     'line-height': '28px'
//                 },
//                 end: {
//                     top: (height * 0.88) + 'px',
//                     bottom: 'auto',
//                     left: '50px',
//                     right: 'auto',
//                     'font-size': '13px',
//                     'line-height': '17px'
//                 }
//             };
//         }
//         return {
//             start: {
//                 top: (height * 0.5) + 'px',
//                 bottom: 'auto',
//                 left: (width * 0.3) + 'px',
//                 right: 'auto',
//                 'font-size': '20px',
//                 'line-height': '28px'
//             },
//             end: {
//                 top: (height * 0.88) + 'px',
//                 bottom: 'auto',
//                 left: '50px',
//                 right: 'auto',
//                 'font-size': '13px',
//                 'line-height': '17px'
//             }
//         };
//     }
// },
{
    html: 'Open 12–5pm Daily<br>'+
          'May 16–31<br><br>' +
          'Opening Reception<br>' +
          'May 15, 6–8pm',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '13px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: 'RI Convention Center<br>'+
          'Exhibition Hall A<br>' +
          'One Sabin Street, Providence',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.5) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '28px'
                },
                end: {
                    top: (height * 0.88) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '13px',
                    'line-height': '17px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '20px',
                    'line-height': '28px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '13px',
                    'line-height': '17px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.55) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: (height * 0.88) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '13px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: '<svg>' +
          '</svg>',
    cls: 'logo-component--asterisk text-left',
    type: 'subsidiary',
    start: {
        top: '30%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '20px',
                    'line-height': '28px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '10px',
                    'line-height': '17px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '20px',
                    'line-height': '28px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '10px',
                    'line-height': '17px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}];
},{}],57:[function(require,module,exports){
// segment functions take a start
// and and end point. returning
// an array of points that will
// be used to drawn a line connecting
// the start and end.

// both start and end are arrays,
// start = [x,y],  end = [x,y]
module.exports = [{
    from: 'RISD',
    to: 'Grad',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        d += ' c '+
             //cp1
             '0,0 ' +
             //cp2
             (delta_x * 0.08) + ',0 ' +
             //x,y
             (delta_x * 0.1) + ',' +
             (0);

             // total progress
             // x: 0.1
             // y: 0

        d += ' c ' +
             //cp1
             (delta_x * 0.18) + ',0 '+
             //cp2
             (delta_x * 0.18) + ',' + (delta_y * 0.4) + ' ' +
             //x,y
             (0) + ',' +
             ((delta_y * 0.4));
             
             // total progress
             // x: 0.1
             // y: 0.4

        d += ' c ' +
             //cp1
             (-(delta_x * 0.4137)) + ',0 '+
             //cp2
             (-(delta_x * 1)) + ',' + (-(delta_y * 0.128)) + ' ' +
             //x,y
             (-(delta_x * 1.206)) + ',' +
             ((delta_y * 0.03));
             
             // total progress
             // x: -1.106
             // y: 0.43

        d += ' c ' +
             //cp1
             (-(delta_x * 0.148)) + ',' + (delta_y * 0.13244) + ' ' +
             //cp2
             (-(delta_x * 0.15)) + ',' + (delta_y * 0.3908) + ' ' +
             //x,y
             (0) + ',' +
             ((delta_y * 0.549));

             // total progress
             // x: -1.106
             // y: 0.9727

        d += ' c ' +
             //cp1
             ((delta_x * 0.03310)) + ',' + (delta_y * 0.01145) + ' ' +
             //cp2
             ((delta_x * 0.0675)) + ',' + (delta_y * 0.01870) + ' ' +
             //x,y
             ((delta_x * 0.0915)) + ',' +
             ((delta_y * 0.0188));

             // total progress
             // x: -1.106 + 0.0915 = -1.0145
             // y: 0.9727 + 0.0273 = 1.0

        d += ' c ' +
             //cp1
             ((delta_x * 0.024)) + ',' + (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.024)) + ',' + (delta_y * 0) + ' ' +
             //x,y
             ((delta_x * 0.0365)) + ',' +
             (0);

             // total progress
             // x: -1
             // y: 1

        return d;
    }
}, {
    from: 'Grad',
    to: 'Show',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        return d;
    }
}, {
    from: 'Show',
    to: '2014',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        d += ' c '+
             //cp1
             (delta_x * 0.0481637478756) + ',0 ' +
             //cp2
             (delta_x * 0.0847336141284) + ',0 ' +
             //x,y
             (delta_x * 0.111549545555) + ',' +
             (0);

        d += ' c ' +
             //cp1
             ((delta_x * 0)) + ',' +
             (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.113027414468)) + ',' +
             (delta_y * -0.498616793298) + ' ' +
             //x,y
             ((delta_x * -0.365824281386)) + ',' +
             (delta_y * -0.738116111436);

        d += ' c ' +
             //cp1
             ((delta_x * -0.330894849627)) + ',' +
             (delta_y * -0.218897330996) + ' ' +
             //cp2
             ((delta_x * -0.705298160053)) + ',' +
             (delta_y * -0.140405221118) + ' ' +
             //x,y
             ((delta_x * -0.968703908963)) + ',' +
             (delta_y * 0.053263198909);

        d += ' c ' +
             //cp1
             ((delta_x * -0.383152294391)) + ',' +
             (delta_y * 0.273777518021) + ' ' +
             //cp2
             ((delta_x * -0.530990911106)) + ',' +
             (delta_y * 1.0091954023) + ' ' +
             //x,y
             ((delta_x * -0.209385206532)) + ',' +
             (delta_y * 1.4154880187);

        d += ' c ' +
             //cp1
             ((delta_x * 0.0713293430873)) + ',' +
             (delta_y * 0.137385544516) + ' ' +
             //cp2
             ((delta_x * 0.239385206532)) + ',' +
             (delta_y * 0.282232612507) + ' ' +
             //x,y
             ((delta_x * 0.35666888347)) + ',' +
             (delta_y * 0.272232612507);

        d += ' c ' +
             //cp1
             ((delta_x * 0.0355575260474)) + ',' +
             (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.0406340057637)) + ',' +
             (delta_y * 0) + ' ' +
             //x,y
             ((delta_x * 0.0795093475209 )) + ',' +
             (delta_y * 0);

        return d;
    }
}];
},{}],58:[function(require,module,exports){
module.exports = function section_nav () {
    var self = {},
        wrapper_sel,
        data = [{
            text: 'About',
        }, {
            text: 'Visit'
        }, {
            text: 'Work'
        }];

    self.wrapper = function (_) {
        if (!arguments.length) return wrapper_sel;
        wrapper_sel = _;
        return self;
    };

    self.render = function () {
        var container = wrapper_sel.append('div')
            .attr('class', 'grid grid-nav')
            .append('div')
            .attr('class', 'col-10-10')
            .append('div')
            .attr('class', 'nav-section-items');

        container.selectAll('.nav-section-item')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'nav-section-item')
            .append('a')
            .attr('href', function (d) {
                // return '#' + d.text.toLowerCase();
                return;
            })
            .append('p')
            .text(function (d) {
                return d.text;
            });

        return self;
    };


    return self;
};
},{}],59:[function(require,module,exports){
module.exports = function translate () {
    var self = {},
        // the selection that is being translated
        translate_sel,
        // the selection that is being translated over
        // this will determine the height that must be
        // scroll passed, before the translated_sel
        // is translated over
        over_sel,
        over_sel_height = 0,
        // the selection for the full screen element
        // whose z-index and opacity get adjusted
        // instead of just sliding in, the images
        // slide in over the new background.
        background_sel,
        opacity_background_scale = d3.scale.linear()
            .domain([0, 200])  // distance to scroll
            .range([0,1])      // opacity values
            .clamp(true),
        opacity_fixed_scale = d3.scale.linear()
            .domain([400, 200])
            .range([0, 1])
            .clamp(true),
        opacity_nav_scale = d3.scale.linear()
            .domain([-200, 0])
            .range([0, 1])
            .clamp(true),
        opacity_scroll_lead_scale = d3.scale.linear()
            .domain([0, 150])
            .range([1, 0])
            .clamp(true),
        // selection that will fade in
        // typically navigation
        fixed_sel,
        logo_container_offset,
        top_nav_sel,
        scroll_lead_sel;

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    self.translate = function (_) {
        if (!arguments.length) return translate_sel;
        translate_sel = _;
        return self;
    };

    self.nav = function (_) {
        if (!arguments.length) return top_nav_sel;
        top_nav_sel = _;
        return self;
    };

    self.scrollLead = function (_) {
        if (!arguments.length) return scroll_lead_sel;
        scroll_lead_sel = _;
        return self;
    };

    self.over = function (_) {
        if (!arguments.length) return over_sel;
        over_sel = _;

        over_sel_height = get_over_sel_height();

        return self;
    };

    self.background = function(_) {
        if (!arguments.length) return background_sel;
        background_sel = _;
        return self;
    };

    self.fixed = function (_) {
        if (!arguments.length) return fixed_sel;
        fixed_sel = _;
        return self;
    };

    self.setup = function () {
        update_scroll_target_values();
        d3.select(window)
            .on('scroll.translate', function () {
                make_moves();
            })
            .on('touchmove.translate', function () {
                make_moves();
            })
            .on('resize.translate', function () {
                update_scroll_target_values();
            });
    };

    function make_moves () {
        if (pageYOffset > over_sel_height) {
            over_sel
                .style(vendor+'transform',
                       'translate(0px,' +
                        (-(over_sel_height - pageYOffset)) +
                        'px)');
            translate_sel
                .style(vendor+'transform',
                       'translate(0px,' +
                       (over_sel_height - pageYOffset) +
                       'px)');

            fixed_sel
                .style('opacity', opacity_fixed_scale(
                    translate_sel
                        .node()
                        .getBoundingClientRect()
                        .top));
        }
        var opacity_val =
            opacity_background_scale(pageYOffset-
                                     over_sel_height);
        background_sel
            .style('opacity', opacity_val)
            .classed("active", (opacity_val > 0) ? 1: 0);


        if (pageYOffset > (logo_container_offset -200)) {
            top_nav_sel.classed('nav-section--active',
                                true);
        } else {
            top_nav_sel.classed('nav-section--active',
                                false);
        }
        top_nav_sel.style('opacity',
                opacity_nav_scale(pageYOffset -
                                  logo_container_offset));
        scroll_lead_sel.style('opacity',
                opacity_scroll_lead_scale(pageYOffset));
    }

    function update_scroll_target_values () {
        over_sel_height = get_over_sel_height();
        logo_container_offset = get_logo_container_offset();
    }

    function get_over_sel_height () {
        if (!over_sel) return 0;
        return over_sel.node()
                .getBoundingClientRect()
                .height;
    }

    function get_logo_container_offset () {
        return window.innerHeight;
    }


    

    return self;
};
},{}],60:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        iso,
        risd_programs = ['All'];

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    d3.select(window)
        .on('resize.work', function () {
            
        });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true);
            // .classed('col-10-10', true);

        render_data();

        return self;
    };

    self.filter = function (_) {
        if (arguments.length != 1) throw "filter takes one argument";

        var program = _;
        if (program === 'All') program = '';

        if (iso) {
            iso.arrange({
                filter: function (itemElem) {
                    return d3.select(itemElem)
                        .classed(format_program(program));
                }
            });
        }
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        var wide_count = 0,
            wide_frequency = 5;
        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    var extra_class = '';
                    if (d.cover.width > d.cover.height) {
                        wide_count += 1;
                        if ((wide_count/wide_frequency) === 0) {
                            extra_class = ' wide-piece';
                        }
                    }
                    return 'piece ' +
                        format_program(d.risd_program) +
                        extra_class;
                });

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                });

        var work_sel_enter_meta =
            work_sel_enter
                .append('div')
                .attr('class', 'piece-meta-wrapper');

        work_sel_enter_meta
            .append('p')
            .attr('class', 'student_name piece-meta')
            .text(function (d) {
                return d.student_name;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'risd_program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        iso = new Isotope(container.node(), {
            itemSelector: '.piece',
            masonry: {
                columnWidth: '.piece',
                gutter: 30
            }
        });

        window.iso = iso;
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);
        // var widths = d3.scale.identity()
        //     .domain(width_extent);

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module =
                modules_to_include[Math.floor(Math.random() *
                                   modules_to_include.length)];

            var random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover,
                description: d.details.description,
                avatar: d.owners[0].images['138'],
                url: d.owners[0].url
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":51,"./lightbox_fade_up":54}],61:[function(require,module,exports){
module.exports=require(13)
},{}],62:[function(require,module,exports){
var Departments = require('../departments'),
    Logo = require('./logo'),
    Work = require('./work'),
    Translate = require('./translate');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);
    var translate = Translate();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05a', true)
            .classed('concept_05c', true)
            .classed('full-width-work', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid-wrapper');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05c/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid'))
            .render();

        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        var work_background_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work-background');

        var work_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work');
        work.container(work_sel)
            .render();

            
        work.lightbox
            .container(lightbox_container);


        translate
            .translated(work_sel)
            .over(d3.select('.grid'))
            .background(work_background_sel)
            .setup();
    });

    return self;
};
},{"../departments":77,"./logo":64,"./translate":67,"./work":68}],63:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        selected_sel,
        to_transition = {
            container: {
                start: {
                    'background-color': 'rgba(239, 65, 54, 0)',
                    opacity: 0
                },
                end: {
                    'background-color': 'rgba(239, 65, 54, 0.9)',
                    opacity: 1
                }
            }
        },
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var data = sel.datum();
        console.log('data');
        console.log(data);
        console.log('data.modules');
        console.log(data.modules);

        var lightbox_grid_sel = container
            .append('div')
            .attr('class', 'grid');

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta col-2-10');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-work offset-2-10 col-8-10');

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        lightbox_work_sel
            .append('p')
            .attr('class', 'lightbox-description')
            .text(data.description);

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .append('img')
            .attr('src', function (d) {
                return d.sizes.max_1240 ? d.sizes.max_1240 : d.src;
            });

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        lightbox_meta_info_sel
            .append('a')
            .attr('class', 'lightbox-meta-info--personal-link')
            .attr('href', data.url)
            .text('Behance');


        container
            .style(to_transition.container.start);

        container.classed('active', true);
        body_sel.classed('lightbox-open', true);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
                body_sel.classed('lightbox-open', false);
            });
    }

    return self;
};
},{}],64:[function(require,module,exports){
var logoComponents = require('./logo_components'),
    logoPaths = require('./logo_static_paths');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
        logo_component_paths = logoPaths,
        logo_svg,
        logo_line,
        logo_connecting_line,
        straight_line = d3.svg.line();

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true),
        prev_scroll_progress = 0;

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            // update logo components per window
            if (logo_sel) {
                logo_sel.each(function (d) {
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
            update_logo_components(prev_scroll_progress);
            update_logo_line();
        })
        .on('scroll.logo', function () {
            var scroll_progress = scroll_scale(window.scrollY);
            if (scroll_progress != prev_scroll_progress) {
                update_logo_components(scroll_progress);
                update_logo_line();
            }
            prev_scroll_progress = scroll_progress;
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
            .style('line-height', function (d) {
                return d.start['line-height'];
            })
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
        });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        var verticies = logo_verticies();

        logo_line = logo_svg.selectAll('.logo-line')
            .data(verticies.straight)
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', straight_line);

        logo_connecting_line =
            logo_svg
                .selectAll('.logo-connecting')
                .data(verticies.connecting)
                .enter()
                .append('path')
                    .attr('class', 'logo-connecting')
                    .attr('d', function (d) {
                        return d.segment;
                    })
                    .attr('transform', function (d) {
                        return 'translate(' + d.translate.x +
                            ',' + d.translate.y + ') scale(' +
                            d.scale.x + ',' + d.scale.y + ')';
                    });
    };

    function update_logo_components (percent_progress) {
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
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = logo_verticies();
        logo_line
            .data(verticies.straight)
            .attr('d', straight_line);

        logo_connecting_line
            .data(verticies.connecting)
            .attr('d', function (d) {
                return d.segment;
            })
            .attr('transform', function (d) {
                return 'translate(' + d.translate.x +
                    ',' + d.translate.y + ') scale(' +
                    d.scale.x + ',' + d.scale.y + ')';
            });
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        var logo_connecting_line_segments = [];
        logo_line_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))];
            } else {
                first = [bounds.left - 10,
                     (bounds.top + (bounds.height*(2/3)))];
            }

            second = [bounds.right + 10,
                 (bounds.top + (bounds.height*(2/3)))];

            logo_line_verticies.push([first, second]);

        });
        for (var i = 0; i < logo_line_verticies.length; i++) {
            if ((i+1) < logo_line_verticies.length) {
                var start = logo_line_verticies[i][1],
                    end = logo_line_verticies[i+1][0];

                var delta_x = start[0] - end[0],
                    delta_y = end[1] - start[1];

                console.log('delta x, delta y');
                console.log(delta_x, delta_y);
                var d = {};
                d.scale = {
                    x: delta_x/logo_component_paths[i].width,
                    y: delta_y/logo_component_paths[i].height
                };
                d.translate = {
                    x: start[0] -
                        (logo_component_paths[i].width *
                         d.scale.x),
                    y: end[1] -
                        (logo_component_paths[i].height *
                         d.scale.y)
                };
                d.segment = logo_component_paths[i].segment;

                logo_connecting_line_segments.push(d);
            }
        }
        return {
            straight: logo_line_verticies,
            connecting: logo_connecting_line_segments
        };
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
},{"./logo_components":65,"./logo_static_paths":66}],65:[function(require,module,exports){
module.exports=require(48)
},{}],66:[function(require,module,exports){
// all d attributesneed a first point.
// if you wanted the line to start
// at 100,200, it should be:
// d = 'M100,200' + segement

module.exports = [{
    from: 'RISD',
    to: 'Grad',
    width: 145.25,
    height: 131,
    segment:'M145.293,0 c3.215,0,6.297,0,9.211,' +
        '0c50.17,0,44.455,65.185,3.248,64.784' +
        'C97.514,64.198,12.484,46.08-17.041,69.185' +
        ' c-22.054,17.258-23.264,51.452-1.284,58' +
        'c4.748,1.414,9.815,2.5,13.299,2.5s5.317,0,5.317,0'
}, {
    from: 'Grad',
    to: 'Show',
    width: 279.67,
    height: 88.15,
    segment:'M145.293,0 c3.215,0,6.297,0,9.211,' +
        '0c50.17,0,44.455,65.185,3.248,64.784' +
        'C97.514,64.198,12.484,46.08-17.041,69.185' +
        ' c-22.054,17.258-23.264,51.452-1.284,58' +
        'c4.748,1.414,9.815,2.5,13.299,2.5s5.317,0,5.317,0'
}, {
    from: 'Show',
    to: '2014',
    width: 146.79,
    height: 103.8,
    segment:'M145.293,0 c3.215,0,6.297,0,9.211,' +
        '0c50.17,0,44.455,65.185,3.248,64.784' +
        'C97.514,64.198,12.484,46.08-17.041,69.185' +
        ' c-22.054,17.258-23.264,51.452-1.284,58' +
        'c4.748,1.414,9.815,2.5,13.299,2.5s5.317,0,5.317,0'
}];
},{}],67:[function(require,module,exports){
module.exports=require(49)
},{}],68:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 120;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    d3.select(window)
        .on('resize.work', function () {
            resize_masonic();
        });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return +d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return +d.cover.height + masonic_gutter;
        })
        .columnWidth(200 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true);
            // .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        var work_sel_enter_meta =
            work_sel_enter
                .append('div')
                .attr('class', 'piece-meta-wrapper');
        work_sel_enter_meta
            .append('p')
            .attr('class', 'student_name piece-meta')
            .text(function (d) {
                return d.student_name;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'risd_program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);
        // var widths = d3.scale.identity()
        //     .domain(width_extent);

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module_index = Math.floor(Math.random() *
                                   modules_to_include.length),
                random_module =
                    modules_to_include[random_module_index],
                reorder_modules_to_include = [];

            reorder_modules_to_include.push(random_module);
            modules_to_include
                .slice(0,random_module_index)
                .forEach(function (md, mi) {
                    reorder_modules_to_include
                        .push(md);
                });

            modules_to_include.slice(
                    random_module_index+1,
                    modules_to_include.length)
                .forEach(function (md, mi) {
                    reorder_modules_to_include
                        .push(md);
                });



            var max_1240_height =
                (random_module.height/random_module.width) *
                1240;
            var random_cover = {
                original_width: 1240,
                original_height: max_1240_height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': reorder_modules_to_include,
                'cover': random_cover,
                description: d.details.description,
                avatar: d.owners[0].images['138'],
                url: d.owners[0].url
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":61,"./lightbox_fade_up":63}],69:[function(require,module,exports){
var Utility = require('./svg');

module.exports = function logo_scale () {
    var utility = Utility();

    var segments = [{
            from: 'RISD',
            to: 'Grad',
            // scaleUsing: {
            //     func: utility.scaleAnchorY,
            //     args: {
            //         start: 2,
            //         end: 9
            //     }
            // },
            scaleUsing: utility.scaleProportionalY,
            paths: {
                '300': 'M3.564,0' +
                    'c0,0,0,8.851,0,16.81' +
                    'c0,10.554-41.045,97.981-45.904,198.917' +
                    'c-6.86,142.493,102.049,174.925,199.49,178.491' +
                    'c81.964,3,182.991-31.498,208.49-133.493 ' +
                    'c27.54-110.159-83.347-191.99-187.491-148.493 ' +
                    'C-18.932,194.547-25.869,433.805,61.921,533.29 ' +
                    'c87.729,99.415,26.014,171.339-9.625,181.911 ' +
                    'c-66.138,19.62-118.789-31.498-79.638-94.266 ' +
                    'c44.337-71.081,191.99-63.226,229.489-10.729 ' +
                    'C323.852,780.593-59.136,915.788-59.136,921.43' +
                    'c0,18.013,0,111.65,0,111.65',
                '768': 'M94.26-15 '+
                  'h29.796 ' +
                  'c0,0,0.936,8.851,0.936,16.81 '+
                  'c0,28.042-15.901,67.37-61.185,67.37' +
                  'C10.51,69.18-16,69.185-16,69.185' +
                  'v-52' +
                  'c0,0,35.921-4.393,48.649,3.758' +
                  'c37.861,24.242,29.645,46.777-3.8,80.242' +
                  'c-17.027,17.038-44.629,17-44.629,48.653' +
                  // 'c0,18.013,0,24.347,0,24.347'
                  'c0,0,0,0,0,24.347'
            }
        }, {
            from: 'Grad',
            to: 'Show',
            scaleUsing: utility.scaleProportionalX,
            paths: {
                '300': 'M0-0.138' +
                       'c83.627,0.62,238.755,0,344.14,0',
                '768': 'M0,1.271 ' +
                    'c0,0,18.861,0.044,25.818,0.095' +
                    'c59.896,0.444,450.006,0,450.006,0' +
                    'v248.5c0,0-6.799,0-68,0' +
                    'c-148.266,0-138-157.5,0-157.5' +
                    'c110,0,189.628,117.65,302,116' +
                    'c147.621-2.167,193.788-218.705,193.788-285.657' +
                    'c0-190.343-161.788-128.343-161.788-44.343' +
                    'c0,52.401,48.777,94.638,123.424,106' +
                    'c132.894,20.228,285.105,16.936,301.563,17' +
                    'c14.744,0.058,94.147,0.132,94.147,0.132'
            }
        }, {
            from: 'Show',
            to: '2014',
            scaleUsing: utility.scaleProportionalY,
            paths: {
                '300': 'M73.606-48.689 ' +
                    'c3.037-0.032,5.74-0.052,8.089-0.052 ' +
                    'c15.33,0,6.783-49.626-35.337-51.258 ' +
                    'c-43-1.667-70.75,24-77.333,56 ' +
                    'C-36.526-17.015-14.641,0-1.95,0',
                '768': 'M116.745-15' +
                  'c0,0,0,3.103,0,13 '+
                  'c0,12.82-25.702,19.756-44.745,27' +
                  'C44.486,35.467,18,36.02,18,61.5' +
                  'c0,26,17.5,36.828,44.778,36.828' +
                  'C102.667,98.328,104,51,104,51' +
                  'H-16v36' +
                  'c0,0,39.618,9.865,62,36' +
                  'c21.141,24.686,23.541,28,47.023,28' +
                  'c14.977,0,13.697,0,23.697,0' +
                  'v47.724'
            }
        }];

    var temp_path = d3.select('body')
        .append('svg')
        .style('display', 'none')
        .append('path');

    segments.forEach(function (d, i) {
        d.relative_paths_d = {};
        d.relative_paths = {};
        d.scale = {};

        for (var path_size in d.paths) {
            temp_path.attr('d', d.paths[path_size]);
            utility.convertToRelative(temp_path.node());
            d.relative_paths_d[path_size] = temp_path.attr('d');
            d.relative_paths = temp_path.node();
            d.scale[path_size] = d.scaleUsing(d.relative_paths);
        }
    });

    temp_path.remove();

    var sizes = Object.keys(segments[0].paths);
    segments.choose_size = function (window_width, window_height) {
        var chosen = 0;
        sizes.forEach(function (d, i) {
            if (d < window_width) {
                chosen = d;
            }
        });
        return chosen.toString();
    };

    window.segments = segments;

    return segments;
};
},{"./svg":76}],70:[function(require,module,exports){
module.exports = function fullscreen () {
    var self = {},
        selection,
        img_width = 0,
        img_height = 0;

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        selection.each(function (d, i) {
            this.onload = function () {
                if (img_height < this.naturalHeight) {
                    img_height = this.height;
                }
                if (img_width < this.naturalWidth) {
                    img_width = this.width;
                }
                make_full_screen();
            };
            
        });

        return self;
    };
    self.resize = function () {
        make_full_screen();
        return self;
    };

    self.setup = function () {
        d3.select(window)
            .on('resize.fullscreen', function () {
                make_full_screen();
            });

        return self;
    };


    function make_full_screen () {
        if (!selection) throw "full screen requires a selection";

        var width = window.innerWidth,
            height = window.innerHeight;

        if (height > width) {
            selection
                .style('width',
                    ( width * (img_width/img_height)) +'px');
            selection.style('height', '100%');
        } else {
            selection
                .style('height',
                    ( height * (img_width/img_height)) +'px');
            selection.style('width', '100%');
        }
    }
    return self;
};
},{}],71:[function(require,module,exports){
var Nav = require('./overlay_nav'),
    Logo = require('./logo');

module.exports = function site () {
    var self = {},
        color_values = {
            purple: 'rgb(38, 34, 98);',
            orange: 'rgb(255, 61, 56);',
            'lt-purple': 'rgb(146, 53, 125)',
            blue: 'rgb(43, 89, 184)'
        },
        use_images_as_overlay_background = true,
        background_image_rotation_method = 'block',
        background_image_rotation_methods = ['fade', 'block'];

    var colors = Object.keys(color_values);

    var nav = Nav();
    var logo = Logo();

    self.dispatch = d3.dispatch('htmlLoaded');

    self.render = function () {
        var body = d3.select('body');
        body.html('');

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

        body.classed('concept_06', true);
        body.classed('body-' + color, true);
        body.classed('body-alt-' + alt_color, true);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_06/body.html', function (html) {

            body.node().appendChild(html.cloneNode(true))          ;
            self.dispatch.htmlLoaded();

            var pairs = d3.selectAll('.overlay-nav-item')
                .datum(function () { return this.dataset; });


            if (use_images_as_overlay_background) {
                nav.rotateBackground(
                        d3.selectAll('.rotating-background-image'))
                    .rotateMethod(background_image_rotation_method);
            } else {
                d3.selectAll('.rotating-background-image').remove();
                d3.select('.overlay-background-image-screen')
                    .classed('no-images', true);
            }
            nav.selection(pairs)
                .setup();

            logo.container(d3.select('.logo-line'))
                .attachResize()
                .dupeContainer(d3.select('.overlay .logo-line'))
                .render();
        });
        return self;
    };

    return self;
};
},{"./logo":72,"./overlay_nav":74}],72:[function(require,module,exports){
var connectLogoScale = require('./connect_logo_scale');

module.exports = function logo () {
    var self = {},
        window_sel = d3.select(window),
        logo_container_sel,
        dupe_logo_container_sel,
        logo_svg,
        logo_text_sel,
        logo_line_text_sel,
        logo_line_connecting_sel,
        logo_line_merged_sel,
        straight_line = d3.svg.line(),
        connect_logo_scale = connectLogoScale();

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.dupeContainer = function (_) {
        if (!arguments.length) return dupe_logo_container_sel;
        dupe_logo_container_sel = _;
        return self;
    };

    self.attachResize = function () {
        window_sel
            .on('resize.logo', function () {
                var window_width = window.innerWidth,
                    window_height = window.innerHeight;

                logo_svg
                    .attr('width', window_width)
                    .attr('height', window_height);

                if (logo_line_connecting_sel) {
                    update_logo_line(window_width, window_height);
                }

                if (dupe_logo_container_sel) {
                    dupe_logo_container_sel
                        .html(logo_container_sel.html());
                }
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

        // verticies for 
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies,
                                              window_width,
                                              window_height);

        var merged_d = merge_lines(text_verticies,
                                   connecting_segments);

        // logo_line_merged_sel = logo_svg.selectAll('.logo-line-merged')
        //     .data([merged_d])
        //     .enter()
        //     .append('path')
        //         .attr('class', 'logo-line-merged')
        //         .attr('d', function (d) { return d; });


        logo_line_text_sel = logo_svg.selectAll('.logo-line-text')
            .data(text_verticies)
            .enter()
            .append('path')
                .attr('class', 'logo-line-text')
                .attr('d', straight_line);

        logo_line_connecting_sel =
            logo_svg
                .selectAll('.logo-line-connecting')
                .data(connecting_segments)
                .enter()
                .append('path')
                    .attr('class', 'logo-line-connecting')
                    .attr('d', function (d) { return d; });

        if (dupe_logo_container_sel) {
            dupe_logo_container_sel
                .html(logo_container_sel.html());
        }
    };

    function update_logo_line (wwidth, wheight) {
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies,
                                              wwidth,
                                              wheight);

        merge_lines(text_verticies, connecting_segments);

        logo_line_text_sel
            .data(text_verticies)
            .attr('d', straight_line);

        logo_line_connecting_sel
            .data(connecting_segments)
            .attr('d', function (d) { return d; });
    }

    function logo_line_text_verticies (sel) {
        var text_verticies = [];

        sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(0.55)))];
            } else {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.55)))];
            }

            second = [bounds.right + 6,
                 (bounds.top + (bounds.height*(0.55)))];

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
                            .scale
                            [line_size_to_draw](start, end));
            }
        }
        return connecting_segments;
    }

    function merge_lines(text_verticies, connecting_segments) {
        // takes array of vertex pairs, and path
        // elements of connecting segments.
        // returns on path d attribute
        var d = '';

        var temp_path = d3.select('body')
            .append('svg')
            .selectAll('temp-path')
            .data(text_verticies)
            .enter()
            .append('path')
            .attr('d', straight_line)
            .attr('class', 'temp-path')
            .style('display', 'none');

        temp_path.each(function (td, ti) {
            console.log(td);
            d += d3.select(this).attr('d');
            if (connecting_segments[ti]) d += connecting_segments[ti];
        });

        console.log('d');
        console.log(d);

        temp_path.remove();

        return d;
    }

    return self;
};
},{"./connect_logo_scale":69}],73:[function(require,module,exports){
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
},{"./rotate":75}],74:[function(require,module,exports){
var fullscreenImg = require('./fullscreen_img'),
    Button = require('./overlay_button');

module.exports = function nav () {
    var self = {},
        target_sel,
        rotate_background_sel,
        rotate_background_length = 0,
        rotate_direction_ascending = true,
        overlaid = false,
        body_sel = d3.select('body'),
        rotate_methods = {
            fade: rotate_fade,
            block: rotate_block,
            none: function () {}
        },
        rotate_method = 'none';

    var full_screen = fullscreenImg().setup();
    var button = Button();

    self.selection = function (_) {
        if (!arguments.length) return target_sel;
        target_sel = _;

        button
            .selection(target_sel)
            .start();

        return self;
    };

    self.rotateMethod = function (_) {
        if (!arguments.length) return rotate_method;
        rotate_method = _;
        return self;
    };

    self.rotateBackground = function (_) {
        if (!arguments.length) return rotate_background_sel;
        rotate_background_sel = _;

        // set intial values;
        rotate_background_sel
            .datum(function (d, i) {
                d = {};

                d.opacity = (i === 0) ? 1 : 0;
                rotate_background_length += 1;

                return d;
            });

        full_screen.selection(rotate_background_sel)
            .resize();

        return self;
    };

    self.setup = function () {
        if (!target_sel) throw "requires elements to pair";
        target_sel
            .on('click.nav', function (d, di) {
                target_sel
                    .select('#flower');
                overlaid = overlaid ? false : true;
                if (overlaid) rotate();
                activate_deactivate(d);
            });
    };

    function activate_deactivate (d) {
        var overlay = d3.select(d.activate);
        overlay.classed('overlaid', overlaid);
        body_sel.classed('no-scroll', overlaid);
        body_sel.classed(d.body, overlaid);
    }

    function rotate () {
        rotate_methods[rotate_method]();
    }

    function rotate_block () {
        var speed = 800,
            pause = 8000;

        rotate_background_sel
            .transition()
            .duration(500 * rotate_background_length)
            .delay(function (d, i) {
                return i * speed;
            })
            .each('start', function () {
                rotate_background_sel.style('display', 'none');
            })
            .style('display', 'block')
            .each('end', function () {
                setTimeout(function () {
                    rotate_background_sel.style('display', 'none');
                    if (overlaid) rotate();
                }, pause);
            });

    }

    function rotate_fade () {
        rotate_background_sel.transition()
            .duration(5000)
            .each("start", function () {
                rotate_background_sel.each(function (d, i) {
                    d3.select(this).style('z-index', d.z);
                });
            })
            .style('opacity', function (d) {
                return d.opacity;
            })
            .each("end", function () {
                // find current 
                var current_index = 0,
                    next_current_index;

                // get the current index
                rotate_background_sel.each(function (d, i) {
                    if (d.current) {
                        current_index = i;
                    }
                });

                // set the next index based on ascending or not
                // also changing ascending bool if necessary
                if (rotate_direction_ascending) {
                    next_current_index = current_index + 1;
                    if (next_current_index >
                         (rotate_background_length - 1)) {
                        current_index =
                            rotate_background_length - 2;
                        rotate_direction_ascending = false;
                    }
                } else {
                    next_current_index = current_index - 1;
                    if (next_current_index < 0) {
                        next_current_index = 0;
                        rotate_direction_ascending = true;
                    }
                }

                // set opacity values based on next current index
                rotate_background_sel.each(function (d, i) {
                    d.opacity = ((i === next_current_index) ||
                                 (i === current_index)) ?
                                1 : 0;
                    d.current = (i === next_current_index) ?
                                true : false;

                    if (i === next_current_index) {
                        d.z = 3;
                    } else if (i === current_index) {
                        d.z = 2;
                    } else {
                        d.z = 1;
                    }

                });

                if (overlaid) rotate();
            });
    }

    return self;
};
},{"./fullscreen_img":70,"./overlay_button":73}],75:[function(require,module,exports){
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
},{}],76:[function(require,module,exports){
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

    self.scaleProportional = function (path) {
        var delta = {
                drawn: self.pathDelta(path)
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

    self.scaleProportionalY = function (path) {
        // scale y, fit x
        var delta = {
                drawn: self.pathDelta(path)
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

    self.scaleProportionalX = function (path) {
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

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
},{}],77:[function(require,module,exports){
module.exports = function () {
    var self = {},
        wrapper,
        cls = 'department';

    var departments = [
        'Architecture',
        'Ceramics',
        'Digital + Media',
        'Furniture Design',
        'Glass',
        'Graphic Design',
        'Industrial Design',
        'Interior Architecture',
        'Jewelry + Metalsmithing',
        'Landscape Architecture',
        'Painting',
        'Photography',
        'Printmaking',
        'Sculpture',
        'Textiles'
    ];

    self.wrapper = function (x) {
        if (!arguments.length) return wrapper;
        wrapper = x;
        return self;
    };
    self.departments = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.render = function () {
        if (!wrapper) throw "requires a wrapper";

        wrapper
            .append('ul')
            .selectAll(cls)
            .data(departments)
            .enter()
            .append('li')
            .append('p')
            .text(function (d) {
                return d;
            });
    };


    return self;
};
},{}],78:[function(require,module,exports){
var prototypes = {
    concept: {
        '00': Concept_00,
        '01': Concept_01,
        '01a': Concept_01a,
        '02': Concept_02,
        '03': Concept_03,
        '04': Concept_04,
        '04a': Concept_04a,
        '04b': Concept_04b,
        '04c': Concept_04c,
        '04d': Concept_04d,
        '04e': Concept_04e,
		'04g': Concept_04g,
        '05': Concept_05,
        '05a': Concept_05a,
        '05b': Concept_05b,
        '05c': Concept_05c,
        '06': Concept_06
    },
    work: {
        '01': Work_01,
        '01a': Work_01a,
        '01b': Work_01b,
        '02': Work_02,
        '03': Work_03,
        '04': Work_04
    },
    index: {
        '00': function () {}
    }
};

var prototype_to_load = (function () {
    var hash_vars = ['index', '00'];

    var hash = window.location.hash;

    if (hash) {
        hash_vars = hash.split('#')[1].split('&')[0].split('=');
    }

    // return ['work', '01']
    return hash_vars;
})();

exhibition = prototypes[prototype_to_load[0]][prototype_to_load[1]]();

window.exhibition = exhibition;

function Work_01 () {
    var work = require('./work_01/index.js')().render();
    return work;
}
function Work_01a () {
    var work = require('./work_01a/index.js')().render();
    return work;
}
function Work_01b () {
    var work = require('./work_01b/index.js')().render();
    return work;
}
function Work_02 () {
    var work = require('./work_02/index.js')().render();
    return work;
}
function Work_03 () {
    var work = require('./work_03/index.js')().render();
    return work;
}
function Work_04 () {
    var work = require('./work_04/index.js')().render();
    return work;
}

function Concept_00 () {
    var concept = require('./concept_00/index.js')().render();
    return concept;
}

function Concept_01 () {
    var concept = require('./concept_01/index.js')().render();
    return concept;
}

function Concept_01a () {
    var concept = require('./concept_01a/index.js')().render();
    return concept;
}

function Concept_02 () {
    var concept = require('./concept_02/index.js')().render();
    return concept;
}

function Concept_03 () {
    var concept = require('./concept_03/index.js')().render();
    return concept;
}

function Concept_04 () {
    var concept = require('./concept_04/index.js')().render();
    return concept;
}

function Concept_04a () {
    var concept = require('./concept_04a/index.js')().render();
    return concept;
}

function Concept_04b () {
    var concept = require('./concept_04b/index.js')().render();
    return concept;
}

function Concept_04c () {
    var concept = require('./concept_04c/index.js')().render();
    return concept;
}

function Concept_04d () {
    var concept = require('./concept_04d/index.js')().render();
    return concept;
}

function Concept_04e () {
    var concept = require('./concept_04e/index.js')().render();
    return concept;
}

function Concept_04g () {
    var concept = require('./concept_04g/index.js')().render();
    return concept;
}

function Concept_05 () {
    var concept = require('./concept_05/index.js')().render();
    return concept;
}

function Concept_05a () {
    var concept = require('./concept_05a/index.js')().render();
    return concept;
}

function Concept_05b () {
    var concept = require('./concept_05b/index.js')().render();
    return concept;
}

function Concept_05c () {
    var concept = require('./concept_05c/index.js')().render();
    return concept;
}

function Concept_06 () {
    var concept = require('./concept_06/index.js')().render();
    return concept;
}
},{"./concept_00/index.js":2,"./concept_01/index.js":5,"./concept_01a/index.js":7,"./concept_02/index.js":9,"./concept_03/index.js":11,"./concept_04/index.js":12,"./concept_04a/index.js":14,"./concept_04b/index.js":18,"./concept_04c/index.js":23,"./concept_04d/index.js":28,"./concept_04e/index.js":33,"./concept_04g/index.js":38,"./concept_05/index.js":41,"./concept_05a/index.js":45,"./concept_05b/index.js":53,"./concept_05c/index.js":62,"./concept_06/index.js":71,"./work_01/index.js":80,"./work_01a/index.js":82,"./work_01b/index.js":84,"./work_02/index.js":86,"./work_03/index.js":88,"./work_04/index.js":90}],79:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <div class="filters"></div>' +
'    <div class="work"></div>' +
'</div>';
},{}],80:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_01', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.module.width + 'px';
                })
                .style('height', function (d) {
                    return d.module.height + 'px';
                })
            .append('img')
                .attr('src', function (d) {
                    
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    gutter: 20
                }
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":79}],81:[function(require,module,exports){
module.exports=require(79)
},{}],82:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_01a', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.module.width + 'px';
                })
                .style('height', function (d) {
                    return d.module.height + 'px';
                })
            .append('img')
                .attr('src', function (d) {
                    
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece'
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":81}],83:[function(require,module,exports){
module.exports=require(79)
},{}],84:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_01b', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.module.width/2 + 'px';
                })
                .style('height', function (d) {
                    return d.module.height/2 + 'px';
                })
            .append('img')
                .attr('src', function (d) {
                    
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    gutter: 20
                }
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":83}],85:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <div class="work"></div>' +
'</div>';
},{}],86:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_02', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_department': d.risd_department,
                            'module': md
                        });
                    }
                });
            });

            self.data(formatted_work).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', 'piece')
                .style('width', function (d) {
                    if (d.module.width > d.module.height) {
                        return '100px';
                    } else {
                        return ((d.module.height/d.module.width) *
                                 100) + 'px';
                    }
                })
                .style('height', function (d) {
                    if (d.module.height > d.module.width) {
                        return '100px';
                    } else {
                        return ((d.module.width/d.module.height) *
                                 100) + 'px';
                    }
                })
                .style('background-image', function (d) {
                    return 'url(' + d.module.src + ')';
                });
        var iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    gutter: 20
                }
            });
        window.iso = iso;
    }


    return self;
};
},{"./html":85}],87:[function(require,module,exports){
module.exports=require(79)
},{}],88:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_03', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    if (d.module.width > d.module.height) {
                        return '100px';
                    } else {
                        return ((d.module.height/d.module.width) *
                                 100) + 'px';
                    }
                })
                .style('height', function (d) {
                    if (d.module.height > d.module.width) {
                        return '100px';
                    } else {
                        return ((d.module.width/d.module.height) *
                                 100) + 'px';
                    }
                })
                .style('background-image', function (d) {
                    return 'url(' + d.module.src + ')';
                })
            .append('img')
                .attr('src', function (d) {
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece'
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":87}],89:[function(require,module,exports){
module.exports=require(79)
},{}],90:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_04', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);

            var cover_options = ['202', '404'];
            var cover_dimensions = {
                'cover115': {
                    width: 115,
                    height: 90
                },
                'cover202': {
                    width: 202,
                    height: 158
                },
                'cover230': {
                    width: 230,
                    height: 180
                },
                'cover404': {
                    width: 404,
                    height: 316
                }
            };

            var formatted_work = [];
            work.forEach(function (d, i) {
                var modules_to_include = [];
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        modules_to_include.push(md);
                    }
                });

                var random_cover_option =
                    cover_options[Math.floor(Math.random() *
                                       cover_options.length)];

                var random_cover = {
                    width: cover_dimensions[
                                'cover'+random_cover_option].width,
                    height: cover_dimensions[
                                'cover'+random_cover_option].height,
                    src: d.covers[random_cover_option],
                    clss: 'cover'+random_cover_option
                };

                formatted_work.push({
                    'project_name': d.name,
                    'student_name': d.owners[0].display_name,
                    'risd_program': d.risd_program,
                    'modules': modules_to_include,
                    'cover': random_cover
                });

                if (risd_programs.indexOf(d.risd_program) < 0) {
                    risd_programs.push(d.risd_program);
                }
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                           format_program(d.risd_program) + ' ' +
                           d.cover.clss;
                })
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    columnWidth: 202,
                    gutter: 20
                }
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":89}]},{},[78])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAwL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvbWFwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDEvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAxL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDFhL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDIvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wMy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0L2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRhL2JvdHRvbS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0YS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0YS9sb2dvLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRhL3dvcmsuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGIvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGIvbGlnaHRib3hfem9vbV91cC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0Yi93b3JrLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRjL2xpZ2h0Ym94X3pvb21fdXAuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGMvd29yay5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0ZC9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0ZC9saWdodGJveF9mYWRlX3VwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRkL3dvcmsuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGUvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGcvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1L2xvZ28uanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNS9sb2dvX2NvbXBvbmVudHMuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWEvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWEvbGlnaHRib3hfZmFkZV91cC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1YS9sb2dvLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDVhL2xvZ29fY29tcG9uZW50cy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1YS90cmFuc2xhdGUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWEvd29yay5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi9kZXBhcnRtZW50cy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi9saWdodGJveF9mYWRlX3VwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDViL2xvZ28uanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWIvbG9nb19jb21wb25lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDViL2xvZ29fY29ubmVjdGluZy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi9zZWN0aW9uX25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi90cmFuc2xhdGUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWIvd29yay5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yy9saWdodGJveF9mYWRlX3VwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDVjL2xvZ28uanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWMvbG9nb19zdGF0aWNfcGF0aHMuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWMvd29yay5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L2Nvbm5lY3RfbG9nb19zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L2Z1bGxzY3JlZW5faW1nLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDYvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNi9sb2dvLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDYvb3ZlcmxheV9idXR0b24uanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNi9vdmVybGF5X25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L3JvdGF0ZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9kZXBhcnRtZW50cy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL2h0bWwuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29ya18wMS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxYS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxYi9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAyL2h0bWwuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29ya18wMi9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAzL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmtfMDQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDblBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdlBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9SQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDellBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9XG4nPGRpdiBjbGFzcz1cImdyaWRcIj4nICtcbicgICAgPHNlY3Rpb24gaWQ9XCJhYm91dFwiIGNsYXNzPVwiYWJvdXRcIj4nICtcbicgICAgICAgIDxoZ3JvdXAgY2xhc3M9XCJ0aXRsZVwiPicgK1xuJyAgICAgICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmcgc2Nob29sXCI+UklTRDwvaDE+JyArXG4nICAgICAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZyBldmVudFwiPkdyYWQgU2hvdzwvaDE+JyArXG4nICAgICAgICA8L2hncm91cD4nICtcbicgICAgICAgIDxoZ3JvdXAgY2xhc3M9XCJzdWJ0aXRsZVwiPicgK1xuJyAgICAgICAgICAgIDxoMyBjbGFzcz1cImhlYWRpbmcgc2Nob29sXCI+UmhvZGUgSXNsYW5kIFNjaG9vbCBvZiBEZXNpZ248L2gzPicgK1xuJyAgICAgICAgICAgIDxoMyBjbGFzcz1cImhlYWRpbmcgZXZlbnRcIj5HcmFkdWF0ZSBUaGVzaXMgRXhoaWJpdGlvbjwvaDM+JyArXG4nICAgICAgICA8L2hncm91cD4nICtcbicgICAgICAgIDxwPkRhLiB6IHNob3cuPC9wPicgK1xuJyAgICA8L3NlY3Rpb24+JyArXG4nICAgIDxzZWN0aW9uIGlkPVwid2hlcmVcIiBjbGFzcz1cIndoZXJlXCI+JyArXG4nICAgICAgICA8ZGl2IGNsYXNzPVwibWFwXCI+JyArXG4nICAgICAgICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCI1MDBweFwiJyArXG4nICAgICAgICAgICAgICAgICBoZWlnaHQ9XCI0MDcuMDIzcHhcIiB2aWV3Qm94PVwiMCAwIDUwMCA0MDcuMDIzXCIgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDUwMCA0MDcuMDIzXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4nICtcbicgICAgICAgICAgICA8ZGVmcz4nICtcbicgICAgICAgICAgICAgICAgPG1hcmtlciBpZD1cIm1hcmtlci1wb2lcIiBjbGFzcz1cIm1hcmtlci1wb2lcIiAgdmlld0JveD1cIjAgMCA1MCA1MFwiIG1hcmtlcldpZHRoPVwiNTBcIiBtYXJrZXJIZWlnaHQ9XCI1MFwiIG1hcmtlclVuaXRzPVwidXNlclNwYWNlb25Vc2VcIiByZWZYPVwiMjVcIiByZWZZPVwiMjVcIj4nICtcbicgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIHBvaW50cz1cIjMxLjMzOCwxNi44MjggNDUuNjU3LDExLjM4IDUwLDI0LjQ1NSAzNS40NDYsMjkuMTc2IDQ1LjQyMyw0MS4yODMgMzQuMzksNTAgMjUsMzcuMDQ1IDE1LjYxMSw1MCA0LjU3OCw0MS4yODMgJyArXG4nICAgICAgICAgICAgICAgICAgICAgICAgMTQuNTU0LDI5LjE3NiAwLDI0LjQ1NSA0LjM0MywxMS4zOCAxOC42NjIsMTYuODI4IDE4LjMxLDAgMzEuNjkxLDAgXCIvPicgK1xuJyAgICAgICAgICAgICAgICA8L21hcmtlcj4nICtcbicgICAgICAgICAgICA8L2RlZnM+JyArXG4nICAgICAgICAgICAgPGcgY2xhc3M9XCJzdHJlZXRzXCI+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMCw4MS40MDRjMCwwLDUxLjMzNCwyLjg0LDY4LjM3Miw4LjA0NnM2Mi45NDcsMTUuMTQ2LDYyLjk0NywxNS4xNDYnICtcbicgICAgICAgICAgICAgICAgICAgIHM1MS4xMTUsOC41Miw3OS41MTItMC45NDdjMjguMzk3LTkuNDY1LDEyOS42OC01NC45MDIsMTI5LjY4LTU0LjkwMnMzOS43NTYtOC41Miw2OC42MjYsNy41NzJsNTMuMDA4LDUxLjExNScgK1xuJyAgICAgICAgICAgICAgICAgICAgYzAsMCwxNi41NjYsMjguODcsMjEuMjk5LDQyLjU5NmM0LjczMiwxMy43MjUsMTEuODMyLDI0LjM4OSwxMi43NzgsNDEuMDY0czAsNTEuNjk5LDAsNTEuNjk5UzUwMCwyNzQuNTAyLDUwMCwyODIuMDc0JyArXG4nICAgICAgICAgICAgICAgICAgICBzLTQuNzI1LDM2LjQ0My01LjE5OCw0Ny4zMjhjLTAuNDc0LDEwLjg4Ny0xLjQyLDQ4LjI3NS0xLjQyLDQ4LjI3NXMzLjMxMywyMy42NjgsMy4zMTMsMjkuMzQ2XCIvPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNy4xODIsMEw0MS44NjksMjM5LjQ4YzAsMC0yMC4zNTIsNjYuNzM0LTUuNjgsMTE0LjUzNScgK1xuJyAgICAgICAgICAgICAgICAgICAgYzE0LjY3Miw0Ny44MDMsMjEuNzcxLDUzLjAwOCwyMS43NzEsNTMuMDA4XCIvPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMxLjA3MiwzMDQuNzY0bDU5LjI2MS0yNS4zMzZsNTAuNjY3LTI4bDcwLjY2Ny04NC4wMDFjMCwwLDQuNjY3LTEwLjY2NywyNy4zMzMtMjInICtcbicgICAgICAgICAgICAgICAgICAgIHM2My4zMzMtMjgsNjMuMzMzLTI4bDY1LjMzMy0zMS4zMzNsMzQuMzU2LTMzLjE4MlwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMjEuNjY3LDBjMCwwLTMuMzMzLDQxLjQyNi01LjExOSw1OC4wOTNzMy43ODYsMzUuMzMzLDMuNzg2LDM1LjMzM3MxLjMzMywxMi42NjcsMTguNjY3LDQwJyArXG4nICAgICAgICAgICAgICAgICAgICBjMTcuMzMzLDI3LjMzNCwzLjMzMywzNy4zMzQsMy4zMzMsMzcuMzM0bC0yMiwyMi41ODRMMTk5LDIyMy40MjZjMCwwLTI2LjY2NywzOS4zMzQtMjkuMzMzLDQyLjY2OHMtMTUuMzMzLDE0LTI5LjMzMyw2LjY2NicgK1xuJyAgICAgICAgICAgICAgICAgICAgcy0yMiwwLTIyLDBzLTcuMzMzLDQtMjIuNjY3LDEwLjY2NmMtMTUuMzMzLDYuNjY4LTM5Ljc4MSwxMC43MjktMzkuNzgxLDEwLjcyOVwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk02Ny43MDIsMTQ0Ljc1OGwxNi4xNDcsNi43MjRjMCwwLDE0Ljc5Nyw0LjMzNywzMC44NywyLjA5M2w3Ni4wMjYtMS41ODJsMjUuODAyLDEuNTgyJyArXG4nICAgICAgICAgICAgICAgICAgICBsMjQuNzEyLTEuMzI4YzAsMCw0LjQ1NC0wLjAzMyw4Ljc0LTIuNzU4YzEuNjAzLTEuMDE4LDMuNzYxLDAuMjA3LDcuODQzLDEuNzM4bDEzLjAxMSwyLjk5MmwzMS4zODEsOC4yMzInICtcbicgICAgICAgICAgICAgICAgICAgIGMwLDAsMTMuMjY2LDEuMjc2LDIwLjkyLDEwLjk3MXMzMS4zODEsMzIuMTQ1LDMxLjM4MSwzMi4xNDVsMzguNTIyLDQwLjU2NGwzMy4xNjYsMzMuNjc4bDI1LjI1NywyMi43MDVsMjUuNzY4LDIyLjk2MScgK1xuJyAgICAgICAgICAgICAgICAgICAgbDE3LjE0NywxNS41NjRcIi8+JyArXG4nICAgICAgICAgICAgPC9nPicgK1xuJyAgICAgICAgICAgIDxnIGNsYXNzPVwicG9pXCI+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTk0Ljk2LDE2Ny44OTVcIi8+JyArXG4nICAgICAgICAgICAgPC9nPicgK1xuJyAgICAgICAgICAgIDwvc3ZnPicgK1xuJyAgICAgICAgPC9kaXY+JyArXG4nICAgICAgICA8ZGl2IGNsYXNzPVwibG9jYXRpb24td3JpdHRlblwiPicgK1xuJyAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidWlsZGluZ1wiPicgK1xuJyAgICAgICAgICAgICAgICA8cD5SSSBDb252ZW50aW9uIENlbnRlcjwvcD4nICtcbicgICAgICAgICAgICAgICAgPHA+RXhoaWJpdCBIYWxsIEE8L3A+JyArXG4nICAgICAgICAgICAgICAgIDxwPk9uZSBTYWJpbiBTdHJlZXQsIFByb3ZpZGVuY2U8L3A+JyArXG4nICAgICAgICAgICAgPC9kaXY+JyArXG4nICAgICAgICA8L2Rpdj4nICtcbicgICAgPC9zZWN0aW9uPicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKSxcbiAgICBTVkdNYXAgPSByZXF1aXJlKCcuL21hcCcpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7XG4gICAgICAgIG1hcDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIC8vIGxvYWQgdGhlIG1hcFxuICAgICAgICBzZWxmLm1hcCA9IFNWR01hcC5wYXRocyhkMy5zZWxlY3RBbGwoJy5zdHJlZXRzIHBhdGgnKSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNYXAgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIG1hcCxcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uLFxuICAgICAgICBzdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgc2VsZi5wYXRocyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHBhdGhzX3NlbGVjdGlvbjtcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhdGUgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzdGF0ZTtcbiAgICAgICAgc3RhdGUgPSB4O1xuICAgICAgICBhcHBseV9zdGF0ZSgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwbHlfc3RhdGUgKCkge1xuICAgICAgICB2YXIgdHdlZW5fZGFzaHMgPSB7XG4gICAgICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBwYXRoc19zZWxlY3Rpb25cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLCB0d2Vlbl9kYXNoc1tzdGF0ZV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfaGlkZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcobCArIFwiLFwiICsgbCwgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvdygpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLFwiICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0nKTtcbiAgICBjb25zb2xlLmxvZygnVG9nZ2xlIG1hcCBzdGF0ZTonKTtcbiAgICBjb25zb2xlLmxvZygnZXhoaWJpdGlvbi5tYXAuc3RhdGUoXCJoaWRkZW5cIiknKTtcbiAgICBjb25zb2xlLmxvZygnZXhoaWJpdGlvbi5tYXAuc3RhdGUoXCJzaG93aW5nXCIpJyk7XG4gICAgY29uc29sZS5sb2coJy0tLS0tLScpO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzdmcsXG4gICAgICAgIHBhdGhzLFxuICAgICAgICBwb2lzID0ge30sXG4gICAgICAgIG5hbWVkX3BhdGhzID0ge30sXG4gICAgICAgIG5hbWVkX3RleHQgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuXG4gICAgd2luZG93X3NlbC5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9pX2Jib3ggPSBwb2lzWydjb252ZW50aW9uLWNlbnRlci1tYXJrZXInXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdmFyIHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93ID1cbiAgICAgICAgICAgIHBvaV9iYm94LnRvcCAtIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID09PSAnaGlkZGVuJykgJlxuICAgICAgICAgICAgKHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93IDwgMCkpIHtcblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhdGUgPT09ICdzaG93aW5nJykgJlxuICAgICAgICAgICAgICAgICAgIChwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA+IDApKSB7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FuaW1hdGVGaXJzdCcsICdhbmltYXRlU2Vjb25kJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlRmlyc3QnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlRmlyc3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDApXG4gICAgICAgICAgICAuZGVsYXkoMjcwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZVNlY29uZCcsXG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcblxuICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwKVxuICAgICAgICAgICAgLmRlbGF5KDI3MDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLFxuICAgICAgICAgICAgICAgICh0cmFuc2l0aW9uX3RvX3N0YXRlID09PSAnaGlkZGVuJykgPyAwIDogMSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDEvY29uY2VwdC0xLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmVfMV8gcGF0aCcpO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNsaW5lIHBhdGgnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5zdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10uc3RhdGUgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAnMCwnICtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VG90YWxMZW5ndGgoKSk7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAnMCwnICtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldFRvdGFsTGVuZ3RoKCkpO1xuXG5cbiAgICAgICAgICAgIHBvaXNbJ2NvbnZlbnRpb24tY2VudGVyLW1hcmtlciddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0KCcjZHJvcF9waW4gcGF0aCcpO1xuXG5cbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI2hvbWUgI3RleHRfMl8nKTtcbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXS5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjbWFwICN0ZXh0XzFfLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNsYW5kLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNzdHJlZXQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNtYXAgI2Ryb3BfcGluJyk7XG4gICAgICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlRmlyc3QoJ3Nob3dpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfaGlkZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcobCArIFwiLFwiICsgbCwgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvdygpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLFwiICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDFhICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzdmcsXG4gICAgICAgIHBhdGhzLFxuICAgICAgICBuYW1lZF9wYXRocyA9IHt9LFxuICAgICAgICBuYW1lZF90ZXh0ID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KTtcblxuICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FuaW1hdGVGaXJzdCcsICdhbmltYXRlU2Vjb25kJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlRmlyc3QnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlRmlyc3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDApXG4gICAgICAgICAgICAuZGVsYXkoMjcwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuICAgIH0pO1xuXG4gICAgd2luZG93X3NlbC5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3ZnX2Jib3ggPSBzdmcubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgcGF0aF9iYm94ID0gbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgY3VycmVudF9sZW5ndGggPSAwO1xuXG4gICAgICAgIGlmIChzdmdfYmJveC50b3AgIDwgMCkge1xuICAgICAgICAgICAgY3VycmVudF9sZW5ndGggPVxuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgIC5zY2FsZSh3aW5kb3cuaW5uZXJIZWlnaHQgLSBwYXRoX2Jib3gudG9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICAgY3VycmVudF9sZW5ndGggKyAnLCcgK1xuICAgICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10udG90YWxfbGVuZ3RoKTtcblxuICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAoY3VycmVudF9sZW5ndGgvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG90YWxfbGVuZ3RoKSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDEvY29uY2VwdC0xLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmVfMV8gcGF0aCcpO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNsaW5lIHBhdGgnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcGF0aCBpbiBuYW1lZF9wYXRocykge1xuICAgICAgICAgICAgICAgIHZhciBsID0gbmFtZWRfcGF0aHNbcGF0aF0ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgICAgICAgICBoID0gbmFtZWRfcGF0aHNbcGF0aF0ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1twYXRoXS5zdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbcGF0aF0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzAsJyArIGwgKTtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1twYXRoXS50b3RhbF9sZW5ndGggPSBsO1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW3BhdGhdLnNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgICAgICAgICAgLmRvbWFpbihbMCwgaF0pXG4gICAgICAgICAgICAgICAgICAgIC5yYW5nZShbMCwgbF0pXG4gICAgICAgICAgICAgICAgICAgIC5jbGFtcCh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmFtZWRfdGV4dFsnZmlyc3Qtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjaG9tZSAjdGV4dF8yXycpO1xuICAgICAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI21hcCAjdGV4dF8xXywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjZHJvcF9waW4nKTtcblxuICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI21hcCAjbGFuZCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNzdHJlZXQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB0ZXh0IGluIG5hbWVkX3RleHQpIHtcbiAgICAgICAgICAgICAgICBuYW1lZF90ZXh0W3RleHRdLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZUZpcnN0KCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzdmcsXG4gICAgICAgIHBhdGhzLFxuICAgICAgICBuYW1lZF9wYXRocyA9IHt9LFxuICAgICAgICBuYW1lZF90ZXh0ID0ge30sXG4gICAgICAgIGxvZ29zID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KTtcblxuICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgfTtcbiAgICB2YXIgdHdlZW5fZGFzaF9vcHBvc2l0ZSA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX3Nob3dfcmV2ZXJzZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX2hpZGVfcmV2ZXJzZVxuICAgIH07XG5cbiAgICB3aW5kb3dfc2VsLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgIH0pO1xuICAgIFxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYW5pbWF0ZUZpcnN0JywgJ2FuaW1hdGVTZWNvbmQnKTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVGaXJzdCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVGaXJzdCcpO1xuICAgICAgICBcbiAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgICAgIC5kZWxheSgxNzAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgbG9nb3NbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDQwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0sIDMwMDApO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZVNlY29uZCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVTZWNvbmQnKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbicpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hfb3Bwb3NpdGVbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIGxvZ29zWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLW91dCcpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDQwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICBsb2dvc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW4nKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuXG4gICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDE4MDApXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDQwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtb3V0JylcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgIG5hbWVkX3RleHRbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxODAwKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG5cblxuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wMi9jb25jZXB0LTIuc3ZnJyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0cykge1xuXG4gICAgICAgICAgICB2YXIgc3ZnX2ZyYWdlbWVudCA9IGQzLnNlbGVjdCgnLmdyaWQnKS5ub2RlKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQocmVzdWx0cy5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICAgICAgICBzdmcgPSBkMy5zZWxlY3QoJy5ncmlkIHN2ZycpO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdmcuc2VsZWN0KCcjbGluZV8xXyBwYXRoJyk7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmUgcGF0aCcpO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICcwLCcgK1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICcwLCcgK1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VG90YWxMZW5ndGgoKSk7XG5cbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI2hvbWUgI3RleHRfMV8nKTtcbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXS5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjbWFwICN0ZXh0LCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNsYW5kLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNzdHJlZXQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNtYXAgI2Ryb3BfcGluJyk7XG4gICAgICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgICAgIGxvZ29zWydmaXJzdC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJyNsb2dvIHRleHQnKTtcbiAgICAgICAgICAgIGxvZ29zWydzZWNvbmQtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjbG9nb18xXyB0ZXh0Jyk7XG5cbiAgICAgICAgICAgIGxvZ29zWydmaXJzdC1zZWN0aW9uJ10uc3R5bGUoJ29wYWNpdHknLCAwKTtcbiAgICAgICAgICAgIGxvZ29zWydzZWNvbmQtc2VjdGlvbiddLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZUZpcnN0KCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGVfcmV2ZXJzZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLDAsXCIgKyBsICsgXCIsXCIgKyBsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiMCxcIiArIGwgKyBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93X3JldmVyc2UoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwgKyBcIjAsXCIgKyBsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiMCwwLFwiICsgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHN2ZyxcbiAgICAgICAgcGF0aHMgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuICAgIHZhciB0d2Vlbl9kYXNoX29wcG9zaXRlID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfc2hvd19yZXZlcnNlLFxuICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfaGlkZV9yZXZlcnNlXG4gICAgfTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgfSk7XG4gICAgXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhbmltYXRlRmlyc3QnLCAnYW5pbWF0ZVNlY29uZCcpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZUZpcnN0JywgZnVuY3Rpb24gKHRyYW5zaXRpb25fdG9fc3RhdGUpIHtcbiAgICAgICAgXG4gICAgICAgIHBhdGhzLmxpbmUuZmlyc3RcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cbiAgICAgICAgcGF0aHMuaGlkZV9zaG93LmZpcnN0LmFsbFxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgICAgIC5kZWxheSgxNzAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgcGF0aHMubG9nby5maXJzdC5hbGxcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCxpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZVNlY29uZCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVTZWNvbmQnKTtcblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5vbignY2xpY2snLCBudWxsKTtcblxuICAgICAgICBwYXRocy5saW5lLmZpcnN0XG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLFxuICAgICAgICAgICAgICAgICAgICAgICBwYXRoVHdlZW4ocGF0aHMubGluZS5zZWNvbmQuYXR0cignZCcpKSwgNCk7XG5cblxuICAgICAgICBkZWxldGUgcGF0aHMubG9nby5maXJzdFsnYWxsJ107XG4gICAgICAgIGZvciAodmFyIGl0ZW0gaW4gcGF0aHMubG9nby5maXJzdCkge1xuICAgICAgICAgICAgcGF0aHMubG9nby5maXJzdFtpdGVtXVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgICAgICAuYXR0clR3ZWVuKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhzLmxvZ28uZmlyc3RbaXRlbV0uYXR0cigndHJhbnNmb3JtJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRocy5sb2dvLnNlY29uZFtpdGVtXS5hdHRyKCd0cmFuc2Zvcm0nKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wMi9jb25jZXB0LTIuc3ZnJyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0cykge1xuXG4gICAgICAgICAgICB2YXIgc3ZnX2ZyYWdlbWVudCA9IGQzLnNlbGVjdCgnLmdyaWQnKS5ub2RlKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQocmVzdWx0cy5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICAgICAgICBzdmcgPSBkMy5zZWxlY3QoJy5ncmlkIHN2ZycpO1xuXG4gICAgICAgICAgICBwYXRocy5sb2dvID0ge1xuICAgICAgICAgICAgICAgIGZpcnN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHJpc2Q6IHN2Zy5zZWxlY3QoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDEpJyksXG4gICAgICAgICAgICAgICAgICAgIGdyYWQ6IHN2Zy5zZWxlY3QoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDIpJyksXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHN2Zy5zZWxlY3QoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDMpJyksXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IHN2Zy5zZWxlY3QoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDQpJyksXG4gICAgICAgICAgICAgICAgICAgIGFsbDogc3ZnLnNlbGVjdEFsbCgnI2hvbWUgI2xvZ28gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMSksJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2hvbWUgI2xvZ28gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMiksJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2hvbWUgI2xvZ28gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMyksJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2hvbWUgI2xvZ28gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCg0KScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcmlzZDogc3ZnLnNlbGVjdCgnI21hcCAjbG9nb18xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCgxKScpLFxuICAgICAgICAgICAgICAgICAgICBncmFkOiBzdmcuc2VsZWN0KCcjbWFwICNsb2dvXzFfICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDIpJyksXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHN2Zy5zZWxlY3QoJyNtYXAgI2xvZ29fMV8gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMyknKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogc3ZnLnNlbGVjdCgnI21hcCAjbG9nb18xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCg0KScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIgc2VjdGlvbiBpbiBwYXRocy5sb2dvKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBwYXRocy5sb2dvW3NlY3Rpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmxvZ29bc2VjdGlvbl1baXRlbV1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIHBhdGhzLmxpbmUgPSB7XG4gICAgICAgICAgICAgICAgZmlyc3Q6IHN2Zy5zZWxlY3QoJyNsaW5lXzFfIHBhdGgnKSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IHN2Zy5zZWxlY3QoJyNsaW5lIHBhdGgnKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIgY3VyIGluIHBhdGhzLmxpbmUpIHtcbiAgICAgICAgICAgICAgICBwYXRocy5saW5lW2N1cl0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgICAgICcwLCcrXG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmxpbmVbY3VyXS5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpKTtcblxuICAgICAgICAgICAgICAgIHBhdGhzLmxpbmVbY3VyXS5zdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgcGF0aHMuaGlkZV9zaG93ID0ge1xuICAgICAgICAgICAgICAgIGZpcnN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmhlYWQ6IHN2Zy5zZWxlY3QoJyNob21lICN0ZXh0XzFfICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdnOm50aC1jaGlsZCgxKSB0ZXh0JyksXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IHN2Zy5zZWxlY3QoJyNob21lICN0ZXh0XzFfICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJz4gKjpudGgtY2hpbGQoNiknKSxcbiAgICAgICAgICAgICAgICAgICAgYWxsOiBzdmcuc2VsZWN0QWxsKCcjaG9tZSAjdGV4dF8xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc+ICo6bnRoLWNoaWxkKDYpLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjaG9tZSAjdGV4dF8xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZzpudGgtY2hpbGQoMSkgdGV4dCcpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbG9jX2RhdGU6IHN2Zy5zZWxlY3QoJyN0ZXh0ID4gKjpudGgtY2hpbGQoNiknKSxcbiAgICAgICAgICAgICAgICAgICAgYWxsOiBzdmcuc2VsZWN0KCcjdGV4dCA+ICo6bnRoLWNoaWxkKDYpJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwYXRocy5oaWRlX3Nob3cuZmlyc3QuYWxsLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICBwYXRocy5oaWRlX3Nob3cuc2Vjb25kLmFsbC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG5cblxuICAgICAgICAgICAgcGF0aHMubWFwID0ge1xuICAgICAgICAgICAgICAgIGRyb3BfcGluOiBzdmcuc2VsZWN0KCcjZHJvcF9waW4nKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdmcuc2VsZWN0QWxsKCcjdGV4dCA+ICo6bnRoLWNoaWxkKDIpLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyN0ZXh0ID4gKjpudGgtY2hpbGQoNCknKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGF0aHMubWFwLmRyb3BfcGluLmF0dHIoJ3RyYW5zZm9ybScsICdzY2FsZSgwKScpO1xuICAgICAgICAgICAgcGF0aHMubWFwLnRleHQuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlX3JldmVyc2UoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCwwLFwiICsgbCArIFwiLFwiICsgbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjAsXCIgKyBsICsgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvd19yZXZlcnNlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsICsgXCIwLFwiICsgbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjAsMCxcIiArIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXRoVHdlZW4oZDEsIHByZWNpc2lvbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGF0aDAgPSB0aGlzLFxuICAgICAgICAgICAgcGF0aDEgPSBwYXRoMC5jbG9uZU5vZGUoKSxcbiAgICAgICAgICAgIG4wID0gcGF0aDAuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIG4xID0gKHBhdGgxLnNldEF0dHJpYnV0ZShcImRcIiwgZDEpLCBwYXRoMSkuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgXG4gICAgICAgIC8vIFVuaWZvcm0gc2FtcGxpbmcgb2YgZGlzdGFuY2UgYmFzZWQgb24gc3BlY2lmaWVkIHByZWNpc2lvbi5cbiAgICAgICAgdmFyIGRpc3RhbmNlcyA9IFswXSwgaSA9IDAsIGR0ID0gcHJlY2lzaW9uIC8gTWF0aC5tYXgobjAsIG4xKTtcbiAgICAgICAgd2hpbGUgKChpICs9IGR0KSA8IDEpIGRpc3RhbmNlcy5wdXNoKGkpO1xuICAgICAgICBkaXN0YW5jZXMucHVzaCgxKTtcbiAgICAgXG4gICAgICAgIC8vIENvbXB1dGUgcG9pbnQtaW50ZXJwb2xhdG9ycyBhdCBlYWNoIGRpc3RhbmNlLlxuICAgICAgICB2YXIgcG9pbnRzID0gZGlzdGFuY2VzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgdmFyIHAwID0gcGF0aDAuZ2V0UG9pbnRBdExlbmd0aCh0ICogbjApLFxuICAgICAgICAgICAgICBwMSA9IHBhdGgxLmdldFBvaW50QXRMZW5ndGgodCAqIG4xKTtcbiAgICAgICAgICByZXR1cm4gZDMuaW50ZXJwb2xhdGUoW3AwLngsIHAwLnldLCBbcDEueCwgcDEueV0pO1xuICAgICAgICB9KTtcbiAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgcmV0dXJuIHQgPCAxID8gXCJNXCIgKyBwb2ludHMubWFwKGZ1bmN0aW9uKHApIHsgcmV0dXJuIHAodCk7IH0pLmpvaW4oXCJMXCIpIDogZDE7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDQgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgZ3JpZF9zZWwsXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zZWwsXG4gICAgICAgIGxvZ29fY29tcG9uZW50cyA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnUklTRCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tcmlzZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGV4dDogJ0dyYWQnLFxuICAgICAgICAgICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWdyYWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRleHQ6ICdTaG93JyxcbiAgICAgICAgICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1zaG93J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZXh0OiAnMjAxNCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tMjAxNCdcbiAgICAgICAgfV0sXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX2xpbmUsXG4gICAgICAgIGxpbmUgPSBkMy5zdmcubGluZSgpO1xuXG4gICAgd2luZG93X3NlbC5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICB1cGRhdGVfbG9nb19saW5lKCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDQnLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG5cbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ29fc2VsID0gbG9nb19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnbG9nby1jb21wb25lbnQnKVxuICAgICAgICAgICAgLmRhdGEobG9nb19jb21wb25lbnRzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbG9nby1jb21wb25lbnQgJyArIGQuY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQudGV4dDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fc3ZnID0gbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLXN2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgbG9nb19saW5lID0gbG9nb19zdmcuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgICAgICAgIC5kYXRhKFtsb2dvX3ZlcnRpY2llcygpXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lJylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpO1xuXG4gICAgICAgIGdyaWRfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNC9ncmlkLmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBncmlkX3NlbC5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB2ZXJ0aWNpZXMgPSBbbG9nb192ZXJ0aWNpZXMoKV07XG4gICAgICAgIGxvZ29fbGluZS5kYXRhKHZlcnRpY2llcyk7XG4gICAgICAgIGxvZ29fbGluZS5hdHRyKCdkJywgbGluZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb192ZXJ0aWNpZXMgKCkge1xuICAgICAgICB2YXIgbG9nb19saW5lX3ZlcnRpY2llcyA9IFtdO1xuICAgICAgICBsb2dvX3NlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0IC0gMTAsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgIFtib3VuZHMucmlnaHQgKyAxMCxcbiAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsb2dvX2xpbmVfdmVydGljaWVzO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCIvLyByZXF1aXJlcyBkM1xuXG4vLyBwYXNzIGl0IGEgY29udGFpbmVyLCB3aG9zZSByZWxhdGlvbnNoaXAgdG8gdGhlIGJvdHRvbVxuLy8gb2YgdGhlIHdpbmRvdyB5b3UnZCBsaWtlIHRvIGtub3cuIGFuZCBpZiBpdHMgY29udGFpbmVyXG4vLyBoYXMgYSBtYXJnaW4gYm90dG9tLCBwYXNzIHRoYXQgaW4gYXNcbi8vIGFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbV9zZWwuXG5cbi8vIHdpbGwgc2VsZi5kaXNwYXRjaCB3aWxsIGRpc3BhdGNoIHRoZSBtZXNzYWdlICdib3R0b20nXG4vLyB3aGVuIHRoZSBjb250YWluZXIgaXMgYXQgdGhlIGJvdHRvbSBvZiB0aGUgd2luZG93XG4vLyBpdCBzZXRzIHRoZSBgZGlydHlgIGZsYWcgdG8gdHJ1ZS5cblxuLy8gZWxzZSB3aGVyZSwgZ3JhYiBtb3JlIGRhdGEsIGFuZCB0aGVuIHJlc2V0XG4vLyB0aGUgYGRpcnR5YCBmbGFnIHRvIGZhbHNlLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJvdHRvbSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGlydHkgPSBmYWxzZSxcbiAgICAgICAgYWRkaXRpb25hbF9tYXJnaW5fYm90dG9tID0gMCxcbiAgICAgICAgYWRkaXRpb25hbF9tYXJnaW5fYm90dG9tX3NlbCxcbiAgICAgICAgY29udGFpbmVyX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYm90dG9tJyk7XG5cbiAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAub24oJ3Jlc2l6ZS5ib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbV9zZWwpIHJldHVybjtcblxuICAgICAgICAgICAgYWRkaXRpb25hbF9tYXJnaW5fYm90dG9tID1cbiAgICAgICAgICAgICAgICArYWRkaXRpb25hbF9tYXJnaW5fYm90dG9tX3NlbFxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi1ib3R0b20nKVxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdzY3JvbGwuYm90dG9tJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoZGlydHkpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGNib3ggPSBjb250YWluZXJfc2VsLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgaWYgKChjYm94LmJvdHRvbSArIGFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbSkgPD1cbiAgICAgICAgICAgICAgICAod2luZG93LmlubmVySGVpZ2h0KSkge1xuXG4gICAgICAgICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYm90dG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5hZGRpdGlvbmFsTWFyZ2luQm90dG9tU2VsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYWRkaXRpb25hbF9tYXJnaW5fYm90dG9tX3NlbDtcbiAgICAgICAgYWRkaXRpb25hbF9tYXJnaW5fYm90dG9tX3NlbCA9IF87XG5cbiAgICAgICAgLy8gc2lkZSBlZmZlY3Qgb2YgdXBkYXRpbmdcbiAgICAgICAgYWRkaXRpb25hbF9tYXJnaW5fYm90dG9tID1cbiAgICAgICAgICAgICthZGRpdGlvbmFsX21hcmdpbl9ib3R0b21fc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tYm90dG9tJylcbiAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGlydHkgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkaXJ0eTtcbiAgICAgICAgZGlydHkgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBEZXBhcnRtZW50cyA9IHJlcXVpcmUoJy4uL2RlcGFydG1lbnRzJyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdodG1sTG9hZGVkJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBEZXBhcnRtZW50cygpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yayhzZWxmKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29uY2VwdF8wNCBjb25jZXB0XzA0YScsIHRydWUpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgLy8gLmxvZ28tY29udGFpbmVyIGlzIGEgbmVpZ2hib3Igb2YgLmdyaWRcbiAgICAgICAgdmFyIGxvZ29fY29udGFpbmVyX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb250YWluZXInKTtcblxuICAgICAgICBsb2dvLmNvbnRhaW5lcihsb2dvX2NvbnRhaW5lcl9zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuXG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ3NyYy9jb25jZXB0XzA0YS9ncmlkLmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBncmlkX3NlbC5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5odG1sTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZXBhcnRtZW50c1xuICAgICAgICAgICAgLndyYXBwZXIoZDMuc2VsZWN0KCcuZGVwYXJ0bWVudHMnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94Jyk7XG4gICAgICAgIHdvcmsubGlnaHRib3hcbiAgICAgICAgICAgIC5jb250YWluZXIobGlnaHRib3hfY29udGFpbmVyKVxuICAgICAgICAgICAgLm9yaWdpbmFsQ29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSk7XG5cbiAgICAgICAgd29yay5ib3R0b20uYWRkaXRpb25hbE1hcmdpbkJvdHRvbVNlbChkMy5zZWxlY3QoJy5ncmlkJykpO1xuXG4gICAgICAgIHdvcmsuY29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsLFxuICAgICAgICBsb2dvX3NlbCxcbiAgICAgICAgbG9nb19jb21wb25lbnRzID0gW3tcbiAgICAgICAgICAgIHRleHQ6ICdSSVNEJyxcbiAgICAgICAgICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1yaXNkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZXh0OiAnR3JhZCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tZ3JhZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGV4dDogJ1Nob3cnLFxuICAgICAgICAgICAgY2xzOiAnbG9nby1jb21wb25lbnQtLXNob3cnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRleHQ6ICcyMDE0JyxcbiAgICAgICAgICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS0yMDE0J1xuICAgICAgICB9XSxcbiAgICAgICAgbG9nb19zdmcsXG4gICAgICAgIGxvZ29fbGluZSxcbiAgICAgICAgbGluZSA9IGQzLnN2Zy5saW5lKCk7XG5cbiAgICB3aW5kb3dfc2VsLm9uKCdyZXNpemUubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nb19zZWwgPSBsb2dvX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCdsb2dvLWNvbXBvbmVudCcpXG4gICAgICAgICAgICAuZGF0YShsb2dvX2NvbXBvbmVudHMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsb2dvLWNvbXBvbmVudCAnICsgZC5jbHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC50ZXh0O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICBsb2dvX2xpbmUgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoW2xvZ29fdmVydGljaWVzKCldKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgdmVydGljaWVzID0gW2xvZ29fdmVydGljaWVzKCldO1xuICAgICAgICBsb2dvX2xpbmUuZGF0YSh2ZXJ0aWNpZXMpO1xuICAgICAgICBsb2dvX2xpbmUuYXR0cignZCcsIGxpbmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fdmVydGljaWVzICgpIHtcbiAgICAgICAgdmFyIGxvZ29fbGluZV92ZXJ0aWNpZXMgPSBbXTtcbiAgICAgICAgbG9nb19zZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfdmVydGljaWVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIFtib3VuZHMubGVmdCAtIDEwLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICBbYm91bmRzLnJpZ2h0ICsgMTAsXG4gICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbG9nb19saW5lX3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEJvdHRvbSA9IHJlcXVpcmUoJy4vYm90dG9tJyksXG4gICAgTGlnaHRib3ggPSByZXF1aXJlKCcuLi9jb25jZXB0XzA0Yi9saWdodGJveF96b29tX3VwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGF0YSA9IFtdLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHdvcmtfc2VsLFxuICAgICAgICByaXNkX3Byb2dyYW1zID0gWydBbGwnXSxcbiAgICAgICAgbWFzb25pY19ndXR0ZXIgPSAxMDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnZGF0YUxvYWRlZCcpO1xuXG4gICAgLy8gZGVhbCB3aXRoIHdpbmRvdyBib3R0b20gbG9hZGluZyBtb3JlXG4gICAgdmFyIGJvdHRvbSA9IHNlbGYuYm90dG9tID0gQm90dG9tKCk7XG4gICAgdmFyIGxpZ2h0Ym94ID0gc2VsZi5saWdodGJveCA9IExpZ2h0Ym94KCk7XG5cbiAgICBib3R0b20uZGlzcGF0Y2gub24oJ2JvdHRvbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0X21vcmVfZGF0YSgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0X21vcmVfZGF0YSAoKSB7XG4gICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlydHkoZmFsc2UpO1xuICAgICAgICAgICAgcmVuZGVyX2RhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdldF9kYXRhKCk7XG4gICAgfVxuICAgIC8vIGVuZCBkZWFsaW5nIHdpdGggd2luZG93XG5cbiAgICB2YXIgbWFzb25pYyA9IGQzLm1hc29uaWMoKVxuICAgICAgICAud2lkdGgoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLndpZHRoICsgbWFzb25pY19ndXR0ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5oZWlnaHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLmhlaWdodCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuY29sdW1uV2lkdGgoMjAyICsgbWFzb25pY19ndXR0ZXIpO1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IF87XG5cbiAgICAgICAgLy8gc2lkZSBlZmZlY3Qgb2YgdXBkYXRpbmcgY29udGFpbmVyXG4gICAgICAgIGJvdHRvbS5jb250YWluZXIoY29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnZXRfZGF0YSgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLmNsYXNzZWQoJ21hc29uaWMnLCB0cnVlKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbC0xMC0xMCcsIHRydWUpO1xuXG4gICAgICAgIHJlbmRlcl9kYXRhKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9kYXRhKCkge1xuICAgICAgICB3b3JrX3NlbCA9IGNvbnRhaW5lci5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pICsgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5jbHNzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5zcmM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNTA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGxpZ2h0Ym94LnNob3cpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNpemVfbWFzb25pYygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZV9tYXNvbmljICgpIHtcbiAgICAgICAgdmFyIG91dGVyV2lkdGggPSBjb250YWluZXIucHJvcGVydHkoJ29mZnNldFdpZHRoJyk7XG5cbiAgICAgICAgbWFzb25pY1xuICAgICAgICAgICAgLm91dGVyV2lkdGgob3V0ZXJXaWR0aClcbiAgICAgICAgICAgIC5yZXNldCgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuZGF0dW0obWFzb25pYylcbiAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb250YWluZXIuc3R5bGUoJ2hlaWdodCcsIG1hc29uaWMub3V0ZXJIZWlnaHQoKSArICdweCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9kYXRhICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID1cbiAgICAgICAgICAgICAgICBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMod29yayk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGFMb2FkZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZGF0YSBjb21lcyBvdXQgYXM6XG4gICAgLy8gW3tcbiAgICAvLyAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAvLyAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAvLyAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgIC8vICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAvLyAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgLy8gfSwgXVxuICAgIGZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAod29yaykge1xuICAgICAgICB2YXIgY292ZXJfb3B0aW9ucyA9IFsnMjAyJywgJzQwNCddO1xuICAgICAgICB2YXIgY292ZXJfZGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICdjb3ZlcjExNSc6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTE1LFxuICAgICAgICAgICAgICAgIGhlaWdodDogOTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY292ZXIyMDInOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1OFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb3ZlcjIzMCc6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjMwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMTgwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvdmVyNDA0Jzoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAoNDA0ICsgbWFzb25pY19ndXR0ZXIpLFxuICAgICAgICAgICAgICAgIGhlaWdodDogKDMxNiArIG1hc29uaWNfZ3V0dGVyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuXG4gICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZXNfdG9faW5jbHVkZSA9IFtdO1xuICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgcmFuZG9tX2NvdmVyX29wdGlvbiA9XG4gICAgICAgICAgICAgICAgY292ZXJfb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Zlcl9vcHRpb25zLmxlbmd0aCldO1xuXG4gICAgICAgICAgICB2YXIgcmFuZG9tX2NvdmVyID0ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBjb3Zlcl9kaW1lbnNpb25zW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3ZlcicrcmFuZG9tX2NvdmVyX29wdGlvbl0ud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBjb3Zlcl9kaW1lbnNpb25zW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3ZlcicrcmFuZG9tX2NvdmVyX29wdGlvbl0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHNyYzogZC5jb3ZlcnNbcmFuZG9tX2NvdmVyX29wdGlvbl0sXG4gICAgICAgICAgICAgICAgY2xzczogJ2NvdmVyJytyYW5kb21fY292ZXJfb3B0aW9uXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgICAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChyaXNkX3Byb2dyYW1zLmluZGV4T2YoZC5yaXNkX3Byb2dyYW0pIDwgMCkge1xuICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRfd29yaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIERlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrJyksXG4gICAgTG9nbyA9IHJlcXVpcmUoJy4vbG9nbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDQgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgZ3JpZF9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2h0bWxMb2FkZWQnKTtcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IERlcGFydG1lbnRzKCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG4gICAgdmFyIHdvcmsgPSBXb3JrKHNlbGYpO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb25jZXB0XzA0IGNvbmNlcHRfMDRiJywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICAvLyAubG9nby1jb250YWluZXIgaXMgYSBuZWlnaGJvciBvZiAuZ3JpZFxuICAgICAgICB2YXIgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ28uY29udGFpbmVyKGxvZ29fY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICBncmlkX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDRiL2dyaWQuaHRtbCcsIGZ1bmN0aW9uIChodG1sKSB7XG5cbiAgICAgICAgICAgIGdyaWRfc2VsLm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmh0bWxMb2FkZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQuZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAud3JhcHBlcihkMy5zZWxlY3QoJy5kZXBhcnRtZW50cycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGlnaHRib3hfY29udGFpbmVyID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gnKTtcbiAgICAgICAgd29yay5saWdodGJveFxuICAgICAgICAgICAgLmNvbnRhaW5lcihsaWdodGJveF9jb250YWluZXIpXG4gICAgICAgICAgICAub3JpZ2luYWxDb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKTtcblxuICAgICAgICB3b3JrLmJvdHRvbS5hZGRpdGlvbmFsTWFyZ2luQm90dG9tU2VsKGQzLnNlbGVjdCgnLmdyaWQnKSk7XG5cbiAgICAgICAgd29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlnaHRib3ggKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyLFxuICAgICAgICBsaWdodGJveF9zZWwsXG4gICAgICAgIGxpZ2h0Ym94X2ltZ19zZWwsXG4gICAgICAgIHNlbGVjdGVkX3NlbCxcbiAgICAgICAgdG9fdHJhbnNpdGlvbiA9IHtcbiAgICAgICAgICAgIGRpdjoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAnbWF0cml4KDEsMCwwLDEsMCwwKScsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbWc6IHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MDAgKyAncHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjb250YWluZXInKTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2NvbnRhaW5lcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29udGFpbmVyLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkIGxpZ2h0Ym94Jyk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlbGYub3JpZ2luYWxDb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcmlnaW5hbF9jb250YWluZXI7XG4gICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lciA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IF87XG4gICAgICAgIHNlbGYuZGlzcGF0Y2guY29udGFpbmVyKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvLyBwYXNzIGluIGRhdGEgdG8gbWFrZSBzaG93IHVwXG4gICAgc2VsZi5zaG93ID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWNvbnRhaW5lcikgdGhyb3cgXCJFeHBlY3RlZCBjb250YWluZXIuXCI7XG4gICAgICAgIHNlbGVjdGVkX3NlbCA9IHNlbDtcblxuICAgICAgICB2YXIgb3JpZ2luYWxfY29udGFpbmVyX2JveCA9XG4gICAgICAgICAgICBvcmlnaW5hbF9jb250YWluZXJcbiAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHZhciBjb3B5ID0gc2VsLm5vZGUoKS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHZhciBjb3B5X3NlbCA9IGQzLnNlbGVjdChjb3B5KTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfY29weSA9IGNvbnRhaW5lci5ub2RlKCkuYXBwZW5kQ2hpbGQoY29weSk7XG4gICAgICAgIGxpZ2h0Ym94X3NlbCA9IGNvbnRhaW5lci5zZWxlY3QoJy5waWVjZScpO1xuICAgICAgICBsaWdodGJveF9pbWdfc2VsID0gbGlnaHRib3hfc2VsLnNlbGVjdCgnaW1nJyk7XG5cblxuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydC53aWR0aCA9IHNlbC5zdHlsZSgnd2lkdGgnKTtcblxuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydC5oZWlnaHQgPSBzZWwuc3R5bGUoJ2hlaWdodCcpO1xuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydC50b3AgPVxuICAgICAgICAgICAgKCtzZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0gK1xuICAgICAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyX2JveC50b3ApICsgJ3B4JztcbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQubGVmdCA9XG4gICAgICAgICAgICAoK3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0gK1xuICAgICAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyX2JveC5sZWZ0KSArICdweCc7XG4gICAgICAgIHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0Wyctd2Via2l0LXRyYW5zZm9ybSddID1cbiAgICAgICAgICAgIHNlbC5zdHlsZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcblxuXG4gICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLnN0YXJ0LndpZHRoID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2ltZ19zZWxcbiAgICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcpO1xuICAgICAgICB0b190cmFuc2l0aW9uLmltZy5zdGFydC5oZWlnaHQgPVxuICAgICAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcpO1xuXG5cbiAgICAgICAgdmFyIGRhdGEgPSBzZWwuZGF0dW0oKTtcblxuXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcblxuICAgICAgICBsaWdodGJveF9zZWxcbiAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmRpdi5zdGFydCk7XG5cbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhY2goJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkX3NlbC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxpZ2h0Ym94X3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmRpdi5lbmQpO1xuXG4gICAgICAgICAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmltZy5lbmQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDI4MClcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsaWdodGJveF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQpO1xuXG4gICAgICAgICAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmltZy5zdGFydCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZF9zZWwuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKCcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgQm90dG9tID0gcmVxdWlyZSgnLi9ib3R0b20nKSxcbiAgICBMaWdodGJveCA9IHJlcXVpcmUoJy4vbGlnaHRib3hfem9vbV91cCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB3b3JrX3NlbCxcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIG1hc29uaWNfZ3V0dGVyID0gLTIwO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdkYXRhTG9hZGVkJyk7XG5cbiAgICBcbiAgICB2YXIgYm90dG9tID0gc2VsZi5ib3R0b20gPSBCb3R0b20oKTtcbiAgICB2YXIgbGlnaHRib3ggPSBzZWxmLmxpZ2h0Ym94ID0gTGlnaHRib3goKTtcblxuICAgIC8vIGRlYWwgd2l0aCB3aW5kb3cgYm90dG9tIGxvYWRpbmcgbW9yZVxuICAgIGJvdHRvbS5kaXNwYXRjaC5vbignYm90dG9tJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXRfbW9yZV9kYXRhKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRfbW9yZV9kYXRhICgpIHtcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJvdHRvbS5kaXJ0eShmYWxzZSk7XG4gICAgICAgICAgICByZW5kZXJfZGF0YSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICB9XG4gICAgLy8gZW5kIGRlYWxpbmcgd2l0aCB3aW5kb3dcblxuXG4gICAgdmFyIG1hc29uaWMgPSBkMy5tYXNvbmljKClcbiAgICAgICAgLndpZHRoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuaGVpZ2h0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5oZWlnaHQgKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNvbHVtbldpZHRoKDIwMiArIG1hc29uaWNfZ3V0dGVyKTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChfKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuXG4gICAgICAgIC8vIHNpZGUgZWZmZWN0IG9mIHVwZGF0aW5nIGNvbnRhaW5lclxuICAgICAgICBib3R0b20uY29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdtYXNvbmljJywgdHJ1ZSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb2wtMTAtMTAnLCB0cnVlKTtcblxuICAgICAgICByZW5kZXJfZGF0YSgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZGF0YSgpIHtcbiAgICAgICAgd29ya19zZWwgPSBjb250YWluZXIuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKSArIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIuY2xzcztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGg7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChsaWdodGJveC5zaG93KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzaXplX21hc29uaWMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfbWFzb25pYyAoKSB7XG4gICAgICAgIHZhciBvdXRlcldpZHRoID0gY29udGFpbmVyLnByb3BlcnR5KCdvZmZzZXRXaWR0aCcpO1xuXG4gICAgICAgIG1hc29uaWNcbiAgICAgICAgICAgIC5vdXRlcldpZHRoKG91dGVyV2lkdGgpXG4gICAgICAgICAgICAucmVzZXQoKTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLmRhdHVtKG1hc29uaWMpXG4gICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueCArICdweCc7IH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueSArICdweCc7IH0pXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5kYXRhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLnN0eWxlKCdoZWlnaHQnLCBtYXNvbmljLm91dGVySGVpZ2h0KCkgKyAncHgnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfZGF0YSAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9XG4gICAgICAgICAgICAgICAgZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzKHdvcmspO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5kYXRhTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGRhdGEgY29tZXMgb3V0IGFzOlxuICAgIC8vIFt7XG4gICAgLy8gICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgLy8gICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgLy8gICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAvLyAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgLy8gICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgIC8vIH0sIF1cbiAgICBmdW5jdGlvbiBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMgKHdvcmspIHtcbiAgICAgICAgdmFyIGNvdmVyX29wdGlvbnMgPSBbJzIwMicsICc0MDQnXTtcbiAgICAgICAgdmFyIGNvdmVyX2RpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICAnY292ZXIxMTUnOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDExNSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDkwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvdmVyMjAyJzoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNThcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY292ZXIyMzAnOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIzMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb3ZlcjQwNCc6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogKDQwNCArIG1hc29uaWNfZ3V0dGVyKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICgzMTYgKyBtYXNvbmljX2d1dHRlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcblxuICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcbiAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3Zlcl9vcHRpb24gPVxuICAgICAgICAgICAgICAgIGNvdmVyX29wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY292ZXJfb3B0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogY292ZXJfZGltZW5zaW9uc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25dLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogY292ZXJfZGltZW5zaW9uc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25dLmhlaWdodCxcbiAgICAgICAgICAgICAgICBzcmM6IGQuY292ZXJzW3JhbmRvbV9jb3Zlcl9vcHRpb25dLFxuICAgICAgICAgICAgICAgIGNsc3M6ICdjb3ZlcicrcmFuZG9tX2NvdmVyX29wdGlvblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICAgICAnY292ZXInOiByYW5kb21fY292ZXJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtcy5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcbiAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkX3dvcms7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBEZXBhcnRtZW50cyA9IHJlcXVpcmUoJy4uL2RlcGFydG1lbnRzJyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdodG1sTG9hZGVkJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBEZXBhcnRtZW50cygpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yayhzZWxmKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29uY2VwdF8wNCBjb25jZXB0XzA0YSBjb25jZXB0XzA0YycsIHRydWUpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgLy8gLmxvZ28tY29udGFpbmVyIGlzIGEgbmVpZ2hib3Igb2YgLmdyaWRcbiAgICAgICAgdmFyIGxvZ29fY29udGFpbmVyX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb250YWluZXInKTtcblxuICAgICAgICBsb2dvLmNvbnRhaW5lcihsb2dvX2NvbnRhaW5lcl9zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuXG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ3NyYy9jb25jZXB0XzA0YS9ncmlkLmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBncmlkX3NlbC5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5odG1sTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZXBhcnRtZW50c1xuICAgICAgICAgICAgLndyYXBwZXIoZDMuc2VsZWN0KCcuZGVwYXJ0bWVudHMnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94Jyk7XG4gICAgICAgIHdvcmsubGlnaHRib3hcbiAgICAgICAgICAgIC5jb250YWluZXIobGlnaHRib3hfY29udGFpbmVyKVxuICAgICAgICAgICAgLm9yaWdpbmFsQ29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSk7XG5cbiAgICAgICAgd29yay5ib3R0b20uYWRkaXRpb25hbE1hcmdpbkJvdHRvbVNlbChkMy5zZWxlY3QoJy5ncmlkJykpO1xuXG4gICAgICAgIHdvcmsuY29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpZ2h0Ym94ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lcixcbiAgICAgICAgbGlnaHRib3hfc2VsLFxuICAgICAgICBsaWdodGJveF9pbWdfc2VsLFxuICAgICAgICBzZWxlY3RlZF9zZWwsXG4gICAgICAgIHRvX3RyYW5zaXRpb24gPSB7XG4gICAgICAgICAgICBkaXY6IHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ21hdHJpeCgxLDAsMCwxLDAsMCknLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCArICdweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1nOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzBweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FsY190b190cmFuc2l0aW9uX2ltZyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5zdGFydC53aWR0aCA9IGQud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuc3RhcnQuaGVpZ2h0ID0gZC5oZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5lbmQud2lkdGggPSBkLm9yaWdpbmFsX3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC5oZWlnaHQgPSBkLm9yaWdpbmFsX2hlaWdodCArICdweCc7XG5cblxuICAgICAgICAgICAgaWYgKGQub3JpZ2luYWxfaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuZW5kLnRvcCA9ICcwcHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5lbmQudG9wID1cbiAgICAgICAgICAgICAgICAgICAgKCh3aW5kb3cuaW5uZXJIZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgIGQub3JpZ2luYWxfaGVpZ2h0KSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGQub3JpZ2luYWxfd2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC5sZWZ0ID0gJzBweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC5sZWZ0ID1cbiAgICAgICAgICAgICAgICAgICAgKCh3aW5kb3cuaW5uZXJXaWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgZC5vcmlnaW5hbF93aWR0aCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NvbnRhaW5lcicpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignY29udGFpbmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLm9yaWdpbmFsQ29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JpZ2luYWxfY29udGFpbmVyO1xuICAgICAgICBvcmlnaW5hbF9jb250YWluZXIgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuICAgICAgICBzZWxmLmRpc3BhdGNoLmNvbnRhaW5lcigpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkYXRhIHRvIG1ha2Ugc2hvdyB1cFxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHRocm93IFwiRXhwZWN0ZWQgY29udGFpbmVyLlwiO1xuICAgICAgICBzZWxlY3RlZF9zZWwgPSBzZWw7XG5cbiAgICAgICAgdmFyIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3ggPVxuICAgICAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyXG4gICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB2YXIgY29weSA9IHNlbC5ub2RlKCkuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB2YXIgY29weV9zZWwgPSBkMy5zZWxlY3QoY29weSk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvcHkgPSBjb250YWluZXIubm9kZSgpLmFwcGVuZENoaWxkKGNvcHkpO1xuICAgICAgICBsaWdodGJveF9zZWwgPSBjb250YWluZXIuc2VsZWN0KCcucGllY2UnKTtcbiAgICAgICAgbGlnaHRib3hfaW1nX3NlbCA9IGxpZ2h0Ym94X3NlbC5zZWxlY3QoJ2ltZycpO1xuXG5cbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQud2lkdGggPSBzZWwuc3R5bGUoJ3dpZHRoJyk7XG5cbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQuaGVpZ2h0ID0gc2VsLnN0eWxlKCdoZWlnaHQnKTtcbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQudG9wID1cbiAgICAgICAgICAgICgrc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdICtcbiAgICAgICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3gudG9wKSArICdweCc7XG4gICAgICAgIHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0LmxlZnQgPVxuICAgICAgICAgICAgKCtzZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdICtcbiAgICAgICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3gubGVmdCkgKyAncHgnO1xuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydFsnLXdlYmtpdC10cmFuc2Zvcm0nXSA9XG4gICAgICAgICAgICBzZWwuc3R5bGUoJy13ZWJraXQtdHJhbnNmb3JtJyk7XG5cblxuICAgICAgICB2YXIgZGF0YSA9IHNlbC5kYXR1bSgpO1xuXG4gICAgICAgIGNhbGNfdG9fdHJhbnNpdGlvbl9pbWcoZGF0YS5jb3Zlcik7XG5cblxuICAgICAgICBjb250YWluZXIuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uaW1nLnN0YXJ0KTtcbiAgICAgICAgbGlnaHRib3hfc2VsXG4gICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRvX3RyYW5zaXRpb24uZGl2KTtcblxuICAgICAgICBkMy50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyODApXG4gICAgICAgICAgICAuZWFjaCgnc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfc2VsLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGlnaHRib3hfc2VsXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uZGl2LmVuZCk7XG5cbiAgICAgICAgICAgICAgICBsaWdodGJveF9pbWdfc2VsXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uaW1nLmVuZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxpZ2h0Ym94X3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmRpdi5zdGFydCk7XG5cbiAgICAgICAgICAgICAgICBsaWdodGJveF9pbWdfc2VsXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uaW1nLnN0YXJ0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkX3NlbC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmh0bWwoJycpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBCb3R0b20gPSByZXF1aXJlKCcuL2JvdHRvbScpLFxuICAgIExpZ2h0Ym94ID0gcmVxdWlyZSgnLi9saWdodGJveF96b29tX3VwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGF0YSA9IFtdLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHdvcmtfc2VsLFxuICAgICAgICByaXNkX3Byb2dyYW1zID0gWydBbGwnXSxcbiAgICAgICAgbWFzb25pY19ndXR0ZXIgPSAyMDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnZGF0YUxvYWRlZCcpO1xuXG4gICAgLy8gZGVhbCB3aXRoIHdpbmRvdyBib3R0b20gbG9hZGluZyBtb3JlXG4gICAgdmFyIGJvdHRvbSA9IHNlbGYuYm90dG9tID0gQm90dG9tKCk7XG4gICAgdmFyIGxpZ2h0Ym94ID0gc2VsZi5saWdodGJveCA9IExpZ2h0Ym94KCk7XG5cbiAgICBib3R0b20uZGlzcGF0Y2gub24oJ2JvdHRvbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0X21vcmVfZGF0YSgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0X21vcmVfZGF0YSAoKSB7XG4gICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlydHkoZmFsc2UpO1xuICAgICAgICAgICAgcmVuZGVyX2RhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdldF9kYXRhKCk7XG4gICAgfVxuICAgIC8vIGVuZCBkZWFsaW5nIHdpdGggd2luZG93XG5cbiAgICB2YXIgbWFzb25pYyA9IGQzLm1hc29uaWMoKVxuICAgICAgICAud2lkdGgoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiArZC5jb3Zlci53aWR0aCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuaGVpZ2h0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gK2QuY292ZXIuaGVpZ2h0ICsgbWFzb25pY19ndXR0ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5jb2x1bW5XaWR0aCgyMDAgKyBtYXNvbmljX2d1dHRlcik7XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoXyk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gXztcblxuICAgICAgICAvLyBzaWRlIGVmZmVjdCBvZiB1cGRhdGluZyBjb250YWluZXJcbiAgICAgICAgYm90dG9tLmNvbnRhaW5lcihjb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbmRlcigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdldF9kYXRhKCk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbWFzb25pYycsIHRydWUpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29sLTEwLTEwJywgdHJ1ZSk7XG5cbiAgICAgICAgcmVuZGVyX2RhdGEoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2RhdGEoKSB7XG4gICAgICAgIHdvcmtfc2VsID0gY29udGFpbmVyLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLnNyYztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLndpZHRoO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc2l6ZV9tYXNvbmljKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplX21hc29uaWMgKCkge1xuICAgICAgICB2YXIgb3V0ZXJXaWR0aCA9IGNvbnRhaW5lci5wcm9wZXJ0eSgnb2Zmc2V0V2lkdGgnKTtcblxuICAgICAgICBtYXNvbmljXG4gICAgICAgICAgICAub3V0ZXJXaWR0aChvdXRlcldpZHRoKVxuICAgICAgICAgICAgLnJlc2V0KCk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5kYXR1bShtYXNvbmljKVxuICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC53aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnggKyAncHgnOyB9KVxuICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnkgKyAncHgnOyB9KVxuICAgICAgICAgICAgLmRhdHVtKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZSgnaGVpZ2h0JywgbWFzb25pYy5vdXRlckhlaWdodCgpICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X2RhdGEgKCkge1xuICAgICAgICBkMy5qc29uKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnZGF0YS9wcm9qZWN0czIwMTQwNDA4Lmpzb24nLCBmdW5jdGlvbiAod29yaykge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd29yaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cod29yayk7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPVxuICAgICAgICAgICAgICAgIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyh3b3JrKTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZGF0YUxvYWRlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBkYXRhIGNvbWVzIG91dCBhczpcbiAgICAvLyBbe1xuICAgIC8vICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgIC8vICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgIC8vICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgLy8gICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgIC8vICAgICAnY292ZXInOiByYW5kb21fY292ZXJcbiAgICAvLyB9LCBdXG4gICAgZnVuY3Rpb24gZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzICh3b3JrKSB7XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBleHRlbnQgb2Ygd2lkdGhzXG4gICAgICAgIHZhciBhbGxfbW9kdWxlcyA9IFtdO1xuICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbF9tb2R1bGVzLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzZXQgYSBzY2FsZSBmb3IgbWFwcGluZ1xuICAgICAgICAvLyB3aWR0aCB0aGUgYW4gaW1hZ2UgdG8gdGhlXG4gICAgICAgIC8vIHdpZHRoIG9mIHRoZSBtYXNvbmljIHZlcnNpb25cbiAgICAgICAgdmFyIHdpZHRoX2V4dGVudCA9IGQzLmV4dGVudChhbGxfbW9kdWxlcywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC53aWR0aDsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3dpZHRoX2V4dGVudCcpO1xuICAgICAgICBjb25zb2xlLmxvZyh3aWR0aF9leHRlbnQpO1xuICAgICAgICB2YXIgd2lkdGhzID0gZDMuc2NhbGUub3JkaW5hbCgpXG4gICAgICAgICAgICAuZG9tYWluKHdpZHRoX2V4dGVudClcbiAgICAgICAgICAgIC5yYW5nZShbMTAwLCAyMDAsIDQwMF0pO1xuXG4gICAgICAgIHdpbmRvdy53aWR0aHMgPSB3aWR0aHM7XG5cbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgIHZhciByYW5kb21fbW9kdWxlID1cbiAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLmxlbmd0aCldO1xuXG4gICAgICAgICAgICB2YXIgcmFuZG9tX2NvdmVyID0ge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsX3dpZHRoOiArcmFuZG9tX21vZHVsZS53aWR0aCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF9oZWlnaHQ6ICtyYW5kb21fbW9kdWxlLmhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhzKHJhbmRvbV9tb2R1bGUud2lkdGgpLFxuICAgICAgICAgICAgICAgIHNyYzogcmFuZG9tX21vZHVsZS5zcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByYW5kb21fY292ZXIuaGVpZ2h0ID0gKHJhbmRvbV9jb3Zlci53aWR0aCpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS5oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUud2lkdGg7XG5cbiAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXMuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmlzZF9wcm9ncmFtcy5wdXNoKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZF93b3JrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgRGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpLFxuICAgIFdvcmsgPSByZXF1aXJlKCcuL3dvcmsnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wNCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBncmlkX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnaHRtbExvYWRlZCcpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gRGVwYXJ0bWVudHMoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcbiAgICB2YXIgd29yayA9IFdvcmsoc2VsZik7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDQgY29uY2VwdF8wNGQnLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIC8vIC5sb2dvLWNvbnRhaW5lciBpcyBhIG5laWdoYm9yIG9mIC5ncmlkXG4gICAgICAgIHZhciBsb2dvX2NvbnRhaW5lcl9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbG9nby5jb250YWluZXIobG9nb19jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIGdyaWRfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNGEvZ3JpZC5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgZ3JpZF9zZWwubm9kZSgpLmFwcGVuZENoaWxkKGh0bWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guaHRtbExvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC5kZXBhcnRtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC53cmFwcGVyKGQzLnNlbGVjdCgnLmRlcGFydG1lbnRzJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsaWdodGJveF9jb250YWluZXIgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveCcpO1xuICAgICAgICB3b3JrLmxpZ2h0Ym94XG4gICAgICAgICAgICAuY29udGFpbmVyKGxpZ2h0Ym94X2NvbnRhaW5lcilcbiAgICAgICAgICAgIC5vcmlnaW5hbENvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrJykpO1xuXG4gICAgICAgIHdvcmsuYm90dG9tLmFkZGl0aW9uYWxNYXJnaW5Cb3R0b21TZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKTtcblxuICAgICAgICB3b3JrLmNvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaWdodGJveCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbF9jb250YWluZXIsXG4gICAgICAgIGxpZ2h0Ym94X3NlbCxcbiAgICAgICAgbGlnaHRib3hfaW1nX3NlbCxcbiAgICAgICAgc2VsZWN0ZWRfc2VsLFxuICAgICAgICB0b190cmFuc2l0aW9uID0ge1xuICAgICAgICAgICAgZGl2OiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6ICdtYXRyaXgoMSwwLDAsMSwwLDApJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGltZzoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAncmdiYSgzOCwgMzQsIDk4LCAwKSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDM4LCAzNCwgOTgsIDAuOCknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYWxjX3RvX3RyYW5zaXRpb25faW1nID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLnN0YXJ0LndpZHRoID0gZC53aWR0aCArICdweCc7XG4gICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5zdGFydC5oZWlnaHQgPSBkLmhlaWdodCArICdweCc7XG5cbiAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC53aWR0aCA9IGQub3JpZ2luYWxfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuZW5kLmhlaWdodCA9IGQub3JpZ2luYWxfaGVpZ2h0ICsgJ3B4JztcblxuXG4gICAgICAgICAgICBpZiAoZC5vcmlnaW5hbF9oZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5lbmQudG9wID0gJzBweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC50b3AgPVxuICAgICAgICAgICAgICAgICAgICAoKHdpbmRvdy5pbm5lckhlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgZC5vcmlnaW5hbF9oZWlnaHQpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZC5vcmlnaW5hbF93aWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuZW5kLmxlZnQgPSAnMHB4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuZW5kLmxlZnQgPVxuICAgICAgICAgICAgICAgICAgICAoKHdpbmRvdy5pbm5lcldpZHRoIC1cbiAgICAgICAgICAgICAgICAgICAgICBkLm9yaWdpbmFsX3dpZHRoKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY29udGFpbmVyJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdjb250YWluZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlbGYub3JpZ2luYWxDb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcmlnaW5hbF9jb250YWluZXI7XG4gICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lciA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IF87XG4gICAgICAgIHNlbGYuZGlzcGF0Y2guY29udGFpbmVyKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvLyBwYXNzIGluIGRhdGEgdG8gbWFrZSBzaG93IHVwXG4gICAgc2VsZi5zaG93ID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWNvbnRhaW5lcikgdGhyb3cgXCJFeHBlY3RlZCBjb250YWluZXIuXCI7XG4gICAgICAgIHNlbGVjdGVkX3NlbCA9IHNlbDtcblxuICAgICAgICB2YXIgb3JpZ2luYWxfY29udGFpbmVyX2JveCA9XG4gICAgICAgICAgICBvcmlnaW5hbF9jb250YWluZXJcbiAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHZhciBjb3B5ID0gc2VsLm5vZGUoKS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHZhciBjb3B5X3NlbCA9IGQzLnNlbGVjdChjb3B5KTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfY29weSA9IGNvbnRhaW5lci5ub2RlKCkuYXBwZW5kQ2hpbGQoY29weSk7XG4gICAgICAgIGxpZ2h0Ym94X3NlbCA9IGNvbnRhaW5lci5zZWxlY3QoJy5waWVjZScpO1xuICAgICAgICBsaWdodGJveF9pbWdfc2VsID0gbGlnaHRib3hfc2VsLnNlbGVjdCgnaW1nJyk7XG5cblxuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydC53aWR0aCA9IHNlbC5zdHlsZSgnd2lkdGgnKTtcblxuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydC5oZWlnaHQgPSBzZWwuc3R5bGUoJ2hlaWdodCcpO1xuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydC50b3AgPVxuICAgICAgICAgICAgKCtzZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0gK1xuICAgICAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyX2JveC50b3ApICsgJ3B4JztcbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQubGVmdCA9XG4gICAgICAgICAgICAoK3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0gK1xuICAgICAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyX2JveC5sZWZ0KSArICdweCc7XG4gICAgICAgIHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0Wyctd2Via2l0LXRyYW5zZm9ybSddID1cbiAgICAgICAgICAgIHNlbC5zdHlsZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcblxuXG4gICAgICAgIHZhciBkYXRhID0gc2VsLmRhdHVtKCk7XG5cbiAgICAgICAgY2FsY190b190cmFuc2l0aW9uX2ltZyhkYXRhLmNvdmVyKTtcblxuXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcblxuICAgICAgICBsaWdodGJveF9pbWdfc2VsXG4gICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5pbWcuc3RhcnQpO1xuICAgICAgICBsaWdodGJveF9zZWxcbiAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmRpdi5zdGFydCk7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uY29udGFpbmVyLnN0YXJ0KTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0b190cmFuc2l0aW9uLmRpdik7XG5cbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLW91dCcpXG4gICAgICAgICAgICAuZWFjaCgnc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfc2VsLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGlnaHRib3hfc2VsXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uZGl2LmVuZCk7XG5cbiAgICAgICAgICAgICAgICBsaWdodGJveF9pbWdfc2VsXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uaW1nLmVuZCk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuZW5kKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBkMy50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyODApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW4nKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxpZ2h0Ym94X3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmRpdi5zdGFydCk7XG5cbiAgICAgICAgICAgICAgICBsaWdodGJveF9pbWdfc2VsXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uaW1nLnN0YXJ0KTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmNvbnRhaW5lci5zdGFydCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZF9zZWwuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKCcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgQm90dG9tID0gcmVxdWlyZSgnLi9ib3R0b20nKSxcbiAgICBMaWdodGJveCA9IHJlcXVpcmUoJy4vbGlnaHRib3hfZmFkZV91cCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB3b3JrX3NlbCxcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIG1hc29uaWNfZ3V0dGVyID0gMjA7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2RhdGFMb2FkZWQnKTtcblxuICAgIC8vIGRlYWwgd2l0aCB3aW5kb3cgYm90dG9tIGxvYWRpbmcgbW9yZVxuICAgIHZhciBib3R0b20gPSBzZWxmLmJvdHRvbSA9IEJvdHRvbSgpO1xuICAgIHZhciBsaWdodGJveCA9IHNlbGYubGlnaHRib3ggPSBMaWdodGJveCgpO1xuXG4gICAgYm90dG9tLmRpc3BhdGNoLm9uKCdib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldF9tb3JlX2RhdGEoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldF9tb3JlX2RhdGEgKCkge1xuICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm90dG9tLmRpcnR5KGZhbHNlKTtcbiAgICAgICAgICAgIHJlbmRlcl9kYXRhKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZXRfZGF0YSgpO1xuICAgIH1cbiAgICAvLyBlbmQgZGVhbGluZyB3aXRoIHdpbmRvd1xuXG4gICAgdmFyIG1hc29uaWMgPSBkMy5tYXNvbmljKClcbiAgICAgICAgLndpZHRoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gK2QuY292ZXIud2lkdGggKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmhlaWdodChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuICtkLmNvdmVyLmhlaWdodCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuY29sdW1uV2lkdGgoMjAwICsgbWFzb25pY19ndXR0ZXIpO1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IF87XG5cbiAgICAgICAgLy8gc2lkZSBlZmZlY3Qgb2YgdXBkYXRpbmcgY29udGFpbmVyXG4gICAgICAgIGJvdHRvbS5jb250YWluZXIoY29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnZXRfZGF0YSgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLmNsYXNzZWQoJ21hc29uaWMnLCB0cnVlKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbC0xMC0xMCcsIHRydWUpO1xuXG4gICAgICAgIHJlbmRlcl9kYXRhKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9kYXRhKCkge1xuICAgICAgICB3b3JrX3NlbCA9IGNvbnRhaW5lci5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5zcmM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNTA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGxpZ2h0Ym94LnNob3cpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNpemVfbWFzb25pYygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZV9tYXNvbmljICgpIHtcbiAgICAgICAgdmFyIG91dGVyV2lkdGggPSBjb250YWluZXIucHJvcGVydHkoJ29mZnNldFdpZHRoJyk7XG5cbiAgICAgICAgbWFzb25pY1xuICAgICAgICAgICAgLm91dGVyV2lkdGgob3V0ZXJXaWR0aClcbiAgICAgICAgICAgIC5yZXNldCgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuZGF0dW0obWFzb25pYylcbiAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb250YWluZXIuc3R5bGUoJ2hlaWdodCcsIG1hc29uaWMub3V0ZXJIZWlnaHQoKSArICdweCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9kYXRhICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID1cbiAgICAgICAgICAgICAgICBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMod29yayk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGFMb2FkZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZGF0YSBjb21lcyBvdXQgYXM6XG4gICAgLy8gW3tcbiAgICAvLyAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAvLyAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAvLyAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgIC8vICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAvLyAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgLy8gfSwgXVxuICAgIGZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAod29yaykge1xuXG4gICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuXG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgZXh0ZW50IG9mIHdpZHRoc1xuICAgICAgICB2YXIgYWxsX21vZHVsZXMgPSBbXTtcbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBhbGxfbW9kdWxlcy5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2V0IGEgc2NhbGUgZm9yIG1hcHBpbmdcbiAgICAgICAgLy8gd2lkdGggdGhlIGFuIGltYWdlIHRvIHRoZVxuICAgICAgICAvLyB3aWR0aCBvZiB0aGUgbWFzb25pYyB2ZXJzaW9uXG4gICAgICAgIHZhciB3aWR0aF9leHRlbnQgPSBkMy5leHRlbnQoYWxsX21vZHVsZXMsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGg7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3aWR0aF9leHRlbnQnKTtcbiAgICAgICAgY29uc29sZS5sb2cod2lkdGhfZXh0ZW50KTtcbiAgICAgICAgdmFyIHdpZHRocyA9IGQzLnNjYWxlLm9yZGluYWwoKVxuICAgICAgICAgICAgLmRvbWFpbih3aWR0aF9leHRlbnQpXG4gICAgICAgICAgICAucmFuZ2UoWzEwMCwgMjAwLCA0MDBdKTtcblxuICAgICAgICB3aW5kb3cud2lkdGhzID0gd2lkdGhzO1xuXG4gICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZXNfdG9faW5jbHVkZSA9IFtdO1xuICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByYW5kb21fY292ZXJfb3B0aW9uXG4gICAgICAgICAgICB2YXIgcmFuZG9tX21vZHVsZSA9XG4gICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5sZW5ndGgpXTtcblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogK3JhbmRvbV9tb2R1bGUud2lkdGgsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfaGVpZ2h0OiArcmFuZG9tX21vZHVsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRocyhyYW5kb21fbW9kdWxlLndpZHRoKSxcbiAgICAgICAgICAgICAgICBzcmM6IHJhbmRvbV9tb2R1bGUuc3JjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmFuZG9tX2NvdmVyLmhlaWdodCA9IChyYW5kb21fY292ZXIud2lkdGgqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUuaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLndpZHRoO1xuXG4gICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgICAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChyaXNkX3Byb2dyYW1zLmluZGV4T2YoZC5yaXNkX3Byb2dyYW0pIDwgMCkge1xuICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRfd29yaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIERlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrJyksXG4gICAgTG9nbyA9IHJlcXVpcmUoJy4vbG9nbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDQgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgZ3JpZF9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2h0bWxMb2FkZWQnKTtcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IERlcGFydG1lbnRzKCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG4gICAgdmFyIHdvcmsgPSBXb3JrKHNlbGYpO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb25jZXB0XzA0IGNvbmNlcHRfMDRkJywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICAvLyAubG9nby1jb250YWluZXIgaXMgYSBuZWlnaGJvciBvZiAuZ3JpZFxuICAgICAgICB2YXIgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ28uY29udGFpbmVyKGxvZ29fY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICBncmlkX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDRlL2dyaWQuaHRtbCcsIGZ1bmN0aW9uIChodG1sKSB7XG5cbiAgICAgICAgICAgIGdyaWRfc2VsLm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmh0bWxMb2FkZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQuZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAud3JhcHBlcihkMy5zZWxlY3QoJy5kZXBhcnRtZW50cycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGlnaHRib3hfY29udGFpbmVyID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gnKTtcbiAgICAgICAgd29yay5saWdodGJveFxuICAgICAgICAgICAgLmNvbnRhaW5lcihsaWdodGJveF9jb250YWluZXIpXG4gICAgICAgICAgICAub3JpZ2luYWxDb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKTtcblxuICAgICAgICB3b3JrLmJvdHRvbS5hZGRpdGlvbmFsTWFyZ2luQm90dG9tU2VsKGQzLnNlbGVjdCgnLmdyaWQnKSk7XG5cbiAgICAgICAgd29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBEZXBhcnRtZW50cyA9IHJlcXVpcmUoJy4uL2RlcGFydG1lbnRzJyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdodG1sTG9hZGVkJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBEZXBhcnRtZW50cygpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yayhzZWxmKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29uY2VwdF8wNCBjb25jZXB0XzA0ZycsIHRydWUpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgLy8gLmxvZ28tY29udGFpbmVyIGlzIGEgbmVpZ2hib3Igb2YgLmdyaWRcbiAgICAgICAgdmFyIGxvZ29fY29udGFpbmVyX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb250YWluZXInKTtcblxuICAgICAgICBsb2dvLmNvbnRhaW5lcihsb2dvX2NvbnRhaW5lcl9zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuXG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ3NyYy9jb25jZXB0XzA0Zy9ncmlkLmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBncmlkX3NlbC5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5odG1sTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgIC8vIGRlcGFydG1lbnRzXG4gICAgICAgICAgIC8vIC53cmFwcGVyKGQzLnNlbGVjdCgnLmRlcGFydG1lbnRzJykpXG4gICAgICAgICAgIC8vIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94Jyk7XG4gICAgICAgIHdvcmsubGlnaHRib3hcbiAgICAgICAgICAgIC5jb250YWluZXIobGlnaHRib3hfY29udGFpbmVyKVxuICAgICAgICAgICAgLm9yaWdpbmFsQ29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSk7XG5cbiAgICAgICAgd29yay5ib3R0b20uYWRkaXRpb25hbE1hcmdpbkJvdHRvbVNlbChkMy5zZWxlY3QoJy5ncmlkJykpO1xuXG4gICAgICAgIHdvcmsuY29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgRGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdodG1sTG9hZGVkJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBEZXBhcnRtZW50cygpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb25jZXB0XzA1JywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICAvLyAubG9nby1jb250YWluZXIgaXMgYSBuZWlnaGJvciBvZiAuZ3JpZFxuICAgICAgICB2YXIgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ28uY29udGFpbmVyKGxvZ29fY29udGFpbmVyX3NlbCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuXG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ3NyYy9jb25jZXB0XzA1L2dyaWQuaHRtbCcsIGZ1bmN0aW9uIChodG1sKSB7XG5cbiAgICAgICAgICAgIGdyaWRfc2VsLm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmh0bWxMb2FkZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQuZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAud3JhcHBlcihkMy5zZWxlY3QoJy5kZXBhcnRtZW50cycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2dvLnNjcm9sbE92ZXJTZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBsb2dvQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vbG9nb19jb21wb25lbnRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBzY3JvbGxfb3Zlcl9zZWwsXG4gICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IDAsXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zZWwsXG4gICAgICAgIGxvZ29fbGluZV9zZWwsXG4gICAgICAgIGxvZ29fc3Vic2lkaWFyeV9zZWwsXG4gICAgICAgIGxvZ29fY29tcG9uZW50cyA9IGxvZ29Db21wb25lbnRzLFxuICAgICAgICBsb2dvX3N2ZyxcbiAgICAgICAgbG9nb19saW5lLFxuICAgICAgICBsaW5lID0gZDMuc3ZnLmxpbmUoKSxcbiAgICAgICAgdHJhbnNpdGlvbmFibGUgPSB0cnVlO1xuXG4gICAgdmFyIHNjcm9sbF9zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pXG4gICAgICAgIC5yYW5nZShbMCwgMV0pXG4gICAgICAgIC5jbGFtcCh0cnVlKTtcblxuICAgIHdpbmRvd19zZWxcbiAgICAgICAgLm9uKCdyZXNpemUubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgICAgICBkaXN0YW5jZV90b19zY3JvbGwgPSBjYWxjX2Rpc3RhbmNlX3RvX3Njcm9sbCgpO1xuICAgICAgICAgICAgc2Nyb2xsX3NjYWxlLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSk7XG5cbiAgICAgICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93X3dpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuXG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBsb2dvIGNvbXBvbmVudHMgcGVyIHdpbmRvd1xuICAgICAgICAgICAgaWYgKGxvZ29fc2VsKSB7XG4gICAgICAgICAgICAgICAgbG9nb19zZWwuZGF0YS5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVkID0gZC5ydWxlcyh3aW5kb3dfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgICAgICBkLnN0YXJ0ID0gdXBkYXRlZC5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgZC5lbmQgPSB1cGRhdGVkLmVuZDtcbiAgICAgICAgICAgICAgICAgICAgZC5pbnRlcnBvbGF0b3IgPVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkX2ludGVycG9sYXRvcih1cGRhdGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlcnBvbGF0b3I7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignc2Nyb2xsLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbmFibGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cuc2Nyb2xsWSk7XG4gICAgICAgICAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsX3NjYWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFkpKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5zY3JvbGxPdmVyU2VsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2Nyb2xsX292ZXJfc2VsO1xuICAgICAgICBzY3JvbGxfb3Zlcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXBkYXRlIGxvZ28gY29tcG9uZW50cyBwZXIgd2luZG93XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGxvZ29fY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGQucnVsZXMod2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgICAgICBkLnN0YXJ0ID0gdXBkYXRlZC5zdGFydDtcbiAgICAgICAgICAgIGQuZW5kID0gdXBkYXRlZC5lbmQ7XG4gICAgICAgICAgICBkLmludGVycG9sYXRvciA9XG4gICAgICAgICAgICAgICAgYWRkX2ludGVycG9sYXRvcih1cGRhdGVkKVxuICAgICAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdG9yO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gY2FsY19kaXN0YW5jZV90b19zY3JvbGwoKTtcbiAgICAgICAgc2Nyb2xsX3NjYWxlLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSk7XG5cbiAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhcbiAgICAgICAgICAgIHNjcm9sbF9zY2FsZShcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsWSkpO1xuXG5cbiAgICAgICAgbG9nb19zZWwgPSBsb2dvX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCdsb2dvLWNvbXBvbmVudCcpXG4gICAgICAgICAgICAuZGF0YShsb2dvX2NvbXBvbmVudHMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsb2dvLWNvbXBvbmVudCAnICsgZC5jbHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQuYm90dG9tO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3JpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydC5yaWdodDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnRbJ2ZvbnQtc2l6ZSddO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaHRtbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fbGluZV9zZWwgPSBsb2dvX3NlbC5maWx0ZXIoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnR5cGUgPT09ICdsaW5lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdWJzaWRpYXJ5X3NlbCA9IGxvZ29fc2VsLmZpbHRlcihmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIGQudHlwZSA9PT0gJ3N1YnNpZGlhcnknO1xuICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIGxvZ29fbGluZSA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgICAgICAuZGF0YShbbG9nb192ZXJ0aWNpZXMoKV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tbGluZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fY29tcG9uZW50cyAocGVyY2VudF9wcm9ncmVzcykge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgaWYgKCFsb2dvX3NlbCkgcmV0dXJuO1xuICAgICAgICBsb2dvX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci50b3AocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci5ib3R0b20ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IubGVmdChwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3JpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IucmlnaHQocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgWydmb250LXNpemUnXShwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xpbmUtaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnbGluZS1oZWlnaHQnXShwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgdmVydGljaWVzID0gW2xvZ29fdmVydGljaWVzKCldO1xuICAgICAgICBsb2dvX2xpbmUuZGF0YSh2ZXJ0aWNpZXMpO1xuICAgICAgICBsb2dvX2xpbmUuYXR0cignZCcsIGxpbmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fdmVydGljaWVzICgpIHtcbiAgICAgICAgdmFyIGxvZ29fbGluZV92ZXJ0aWNpZXMgPSBbXTtcbiAgICAgICAgbG9nb19saW5lX3NlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0IC0gMTAsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgIFtib3VuZHMucmlnaHQgKyAxMCxcbiAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsb2dvX2xpbmVfdmVydGljaWVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsICgpIHtcbiAgICAgICAgdmFyIHNjcm9sbGluZ19kaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsLnN0eWxlKCdtYXJnaW4tdG9wJywgc2Nyb2xsaW5nX2Rpc3RhbmNlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgIHJldHVybiBzY3JvbGxpbmdfZGlzdGFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX2ludGVycG9sYXRvciAoc3RhdGVzKSB7XG4gICAgICAgIHN0YXRlcy5pbnRlcnBvbGF0b3IgPSB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHN0YXRlcy5zdGFydCkge1xuICAgICAgICAgICAgc3RhdGVzLmludGVycG9sYXRvcltrZXldID1cbiAgICAgICAgICAgICAgICBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVzLnN0YXJ0W2tleV0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5lbmRba2V5XSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlcztcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBbe1xuICAgIGh0bWw6ICdSSVNEJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLXJpc2QgdGV4dC1sZWZ0JyxcbiAgICBzdGFydDoge1xuICAgICAgICB0b3A6ICczMCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzMwJScsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICdmb250LXNpemUnOiAnNTBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICc1MHB4J1xuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzUwcHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJ0dyYWQnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1ncmFkIHRleHQtbGVmdCcsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzQwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMzAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc1MHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzUwcHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC40KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc1MHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNSkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICdTaG93JyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tc2hvdyB0ZXh0LXJpZ2h0JyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIGJvdHRvbTogJzYwJScsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICczMCUnLFxuICAgICAgICAnZm9udC1zaXplJzogJzUwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnNTBweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICdhdXRvJyxcbiAgICAgICAgYm90dG9tOiAnNTAlJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBib3R0b206IChoZWlnaHQgKiAwLjYpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzUwcHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAoaGVpZ2h0ICogMC41KSArICdweCcsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJzIwMTQnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS0yMDE0IHRleHQtcmlnaHQnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBzdGFydDoge1xuICAgICAgICB0b3A6ICdhdXRvJyxcbiAgICAgICAgYm90dG9tOiAnNDAlJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzMwJScsXG4gICAgICAgICdmb250LXNpemUnOiAnNTBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICc1MHB4J1xuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICBib3R0b206ICc1MHB4JyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBib3R0b206IChoZWlnaHQgKiAwLjQpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzUwcHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJ1Job2RlIElzbGFuZCBTY2hvb2wgb2YgRGVzaWduPGJyPicrXG4gICAgICAgICAgJ0FubnVhbCBHcmFkIFRoZXNpcyBFeGhpYml0aW9uJyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tc3ViaGVhZGxpbmUgdGV4dC1sZWZ0JyxcbiAgICB0eXBlOiAnc3Vic2lkaWFyeScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICczMCUnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICc2MCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzEwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC42KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XTsiLCJ2YXIgRGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrJyksXG4gICAgVHJhbnNsYXRlID0gcmVxdWlyZSgnLi90cmFuc2xhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdodG1sTG9hZGVkJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBEZXBhcnRtZW50cygpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yayhzZWxmKTtcbiAgICB2YXIgdHJhbnNsYXRlID0gVHJhbnNsYXRlKCk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDVhJywgdHJ1ZSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdmdWxsLXdpZHRoLXdvcmsnLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIC8vIC5sb2dvLWNvbnRhaW5lciBpcyBhIG5laWdoYm9yIG9mIC5ncmlkXG4gICAgICAgIHZhciBsb2dvX2NvbnRhaW5lcl9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbG9nby5jb250YWluZXIobG9nb19jb250YWluZXJfc2VsKTtcblxuICAgICAgICBncmlkX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZC13cmFwcGVyJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNWEvZ3JpZC5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgZ3JpZF9zZWwubm9kZSgpLmFwcGVuZENoaWxkKGh0bWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guaHRtbExvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC5kZXBhcnRtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC53cmFwcGVyKGQzLnNlbGVjdCgnLmRlcGFydG1lbnRzJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uc2Nyb2xsT3ZlclNlbChkMy5zZWxlY3QoJy5ncmlkJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94Jyk7XG5cbiAgICAgICAgd29yay5ib3R0b20uYWRkaXRpb25hbE1hcmdpbkJvdHRvbVNlbChkMy5zZWxlY3QoJy5ncmlkJykpO1xuXG4gICAgICAgIHZhciB3b3JrX2JhY2tncm91bmRfc2VsID0gZDMuc2VsZWN0KCcuZ3JpZC13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnd29yay1iYWNrZ3JvdW5kJyk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsID0gZDMuc2VsZWN0KCcuZ3JpZC13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnd29yaycpO1xuICAgICAgICB3b3JrLmNvbnRhaW5lcih3b3JrX3NlbClcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIHdvcmsubGlnaHRib3hcbiAgICAgICAgICAgIC5jb250YWluZXIobGlnaHRib3hfY29udGFpbmVyKTtcblxuXG4gICAgICAgIHRyYW5zbGF0ZVxuICAgICAgICAgICAgLnRyYW5zbGF0ZWQod29ya19zZWwpXG4gICAgICAgICAgICAub3ZlcihkMy5zZWxlY3QoJy5ncmlkJykpXG4gICAgICAgICAgICAuYmFja2dyb3VuZCh3b3JrX2JhY2tncm91bmRfc2VsKVxuICAgICAgICAgICAgLnNldHVwKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaWdodGJveCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBzZWxlY3RlZF9zZWwsXG4gICAgICAgIHRvX3RyYW5zaXRpb24gPSB7XG4gICAgICAgICAgICBjb250YWluZXI6IHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDIzOSwgNjUsIDU0LCAwKScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDIzOSwgNjUsIDU0LCAwLjkpJyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY29udGFpbmVyJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdjb250YWluZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuICAgICAgICBzZWxmLmRpc3BhdGNoLmNvbnRhaW5lcigpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkYXRhIHRvIG1ha2Ugc2hvdyB1cFxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHRocm93IFwiRXhwZWN0ZWQgY29udGFpbmVyLlwiO1xuICAgICAgICBzZWxlY3RlZF9zZWwgPSBzZWw7XG5cbiAgICAgICAgdmFyIGRhdGEgPSBzZWwuZGF0dW0oKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhLm1vZHVsZXMnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5tb2R1bGVzKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfZ3JpZF9zZWwgPSBjb250YWluZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX3NlbCA9XG4gICAgICAgICAgICBsaWdodGJveF9ncmlkX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEgY29sLTItMTAnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfd29ya19zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC13b3JrIG9mZnNldC0yLTEwIGNvbC04LTEwJyk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2gyJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC10aXRsZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnByb2plY3RfbmFtZSk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LWRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEubW9kdWxlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zaXplcy5tYXhfMTI0MCA/IGQuc2l6ZXMubWF4XzEyNDAgOiBkLnNyYztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX2luZm9fc2VsID0gbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvJyk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBkYXRhLmF2YXRhcik7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1zdHVkZW50LW5hbWUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5zdHVkZW50X25hbWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tcmlzZC1wcm9ncmFtJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEucmlzZF9wcm9ncmFtKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdhJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhLnVybClcbiAgICAgICAgICAgIC50ZXh0KCdCZWhhbmNlJyk7XG5cblxuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmNvbnRhaW5lci5zdGFydCk7XG5cbiAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIHRydWUpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdsaWdodGJveC1vcGVuJywgdHJ1ZSk7XG5cbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLW91dCcpXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uY29udGFpbmVyLmVuZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuc3RhcnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfc2VsLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbGlnaHRib3gtb3BlbicsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgbG9nb0NvbXBvbmVudHMgPSByZXF1aXJlKCcuL2xvZ29fY29tcG9uZW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsLFxuICAgICAgICBkaXN0YW5jZV90b19zY3JvbGwgPSAwLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc2VsLFxuICAgICAgICBsb2dvX2xpbmVfc2VsLFxuICAgICAgICBsb2dvX3N1YnNpZGlhcnlfc2VsLFxuICAgICAgICBsb2dvX2NvbXBvbmVudHMgPSBsb2dvQ29tcG9uZW50cyxcbiAgICAgICAgbG9nb19zdmcsXG4gICAgICAgIGxvZ29fbGluZSxcbiAgICAgICAgbGluZSA9IGQzLnN2Zy5saW5lKCk7XG5cbiAgICB2YXIgc2Nyb2xsX3NjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSlcbiAgICAgICAgLnJhbmdlKFswLCAxXSlcbiAgICAgICAgLmNsYW1wKHRydWUpLFxuICAgICAgICBwcmV2X3Njcm9sbF9wcm9ncmVzcyA9IDA7XG5cbiAgICB3aW5kb3dfc2VsXG4gICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gY2FsY19kaXN0YW5jZV90b19zY3JvbGwoKTtcbiAgICAgICAgICAgIHNjcm9sbF9zY2FsZS5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pO1xuXG4gICAgICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBsb2dvIGNvbXBvbmVudHMgcGVyIHdpbmRvd1xuICAgICAgICAgICAgaWYgKGxvZ29fc2VsKSB7XG4gICAgICAgICAgICAgICAgbG9nb19zZWwuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGQucnVsZXMod2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZC5zdGFydCA9IHVwZGF0ZWQuc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGQuZW5kID0gdXBkYXRlZC5lbmQ7XG4gICAgICAgICAgICAgICAgICAgIGQuaW50ZXJwb2xhdG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZF9pbnRlcnBvbGF0b3IodXBkYXRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhwcmV2X3Njcm9sbF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignc2Nyb2xsLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsX3Byb2dyZXNzID0gc2Nyb2xsX3NjYWxlKHdpbmRvdy5zY3JvbGxZKTtcbiAgICAgICAgICAgIGlmIChzY3JvbGxfcHJvZ3Jlc3MgIT0gcHJldl9zY3JvbGxfcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbG9nb19jb21wb25lbnRzKHNjcm9sbF9wcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldl9zY3JvbGxfcHJvZ3Jlc3MgPSBzY3JvbGxfcHJvZ3Jlc3M7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5zY3JvbGxPdmVyU2VsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2Nyb2xsX292ZXJfc2VsO1xuICAgICAgICBzY3JvbGxfb3Zlcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXBkYXRlIGxvZ28gY29tcG9uZW50cyBwZXIgd2luZG93XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGxvZ29fY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGQucnVsZXMod2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgICAgICBkLnN0YXJ0ID0gdXBkYXRlZC5zdGFydDtcbiAgICAgICAgICAgIGQuZW5kID0gdXBkYXRlZC5lbmQ7XG4gICAgICAgICAgICBkLmludGVycG9sYXRvciA9XG4gICAgICAgICAgICAgICAgYWRkX2ludGVycG9sYXRvcih1cGRhdGVkKVxuICAgICAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdG9yO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gY2FsY19kaXN0YW5jZV90b19zY3JvbGwoKTtcbiAgICAgICAgc2Nyb2xsX3NjYWxlLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSk7XG5cbiAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhcbiAgICAgICAgICAgIHNjcm9sbF9zY2FsZShcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsWSkpO1xuXG5cbiAgICAgICAgbG9nb19zZWwgPSBsb2dvX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCdsb2dvLWNvbXBvbmVudCcpXG4gICAgICAgICAgICAuZGF0YShsb2dvX2NvbXBvbmVudHMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsb2dvLWNvbXBvbmVudCAnICsgZC5jbHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQuYm90dG9tO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3JpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydC5yaWdodDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnRbJ2ZvbnQtc2l6ZSddO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaHRtbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fbGluZV9zZWwgPSBsb2dvX3NlbC5maWx0ZXIoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnR5cGUgPT09ICdsaW5lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdWJzaWRpYXJ5X3NlbCA9IGxvZ29fc2VsLmZpbHRlcihmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIGQudHlwZSA9PT0gJ3N1YnNpZGlhcnknO1xuICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIGxvZ29fbGluZSA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgICAgICAuZGF0YShbbG9nb192ZXJ0aWNpZXMoKV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tbGluZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fY29tcG9uZW50cyAocGVyY2VudF9wcm9ncmVzcykge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgaWYgKCFsb2dvX3NlbCkgcmV0dXJuO1xuICAgICAgICBsb2dvX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci50b3AocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci5ib3R0b20ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IubGVmdChwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3JpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IucmlnaHQocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgWydmb250LXNpemUnXShwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xpbmUtaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnbGluZS1oZWlnaHQnXShwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgdmVydGljaWVzID0gW2xvZ29fdmVydGljaWVzKCldO1xuICAgICAgICBsb2dvX2xpbmUuZGF0YSh2ZXJ0aWNpZXMpO1xuICAgICAgICBsb2dvX2xpbmUuYXR0cignZCcsIGxpbmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fdmVydGljaWVzICgpIHtcbiAgICAgICAgdmFyIGxvZ29fbGluZV92ZXJ0aWNpZXMgPSBbXTtcbiAgICAgICAgbG9nb19saW5lX3NlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0IC0gMTAsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgIFtib3VuZHMucmlnaHQgKyAxMCxcbiAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsb2dvX2xpbmVfdmVydGljaWVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsICgpIHtcbiAgICAgICAgdmFyIHNjcm9sbGluZ19kaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsLnN0eWxlKCdtYXJnaW4tdG9wJywgc2Nyb2xsaW5nX2Rpc3RhbmNlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgIHJldHVybiBzY3JvbGxpbmdfZGlzdGFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX2ludGVycG9sYXRvciAoc3RhdGVzKSB7XG4gICAgICAgIHN0YXRlcy5pbnRlcnBvbGF0b3IgPSB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHN0YXRlcy5zdGFydCkge1xuICAgICAgICAgICAgc3RhdGVzLmludGVycG9sYXRvcltrZXldID1cbiAgICAgICAgICAgICAgICBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVzLnN0YXJ0W2tleV0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5lbmRba2V5XSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlcztcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBbe1xuICAgIGh0bWw6ICdSSVNEJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLXJpc2QgdGV4dC1sZWZ0IGxvZ28tY29tcG9uZW50LS10aXRsZScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnMzAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICczMCUnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICdHcmFkJyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tZ3JhZCB0ZXh0LWxlZnQgbG9nby1jb21wb25lbnQtLXRpdGxlJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnNDAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICczMCUnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICc1MCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjQpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC41KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJ1Nob3cnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1zaG93IHRleHQtcmlnaHQgbG9nby1jb21wb25lbnQtLXRpdGxlJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnNDUlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICczMCUnLFxuICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICc1MCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjQ1KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNSkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICcyMDE0JyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tMjAxNCB0ZXh0LXJpZ2h0IGxvZ28tY29tcG9uZW50LS10aXRsZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzYwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnMzAlJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnOTUlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC42KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAtIDgwKSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJ1Job2RlIElzbGFuZCBTY2hvb2wgb2YgRGVzaWduPGJyPicrXG4gICAgICAgICAgJ0FubnVhbCBHcmFkIFRoZXNpcyBFeGhpYml0aW9uJyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tc3ViaGVhZGxpbmUgdGV4dC1sZWZ0JyxcbiAgICB0eXBlOiAnc3Vic2lkaWFyeScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICczMCUnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICc2MCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzEwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC42KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJ1JJIENvbnZlbnRpb24gQ2VudGVyPGJyPicrXG4gICAgICAgICAgJ0V4aGliaXRpb24gSGFsbCBBPGJyPicgK1xuICAgICAgICAgICdPbmUgU2FiaW4gU3RyZWV0LCBQcm92aWRlbmNlPGJyPjxicj4nICtcbiAgICAgICAgICAnT3BlbiAxMuKAkzVwbSBEYWlseTxicj4nK1xuICAgICAgICAgICdNYXkgMTbigJMzMScsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWxvY2F0aW9uIHRleHQtbGVmdCcsXG4gICAgdHlwZTogJ3N1YnNpZGlhcnknLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzMwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnMzAlJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICdmb250LXNpemUnOiAnMTBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgIH0sXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnPHN2Zz4nICtcbiAgICAgICAgICAnPC9zdmc+JyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tYXN0ZXJpc2sgdGV4dC1sZWZ0JyxcbiAgICB0eXBlOiAnc3Vic2lkaWFyeScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnMzAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICczMCUnLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufV07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2xhdGUgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIC8vIHRoZSBzZWxlY3Rpb24gdGhhdCBpcyBiZWluZyB0cmFuc2xhdGVkXG4gICAgICAgIHRyYW5zbGF0ZWRfc2VsLFxuICAgICAgICAvLyB0aGUgc2VsZWN0aW9uIHRoYXQgaXMgYmVpbmcgdHJhbnNsYXRlZCBvdmVyXG4gICAgICAgIC8vIHRoaXMgd2lsbCBkZXRlcm1pbmUgdGhlIGhlaWdodCB0aGF0IG11c3QgYmVcbiAgICAgICAgLy8gc2Nyb2xsIHBhc3NlZCwgYmVmb3JlIHRoZSB0cmFuc2xhdGVkX3NlbFxuICAgICAgICAvLyBpcyB0cmFuc2xhdGVkIG92ZXJcbiAgICAgICAgb3Zlcl9zZWwsXG4gICAgICAgIG92ZXJfc2VsX2hlaWdodCA9IDAsXG4gICAgICAgIC8vIHRoZSBzZWxlY3Rpb24gZm9yIHRoZSBmdWxsIHNjcmVlbiBlbGVtZW50XG4gICAgICAgIC8vIHdob3NlIHotaW5kZXggYW5kIG9wYWNpdHkgZ2V0IGFkanVzdGVkXG4gICAgICAgIC8vIGluc3RlYWQgb2YganVzdCBzbGlkaW5nIGluLCB0aGUgaW1hZ2VzXG4gICAgICAgIC8vIHNsaWRlIGluIG92ZXIgdGhlIG5ldyBiYWNrZ3JvdW5kLlxuICAgICAgICBiYWNrZ3JvdW5kX3NlbCxcbiAgICAgICAgb3BhY2l0eV9zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAyMDBdKSAgLy8gZGlzdGFuY2UgdG8gc2Nyb2xsXG4gICAgICAgICAgICAucmFuZ2UoWzAsMV0pICAgICAgLy8gb3BhY2l0eSB2YWx1ZXNcbiAgICAgICAgICAgIC5jbGFtcCh0cnVlKTtcblxuICAgIHZhciB2ZW5kb3IgPSBbXCJcIiwgXCItd2Via2l0LVwiLCBcIi1tb3otXCIsIFwiLW1zLVwiLCBcIi1vLVwiXS5yZWR1Y2UoXG4gICAgICAgIGZ1bmN0aW9uIChwLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gdiArIFwidHJhbnNmb3JtXCIgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSA/IHYgOiBwO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYudHJhbnNsYXRlZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRyYW5zbGF0ZWRfc2VsO1xuICAgICAgICB0cmFuc2xhdGVkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm92ZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvdmVyX3NlbDtcbiAgICAgICAgb3Zlcl9zZWwgPSBfO1xuXG4gICAgICAgIG92ZXJfc2VsX2hlaWdodCA9IGdldF9vdmVyX3NlbF9oZWlnaHQoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5iYWNrZ3JvdW5kID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBiYWNrZ3JvdW5kX3NlbDtcbiAgICAgICAgYmFja2dyb3VuZF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLnRyYW5zbGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFnZVlPZmZzZXQgPiBvdmVyX3NlbF9oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3Zlcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSh2ZW5kb3IrJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgwcHgsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgtKG92ZXJfc2VsX2hlaWdodCAtIHBhZ2VZT2Zmc2V0KSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgpJyk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWRfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUodmVuZG9yKyd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoMHB4LCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvdmVyX3NlbF9oZWlnaHQgLSBwYWdlWU9mZnNldCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG9wYWNpdHlfdmFsID0gb3BhY2l0eV9zY2FsZShwYWdlWU9mZnNldC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJfc2VsX2hlaWdodCk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5Jywgb3BhY2l0eV92YWwpXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKFwiYWN0aXZlXCIsIChvcGFjaXR5X3ZhbCA+IDApID8gMTogMCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUudHJhbnNsYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG92ZXJfc2VsX2hlaWdodCA9IGdldF9vdmVyX3NlbF9oZWlnaHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfb3Zlcl9zZWxfaGVpZ2h0ICgpIHtcbiAgICAgICAgaWYgKCFvdmVyX3NlbCkgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiBvdmVyX3NlbC5ub2RlKClcbiAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAuaGVpZ2h0O1xuICAgIH1cblxuXG4gICAgXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEJvdHRvbSA9IHJlcXVpcmUoJy4vYm90dG9tJyksXG4gICAgTGlnaHRib3ggPSByZXF1aXJlKCcuL2xpZ2h0Ym94X2ZhZGVfdXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhID0gW10sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgd29ya19zZWwsXG4gICAgICAgIHJpc2RfcHJvZ3JhbXMgPSBbJ0FsbCddLFxuICAgICAgICBtYXNvbmljX2d1dHRlciA9IDEyMDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnZGF0YUxvYWRlZCcpO1xuXG4gICAgLy8gZGVhbCB3aXRoIHdpbmRvdyBib3R0b20gbG9hZGluZyBtb3JlXG4gICAgdmFyIGJvdHRvbSA9IHNlbGYuYm90dG9tID0gQm90dG9tKCk7XG4gICAgdmFyIGxpZ2h0Ym94ID0gc2VsZi5saWdodGJveCA9IExpZ2h0Ym94KCk7XG5cbiAgICBib3R0b20uZGlzcGF0Y2gub24oJ2JvdHRvbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0X21vcmVfZGF0YSgpO1xuICAgIH0pO1xuXG4gICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgLm9uKCdyZXNpemUud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlc2l6ZV9tYXNvbmljKCk7XG4gICAgICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0X21vcmVfZGF0YSAoKSB7XG4gICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlydHkoZmFsc2UpO1xuICAgICAgICAgICAgcmVuZGVyX2RhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdldF9kYXRhKCk7XG4gICAgfVxuICAgIC8vIGVuZCBkZWFsaW5nIHdpdGggd2luZG93XG5cbiAgICB2YXIgbWFzb25pYyA9IGQzLm1hc29uaWMoKVxuICAgICAgICAud2lkdGgoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiArZC5jb3Zlci53aWR0aCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuaGVpZ2h0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gK2QuY292ZXIuaGVpZ2h0ICsgbWFzb25pY19ndXR0ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5jb2x1bW5XaWR0aCgyMDAgKyBtYXNvbmljX2d1dHRlcik7XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoXyk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gXztcblxuICAgICAgICAvLyBzaWRlIGVmZmVjdCBvZiB1cGRhdGluZyBjb250YWluZXJcbiAgICAgICAgYm90dG9tLmNvbnRhaW5lcihjb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbmRlcigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdldF9kYXRhKCk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbWFzb25pYycsIHRydWUpO1xuICAgICAgICAgICAgLy8gLmNsYXNzZWQoJ2NvbC0xMC0xMCcsIHRydWUpO1xuXG4gICAgICAgIHJlbmRlcl9kYXRhKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9kYXRhKCkge1xuICAgICAgICB3b3JrX3NlbCA9IGNvbnRhaW5lci5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5zcmM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB2YXIgd29ya19zZWxfZW50ZXJfbWV0YSA9XG4gICAgICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpO1xuICAgICAgICB3b3JrX3NlbF9lbnRlcl9tZXRhXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpc3QtYXZhdGFyJylcbiAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmF2YXRhcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3b3JrX3NlbF9lbnRlcl9tZXRhXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdHVkZW50X25hbWUgcGllY2UtbWV0YScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0dWRlbnRfbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3b3JrX3NlbF9lbnRlcl9tZXRhXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyaXNkX3Byb2dyYW0gcGllY2UtbWV0YScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnJpc2RfcHJvZ3JhbTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc2l6ZV9tYXNvbmljKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplX21hc29uaWMgKCkge1xuICAgICAgICB2YXIgb3V0ZXJXaWR0aCA9IGNvbnRhaW5lci5wcm9wZXJ0eSgnb2Zmc2V0V2lkdGgnKTtcblxuICAgICAgICBtYXNvbmljXG4gICAgICAgICAgICAub3V0ZXJXaWR0aChvdXRlcldpZHRoKVxuICAgICAgICAgICAgLnJlc2V0KCk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5kYXR1bShtYXNvbmljKVxuICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC53aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnggKyAncHgnOyB9KVxuICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnkgKyAncHgnOyB9KVxuICAgICAgICAgICAgLmRhdHVtKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZSgnaGVpZ2h0JywgbWFzb25pYy5vdXRlckhlaWdodCgpICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X2RhdGEgKCkge1xuICAgICAgICBkMy5qc29uKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnZGF0YS9wcm9qZWN0czIwMTQwNDA4Lmpzb24nLCBmdW5jdGlvbiAod29yaykge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd29yaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cod29yayk7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPVxuICAgICAgICAgICAgICAgIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyh3b3JrKTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZGF0YUxvYWRlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBkYXRhIGNvbWVzIG91dCBhczpcbiAgICAvLyBbe1xuICAgIC8vICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgIC8vICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgIC8vICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgLy8gICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgIC8vICAgICAnY292ZXInOiByYW5kb21fY292ZXJcbiAgICAvLyB9LCBdXG4gICAgZnVuY3Rpb24gZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzICh3b3JrKSB7XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBleHRlbnQgb2Ygd2lkdGhzXG4gICAgICAgIHZhciBhbGxfbW9kdWxlcyA9IFtdO1xuICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbF9tb2R1bGVzLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzZXQgYSBzY2FsZSBmb3IgbWFwcGluZ1xuICAgICAgICAvLyB3aWR0aCB0aGUgYW4gaW1hZ2UgdG8gdGhlXG4gICAgICAgIC8vIHdpZHRoIG9mIHRoZSBtYXNvbmljIHZlcnNpb25cbiAgICAgICAgdmFyIHdpZHRoX2V4dGVudCA9IGQzLmV4dGVudChhbGxfbW9kdWxlcywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC53aWR0aDsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3dpZHRoX2V4dGVudCcpO1xuICAgICAgICBjb25zb2xlLmxvZyh3aWR0aF9leHRlbnQpO1xuICAgICAgICB2YXIgd2lkdGhzID0gZDMuc2NhbGUub3JkaW5hbCgpXG4gICAgICAgICAgICAuZG9tYWluKHdpZHRoX2V4dGVudClcbiAgICAgICAgICAgIC5yYW5nZShbMTAwLCAyMDAsIDQwMF0pO1xuICAgICAgICAvLyB2YXIgd2lkdGhzID0gZDMuc2NhbGUuaWRlbnRpdHkoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbih3aWR0aF9leHRlbnQpO1xuXG4gICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZXNfdG9faW5jbHVkZSA9IFtdO1xuICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByYW5kb21fY292ZXJfb3B0aW9uXG4gICAgICAgICAgICB2YXIgcmFuZG9tX21vZHVsZV9pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5sZW5ndGgpLFxuICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUgPVxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGVbcmFuZG9tX21vZHVsZV9pbmRleF0sXG4gICAgICAgICAgICAgICAgcmVvcmRlcl9tb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcblxuICAgICAgICAgICAgcmVvcmRlcl9tb2R1bGVzX3RvX2luY2x1ZGUucHVzaChyYW5kb21fbW9kdWxlKTtcbiAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZVxuICAgICAgICAgICAgICAgIC5zbGljZSgwLHJhbmRvbV9tb2R1bGVfaW5kZXgpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgICAgICByZW9yZGVyX21vZHVsZXNfdG9faW5jbHVkZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGVfaW5kZXgrMSxcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLmxlbmd0aClcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlb3JkZXJfbW9kdWxlc190b19pbmNsdWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICB2YXIgbWF4XzEyNDBfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICAocmFuZG9tX21vZHVsZS5oZWlnaHQvcmFuZG9tX21vZHVsZS53aWR0aCkgKlxuICAgICAgICAgICAgICAgIDEyNDA7XG4gICAgICAgICAgICB2YXIgcmFuZG9tX2NvdmVyID0ge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsX3dpZHRoOiAxMjQwLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogbWF4XzEyNDBfaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aHMocmFuZG9tX21vZHVsZS53aWR0aCksXG4gICAgICAgICAgICAgICAgc3JjOiByYW5kb21fbW9kdWxlLnNyY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJhbmRvbV9jb3Zlci5oZWlnaHQgPSAocmFuZG9tX2NvdmVyLndpZHRoKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLmhlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS53aWR0aDtcblxuICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAnbW9kdWxlcyc6IHJlb3JkZXJfbW9kdWxlc190b19pbmNsdWRlLFxuICAgICAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlcixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZC5kZXRhaWxzLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogZC5vd25lcnNbMF0uaW1hZ2VzWycxMzgnXSxcbiAgICAgICAgICAgICAgICB1cmw6IGQub3duZXJzWzBdLnVybFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChyaXNkX3Byb2dyYW1zLmluZGV4T2YoZC5yaXNkX3Byb2dyYW0pIDwgMCkge1xuICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRfd29yaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZXBhcnRtZW50ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3cmFwcGVyLFxuICAgICAgICBjbHMgPSAnZGVwYXJ0bWVudCcsXG4gICAgICAgIGRlcGFydG1lbnRzLFxuICAgICAgICBhY3RpdmF0b3IsXG4gICAgICAgIGFjdGl2YXRvcl90ZXh0LFxuICAgICAgICBibGFua2V0X3NlbCxcbiAgICAgICAgZ3JpZF9zZWwsXG4gICAgICAgIGFjdGl2ZV9zdGF0ZSA9IGZhbHNlLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgdmFyIGRhdGEgPSBbXG4gICAgICAgICdBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnQ2VyYW1pY3MnLFxuICAgICAgICAnRGlnaXRhbCArIE1lZGlhJyxcbiAgICAgICAgJ0Z1cm5pdHVyZScsXG4gICAgICAgICdHbGFzcycsXG4gICAgICAgICdHcmFwaGljIERlc2lnbicsXG4gICAgICAgICdJbmR1c3RyaWFsIERlc2lnbicsXG4gICAgICAgICdJbnRlcmlvciBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnSmV3ZWxyeSArIE1ldGFsc21pdGhpbmcnLFxuICAgICAgICAnTGFuZHNjYXBlIEFyY2hpdGVjdHVyZScsXG4gICAgICAgICdQYWludGluZycsXG4gICAgICAgICdQaG90b2dyYXBoeScsXG4gICAgICAgICdQcmludG1ha2luZycsXG4gICAgICAgICdTY3VscHR1cmUnLFxuICAgICAgICAnVGV4dGlsZXMnLFxuICAgICAgICAnQWxsJ1xuICAgIF07XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2ZpbHRlcicpO1xuXG4gICAgc2VsZi53cmFwcGVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gd3JhcHBlcjtcbiAgICAgICAgd3JhcHBlciA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5kZXBhcnRtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcImRlcGFydG1lbnRzIGlzIGEgZ2V0dGVyXCI7XG4gICAgICAgIHJldHVybiBkZXBhcnRtZW50cztcbiAgICB9O1xuXG4gICAgc2VsZi5ncmlkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZ3JpZF9zZWw7XG4gICAgICAgIGdyaWRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXdyYXBwZXIpIHRocm93IFwicmVxdWlyZXMgYSB3cmFwcGVyXCI7XG5cbiAgICAgICAgYWN0aXZhdG9yID0gd3JhcHBlci5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYnV0dG9uIGRlcGFydG1lbnQtYWN0aXZhdG9yIGNvbC0xMC0xMCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJyAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGVfc3RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGFjdGl2YXRvcl90ZXh0ID0gYWN0aXZhdG9yLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGVwYXJ0bWVudC1hY3RpdmF0b3ItdGV4dCcpXG4gICAgICAgICAgICAudGV4dCgnZmlsdGVyIGJ5IGRlcGFydG1lbnQnKTtcblxuICAgICAgICBibGFua2V0X3NlbCA9IHdyYXBwZXIuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlcGFydG1lbnQtYmxhbmtldCcpO1xuXG5cbiAgICAgICAgZGVwYXJ0bWVudHMgPSB3cmFwcGVyLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkZXBhcnRtZW50LWxpc3QnKTtcbiAgICAgICAgXG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKGNscylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaWx0ZXInLCBkKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3JhbSA9IGQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyYW0gPT09ICdBbGwnKSBwcm9ncmFtID0gJ0RlcGFydG1lbnRzJztcbiAgICAgICAgICAgICAgICBhY3RpdmF0b3JfdGV4dC50ZXh0KHByb2dyYW0pO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZmlsdGVyKGQpO1xuICAgICAgICAgICAgICAgIHRvZ2dsZV9zdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgYmxhbmtldF9zZWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdG9nZ2xlX3N0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVfc3RhdGUgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygndG9nZ2xlJyk7XG4gICAgICAgIGFjdGl2ZV9zdGF0ZSA9IGFjdGl2ZV9zdGF0ZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgd3JhcHBlci5jbGFzc2VkKCdkZXBhcnRtZW50cy0tYWN0aXZlJywgYWN0aXZlX3N0YXRlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgYWN0aXZlX3N0YXRlKTtcbiAgICAgICAgZ3JpZF9zZWwuY2xhc3NlZCgnei1pbmRleC0zMCcsIGFjdGl2ZV9zdGF0ZSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIERlcGFydG1lbnRzID0gcmVxdWlyZSgnLi9kZXBhcnRtZW50cycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrJyksXG4gICAgVHJhbnNsYXRlID0gcmVxdWlyZSgnLi90cmFuc2xhdGUnKSxcbiAgICBOYXYgPSByZXF1aXJlKCcuL3NlY3Rpb25fbmF2Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wNCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBncmlkX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnaHRtbExvYWRlZCcpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gRGVwYXJ0bWVudHMoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcbiAgICB2YXIgd29yayA9IFdvcmsoc2VsZik7XG4gICAgdmFyIHRyYW5zbGF0ZSA9IFRyYW5zbGF0ZSgpO1xuICAgIHZhciBuYXYgPSBOYXYoKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29uY2VwdF8wNWInLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIC8vIC5sb2dvLWNvbnRhaW5lciBpcyBhIG5laWdoYm9yIG9mIC5ncmlkXG4gICAgICAgIHZhciBsb2dvX2NvbnRhaW5lcl9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbG9nby5jb250YWluZXIobG9nb19jb250YWluZXJfc2VsKTtcblxuICAgICAgICBncmlkX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZC13cmFwcGVyJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNWIvZ3JpZC5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgZ3JpZF9zZWwubm9kZSgpLmFwcGVuZENoaWxkKGh0bWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guaHRtbExvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2dvLnNjcm9sbE92ZXJTZWwoZDMuc2VsZWN0KCcuZ3JpZC1hYm91dCcpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9jb250YWluZXIgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveCcpO1xuXG4gICAgICAgIHZhciB3b3JrX2JhY2tncm91bmRfc2VsID0gZDMuc2VsZWN0KCcuZ3JpZC13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnd29yay1iYWNrZ3JvdW5kJyk7XG5cbiAgICAgICAgdmFyIGdyaWRfd29ya19zZWwgPSBkMy5zZWxlY3QoJy5ncmlkLXdyYXBwZXInKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkIGdyaWQtd29yaycpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHdvcmtfd3JhcHBlciA9IGdyaWRfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnd29yay13cmFwcGVyIHJvdycpO1xuXG5cbiAgICAgICAgdmFyIHRvcF9uYXZfc2VsID0gZDMuc2VsZWN0KCcuZ3JpZC13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ25hdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbmF2LXNlY3Rpb24nKTtcblxuICAgICAgICB3b3JrLmJvdHRvbVxuICAgICAgICAgICAgLmFkZGl0aW9uYWxNYXJnaW5Cb3R0b21TZWwoZDMuc2VsZWN0KCcuZ3JpZC13b3JrJykpO1xuXG4gICAgICAgIHZhciBkZXBhcnRtZW50X3NlbCA9IHdvcmtfd3JhcHBlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkZXBhcnRtZW50cyBjb2wtMi0xMCcpO1xuXG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAud3JhcHBlcihkZXBhcnRtZW50X3NlbClcbiAgICAgICAgICAgIC5ncmlkKGdyaWRfd29ya19zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cblxuICAgICAgICB2YXIgd29ya19zZWwgPSB3b3JrX3dyYXBwZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignaWQnLCAnd29yaycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnd29yayBjb2wtOC0xMCBvZmZzZXQtMi0xMCcpO1xuXG4gICAgICAgIHdvcmsuY29udGFpbmVyKHdvcmtfc2VsKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgd29yay5saWdodGJveFxuICAgICAgICAgICAgLmNvbnRhaW5lcihsaWdodGJveF9jb250YWluZXIpO1xuXG5cbiAgICAgICAgdHJhbnNsYXRlXG4gICAgICAgICAgICAudHJhbnNsYXRlKHdvcmtfc2VsKVxuICAgICAgICAgICAgLm92ZXIoZDMuc2VsZWN0KCcuaW50cm8td3JhcHBlcicpKVxuICAgICAgICAgICAgLmJhY2tncm91bmQod29ya19iYWNrZ3JvdW5kX3NlbClcbiAgICAgICAgICAgIC5maXhlZChkZXBhcnRtZW50X3NlbClcbiAgICAgICAgICAgIC5uYXYodG9wX25hdl9zZWwpXG4gICAgICAgICAgICAuc2Nyb2xsTGVhZChkMy5zZWxlY3QoJy5zY3JvbGwtbGVhZCcpKVxuICAgICAgICAgICAgLnNldHVwKCk7XG5cbiAgICAgICAgZGVwYXJ0bWVudHMuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignZmlsdGVyLndvcmsnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHdvcmsuZmlsdGVyKGQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbmF2LndyYXBwZXIodG9wX25hdl9zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaWdodGJveCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBzZWxlY3RlZF9zZWwsXG4gICAgICAgIHRvX3RyYW5zaXRpb24gPSB7XG4gICAgICAgICAgICBjb250YWluZXI6IHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDIzOSwgNjUsIDU0LCAwKScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDIzOSwgNjUsIDU0LCAwLjkpJyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY29udGFpbmVyJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdjb250YWluZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuICAgICAgICBzZWxmLmRpc3BhdGNoLmNvbnRhaW5lcigpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkYXRhIHRvIG1ha2Ugc2hvdyB1cFxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHRocm93IFwiRXhwZWN0ZWQgY29udGFpbmVyLlwiO1xuICAgICAgICBzZWxlY3RlZF9zZWwgPSBzZWw7XG5cbiAgICAgICAgdmFyIGRhdGEgPSBzZWwuZGF0dW0oKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhLm1vZHVsZXMnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5tb2R1bGVzKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfZ3JpZF9zZWwgPSBjb250YWluZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX3NlbCA9XG4gICAgICAgICAgICBsaWdodGJveF9ncmlkX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEgY29sLTItMTAnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfd29ya19zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC13b3JrIG9mZnNldC0yLTEwIGNvbC04LTEwJyk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2gyJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC10aXRsZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnByb2plY3RfbmFtZSk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LWRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEubW9kdWxlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zaXplcy5tYXhfMTI0MCA/IGQuc2l6ZXMubWF4XzEyNDAgOiBkLnNyYztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX2luZm9fc2VsID0gbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvJyk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1zdHVkZW50LW5hbWUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5zdHVkZW50X25hbWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tcmlzZC1wcm9ncmFtJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEucmlzZF9wcm9ncmFtKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdhJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhLnVybClcbiAgICAgICAgICAgIC50ZXh0KCdCZWhhbmNlJyk7XG5cblxuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmNvbnRhaW5lci5zdGFydCk7XG5cbiAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIHRydWUpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCB0cnVlKTtcblxuICAgICAgICBkMy50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyODApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtb3V0JylcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuZW5kKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBkMy50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyODApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW4nKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmNvbnRhaW5lci5zdGFydCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZF9zZWwuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKCcnKTtcbiAgICAgICAgICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGxvZ29Db21wb25lbnRzID0gcmVxdWlyZSgnLi9sb2dvX2NvbXBvbmVudHMnKSxcbiAgICBsb2dvQ29ubmVjdGluZyA9IHJlcXVpcmUoJy4vbG9nb19jb25uZWN0aW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBzY3JvbGxfb3Zlcl9zZWwsXG4gICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IDAsXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zZWwsXG4gICAgICAgIGxvZ29fbGluZV9zZWwsXG4gICAgICAgIGxvZ29fc3Vic2lkaWFyeV9zZWwsXG4gICAgICAgIGxvZ29fY29tcG9uZW50cyA9IGxvZ29Db21wb25lbnRzLFxuICAgICAgICBsb2dvX2Nvbm5lY3RpbmdfcGF0aHMgPSBsb2dvQ29ubmVjdGluZyxcbiAgICAgICAgbG9nb19zdmcsXG4gICAgICAgIGxvZ29fbGluZSxcbiAgICAgICAgbG9nb19jb25uZWN0aW5nLFxuICAgICAgICBzdHJhaWdodF9saW5lID0gZDMuc3ZnLmxpbmUoKTtcblxuICAgIHZhciBzY3JvbGxfc2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCBkaXN0YW5jZV90b19zY3JvbGxdKVxuICAgICAgICAucmFuZ2UoWzAsIDFdKVxuICAgICAgICAuY2xhbXAodHJ1ZSksXG4gICAgICAgIHByZXZfc2Nyb2xsX3Byb2dyZXNzID0gMDtcblxuICAgIHdpbmRvd19zZWxcbiAgICAgICAgLm9uKCdyZXNpemUubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgICAgICBkaXN0YW5jZV90b19zY3JvbGwgPSBjYWxjX2Rpc3RhbmNlX3RvX3Njcm9sbCgpO1xuICAgICAgICAgICAgc2Nyb2xsX3NjYWxlLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSk7XG5cbiAgICAgICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93X3dpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGxvZ28gY29tcG9uZW50cyBwZXIgd2luZG93XG4gICAgICAgICAgICBpZiAobG9nb19zZWwpIHtcbiAgICAgICAgICAgICAgICBsb2dvX3NlbC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVkID0gZC5ydWxlcyh3aW5kb3dfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgICAgICBkLnN0YXJ0ID0gdXBkYXRlZC5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgZC5lbmQgPSB1cGRhdGVkLmVuZDtcbiAgICAgICAgICAgICAgICAgICAgZC5pbnRlcnBvbGF0b3IgPVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkX2ludGVycG9sYXRvcih1cGRhdGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlcnBvbGF0b3I7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVfbG9nb19jb21wb25lbnRzKHByZXZfc2Nyb2xsX3Byb2dyZXNzKTtcbiAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdzY3JvbGwubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzY3JvbGxfcHJvZ3Jlc3MgPSBzY3JvbGxfc2NhbGUod2luZG93LnNjcm9sbFkpO1xuICAgICAgICAgICAgaWYgKHNjcm9sbF9wcm9ncmVzcyAhPSBwcmV2X3Njcm9sbF9wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMoc2Nyb2xsX3Byb2dyZXNzKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2X3Njcm9sbF9wcm9ncmVzcyA9IHNjcm9sbF9wcm9ncmVzcztcblxuICAgICAgICAgICAgbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2xvZ28tc3ZnLS1lbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgIChzY3JvbGxfcHJvZ3Jlc3MgPT09IDEpID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICBzZWxmLnNjcm9sbE92ZXJTZWwgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzY3JvbGxfb3Zlcl9zZWw7XG4gICAgICAgIHNjcm9sbF9vdmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxvZ29fY29udGFpbmVyX3NlbDtcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB1cGRhdGUgbG9nbyBjb21wb25lbnRzIHBlciB3aW5kb3dcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsb2dvX2NvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBkLnJ1bGVzKHdpbmRvd193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgZC5zdGFydCA9IHVwZGF0ZWQuc3RhcnQ7XG4gICAgICAgICAgICBkLmVuZCA9IHVwZGF0ZWQuZW5kO1xuICAgICAgICAgICAgZC5pbnRlcnBvbGF0b3IgPVxuICAgICAgICAgICAgICAgIGFkZF9pbnRlcnBvbGF0b3IodXBkYXRlZClcbiAgICAgICAgICAgICAgICAgICAgLmludGVycG9sYXRvcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gY2FsY19kaXN0YW5jZV90b19zY3JvbGwoKTtcbiAgICAgICAgc2Nyb2xsX3NjYWxlLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSk7XG5cbiAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhcbiAgICAgICAgICAgIHNjcm9sbF9zY2FsZShcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsWSkpO1xuXG5cbiAgICAgICAgbG9nb19zZWwgPSBsb2dvX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCdsb2dvLWNvbXBvbmVudCcpXG4gICAgICAgICAgICAuZGF0YShsb2dvX2NvbXBvbmVudHMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsb2dvLWNvbXBvbmVudCAnICsgZC5jbHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQuYm90dG9tO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3JpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydC5yaWdodDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnRbJ2ZvbnQtc2l6ZSddO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGluZS1oZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0WydsaW5lLWhlaWdodCddO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaHRtbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fbGluZV9zZWwgPSBsb2dvX3NlbC5maWx0ZXIoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnR5cGUgPT09ICdsaW5lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdWJzaWRpYXJ5X3NlbCA9IGxvZ29fc2VsLmZpbHRlcihmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIGQudHlwZSA9PT0gJ3N1YnNpZGlhcnknO1xuICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIHZhciB2ZXJ0aWNpZXMgPSBsb2dvX3ZlcnRpY2llcygpO1xuXG4gICAgICAgIGxvZ29fbGluZSA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgICAgICAuZGF0YSh2ZXJ0aWNpZXMuc3RyYWlnaHQpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tbGluZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBzdHJhaWdodF9saW5lKTtcblxuICAgICAgICBsb2dvX2Nvbm5lY3RpbmcgPVxuICAgICAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubG9nby1jb25uZWN0aW5nJylcbiAgICAgICAgICAgICAgICAuZGF0YSh2ZXJ0aWNpZXMuY29ubmVjdGluZylcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb25uZWN0aW5nJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19jb21wb25lbnRzIChwZXJjZW50X3Byb2dyZXNzKSB7XG4gICAgICAgIGlmICghbG9nb19zZWwpIHJldHVybjtcbiAgICAgICAgbG9nb19zZWxcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IudG9wKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IuYm90dG9tKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLmxlZnQocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdyaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLnJpZ2h0KHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZm9udC1zaXplJ10ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdsaW5lLWhlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2xpbmUtaGVpZ2h0J10ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICgpIHtcbiAgICAgICAgdmFyIHZlcnRpY2llcyA9IGxvZ29fdmVydGljaWVzKCk7XG5cbiAgICAgICAgbG9nb19saW5lXG4gICAgICAgICAgICAuZGF0YSh2ZXJ0aWNpZXMuc3RyYWlnaHQpXG4gICAgICAgICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpO1xuXG4gICAgICAgIGxvZ29fY29ubmVjdGluZ1xuICAgICAgICAgICAgLmRhdGEodmVydGljaWVzLmNvbm5lY3RpbmcpXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fdmVydGljaWVzICgpIHtcbiAgICAgICAgdmFyIGxvZ29fbGluZV92ZXJ0aWNpZXMgPSBbXTtcbiAgICAgICAgdmFyIGxvZ29fY29ubmVjdGluZ19zZWdtZW50cyA9IFtdO1xuXG4gICAgICAgIGxvZ29fbGluZV9zZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2Vjb25kID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV07XG5cbiAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChbZmlyc3QsIHNlY29uZF0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9nb19saW5lX3ZlcnRpY2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKChpKzEpIDwgbG9nb19saW5lX3ZlcnRpY2llcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBsb2dvX2xpbmVfdmVydGljaWVzW2ldWzFdLFxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBsb2dvX2xpbmVfdmVydGljaWVzW2krMV1bMF07XG5cbiAgICAgICAgICAgICAgICBsb2dvX2Nvbm5lY3Rpbmdfc2VnbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvX2Nvbm5lY3RpbmdfcGF0aHNbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VnbWVudChzdGFydCwgZW5kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0cmFpZ2h0OiBsb2dvX2xpbmVfdmVydGljaWVzLFxuICAgICAgICAgICAgY29ubmVjdGluZzogbG9nb19jb25uZWN0aW5nX3NlZ21lbnRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY19kaXN0YW5jZV90b19zY3JvbGwgKCkge1xuICAgICAgICB2YXIgc2Nyb2xsaW5nX2Rpc3RhbmNlID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBzY3JvbGxfb3Zlcl9zZWwuc3R5bGUoJ21hcmdpbi10b3AnLCBzY3JvbGxpbmdfZGlzdGFuY2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbGluZ19kaXN0YW5jZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfaW50ZXJwb2xhdG9yIChzdGF0ZXMpIHtcbiAgICAgICAgLy8gc2l6ZXNcbiAgICAgICAgLy8geyBtaW4xNDAwOiB7fSwgIG1pbjEwMjQ6IHt9LCBtaW43Njg6IHt9LCBtaW4zMDA6IHt9fVxuICAgICAgICBzdGF0ZXMuaW50ZXJwb2xhdG9yID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzdGF0ZXMuc3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlcy5pbnRlcnBvbGF0b3Jba2V5XSA9XG4gICAgICAgICAgICAgICAgZDMuaW50ZXJwb2xhdGVTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5zdGFydFtrZXldLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuZW5kW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gW3tcbiAgICBodG1sOiAnUklTRCcsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1yaXNkIHRleHQtbGVmdCBsb2dvLWNvbXBvbmVudC0tdGl0bGUnLFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAod2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4yKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjIpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc0MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoIDwgMTAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICdHcmFkJyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tZ3JhZCB0ZXh0LWxlZnQgbG9nby1jb21wb25lbnQtLXRpdGxlJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnNDAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICczMCUnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICcyMCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAod2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC40KSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4yKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoIDwgMTAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjQpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjIpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkdGggPCAxNDAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMikgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNCkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjIpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnU2hvdycsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLXNob3cgdGV4dC1yaWdodCBsb2dvLWNvbXBvbmVudC0tdGl0bGUnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHdpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNDUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjg1KSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoIDwgMTAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUyKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC44NSkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNTIpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC44NSkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICcyMDE0JyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tMjAxNCB0ZXh0LXJpZ2h0IGxvZ28tY29tcG9uZW50LS10aXRsZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzYwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnMzAlJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnOTUlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHdpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNikgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAtIDgwKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoIDwgMTAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjYpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgLSA4MCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNikgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgLSA4MCkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSxcbi8vIHtcbi8vICAgICBodG1sOiAnUmhvZGUgSXNsYW5kIFNjaG9vbCBvZiBEZXNpZ248YnI+Jytcbi8vICAgICAgICAgICAnQW5udWFsIEdyYWQgVGhlc2lzIEV4aGliaXRpb24nLFxuLy8gICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1zdWJoZWFkbGluZSB0ZXh0LWxlZnQnLFxuLy8gICAgIHR5cGU6ICdzdWJzaWRpYXJ5Jyxcbi8vICAgICBzdGFydDoge1xuLy8gICAgICAgICB0b3A6ICc1MCUnLFxuLy8gICAgICAgICBib3R0b206ICdhdXRvJyxcbi8vICAgICAgICAgbGVmdDogJzMwJScsXG4vLyAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4vLyAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4vLyAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuLy8gICAgIH0sXG4vLyAgICAgZW5kOiB7XG4vLyAgICAgICAgIHRvcDogJzg4JScsXG4vLyAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuLy8gICAgICAgICBsZWZ0OiAnNTBweCcsXG4vLyAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4vLyAgICAgICAgICdmb250LXNpemUnOiAnMTNweCcsXG4vLyAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuLy8gICAgIH0sXG4vLyAgICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4vLyAgICAgICAgIGlmICh3aWR0aCA8IDc2OCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgICAgICBzdGFydDoge1xuLy8gICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUpICsgJ3B4Jyxcbi8vICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4vLyAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIGVuZDoge1xuLy8gICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjg4KSArICdweCcsXG4vLyAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4vLyAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4vLyAgICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTNweCcsXG4vLyAgICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH07XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKHdpZHRoIDwgMTAyNCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgICAgICBzdGFydDoge1xuLy8gICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUpICsgJ3B4Jyxcbi8vICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4vLyAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIGVuZDoge1xuLy8gICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjg4KSArICdweCcsXG4vLyAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4vLyAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4vLyAgICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTNweCcsXG4vLyAgICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH07XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHN0YXJ0OiB7XG4vLyAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC41KSArICdweCcsXG4vLyAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4vLyAgICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4vLyAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbi8vICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuLy8gICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuLy8gICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgIGVuZDoge1xuLy8gICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuODgpICsgJ3B4Jyxcbi8vICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbi8vICAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4vLyAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbi8vICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEzcHgnLFxuLy8gICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH1cbi8vIH0sXG57XG4gICAgaHRtbDogJ09wZW4gMTLigJM1cG0gRGFpbHk8YnI+JytcbiAgICAgICAgICAnTWF5IDE24oCTMzE8YnI+PGJyPicgK1xuICAgICAgICAgICdPcGVuaW5nIFJlY2VwdGlvbjxicj4nICtcbiAgICAgICAgICAnTWF5IDE1LCA24oCTOHBtJyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tbG9jYXRpb24gdGV4dC1sZWZ0JyxcbiAgICB0eXBlOiAnc3Vic2lkaWFyeScsXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEzcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnUkkgQ29udmVudGlvbiBDZW50ZXI8YnI+JytcbiAgICAgICAgICAnRXhoaWJpdGlvbiBIYWxsIEE8YnI+JyArXG4gICAgICAgICAgJ09uZSBTYWJpbiBTdHJlZXQsIFByb3ZpZGVuY2UnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1sb2NhdGlvbiB0ZXh0LWxlZnQnLFxuICAgIHR5cGU6ICdzdWJzaWRpYXJ5JyxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHdpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNSkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuODgpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxM3B4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkdGggPCAxMDI0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEzcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNTUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC44OCkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTNweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICc8c3ZnPicgK1xuICAgICAgICAgICc8L3N2Zz4nLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1hc3RlcmlzayB0ZXh0LWxlZnQnLFxuICAgIHR5cGU6ICdzdWJzaWRpYXJ5JyxcbiAgICBzdGFydDoge1xuICAgICAgICB0b3A6ICczMCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzMwJScsXG4gICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAnZm9udC1zaXplJzogJzEwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAod2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoIDwgMTAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XTsiLCIvLyBzZWdtZW50IGZ1bmN0aW9ucyB0YWtlIGEgc3RhcnRcbi8vIGFuZCBhbmQgZW5kIHBvaW50LiByZXR1cm5pbmdcbi8vIGFuIGFycmF5IG9mIHBvaW50cyB0aGF0IHdpbGxcbi8vIGJlIHVzZWQgdG8gZHJhd24gYSBsaW5lIGNvbm5lY3Rpbmdcbi8vIHRoZSBzdGFydCBhbmQgZW5kLlxuXG4vLyBib3RoIHN0YXJ0IGFuZCBlbmQgYXJlIGFycmF5cyxcbi8vIHN0YXJ0ID0gW3gseV0sICBlbmQgPSBbeCx5XVxubW9kdWxlLmV4cG9ydHMgPSBbe1xuICAgIGZyb206ICdSSVNEJyxcbiAgICB0bzogJ0dyYWQnLFxuICAgIHNlZ21lbnQ6IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBkZWx0YV94ID0gc3RhcnRbMF0gLSBlbmRbMF0sXG4gICAgICAgICAgICBkZWx0YV95ID0gZW5kWzFdIC0gc3RhcnRbMV07XG5cbiAgICAgICAgdmFyIGQgPSAnTScgKyBzdGFydFswXSArICcsJyArIHN0YXJ0WzFdO1xuXG4gICAgICAgIGQgKz0gJyBjICcrXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAnMCwwICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjA4KSArICcsMCAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgIChkZWx0YV94ICogMC4xKSArICcsJyArXG4gICAgICAgICAgICAgKDApO1xuXG4gICAgICAgICAgICAgLy8gdG90YWwgcHJvZ3Jlc3NcbiAgICAgICAgICAgICAvLyB4OiAwLjFcbiAgICAgICAgICAgICAvLyB5OiAwXG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoZGVsdGFfeCAqIDAuMTgpICsgJywwICcrXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoZGVsdGFfeCAqIDAuMTgpICsgJywnICsgKGRlbHRhX3kgKiAwLjQpICsgJyAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgICgwKSArICcsJyArXG4gICAgICAgICAgICAgKChkZWx0YV95ICogMC40KSk7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgLy8gdG90YWwgcHJvZ3Jlc3NcbiAgICAgICAgICAgICAvLyB4OiAwLjFcbiAgICAgICAgICAgICAvLyB5OiAwLjRcblxuICAgICAgICBkICs9ICcgYyAnICtcbiAgICAgICAgICAgICAvL2NwMVxuICAgICAgICAgICAgICgtKGRlbHRhX3ggKiAwLjQxMzcpKSArICcsMCAnK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKC0oZGVsdGFfeCAqIDEpKSArICcsJyArICgtKGRlbHRhX3kgKiAwLjEyOCkpICsgJyAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgICgtKGRlbHRhX3ggKiAxLjIwNikpICsgJywnICtcbiAgICAgICAgICAgICAoKGRlbHRhX3kgKiAwLjAzKSk7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgLy8gdG90YWwgcHJvZ3Jlc3NcbiAgICAgICAgICAgICAvLyB4OiAtMS4xMDZcbiAgICAgICAgICAgICAvLyB5OiAwLjQzXG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoLShkZWx0YV94ICogMC4xNDgpKSArICcsJyArIChkZWx0YV95ICogMC4xMzI0NCkgKyAnICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKC0oZGVsdGFfeCAqIDAuMTUpKSArICcsJyArIChkZWx0YV95ICogMC4zOTA4KSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoMCkgKyAnLCcgK1xuICAgICAgICAgICAgICgoZGVsdGFfeSAqIDAuNTQ5KSk7XG5cbiAgICAgICAgICAgICAvLyB0b3RhbCBwcm9ncmVzc1xuICAgICAgICAgICAgIC8vIHg6IC0xLjEwNlxuICAgICAgICAgICAgIC8vIHk6IDAuOTcyN1xuXG4gICAgICAgIGQgKz0gJyBjICcgK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4wMzMxMCkpICsgJywnICsgKGRlbHRhX3kgKiAwLjAxMTQ1KSArICcgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjA2NzUpKSArICcsJyArIChkZWx0YV95ICogMC4wMTg3MCkgKyAnICcgK1xuICAgICAgICAgICAgIC8veCx5XG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4wOTE1KSkgKyAnLCcgK1xuICAgICAgICAgICAgICgoZGVsdGFfeSAqIDAuMDE4OCkpO1xuXG4gICAgICAgICAgICAgLy8gdG90YWwgcHJvZ3Jlc3NcbiAgICAgICAgICAgICAvLyB4OiAtMS4xMDYgKyAwLjA5MTUgPSAtMS4wMTQ1XG4gICAgICAgICAgICAgLy8geTogMC45NzI3ICsgMC4wMjczID0gMS4wXG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjAyNCkpICsgJywnICsgKGRlbHRhX3kgKiAwKSArICcgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjAyNCkpICsgJywnICsgKGRlbHRhX3kgKiAwKSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjAzNjUpKSArICcsJyArXG4gICAgICAgICAgICAgKDApO1xuXG4gICAgICAgICAgICAgLy8gdG90YWwgcHJvZ3Jlc3NcbiAgICAgICAgICAgICAvLyB4OiAtMVxuICAgICAgICAgICAgIC8vIHk6IDFcblxuICAgICAgICByZXR1cm4gZDtcbiAgICB9XG59LCB7XG4gICAgZnJvbTogJ0dyYWQnLFxuICAgIHRvOiAnU2hvdycsXG4gICAgc2VnbWVudDogZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdmFyIGRlbHRhX3ggPSBzdGFydFswXSAtIGVuZFswXSxcbiAgICAgICAgICAgIGRlbHRhX3kgPSBlbmRbMV0gLSBzdGFydFsxXTtcblxuICAgICAgICB2YXIgZCA9ICdNJyArIHN0YXJ0WzBdICsgJywnICsgc3RhcnRbMV07XG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxufSwge1xuICAgIGZyb206ICdTaG93JyxcbiAgICB0bzogJzIwMTQnLFxuICAgIHNlZ21lbnQ6IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBkZWx0YV94ID0gc3RhcnRbMF0gLSBlbmRbMF0sXG4gICAgICAgICAgICBkZWx0YV95ID0gZW5kWzFdIC0gc3RhcnRbMV07XG5cbiAgICAgICAgdmFyIGQgPSAnTScgKyBzdGFydFswXSArICcsJyArIHN0YXJ0WzFdO1xuXG4gICAgICAgIGQgKz0gJyBjICcrXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoZGVsdGFfeCAqIDAuMDQ4MTYzNzQ3ODc1NikgKyAnLDAgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoZGVsdGFfeCAqIDAuMDg0NzMzNjE0MTI4NCkgKyAnLDAgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoZGVsdGFfeCAqIDAuMTExNTQ5NTQ1NTU1KSArICcsJyArXG4gICAgICAgICAgICAgKDApO1xuXG4gICAgICAgIGQgKz0gJyBjICcgK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKChkZWx0YV94ICogMCkpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIDApICsgJyAnICtcbiAgICAgICAgICAgICAvL2NwMlxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMTEzMDI3NDE0NDY4KSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogLTAuNDk4NjE2NzkzMjk4KSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC4zNjU4MjQyODEzODYpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAtMC43MzgxMTYxMTE0MzYpO1xuXG4gICAgICAgIGQgKz0gJyBjICcgK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKChkZWx0YV94ICogLTAuMzMwODk0ODQ5NjI3KSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogLTAuMjE4ODk3MzMwOTk2KSArICcgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC43MDUyOTgxNjAwNTMpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAtMC4xNDA0MDUyMjExMTgpICsgJyAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIC0wLjk2ODcwMzkwODk2MykpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIDAuMDUzMjYzMTk4OTA5KTtcblxuICAgICAgICBkICs9ICcgYyAnICtcbiAgICAgICAgICAgICAvL2NwMVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIC0wLjM4MzE1MjI5NDM5MSkpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIDAuMjczNzc3NTE4MDIxKSArICcgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC41MzA5OTA5MTExMDYpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAxLjAwOTE5NTQwMjMpICsgJyAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIC0wLjIwOTM4NTIwNjUzMikpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIDEuNDE1NDg4MDE4Nyk7XG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjA3MTMyOTM0MzA4NzMpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwLjEzNzM4NTU0NDUxNikgKyAnICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4yMzkzODUyMDY1MzIpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwLjI4MjIzMjYxMjUwNykgKyAnICcgK1xuICAgICAgICAgICAgIC8veCx5XG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4zNTY2Njg4ODM0NykpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIDAuMjcyMjMyNjEyNTA3KTtcblxuICAgICAgICBkICs9ICcgYyAnICtcbiAgICAgICAgICAgICAvL2NwMVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMDM1NTU3NTI2MDQ3NCkpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIDApICsgJyAnICtcbiAgICAgICAgICAgICAvL2NwMlxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMDQwNjM0MDA1NzYzNykpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIDApICsgJyAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMDc5NTA5MzQ3NTIwOSApKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwKTtcblxuICAgICAgICByZXR1cm4gZDtcbiAgICB9XG59XTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNlY3Rpb25fbmF2ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3cmFwcGVyX3NlbCxcbiAgICAgICAgZGF0YSA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnQWJvdXQnLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZXh0OiAnVmlzaXQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRleHQ6ICdXb3JrJ1xuICAgICAgICB9XTtcblxuICAgIHNlbGYud3JhcHBlciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHdyYXBwZXJfc2VsO1xuICAgICAgICB3cmFwcGVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHdyYXBwZXJfc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkIGdyaWQtbmF2JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY29sLTEwLTEwJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbmF2LXNlY3Rpb24taXRlbXMnKTtcblxuICAgICAgICBjb250YWluZXIuc2VsZWN0QWxsKCcubmF2LXNlY3Rpb24taXRlbScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbmF2LXNlY3Rpb24taXRlbScpXG4gICAgICAgICAgICAuYXBwZW5kKCdhJylcbiAgICAgICAgICAgIC5hdHRyKCdocmVmJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gJyMnICsgZC50ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC50ZXh0O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNsYXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICAvLyB0aGUgc2VsZWN0aW9uIHRoYXQgaXMgYmVpbmcgdHJhbnNsYXRlZFxuICAgICAgICB0cmFuc2xhdGVfc2VsLFxuICAgICAgICAvLyB0aGUgc2VsZWN0aW9uIHRoYXQgaXMgYmVpbmcgdHJhbnNsYXRlZCBvdmVyXG4gICAgICAgIC8vIHRoaXMgd2lsbCBkZXRlcm1pbmUgdGhlIGhlaWdodCB0aGF0IG11c3QgYmVcbiAgICAgICAgLy8gc2Nyb2xsIHBhc3NlZCwgYmVmb3JlIHRoZSB0cmFuc2xhdGVkX3NlbFxuICAgICAgICAvLyBpcyB0cmFuc2xhdGVkIG92ZXJcbiAgICAgICAgb3Zlcl9zZWwsXG4gICAgICAgIG92ZXJfc2VsX2hlaWdodCA9IDAsXG4gICAgICAgIC8vIHRoZSBzZWxlY3Rpb24gZm9yIHRoZSBmdWxsIHNjcmVlbiBlbGVtZW50XG4gICAgICAgIC8vIHdob3NlIHotaW5kZXggYW5kIG9wYWNpdHkgZ2V0IGFkanVzdGVkXG4gICAgICAgIC8vIGluc3RlYWQgb2YganVzdCBzbGlkaW5nIGluLCB0aGUgaW1hZ2VzXG4gICAgICAgIC8vIHNsaWRlIGluIG92ZXIgdGhlIG5ldyBiYWNrZ3JvdW5kLlxuICAgICAgICBiYWNrZ3JvdW5kX3NlbCxcbiAgICAgICAgb3BhY2l0eV9iYWNrZ3JvdW5kX3NjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIDIwMF0pICAvLyBkaXN0YW5jZSB0byBzY3JvbGxcbiAgICAgICAgICAgIC5yYW5nZShbMCwxXSkgICAgICAvLyBvcGFjaXR5IHZhbHVlc1xuICAgICAgICAgICAgLmNsYW1wKHRydWUpLFxuICAgICAgICBvcGFjaXR5X2ZpeGVkX3NjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzQwMCwgMjAwXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgMV0pXG4gICAgICAgICAgICAuY2xhbXAodHJ1ZSksXG4gICAgICAgIG9wYWNpdHlfbmF2X3NjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWy0yMDAsIDBdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCAxXSlcbiAgICAgICAgICAgIC5jbGFtcCh0cnVlKSxcbiAgICAgICAgb3BhY2l0eV9zY3JvbGxfbGVhZF9zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAxNTBdKVxuICAgICAgICAgICAgLnJhbmdlKFsxLCAwXSlcbiAgICAgICAgICAgIC5jbGFtcCh0cnVlKSxcbiAgICAgICAgLy8gc2VsZWN0aW9uIHRoYXQgd2lsbCBmYWRlIGluXG4gICAgICAgIC8vIHR5cGljYWxseSBuYXZpZ2F0aW9uXG4gICAgICAgIGZpeGVkX3NlbCxcbiAgICAgICAgbG9nb19jb250YWluZXJfb2Zmc2V0LFxuICAgICAgICB0b3BfbmF2X3NlbCxcbiAgICAgICAgc2Nyb2xsX2xlYWRfc2VsO1xuXG4gICAgdmFyIHZlbmRvciA9IFtcIlwiLCBcIi13ZWJraXQtXCIsIFwiLW1vei1cIiwgXCItbXMtXCIsIFwiLW8tXCJdLnJlZHVjZShcbiAgICAgICAgZnVuY3Rpb24gKHAsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiB2ICsgXCJ0cmFuc2Zvcm1cIiBpbiBkb2N1bWVudC5ib2R5LnN0eWxlID8gdiA6IHA7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi50cmFuc2xhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0cmFuc2xhdGVfc2VsO1xuICAgICAgICB0cmFuc2xhdGVfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubmF2ID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdG9wX25hdl9zZWw7XG4gICAgICAgIHRvcF9uYXZfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2Nyb2xsTGVhZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNjcm9sbF9sZWFkX3NlbDtcbiAgICAgICAgc2Nyb2xsX2xlYWRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG92ZXJfc2VsO1xuICAgICAgICBvdmVyX3NlbCA9IF87XG5cbiAgICAgICAgb3Zlcl9zZWxfaGVpZ2h0ID0gZ2V0X292ZXJfc2VsX2hlaWdodCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmJhY2tncm91bmQgPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGJhY2tncm91bmRfc2VsO1xuICAgICAgICBiYWNrZ3JvdW5kX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZml4ZWRfc2VsO1xuICAgICAgICBmaXhlZF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdXBkYXRlX3Njcm9sbF90YXJnZXRfdmFsdWVzKCk7XG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Njcm9sbC50cmFuc2xhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbWFrZV9tb3ZlcygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbigndG91Y2htb3ZlLnRyYW5zbGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBtYWtlX21vdmVzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUudHJhbnNsYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9zY3JvbGxfdGFyZ2V0X3ZhbHVlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VfbW92ZXMgKCkge1xuICAgICAgICBpZiAocGFnZVlPZmZzZXQgPiBvdmVyX3NlbF9oZWlnaHQpIHtcbiAgICAgICAgICAgIG92ZXJfc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKHZlbmRvcisndHJhbnNmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgwcHgsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAoLShvdmVyX3NlbF9oZWlnaHQgLSBwYWdlWU9mZnNldCkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdweCknKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZV9zZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUodmVuZG9yKyd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKDBweCwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgKG92ZXJfc2VsX2hlaWdodCAtIHBhZ2VZT2Zmc2V0KSArXG4gICAgICAgICAgICAgICAgICAgICAgICdweCknKTtcblxuICAgICAgICAgICAgZml4ZWRfc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5Jywgb3BhY2l0eV9maXhlZF9zY2FsZShcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudG9wKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wYWNpdHlfdmFsID1cbiAgICAgICAgICAgIG9wYWNpdHlfYmFja2dyb3VuZF9zY2FsZShwYWdlWU9mZnNldC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyX3NlbF9oZWlnaHQpO1xuICAgICAgICBiYWNrZ3JvdW5kX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5Jywgb3BhY2l0eV92YWwpXG4gICAgICAgICAgICAuY2xhc3NlZChcImFjdGl2ZVwiLCAob3BhY2l0eV92YWwgPiAwKSA/IDE6IDApO1xuXG5cbiAgICAgICAgaWYgKHBhZ2VZT2Zmc2V0ID4gKGxvZ29fY29udGFpbmVyX29mZnNldCAtMjAwKSkge1xuICAgICAgICAgICAgdG9wX25hdl9zZWwuY2xhc3NlZCgnbmF2LXNlY3Rpb24tLWFjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9wX25hdl9zZWwuY2xhc3NlZCgnbmF2LXNlY3Rpb24tLWFjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB0b3BfbmF2X3NlbC5zdHlsZSgnb3BhY2l0eScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eV9uYXZfc2NhbGUocGFnZVlPZmZzZXQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ29fY29udGFpbmVyX29mZnNldCkpO1xuICAgICAgICBzY3JvbGxfbGVhZF9zZWwuc3R5bGUoJ29wYWNpdHknLFxuICAgICAgICAgICAgICAgIG9wYWNpdHlfc2Nyb2xsX2xlYWRfc2NhbGUocGFnZVlPZmZzZXQpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfc2Nyb2xsX3RhcmdldF92YWx1ZXMgKCkge1xuICAgICAgICBvdmVyX3NlbF9oZWlnaHQgPSBnZXRfb3Zlcl9zZWxfaGVpZ2h0KCk7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX29mZnNldCA9IGdldF9sb2dvX2NvbnRhaW5lcl9vZmZzZXQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfb3Zlcl9zZWxfaGVpZ2h0ICgpIHtcbiAgICAgICAgaWYgKCFvdmVyX3NlbCkgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiBvdmVyX3NlbC5ub2RlKClcbiAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAuaGVpZ2h0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9sb2dvX2NvbnRhaW5lcl9vZmZzZXQgKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH1cblxuXG4gICAgXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEJvdHRvbSA9IHJlcXVpcmUoJy4vYm90dG9tJyksXG4gICAgTGlnaHRib3ggPSByZXF1aXJlKCcuL2xpZ2h0Ym94X2ZhZGVfdXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhID0gW10sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgd29ya19zZWwsXG4gICAgICAgIGlzbyxcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ107XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2RhdGFMb2FkZWQnKTtcblxuICAgIC8vIGRlYWwgd2l0aCB3aW5kb3cgYm90dG9tIGxvYWRpbmcgbW9yZVxuICAgIHZhciBib3R0b20gPSBzZWxmLmJvdHRvbSA9IEJvdHRvbSgpO1xuICAgIHZhciBsaWdodGJveCA9IHNlbGYubGlnaHRib3ggPSBMaWdodGJveCgpO1xuXG4gICAgYm90dG9tLmRpc3BhdGNoLm9uKCdib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldF9tb3JlX2RhdGEoKTtcbiAgICB9KTtcblxuICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgIC5vbigncmVzaXplLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRfbW9yZV9kYXRhICgpIHtcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJvdHRvbS5kaXJ0eShmYWxzZSk7XG4gICAgICAgICAgICByZW5kZXJfZGF0YSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICB9XG4gICAgLy8gZW5kIGRlYWxpbmcgd2l0aCB3aW5kb3dcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChfKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuXG4gICAgICAgIC8vIHNpZGUgZWZmZWN0IG9mIHVwZGF0aW5nIGNvbnRhaW5lclxuICAgICAgICBib3R0b20uY29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdtYXNvbmljJywgdHJ1ZSk7XG4gICAgICAgICAgICAvLyAuY2xhc3NlZCgnY29sLTEwLTEwJywgdHJ1ZSk7XG5cbiAgICAgICAgcmVuZGVyX2RhdGEoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5maWx0ZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPSAxKSB0aHJvdyBcImZpbHRlciB0YWtlcyBvbmUgYXJndW1lbnRcIjtcblxuICAgICAgICB2YXIgcHJvZ3JhbSA9IF87XG4gICAgICAgIGlmIChwcm9ncmFtID09PSAnQWxsJykgcHJvZ3JhbSA9ICcnO1xuXG4gICAgICAgIGlmIChpc28pIHtcbiAgICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoZm9ybWF0X3Byb2dyYW0ocHJvZ3JhbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9kYXRhKCkge1xuICAgICAgICB3b3JrX3NlbCA9IGNvbnRhaW5lci5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB2YXIgd2lkZV9jb3VudCA9IDAsXG4gICAgICAgICAgICB3aWRlX2ZyZXF1ZW5jeSA9IDU7XG4gICAgICAgIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBleHRyYV9jbGFzcyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb3Zlci53aWR0aCA+IGQuY292ZXIuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRlX2NvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHdpZGVfY291bnQvd2lkZV9mcmVxdWVuY3kpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFfY2xhc3MgPSAnIHdpZGUtcGllY2UnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFfY2xhc3M7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB2YXIgd29ya19zZWxfZW50ZXJfbWV0YSA9XG4gICAgICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyX21ldGFcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N0dWRlbnRfbmFtZSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3R1ZGVudF9uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHdvcmtfc2VsX2VudGVyX21ldGFcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jpc2RfcHJvZ3JhbSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucmlzZF9wcm9ncmFtO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChsaWdodGJveC5zaG93KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXNvID0gbmV3IElzb3RvcGUoY29udGFpbmVyLm5vZGUoKSwge1xuICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aDogJy5waWVjZScsXG4gICAgICAgICAgICAgICAgZ3V0dGVyOiAzMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cuaXNvID0gaXNvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9kYXRhICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID1cbiAgICAgICAgICAgICAgICBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMod29yayk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGFMb2FkZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZGF0YSBjb21lcyBvdXQgYXM6XG4gICAgLy8gW3tcbiAgICAvLyAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAvLyAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAvLyAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgIC8vICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAvLyAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgLy8gfSwgXVxuICAgIGZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAod29yaykge1xuXG4gICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuXG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgZXh0ZW50IG9mIHdpZHRoc1xuICAgICAgICB2YXIgYWxsX21vZHVsZXMgPSBbXTtcbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBhbGxfbW9kdWxlcy5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2V0IGEgc2NhbGUgZm9yIG1hcHBpbmdcbiAgICAgICAgLy8gd2lkdGggdGhlIGFuIGltYWdlIHRvIHRoZVxuICAgICAgICAvLyB3aWR0aCBvZiB0aGUgbWFzb25pYyB2ZXJzaW9uXG4gICAgICAgIHZhciB3aWR0aF9leHRlbnQgPSBkMy5leHRlbnQoYWxsX21vZHVsZXMsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGg7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3aWR0aF9leHRlbnQnKTtcbiAgICAgICAgY29uc29sZS5sb2cod2lkdGhfZXh0ZW50KTtcbiAgICAgICAgdmFyIHdpZHRocyA9IGQzLnNjYWxlLm9yZGluYWwoKVxuICAgICAgICAgICAgLmRvbWFpbih3aWR0aF9leHRlbnQpXG4gICAgICAgICAgICAucmFuZ2UoWzEwMCwgMjAwLCA0MDBdKTtcbiAgICAgICAgLy8gdmFyIHdpZHRocyA9IGQzLnNjYWxlLmlkZW50aXR5KClcbiAgICAgICAgLy8gICAgIC5kb21haW4od2lkdGhfZXh0ZW50KTtcblxuICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcbiAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcmFuZG9tX2NvdmVyX29wdGlvblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9tb2R1bGUgPVxuICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUubGVuZ3RoKV07XG5cbiAgICAgICAgICAgIHZhciByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfd2lkdGg6ICtyYW5kb21fbW9kdWxlLndpZHRoLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogK3JhbmRvbV9tb2R1bGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aHMocmFuZG9tX21vZHVsZS53aWR0aCksXG4gICAgICAgICAgICAgICAgc3JjOiByYW5kb21fbW9kdWxlLnNyY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJhbmRvbV9jb3Zlci5oZWlnaHQgPSAocmFuZG9tX2NvdmVyLndpZHRoKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLmhlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS53aWR0aDtcblxuICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICAgICAnY292ZXInOiByYW5kb21fY292ZXIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGQuZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBhdmF0YXI6IGQub3duZXJzWzBdLmltYWdlc1snMTM4J10sXG4gICAgICAgICAgICAgICAgdXJsOiBkLm93bmVyc1swXS51cmxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtcy5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcbiAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkX3dvcms7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBEZXBhcnRtZW50cyA9IHJlcXVpcmUoJy4uL2RlcGFydG1lbnRzJyksXG4gICAgTG9nbyA9IHJlcXVpcmUoJy4vbG9nbycpLFxuICAgIFdvcmsgPSByZXF1aXJlKCcuL3dvcmsnKSxcbiAgICBUcmFuc2xhdGUgPSByZXF1aXJlKCcuL3RyYW5zbGF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDQgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgZ3JpZF9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2h0bWxMb2FkZWQnKTtcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IERlcGFydG1lbnRzKCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG4gICAgdmFyIHdvcmsgPSBXb3JrKHNlbGYpO1xuICAgIHZhciB0cmFuc2xhdGUgPSBUcmFuc2xhdGUoKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29uY2VwdF8wNWEnLCB0cnVlKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDVjJywgdHJ1ZSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdmdWxsLXdpZHRoLXdvcmsnLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIC8vIC5sb2dvLWNvbnRhaW5lciBpcyBhIG5laWdoYm9yIG9mIC5ncmlkXG4gICAgICAgIHZhciBsb2dvX2NvbnRhaW5lcl9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbG9nby5jb250YWluZXIobG9nb19jb250YWluZXJfc2VsKTtcblxuICAgICAgICBncmlkX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZC13cmFwcGVyJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNWMvZ3JpZC5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgZ3JpZF9zZWwubm9kZSgpLmFwcGVuZENoaWxkKGh0bWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guaHRtbExvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC5kZXBhcnRtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC53cmFwcGVyKGQzLnNlbGVjdCgnLmRlcGFydG1lbnRzJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uc2Nyb2xsT3ZlclNlbChkMy5zZWxlY3QoJy5ncmlkJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94Jyk7XG5cbiAgICAgICAgd29yay5ib3R0b20uYWRkaXRpb25hbE1hcmdpbkJvdHRvbVNlbChkMy5zZWxlY3QoJy5ncmlkJykpO1xuXG4gICAgICAgIHZhciB3b3JrX2JhY2tncm91bmRfc2VsID0gZDMuc2VsZWN0KCcuZ3JpZC13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnd29yay1iYWNrZ3JvdW5kJyk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsID0gZDMuc2VsZWN0KCcuZ3JpZC13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnd29yaycpO1xuICAgICAgICB3b3JrLmNvbnRhaW5lcih3b3JrX3NlbClcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIHdvcmsubGlnaHRib3hcbiAgICAgICAgICAgIC5jb250YWluZXIobGlnaHRib3hfY29udGFpbmVyKTtcblxuXG4gICAgICAgIHRyYW5zbGF0ZVxuICAgICAgICAgICAgLnRyYW5zbGF0ZWQod29ya19zZWwpXG4gICAgICAgICAgICAub3ZlcihkMy5zZWxlY3QoJy5ncmlkJykpXG4gICAgICAgICAgICAuYmFja2dyb3VuZCh3b3JrX2JhY2tncm91bmRfc2VsKVxuICAgICAgICAgICAgLnNldHVwKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaWdodGJveCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBzZWxlY3RlZF9zZWwsXG4gICAgICAgIHRvX3RyYW5zaXRpb24gPSB7XG4gICAgICAgICAgICBjb250YWluZXI6IHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDIzOSwgNjUsIDU0LCAwKScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDIzOSwgNjUsIDU0LCAwLjkpJyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY29udGFpbmVyJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdjb250YWluZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuICAgICAgICBzZWxmLmRpc3BhdGNoLmNvbnRhaW5lcigpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkYXRhIHRvIG1ha2Ugc2hvdyB1cFxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHRocm93IFwiRXhwZWN0ZWQgY29udGFpbmVyLlwiO1xuICAgICAgICBzZWxlY3RlZF9zZWwgPSBzZWw7XG5cbiAgICAgICAgdmFyIGRhdGEgPSBzZWwuZGF0dW0oKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhLm1vZHVsZXMnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5tb2R1bGVzKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfZ3JpZF9zZWwgPSBjb250YWluZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX3NlbCA9XG4gICAgICAgICAgICBsaWdodGJveF9ncmlkX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEgY29sLTItMTAnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfd29ya19zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC13b3JrIG9mZnNldC0yLTEwIGNvbC04LTEwJyk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2gyJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC10aXRsZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnByb2plY3RfbmFtZSk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LWRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEubW9kdWxlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zaXplcy5tYXhfMTI0MCA/IGQuc2l6ZXMubWF4XzEyNDAgOiBkLnNyYztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX2luZm9fc2VsID0gbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvJyk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1zdHVkZW50LW5hbWUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5zdHVkZW50X25hbWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tcmlzZC1wcm9ncmFtJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEucmlzZF9wcm9ncmFtKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdhJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhLnVybClcbiAgICAgICAgICAgIC50ZXh0KCdCZWhhbmNlJyk7XG5cblxuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmNvbnRhaW5lci5zdGFydCk7XG5cbiAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIHRydWUpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdsaWdodGJveC1vcGVuJywgdHJ1ZSk7XG5cbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLW91dCcpXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uY29udGFpbmVyLmVuZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuc3RhcnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfc2VsLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbGlnaHRib3gtb3BlbicsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgbG9nb0NvbXBvbmVudHMgPSByZXF1aXJlKCcuL2xvZ29fY29tcG9uZW50cycpLFxuICAgIGxvZ29QYXRocyA9IHJlcXVpcmUoJy4vbG9nb19zdGF0aWNfcGF0aHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIHNjcm9sbF9vdmVyX3NlbCxcbiAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gMCxcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsLFxuICAgICAgICBsb2dvX3NlbCxcbiAgICAgICAgbG9nb19saW5lX3NlbCxcbiAgICAgICAgbG9nb19zdWJzaWRpYXJ5X3NlbCxcbiAgICAgICAgbG9nb19jb21wb25lbnRzID0gbG9nb0NvbXBvbmVudHMsXG4gICAgICAgIGxvZ29fY29tcG9uZW50X3BhdGhzID0gbG9nb1BhdGhzLFxuICAgICAgICBsb2dvX3N2ZyxcbiAgICAgICAgbG9nb19saW5lLFxuICAgICAgICBsb2dvX2Nvbm5lY3RpbmdfbGluZSxcbiAgICAgICAgc3RyYWlnaHRfbGluZSA9IGQzLnN2Zy5saW5lKCk7XG5cbiAgICB2YXIgc2Nyb2xsX3NjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSlcbiAgICAgICAgLnJhbmdlKFswLCAxXSlcbiAgICAgICAgLmNsYW1wKHRydWUpLFxuICAgICAgICBwcmV2X3Njcm9sbF9wcm9ncmVzcyA9IDA7XG5cbiAgICB3aW5kb3dfc2VsXG4gICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gY2FsY19kaXN0YW5jZV90b19zY3JvbGwoKTtcbiAgICAgICAgICAgIHNjcm9sbF9zY2FsZS5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pO1xuXG4gICAgICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBsb2dvIGNvbXBvbmVudHMgcGVyIHdpbmRvd1xuICAgICAgICAgICAgaWYgKGxvZ29fc2VsKSB7XG4gICAgICAgICAgICAgICAgbG9nb19zZWwuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGQucnVsZXMod2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZC5zdGFydCA9IHVwZGF0ZWQuc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGQuZW5kID0gdXBkYXRlZC5lbmQ7XG4gICAgICAgICAgICAgICAgICAgIGQuaW50ZXJwb2xhdG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZF9pbnRlcnBvbGF0b3IodXBkYXRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhwcmV2X3Njcm9sbF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignc2Nyb2xsLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsX3Byb2dyZXNzID0gc2Nyb2xsX3NjYWxlKHdpbmRvdy5zY3JvbGxZKTtcbiAgICAgICAgICAgIGlmIChzY3JvbGxfcHJvZ3Jlc3MgIT0gcHJldl9zY3JvbGxfcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbG9nb19jb21wb25lbnRzKHNjcm9sbF9wcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldl9zY3JvbGxfcHJvZ3Jlc3MgPSBzY3JvbGxfcHJvZ3Jlc3M7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5zY3JvbGxPdmVyU2VsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2Nyb2xsX292ZXJfc2VsO1xuICAgICAgICBzY3JvbGxfb3Zlcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXBkYXRlIGxvZ28gY29tcG9uZW50cyBwZXIgd2luZG93XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGxvZ29fY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGQucnVsZXMod2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgICAgICBkLnN0YXJ0ID0gdXBkYXRlZC5zdGFydDtcbiAgICAgICAgICAgIGQuZW5kID0gdXBkYXRlZC5lbmQ7XG4gICAgICAgICAgICBkLmludGVycG9sYXRvciA9XG4gICAgICAgICAgICAgICAgYWRkX2ludGVycG9sYXRvcih1cGRhdGVkKVxuICAgICAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdG9yO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gY2FsY19kaXN0YW5jZV90b19zY3JvbGwoKTtcbiAgICAgICAgc2Nyb2xsX3NjYWxlLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSk7XG5cbiAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhcbiAgICAgICAgICAgIHNjcm9sbF9zY2FsZShcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsWSkpO1xuXG5cbiAgICAgICAgbG9nb19zZWwgPSBsb2dvX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCdsb2dvLWNvbXBvbmVudCcpXG4gICAgICAgICAgICAuZGF0YShsb2dvX2NvbXBvbmVudHMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsb2dvLWNvbXBvbmVudCAnICsgZC5jbHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQuYm90dG9tO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3JpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydC5yaWdodDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnRbJ2ZvbnQtc2l6ZSddO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGluZS1oZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0WydsaW5lLWhlaWdodCddO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaHRtbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fbGluZV9zZWwgPSBsb2dvX3NlbC5maWx0ZXIoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnR5cGUgPT09ICdsaW5lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdWJzaWRpYXJ5X3NlbCA9IGxvZ29fc2VsLmZpbHRlcihmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIGQudHlwZSA9PT0gJ3N1YnNpZGlhcnknO1xuICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIHZhciB2ZXJ0aWNpZXMgPSBsb2dvX3ZlcnRpY2llcygpO1xuXG4gICAgICAgIGxvZ29fbGluZSA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgnLmxvZ28tbGluZScpXG4gICAgICAgICAgICAuZGF0YSh2ZXJ0aWNpZXMuc3RyYWlnaHQpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tbGluZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBzdHJhaWdodF9saW5lKTtcblxuICAgICAgICBsb2dvX2Nvbm5lY3RpbmdfbGluZSA9XG4gICAgICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5sb2dvLWNvbm5lY3RpbmcnKVxuICAgICAgICAgICAgICAgIC5kYXRhKHZlcnRpY2llcy5jb25uZWN0aW5nKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbm5lY3RpbmcnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5zZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnRyYW5zbGF0ZS54ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCcgKyBkLnRyYW5zbGF0ZS55ICsgJykgc2NhbGUoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5zY2FsZS54ICsgJywnICsgZC5zY2FsZS55ICsgJyknO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fY29tcG9uZW50cyAocGVyY2VudF9wcm9ncmVzcykge1xuICAgICAgICBpZiAoIWxvZ29fc2VsKSByZXR1cm47XG4gICAgICAgIGxvZ29fc2VsXG4gICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLnRvcChwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLmJvdHRvbShwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci5sZWZ0KHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgncmlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci5yaWdodChwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2ZvbnQtc2l6ZSddKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGluZS1oZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgWydsaW5lLWhlaWdodCddKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB2ZXJ0aWNpZXMgPSBsb2dvX3ZlcnRpY2llcygpO1xuICAgICAgICBsb2dvX2xpbmVcbiAgICAgICAgICAgIC5kYXRhKHZlcnRpY2llcy5zdHJhaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSk7XG5cbiAgICAgICAgbG9nb19jb25uZWN0aW5nX2xpbmVcbiAgICAgICAgICAgIC5kYXRhKHZlcnRpY2llcy5jb25uZWN0aW5nKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnNlZ21lbnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQudHJhbnNsYXRlLnggK1xuICAgICAgICAgICAgICAgICAgICAnLCcgKyBkLnRyYW5zbGF0ZS55ICsgJykgc2NhbGUoJyArXG4gICAgICAgICAgICAgICAgICAgIGQuc2NhbGUueCArICcsJyArIGQuc2NhbGUueSArICcpJztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fdmVydGljaWVzICgpIHtcbiAgICAgICAgdmFyIGxvZ29fbGluZV92ZXJ0aWNpZXMgPSBbXTtcbiAgICAgICAgdmFyIGxvZ29fY29ubmVjdGluZ19saW5lX3NlZ21lbnRzID0gW107XG4gICAgICAgIGxvZ29fbGluZV9zZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSAxMCxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyAxMCxcbiAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXTtcblxuICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFtmaXJzdCwgc2Vjb25kXSk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9nb19saW5lX3ZlcnRpY2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKChpKzEpIDwgbG9nb19saW5lX3ZlcnRpY2llcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBsb2dvX2xpbmVfdmVydGljaWVzW2ldWzFdLFxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBsb2dvX2xpbmVfdmVydGljaWVzW2krMV1bMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgZGVsdGFfeCA9IHN0YXJ0WzBdIC0gZW5kWzBdLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YV95ID0gZW5kWzFdIC0gc3RhcnRbMV07XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsdGEgeCwgZGVsdGEgeScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRlbHRhX3gsIGRlbHRhX3kpO1xuICAgICAgICAgICAgICAgIHZhciBkID0ge307XG4gICAgICAgICAgICAgICAgZC5zY2FsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZGVsdGFfeC9sb2dvX2NvbXBvbmVudF9wYXRoc1tpXS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgeTogZGVsdGFfeS9sb2dvX2NvbXBvbmVudF9wYXRoc1tpXS5oZWlnaHRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGQudHJhbnNsYXRlID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBzdGFydFswXSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAobG9nb19jb21wb25lbnRfcGF0aHNbaV0ud2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgICAgIGQuc2NhbGUueCksXG4gICAgICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAobG9nb19jb21wb25lbnRfcGF0aHNbaV0uaGVpZ2h0ICpcbiAgICAgICAgICAgICAgICAgICAgICAgICBkLnNjYWxlLnkpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkLnNlZ21lbnQgPSBsb2dvX2NvbXBvbmVudF9wYXRoc1tpXS5zZWdtZW50O1xuXG4gICAgICAgICAgICAgICAgbG9nb19jb25uZWN0aW5nX2xpbmVfc2VnbWVudHMucHVzaChkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RyYWlnaHQ6IGxvZ29fbGluZV92ZXJ0aWNpZXMsXG4gICAgICAgICAgICBjb25uZWN0aW5nOiBsb2dvX2Nvbm5lY3RpbmdfbGluZV9zZWdtZW50c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsICgpIHtcbiAgICAgICAgdmFyIHNjcm9sbGluZ19kaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsLnN0eWxlKCdtYXJnaW4tdG9wJywgc2Nyb2xsaW5nX2Rpc3RhbmNlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgIHJldHVybiBzY3JvbGxpbmdfZGlzdGFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX2ludGVycG9sYXRvciAoc3RhdGVzKSB7XG4gICAgICAgIHN0YXRlcy5pbnRlcnBvbGF0b3IgPSB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHN0YXRlcy5zdGFydCkge1xuICAgICAgICAgICAgc3RhdGVzLmludGVycG9sYXRvcltrZXldID1cbiAgICAgICAgICAgICAgICBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVzLnN0YXJ0W2tleV0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5lbmRba2V5XSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlcztcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwiLy8gYWxsIGQgYXR0cmlidXRlc25lZWQgYSBmaXJzdCBwb2ludC5cbi8vIGlmIHlvdSB3YW50ZWQgdGhlIGxpbmUgdG8gc3RhcnRcbi8vIGF0IDEwMCwyMDAsIGl0IHNob3VsZCBiZTpcbi8vIGQgPSAnTTEwMCwyMDAnICsgc2VnZW1lbnRcblxubW9kdWxlLmV4cG9ydHMgPSBbe1xuICAgIGZyb206ICdSSVNEJyxcbiAgICB0bzogJ0dyYWQnLFxuICAgIHdpZHRoOiAxNDUuMjUsXG4gICAgaGVpZ2h0OiAxMzEsXG4gICAgc2VnbWVudDonTTE0NS4yOTMsMCBjMy4yMTUsMCw2LjI5NywwLDkuMjExLCcgK1xuICAgICAgICAnMGM1MC4xNywwLDQ0LjQ1NSw2NS4xODUsMy4yNDgsNjQuNzg0JyArXG4gICAgICAgICdDOTcuNTE0LDY0LjE5OCwxMi40ODQsNDYuMDgtMTcuMDQxLDY5LjE4NScgK1xuICAgICAgICAnIGMtMjIuMDU0LDE3LjI1OC0yMy4yNjQsNTEuNDUyLTEuMjg0LDU4JyArXG4gICAgICAgICdjNC43NDgsMS40MTQsOS44MTUsMi41LDEzLjI5OSwyLjVzNS4zMTcsMCw1LjMxNywwJ1xufSwge1xuICAgIGZyb206ICdHcmFkJyxcbiAgICB0bzogJ1Nob3cnLFxuICAgIHdpZHRoOiAyNzkuNjcsXG4gICAgaGVpZ2h0OiA4OC4xNSxcbiAgICBzZWdtZW50OidNMTQ1LjI5MywwIGMzLjIxNSwwLDYuMjk3LDAsOS4yMTEsJyArXG4gICAgICAgICcwYzUwLjE3LDAsNDQuNDU1LDY1LjE4NSwzLjI0OCw2NC43ODQnICtcbiAgICAgICAgJ0M5Ny41MTQsNjQuMTk4LDEyLjQ4NCw0Ni4wOC0xNy4wNDEsNjkuMTg1JyArXG4gICAgICAgICcgYy0yMi4wNTQsMTcuMjU4LTIzLjI2NCw1MS40NTItMS4yODQsNTgnICtcbiAgICAgICAgJ2M0Ljc0OCwxLjQxNCw5LjgxNSwyLjUsMTMuMjk5LDIuNXM1LjMxNywwLDUuMzE3LDAnXG59LCB7XG4gICAgZnJvbTogJ1Nob3cnLFxuICAgIHRvOiAnMjAxNCcsXG4gICAgd2lkdGg6IDE0Ni43OSxcbiAgICBoZWlnaHQ6IDEwMy44LFxuICAgIHNlZ21lbnQ6J00xNDUuMjkzLDAgYzMuMjE1LDAsNi4yOTcsMCw5LjIxMSwnICtcbiAgICAgICAgJzBjNTAuMTcsMCw0NC40NTUsNjUuMTg1LDMuMjQ4LDY0Ljc4NCcgK1xuICAgICAgICAnQzk3LjUxNCw2NC4xOTgsMTIuNDg0LDQ2LjA4LTE3LjA0MSw2OS4xODUnICtcbiAgICAgICAgJyBjLTIyLjA1NCwxNy4yNTgtMjMuMjY0LDUxLjQ1Mi0xLjI4NCw1OCcgK1xuICAgICAgICAnYzQuNzQ4LDEuNDE0LDkuODE1LDIuNSwxMy4yOTksMi41czUuMzE3LDAsNS4zMTcsMCdcbn1dOyIsInZhciBCb3R0b20gPSByZXF1aXJlKCcuL2JvdHRvbScpLFxuICAgIExpZ2h0Ym94ID0gcmVxdWlyZSgnLi9saWdodGJveF9mYWRlX3VwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGF0YSA9IFtdLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHdvcmtfc2VsLFxuICAgICAgICByaXNkX3Byb2dyYW1zID0gWydBbGwnXSxcbiAgICAgICAgbWFzb25pY19ndXR0ZXIgPSAxMjA7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2RhdGFMb2FkZWQnKTtcblxuICAgIC8vIGRlYWwgd2l0aCB3aW5kb3cgYm90dG9tIGxvYWRpbmcgbW9yZVxuICAgIHZhciBib3R0b20gPSBzZWxmLmJvdHRvbSA9IEJvdHRvbSgpO1xuICAgIHZhciBsaWdodGJveCA9IHNlbGYubGlnaHRib3ggPSBMaWdodGJveCgpO1xuXG4gICAgYm90dG9tLmRpc3BhdGNoLm9uKCdib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldF9tb3JlX2RhdGEoKTtcbiAgICB9KTtcblxuICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgIC5vbigncmVzaXplLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNpemVfbWFzb25pYygpO1xuICAgICAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldF9tb3JlX2RhdGEgKCkge1xuICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm90dG9tLmRpcnR5KGZhbHNlKTtcbiAgICAgICAgICAgIHJlbmRlcl9kYXRhKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZXRfZGF0YSgpO1xuICAgIH1cbiAgICAvLyBlbmQgZGVhbGluZyB3aXRoIHdpbmRvd1xuXG4gICAgdmFyIG1hc29uaWMgPSBkMy5tYXNvbmljKClcbiAgICAgICAgLndpZHRoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gK2QuY292ZXIud2lkdGggKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmhlaWdodChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuICtkLmNvdmVyLmhlaWdodCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuY29sdW1uV2lkdGgoMjAwICsgbWFzb25pY19ndXR0ZXIpO1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IF87XG5cbiAgICAgICAgLy8gc2lkZSBlZmZlY3Qgb2YgdXBkYXRpbmcgY29udGFpbmVyXG4gICAgICAgIGJvdHRvbS5jb250YWluZXIoY29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnZXRfZGF0YSgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLmNsYXNzZWQoJ21hc29uaWMnLCB0cnVlKTtcbiAgICAgICAgICAgIC8vIC5jbGFzc2VkKCdjb2wtMTAtMTAnLCB0cnVlKTtcblxuICAgICAgICByZW5kZXJfZGF0YSgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZGF0YSgpIHtcbiAgICAgICAgd29ya19zZWwgPSBjb250YWluZXIuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGg7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsX2VudGVyX21ldGEgPVxuICAgICAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tZXRhLXdyYXBwZXInKTtcbiAgICAgICAgd29ya19zZWxfZW50ZXJfbWV0YVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3R1ZGVudF9uYW1lIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdHVkZW50X25hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd29ya19zZWxfZW50ZXJfbWV0YVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmlzZF9wcm9ncmFtIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5yaXNkX3Byb2dyYW07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNTA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGxpZ2h0Ym94LnNob3cpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNpemVfbWFzb25pYygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZV9tYXNvbmljICgpIHtcbiAgICAgICAgdmFyIG91dGVyV2lkdGggPSBjb250YWluZXIucHJvcGVydHkoJ29mZnNldFdpZHRoJyk7XG5cbiAgICAgICAgbWFzb25pY1xuICAgICAgICAgICAgLm91dGVyV2lkdGgob3V0ZXJXaWR0aClcbiAgICAgICAgICAgIC5yZXNldCgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuZGF0dW0obWFzb25pYylcbiAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb250YWluZXIuc3R5bGUoJ2hlaWdodCcsIG1hc29uaWMub3V0ZXJIZWlnaHQoKSArICdweCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9kYXRhICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID1cbiAgICAgICAgICAgICAgICBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMod29yayk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGFMb2FkZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZGF0YSBjb21lcyBvdXQgYXM6XG4gICAgLy8gW3tcbiAgICAvLyAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAvLyAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAvLyAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgIC8vICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAvLyAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgLy8gfSwgXVxuICAgIGZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAod29yaykge1xuXG4gICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuXG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgZXh0ZW50IG9mIHdpZHRoc1xuICAgICAgICB2YXIgYWxsX21vZHVsZXMgPSBbXTtcbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBhbGxfbW9kdWxlcy5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2V0IGEgc2NhbGUgZm9yIG1hcHBpbmdcbiAgICAgICAgLy8gd2lkdGggdGhlIGFuIGltYWdlIHRvIHRoZVxuICAgICAgICAvLyB3aWR0aCBvZiB0aGUgbWFzb25pYyB2ZXJzaW9uXG4gICAgICAgIHZhciB3aWR0aF9leHRlbnQgPSBkMy5leHRlbnQoYWxsX21vZHVsZXMsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGg7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3aWR0aF9leHRlbnQnKTtcbiAgICAgICAgY29uc29sZS5sb2cod2lkdGhfZXh0ZW50KTtcbiAgICAgICAgdmFyIHdpZHRocyA9IGQzLnNjYWxlLm9yZGluYWwoKVxuICAgICAgICAgICAgLmRvbWFpbih3aWR0aF9leHRlbnQpXG4gICAgICAgICAgICAucmFuZ2UoWzEwMCwgMjAwLCA0MDBdKTtcbiAgICAgICAgLy8gdmFyIHdpZHRocyA9IGQzLnNjYWxlLmlkZW50aXR5KClcbiAgICAgICAgLy8gICAgIC5kb21haW4od2lkdGhfZXh0ZW50KTtcblxuICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcbiAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcmFuZG9tX2NvdmVyX29wdGlvblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9tb2R1bGVfaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlID1cbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlW3JhbmRvbV9tb2R1bGVfaW5kZXhdLFxuICAgICAgICAgICAgICAgIHJlb3JkZXJfbW9kdWxlc190b19pbmNsdWRlID0gW107XG5cbiAgICAgICAgICAgIHJlb3JkZXJfbW9kdWxlc190b19pbmNsdWRlLnB1c2gocmFuZG9tX21vZHVsZSk7XG4gICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGVcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCxyYW5kb21fbW9kdWxlX2luZGV4KVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVvcmRlcl9tb2R1bGVzX3RvX2luY2x1ZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLnNsaWNlKFxuICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlX2luZGV4KzEsXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgICAgICByZW9yZGVyX21vZHVsZXNfdG9faW5jbHVkZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgdmFyIG1heF8xMjQwX2hlaWdodCA9XG4gICAgICAgICAgICAgICAgKHJhbmRvbV9tb2R1bGUuaGVpZ2h0L3JhbmRvbV9tb2R1bGUud2lkdGgpICpcbiAgICAgICAgICAgICAgICAxMjQwO1xuICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogMTI0MCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF9oZWlnaHQ6IG1heF8xMjQwX2hlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhzKHJhbmRvbV9tb2R1bGUud2lkdGgpLFxuICAgICAgICAgICAgICAgIHNyYzogcmFuZG9tX21vZHVsZS5zcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByYW5kb21fY292ZXIuaGVpZ2h0ID0gKHJhbmRvbV9jb3Zlci53aWR0aCpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS5oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUud2lkdGg7XG5cbiAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgJ21vZHVsZXMnOiByZW9yZGVyX21vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICAgICAnY292ZXInOiByYW5kb21fY292ZXIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGQuZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBhdmF0YXI6IGQub3duZXJzWzBdLmltYWdlc1snMTM4J10sXG4gICAgICAgICAgICAgICAgdXJsOiBkLm93bmVyc1swXS51cmxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtcy5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcbiAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkX3dvcms7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvX3NjYWxlICgpIHtcbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHZhciBzZWdtZW50cyA9IFt7XG4gICAgICAgICAgICBmcm9tOiAnUklTRCcsXG4gICAgICAgICAgICB0bzogJ0dyYWQnLFxuICAgICAgICAgICAgLy8gc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgLy8gICAgIGZ1bmM6IHV0aWxpdHkuc2NhbGVBbmNob3JZLFxuICAgICAgICAgICAgLy8gICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgc3RhcnQ6IDIsXG4gICAgICAgICAgICAvLyAgICAgICAgIGVuZDogOVxuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMy41NjQsMCcgK1xuICAgICAgICAgICAgICAgICAgICAnYzAsMCwwLDguODUxLDAsMTYuODEnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MwLDEwLjU1NC00MS4wNDUsOTcuOTgxLTQ1LjkwNCwxOTguOTE3JyArXG4gICAgICAgICAgICAgICAgICAgICdjLTYuODYsMTQyLjQ5MywxMDIuMDQ5LDE3NC45MjUsMTk5LjQ5LDE3OC40OTEnICtcbiAgICAgICAgICAgICAgICAgICAgJ2M4MS45NjQsMywxODIuOTkxLTMxLjQ5OCwyMDguNDktMTMzLjQ5MyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MyNy41NC0xMTAuMTU5LTgzLjM0Ny0xOTEuOTktMTg3LjQ5MS0xNDguNDkzICcgK1xuICAgICAgICAgICAgICAgICAgICAnQy0xOC45MzIsMTk0LjU0Ny0yNS44NjksNDMzLjgwNSw2MS45MjEsNTMzLjI5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzg3LjcyOSw5OS40MTUsMjYuMDE0LDE3MS4zMzktOS42MjUsMTgxLjkxMSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MtNjYuMTM4LDE5LjYyLTExOC43ODktMzEuNDk4LTc5LjYzOC05NC4yNjYgJyArXG4gICAgICAgICAgICAgICAgICAgICdjNDQuMzM3LTcxLjA4MSwxOTEuOTktNjMuMjI2LDIyOS40ODktMTAuNzI5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnQzMyMy44NTIsNzgwLjU5My01OS4xMzYsOTE1Ljc4OC01OS4xMzYsOTIxLjQzJyArXG4gICAgICAgICAgICAgICAgICAgICdjMCwxOC4wMTMsMCwxMTEuNjUsMCwxMTEuNjUnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTk0LjI2LTE1ICcrXG4gICAgICAgICAgICAgICAgICAnaDI5Ljc5NiAnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAuOTM2LDguODUxLDAuOTM2LDE2LjgxICcrXG4gICAgICAgICAgICAgICAgICAnYzAsMjguMDQyLTE1LjkwMSw2Ny4zNy02MS4xODUsNjcuMzcnICtcbiAgICAgICAgICAgICAgICAgICdDMTAuNTEsNjkuMTgtMTYsNjkuMTg1LTE2LDY5LjE4NScgK1xuICAgICAgICAgICAgICAgICAgJ3YtNTInICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDM1LjkyMS00LjM5Myw0OC42NDksMy43NTgnICtcbiAgICAgICAgICAgICAgICAgICdjMzcuODYxLDI0LjI0MiwyOS42NDUsNDYuNzc3LTMuOCw4MC4yNDInICtcbiAgICAgICAgICAgICAgICAgICdjLTE3LjAyNywxNy4wMzgtNDQuNjI5LDE3LTQ0LjYyOSw0OC42NTMnICtcbiAgICAgICAgICAgICAgICAgIC8vICdjMCwxOC4wMTMsMCwyNC4zNDcsMCwyNC4zNDcnXG4gICAgICAgICAgICAgICAgICAnYzAsMCwwLDAsMCwyNC4zNDcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdHcmFkJyxcbiAgICAgICAgICAgIHRvOiAnU2hvdycsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMC0wLjEzOCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAnYzgzLjYyNywwLjYyLDIzOC43NTUsMCwzNDQuMTQsMCcsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNMCwxLjI3MSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MwLDAsMTguODYxLDAuMDQ0LDI1LjgxOCwwLjA5NScgK1xuICAgICAgICAgICAgICAgICAgICAnYzU5Ljg5NiwwLjQ0NCw0NTAuMDA2LDAsNDUwLjAwNiwwJyArXG4gICAgICAgICAgICAgICAgICAgICd2MjQ4LjVjMCwwLTYuNzk5LDAtNjgsMCcgK1xuICAgICAgICAgICAgICAgICAgICAnYy0xNDguMjY2LDAtMTM4LTE1Ny41LDAtMTU3LjUnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MxMTAsMCwxODkuNjI4LDExNy42NSwzMDIsMTE2JyArXG4gICAgICAgICAgICAgICAgICAgICdjMTQ3LjYyMS0yLjE2NywxOTMuNzg4LTIxOC43MDUsMTkzLjc4OC0yODUuNjU3JyArXG4gICAgICAgICAgICAgICAgICAgICdjMC0xOTAuMzQzLTE2MS43ODgtMTI4LjM0My0xNjEuNzg4LTQ0LjM0MycgK1xuICAgICAgICAgICAgICAgICAgICAnYzAsNTIuNDAxLDQ4Ljc3Nyw5NC42MzgsMTIzLjQyNCwxMDYnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MxMzIuODk0LDIwLjIyOCwyODUuMTA1LDE2LjkzNiwzMDEuNTYzLDE3JyArXG4gICAgICAgICAgICAgICAgICAgICdjMTQuNzQ0LDAuMDU4LDk0LjE0NywwLjEzMiw5NC4xNDcsMC4xMzInXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdTaG93JyxcbiAgICAgICAgICAgIHRvOiAnMjAxNCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNNzMuNjA2LTQ4LjY4OSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MzLjAzNy0wLjAzMiw1Ljc0LTAuMDUyLDguMDg5LTAuMDUyICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzE1LjMzLDAsNi43ODMtNDkuNjI2LTM1LjMzNy01MS4yNTggJyArXG4gICAgICAgICAgICAgICAgICAgICdjLTQzLTEuNjY3LTcwLjc1LDI0LTc3LjMzMyw1NiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0MtMzYuNTI2LTE3LjAxNS0xNC42NDEsMC0xLjk1LDAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTExNi43NDUtMTUnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAsMy4xMDMsMCwxMyAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDEyLjgyLTI1LjcwMiwxOS43NTYtNDQuNzQ1LDI3JyArXG4gICAgICAgICAgICAgICAgICAnQzQ0LjQ4NiwzNS40NjcsMTgsMzYuMDIsMTgsNjEuNScgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDI2LDE3LjUsMzYuODI4LDQ0Ljc3OCwzNi44MjgnICtcbiAgICAgICAgICAgICAgICAgICdDMTAyLjY2Nyw5OC4zMjgsMTA0LDUxLDEwNCw1MScgK1xuICAgICAgICAgICAgICAgICAgJ0gtMTZ2MzYnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDM5LjYxOCw5Ljg2NSw2MiwzNicgK1xuICAgICAgICAgICAgICAgICAgJ2MyMS4xNDEsMjQuNjg2LDIzLjU0MSwyOCw0Ny4wMjMsMjgnICtcbiAgICAgICAgICAgICAgICAgICdjMTQuOTc3LDAsMTMuNjk3LDAsMjMuNjk3LDAnICtcbiAgICAgICAgICAgICAgICAgICd2NDcuNzI0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XTtcblxuICAgIHZhciB0ZW1wX3BhdGggPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKTtcblxuICAgIHNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRoc19kID0ge307XG4gICAgICAgIGQucmVsYXRpdmVfcGF0aHMgPSB7fTtcbiAgICAgICAgZC5zY2FsZSA9IHt9O1xuXG4gICAgICAgIGZvciAodmFyIHBhdGhfc2l6ZSBpbiBkLnBhdGhzKSB7XG4gICAgICAgICAgICB0ZW1wX3BhdGguYXR0cignZCcsIGQucGF0aHNbcGF0aF9zaXplXSk7XG4gICAgICAgICAgICB1dGlsaXR5LmNvbnZlcnRUb1JlbGF0aXZlKHRlbXBfcGF0aC5ub2RlKCkpO1xuICAgICAgICAgICAgZC5yZWxhdGl2ZV9wYXRoc19kW3BhdGhfc2l6ZV0gPSB0ZW1wX3BhdGguYXR0cignZCcpO1xuICAgICAgICAgICAgZC5yZWxhdGl2ZV9wYXRocyA9IHRlbXBfcGF0aC5ub2RlKCk7XG4gICAgICAgICAgICBkLnNjYWxlW3BhdGhfc2l6ZV0gPSBkLnNjYWxlVXNpbmcoZC5yZWxhdGl2ZV9wYXRocyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRlbXBfcGF0aC5yZW1vdmUoKTtcblxuICAgIHZhciBzaXplcyA9IE9iamVjdC5rZXlzKHNlZ21lbnRzWzBdLnBhdGhzKTtcbiAgICBzZWdtZW50cy5jaG9vc2Vfc2l6ZSA9IGZ1bmN0aW9uICh3aW5kb3dfd2lkdGgsIHdpbmRvd19oZWlnaHQpIHtcbiAgICAgICAgdmFyIGNob3NlbiA9IDA7XG4gICAgICAgIHNpemVzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkIDwgd2luZG93X3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2hvc2VuID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaG9zZW4udG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LnNlZ21lbnRzID0gc2VnbWVudHM7XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnVsbHNjcmVlbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc2VsZWN0aW9uLFxuICAgICAgICBpbWdfd2lkdGggPSAwLFxuICAgICAgICBpbWdfaGVpZ2h0ID0gMDtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB0aGlzLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1nX2hlaWdodCA8IHRoaXMubmF0dXJhbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBpbWdfaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbWdfd2lkdGggPCB0aGlzLm5hdHVyYWxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBpbWdfd2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYWtlX2Z1bGxfc2NyZWVuKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1ha2VfZnVsbF9zY3JlZW4oKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5mdWxsc2NyZWVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1ha2VfZnVsbF9zY3JlZW4oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIG1ha2VfZnVsbF9zY3JlZW4gKCkge1xuICAgICAgICBpZiAoIXNlbGVjdGlvbikgdGhyb3cgXCJmdWxsIHNjcmVlbiByZXF1aXJlcyBhIHNlbGVjdGlvblwiO1xuXG4gICAgICAgIHZhciB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGlmIChoZWlnaHQgPiB3aWR0aCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICggd2lkdGggKiAoaW1nX3dpZHRoL2ltZ19oZWlnaHQpKSArJ3B4Jyk7XG4gICAgICAgICAgICBzZWxlY3Rpb24uc3R5bGUoJ2hlaWdodCcsICcxMDAlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICggaGVpZ2h0ICogKGltZ193aWR0aC9pbWdfaGVpZ2h0KSkgKydweCcpO1xuICAgICAgICAgICAgc2VsZWN0aW9uLnN0eWxlKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBOYXYgPSByZXF1aXJlKCcuL292ZXJsYXlfbmF2JyksXG4gICAgTG9nbyA9IHJlcXVpcmUoJy4vbG9nbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNpdGUgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbG9yX3ZhbHVlcyA9IHtcbiAgICAgICAgICAgIHB1cnBsZTogJ3JnYigzOCwgMzQsIDk4KTsnLFxuICAgICAgICAgICAgb3JhbmdlOiAncmdiKDI1NSwgNjEsIDU2KTsnLFxuICAgICAgICAgICAgJ2x0LXB1cnBsZSc6ICdyZ2IoMTQ2LCA1MywgMTI1KScsXG4gICAgICAgICAgICBibHVlOiAncmdiKDQzLCA4OSwgMTg0KSdcbiAgICAgICAgfSxcbiAgICAgICAgdXNlX2ltYWdlc19hc19vdmVybGF5X2JhY2tncm91bmQgPSB0cnVlLFxuICAgICAgICBiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZCA9ICdibG9jaycsXG4gICAgICAgIGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kcyA9IFsnZmFkZScsICdibG9jayddO1xuXG4gICAgdmFyIGNvbG9ycyA9IE9iamVjdC5rZXlzKGNvbG9yX3ZhbHVlcyk7XG5cbiAgICB2YXIgbmF2ID0gTmF2KCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2h0bWxMb2FkZWQnKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoJycpO1xuXG4gICAgICAgIHZhciByYW5kb21faW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKTtcblxuICAgICAgICB2YXIgY29sb3IgPSBjb2xvcnNbcmFuZG9tX2luZGV4XTtcbiAgICAgICAgdmFyIGFsdF9jb2xvcnMgPSBjb2xvcnMuc2xpY2UoMCxyYW5kb21faW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChjb2xvcnMuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21faW5kZXggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzLmxlbmd0aCkpO1xuXG4gICAgICAgIHZhciBhbHRfY29sb3IgPSBhbHRfY29sb3JzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRfY29sb3JzLmxlbmd0aCldO1xuXG4gICAgICAgIGJvZHkuY2xhc3NlZCgnY29uY2VwdF8wNicsIHRydWUpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ2JvZHktJyArIGNvbG9yLCB0cnVlKTtcbiAgICAgICAgYm9keS5jbGFzc2VkKCdib2R5LWFsdC0nICsgYWx0X2NvbG9yLCB0cnVlKTtcblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDYvYm9keS5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgYm9keS5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpICAgICAgICAgIDtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guaHRtbExvYWRlZCgpO1xuXG4gICAgICAgICAgICB2YXIgcGFpcnMgPSBkMy5zZWxlY3RBbGwoJy5vdmVybGF5LW5hdi1pdGVtJylcbiAgICAgICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuXG4gICAgICAgICAgICBpZiAodXNlX2ltYWdlc19hc19vdmVybGF5X2JhY2tncm91bmQpIHtcbiAgICAgICAgICAgICAgICBuYXYucm90YXRlQmFja2dyb3VuZChcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLnJvdGF0aW5nLWJhY2tncm91bmQtaW1hZ2UnKSlcbiAgICAgICAgICAgICAgICAgICAgLnJvdGF0ZU1ldGhvZChiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLnJvdGF0aW5nLWJhY2tncm91bmQtaW1hZ2UnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5vdmVybGF5LWJhY2tncm91bmQtaW1hZ2Utc2NyZWVuJylcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ25vLWltYWdlcycsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmF2LnNlbGVjdGlvbihwYWlycylcbiAgICAgICAgICAgICAgICAuc2V0dXAoKTtcblxuICAgICAgICAgICAgbG9nby5jb250YWluZXIoZDMuc2VsZWN0KCcubG9nby1saW5lJykpXG4gICAgICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpXG4gICAgICAgICAgICAgICAgLmR1cGVDb250YWluZXIoZDMuc2VsZWN0KCcub3ZlcmxheSAubG9nby1saW5lJykpXG4gICAgICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgY29ubmVjdExvZ29TY2FsZSA9IHJlcXVpcmUoJy4vY29ubmVjdF9sb2dvX3NjYWxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nbyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGR1cGVfbG9nb19jb250YWluZXJfc2VsLFxuICAgICAgICBsb2dvX3N2ZyxcbiAgICAgICAgbG9nb190ZXh0X3NlbCxcbiAgICAgICAgbG9nb19saW5lX3RleHRfc2VsLFxuICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWwsXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsLFxuICAgICAgICBzdHJhaWdodF9saW5lID0gZDMuc3ZnLmxpbmUoKSxcbiAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlID0gY29ubmVjdExvZ29TY2FsZSgpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmR1cGVDb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkdXBlX2xvZ29fY29udGFpbmVyX3NlbDtcbiAgICAgICAgZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRhY2hSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvd19zZWxcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93X3dpZHRoKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUod2luZG93X3dpZHRoLCB3aW5kb3dfaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKGxvZ29fY29udGFpbmVyX3NlbC5odG1sKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHNldCB1cCBzdmdcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIC8vIHNlbGVjdGlvbiBvZiB0aGUgdGV4dCB0aGF0IHdpbGwgZGVmaW5lIHRoZSBsaW5lXG4gICAgICAgIGxvZ29fdGV4dF9zZWwgPSBkMy5zZWxlY3QoJ2hlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5sb2dvLXRleHQtY29tcG9uZW50Jyk7XG5cbiAgICAgICAgLy8gdmVydGljaWVzIGZvciBcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICAvLyBsb2dvX2xpbmVfbWVyZ2VkX3NlbCA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1tZXJnZWQnKVxuICAgICAgICAvLyAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgLy8gICAgIC5lbnRlcigpXG4gICAgICAgIC8vICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgLy8gICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG5cblxuICAgICAgICBsb2dvX2xpbmVfdGV4dF9zZWwgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJy5sb2dvLWxpbmUtdGV4dCcpXG4gICAgICAgICAgICAuZGF0YSh0ZXh0X3ZlcnRpY2llcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLXRleHQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSk7XG5cbiAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VsID1cbiAgICAgICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1jb25uZWN0aW5nJylcbiAgICAgICAgICAgICAgICAuZGF0YShjb25uZWN0aW5nX3NlZ21lbnRzKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUtY29ubmVjdGluZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuXG4gICAgICAgIGlmIChkdXBlX2xvZ29fY29udGFpbmVyX3NlbCkge1xuICAgICAgICAgICAgZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAuaHRtbChsb2dvX2NvbnRhaW5lcl9zZWwuaHRtbCgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICh3d2lkdGgsIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpO1xuXG4gICAgICAgIG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLCBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfdGV4dF9zZWxcbiAgICAgICAgICAgIC5kYXRhKHRleHRfdmVydGljaWVzKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBzdHJhaWdodF9saW5lKTtcblxuICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWxcbiAgICAgICAgICAgIC5kYXRhKGNvbm5lY3Rpbmdfc2VnbWVudHMpXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMgKHNlbCkge1xuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBbXTtcblxuICAgICAgICBzZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0IC0gNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG5cbiAgICAgICAgICAgIHRleHRfdmVydGljaWVzLnB1c2goW2ZpcnN0LCBzZWNvbmRdKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGV4dF92ZXJ0aWNpZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHMoc3RhcnRfZW5kX3BvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlaWdodCkge1xuICAgICAgICB2YXIgbGluZV9zaXplX3RvX2RyYXcgPVxuICAgICAgICAgICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZS5jaG9vc2Vfc2l6ZSh3d2lkdGgsIHdoZWlnaHQpO1xuXG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRfZW5kX3BvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKChpKzEpIDwgc3RhcnRfZW5kX3BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBzdGFydF9lbmRfcG9pbnRzW2ldWzFdLFxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydF9lbmRfcG9pbnRzW2krMV1bMF07XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xpbmVfc2l6ZV90b19kcmF3XShzdGFydCwgZW5kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpbmdfc2VnbWVudHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsIGNvbm5lY3Rpbmdfc2VnbWVudHMpIHtcbiAgICAgICAgLy8gdGFrZXMgYXJyYXkgb2YgdmVydGV4IHBhaXJzLCBhbmQgcGF0aFxuICAgICAgICAvLyBlbGVtZW50cyBvZiBjb25uZWN0aW5nIHNlZ21lbnRzLlxuICAgICAgICAvLyByZXR1cm5zIG9uIHBhdGggZCBhdHRyaWJ1dGVcbiAgICAgICAgdmFyIGQgPSAnJztcblxuICAgICAgICB2YXIgdGVtcF9wYXRoID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCd0ZW1wLXBhdGgnKVxuICAgICAgICAgICAgLmRhdGEodGV4dF92ZXJ0aWNpZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgdGVtcF9wYXRoLmVhY2goZnVuY3Rpb24gKHRkLCB0aSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGQpO1xuICAgICAgICAgICAgZCArPSBkMy5zZWxlY3QodGhpcykuYXR0cignZCcpO1xuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpbmdfc2VnbWVudHNbdGldKSBkICs9IGNvbm5lY3Rpbmdfc2VnbWVudHNbdGldO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZygnZCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhkKTtcblxuICAgICAgICB0ZW1wX3BhdGgucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBSb3RhdGVTdmcgPSByZXF1aXJlKCcuL3JvdGF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1dHRvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc2VsZWN0aW9uLFxuICAgICAgICBkaW1lbnNpb25zO1xuXG4gICAgdmFyIHJvdGF0ZV9zdmcgPSBSb3RhdGVTdmcoKTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIGRpbWVuc2lvbnMgPSBnZXRfZGltZW5zaW9ucyhzZWxlY3Rpb24pO1xuICAgICAgICByb3RhdGVfc3ZnXG4gICAgICAgICAgICAuc2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3QoJyNmbG93ZXInKSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHJvdGF0ZV9zdmcuc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9kaW1lbnNpb25zIChzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBmdWxsc2NyZWVuSW1nID0gcmVxdWlyZSgnLi9mdWxsc2NyZWVuX2ltZycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4vb3ZlcmxheV9idXR0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYXYgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHRhcmdldF9zZWwsXG4gICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbCxcbiAgICAgICAgcm90YXRlX2JhY2tncm91bmRfbGVuZ3RoID0gMCxcbiAgICAgICAgcm90YXRlX2RpcmVjdGlvbl9hc2NlbmRpbmcgPSB0cnVlLFxuICAgICAgICBvdmVybGFpZCA9IGZhbHNlLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICByb3RhdGVfbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGZhZGU6IHJvdGF0ZV9mYWRlLFxuICAgICAgICAgICAgYmxvY2s6IHJvdGF0ZV9ibG9jayxcbiAgICAgICAgICAgIG5vbmU6IGZ1bmN0aW9uICgpIHt9XG4gICAgICAgIH0sXG4gICAgICAgIHJvdGF0ZV9tZXRob2QgPSAnbm9uZSc7XG5cbiAgICB2YXIgZnVsbF9zY3JlZW4gPSBmdWxsc2NyZWVuSW1nKCkuc2V0dXAoKTtcbiAgICB2YXIgYnV0dG9uID0gQnV0dG9uKCk7XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldF9zZWw7XG4gICAgICAgIHRhcmdldF9zZWwgPSBfO1xuXG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgICAgLnNlbGVjdGlvbih0YXJnZXRfc2VsKVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucm90YXRlTWV0aG9kID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcm90YXRlX21ldGhvZDtcbiAgICAgICAgcm90YXRlX21ldGhvZCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJvdGF0ZUJhY2tncm91bmQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByb3RhdGVfYmFja2dyb3VuZF9zZWw7XG4gICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbCA9IF87XG5cbiAgICAgICAgLy8gc2V0IGludGlhbCB2YWx1ZXM7XG4gICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbFxuICAgICAgICAgICAgLmRhdHVtKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgZC5vcGFjaXR5ID0gKGkgPT09IDApID8gMSA6IDA7XG4gICAgICAgICAgICAgICAgcm90YXRlX2JhY2tncm91bmRfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bGxfc2NyZWVuLnNlbGVjdGlvbihyb3RhdGVfYmFja2dyb3VuZF9zZWwpXG4gICAgICAgICAgICAucmVzaXplKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGFyZ2V0X3NlbCkgdGhyb3cgXCJyZXF1aXJlcyBlbGVtZW50cyB0byBwYWlyXCI7XG4gICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgIC5vbignY2xpY2submF2JywgZnVuY3Rpb24gKGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCcjZmxvd2VyJyk7XG4gICAgICAgICAgICAgICAgb3ZlcmxhaWQgPSBvdmVybGFpZCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWQpIHJvdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlX2RlYWN0aXZhdGUoZCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVfZGVhY3RpdmF0ZSAoZCkge1xuICAgICAgICB2YXIgb3ZlcmxheSA9IGQzLnNlbGVjdChkLmFjdGl2YXRlKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc2VkKCdvdmVybGFpZCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKGQuYm9keSwgb3ZlcmxhaWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZSAoKSB7XG4gICAgICAgIHJvdGF0ZV9tZXRob2RzW3JvdGF0ZV9tZXRob2RdKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcm90YXRlX2Jsb2NrICgpIHtcbiAgICAgICAgdmFyIHNwZWVkID0gODAwLFxuICAgICAgICAgICAgcGF1c2UgPSA4MDAwO1xuXG4gICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbFxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMCAqIHJvdGF0ZV9iYWNrZ3JvdW5kX2xlbmd0aClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogc3BlZWQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJylcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVybGFpZCkgcm90YXRlKCk7XG4gICAgICAgICAgICAgICAgfSwgcGF1c2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByb3RhdGVfZmFkZSAoKSB7XG4gICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDAwKVxuICAgICAgICAgICAgLmVhY2goXCJzdGFydFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcm90YXRlX2JhY2tncm91bmRfc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKCd6LWluZGV4JywgZC56KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm9wYWNpdHk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goXCJlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgY3VycmVudCBcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudF9pbmRleCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfY3VycmVudF9pbmRleDtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBpbmRleFxuICAgICAgICAgICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIG5leHQgaW5kZXggYmFzZWQgb24gYXNjZW5kaW5nIG9yIG5vdFxuICAgICAgICAgICAgICAgIC8vIGFsc28gY2hhbmdpbmcgYXNjZW5kaW5nIGJvb2wgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgaWYgKHJvdGF0ZV9kaXJlY3Rpb25fYXNjZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRfY3VycmVudF9pbmRleCA9IGN1cnJlbnRfaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF9jdXJyZW50X2luZGV4ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAocm90YXRlX2JhY2tncm91bmRfbGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfaW5kZXggPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX2xlbmd0aCAtIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVfZGlyZWN0aW9uX2FzY2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9jdXJyZW50X2luZGV4ID0gY3VycmVudF9pbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X2N1cnJlbnRfaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0X2N1cnJlbnRfaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlX2RpcmVjdGlvbl9hc2NlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc2V0IG9wYWNpdHkgdmFsdWVzIGJhc2VkIG9uIG5leHQgY3VycmVudCBpbmRleFxuICAgICAgICAgICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQub3BhY2l0eSA9ICgoaSA9PT0gbmV4dF9jdXJyZW50X2luZGV4KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGkgPT09IGN1cnJlbnRfaW5kZXgpKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICBkLmN1cnJlbnQgPSAoaSA9PT0gbmV4dF9jdXJyZW50X2luZGV4KSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgOiBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gbmV4dF9jdXJyZW50X2luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLnogPSAzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IGN1cnJlbnRfaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQueiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLnogPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChvdmVybGFpZCkgcm90YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb3RhdGUgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHNlbGVjdGlvbixcbiAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgc3BlZWQgPSAwLjIsXG4gICAgICAgIHN0YXJ0ID0gRGF0ZS5ub3coKSxcbiAgICAgICAgcmFkaXVzO1xuXG4gICAgdmFyIHZlbmRvciA9IFtcIlwiLCBcIi13ZWJraXQtXCIsIFwiLW1vei1cIiwgXCItbXMtXCIsIFwiLW8tXCJdLnJlZHVjZShcbiAgICAgICAgZnVuY3Rpb24gKHAsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiB2ICsgXCJ0cmFuc2Zvcm1cIiBpbiBkb2N1bWVudC5ib2R5LnN0eWxlID8gdiA6IHA7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgIHNlbGVjdGlvbiA9IF87XG5cbiAgICAgICAgcmFkaXVzID0gc2VsZWN0aW9uLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQvMjtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3BlZWQgPSAxO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3BlZWQgPSAwLjI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljay5yb3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWVkID0gMC4yO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIHNwZWVkID0gNTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgZDMudGltZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFuZ2xlID0gKERhdGUubm93KCkgLSBzdGFydCkgKiBzcGVlZDtcbiAgICAgICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIC5zdHlsZSh2ZW5kb3IrJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgJ3JvdGF0ZSgnKyAoYW5nbGUvcmFkaXVzKSArJ2RlZyknKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9wb3NpdGlvbiAoKSB7XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ZnICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5jb252ZXJ0VG9SZWxhdGl2ZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNldCh0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocnNlZywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGR4LCBkeSwgeDAsIHkwLCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgIHNlZ3MgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICBmb3IgKHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwLCBsZW4gPSBzZWdzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICAgaSA8IGxlbjtcbiAgICAgICAgICAgICBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ3MuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICBjICAgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgaWYgKC9bTUxIVkNTUVRBWnpdLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IC14ICsgKHggPSBzZWcueCk7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IC15ICsgKHkgPSBzZWcueSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdNb3ZldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b0hvcml6b250YWwnLGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdWJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvVmVydGljYWwnLGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljJyxkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpY1Ntb290aCcsZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljJyxkeCxkeSx4MSx5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWNTbW9vdGgnLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQXJjJyxkeCxkeSxzZWcucjEsc2VnLnIyLHNlZy5hbmdsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWcubGFyZ2VBcmNGbGFnLHNlZy5zd2VlcEZsYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1onOiBjYXNlICd6JzogeCA9IHgwOyB5ID0geTA7IGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIHggKz0gc2VnLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyBpbiBzZWcpIHkgKz0gc2VnLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgc3RhcnQgb2YgYSBzdWJwYXRoXG4gICAgICAgICAgICBpZiAoYyA9PSAnTScgfHwgYyA9PSAnbScpIHtcbiAgICAgICAgICAgICAgICB4MCA9IHg7XG4gICAgICAgICAgICAgICAgeTAgPSB5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1ovZywgJ3onKSk7XG4gICAgfTtcblxuICAgIHNlbGYucGF0aERlbHRhID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RhcnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoMCksXG4gICAgICAgICAgICBlbmQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcblxuICAgICAgICBkZWx0YS54ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICBkZWx0YS55ID0gZW5kLnkgLSBzdGFydC55O1xuXG4gICAgICAgIHJldHVybiBkZWx0YTtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBhIHBhdGggZWxlbWVudFxuICAgIC8vIGFuZCB0aGUgcGF0aCBzZWdlbWVudCBpbmRpY2llc1xuICAgIC8vIHRoYXQgd2lsbCBiZSBzY2FsZWRcbiAgICBzZWxmLnNjYWxlQW5jaG9yWSA9IGZ1bmN0aW9uIChwYXRoLCBhbmNob3JzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZUFuY2hvclknKTtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY3VycmVudCBkZWx0YVxuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBhbmNob3JzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvX3JlcGxhY2UgPSBzZWdtZW50cy5nZXRJdGVtKGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlX3dpdGggPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkgKyAoKGRlbHRhLmN1cnJlbnQueS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEuZHJhd24ueSkvMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkyKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlX3dpdGgsIGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbCA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogc2VsZi5wYXRoRGVsdGEocGF0aClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIC8vIHNjYWxlIHksIGZpdCB4XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogc2VsZi5wYXRoRGVsdGEocGF0aClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKSxcbiAgICAgICAgICAgIGZpdF94ID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEuZHJhd24ueCkgPiAwLjEpIHtcbiAgICAgICAgICAgIGZpdF94ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkZWx0YS5kaWZmID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueCAtIGRlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55IC0gZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdLFxuICAgICAgICAgICAgICAgIHNlZ21lbnRfY291bnQgPSBzZWdtZW50cy5udW1iZXJPZkl0ZW1zO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50X2NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyO1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmIChmaXRfeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgZHggPSBzZWcueCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGVsdGEuZGlmZi54LyhzZWdtZW50X2NvdW50LTEpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgZHggPSBzZWcueDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFggPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IHNlbGYucGF0aERlbHRhKHBhdGgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsWCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTE7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdyYXBwZXIsXG4gICAgICAgIGNscyA9ICdkZXBhcnRtZW50JztcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IFtcbiAgICAgICAgJ0FyY2hpdGVjdHVyZScsXG4gICAgICAgICdDZXJhbWljcycsXG4gICAgICAgICdEaWdpdGFsICsgTWVkaWEnLFxuICAgICAgICAnRnVybml0dXJlIERlc2lnbicsXG4gICAgICAgICdHbGFzcycsXG4gICAgICAgICdHcmFwaGljIERlc2lnbicsXG4gICAgICAgICdJbmR1c3RyaWFsIERlc2lnbicsXG4gICAgICAgICdJbnRlcmlvciBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnSmV3ZWxyeSArIE1ldGFsc21pdGhpbmcnLFxuICAgICAgICAnTGFuZHNjYXBlIEFyY2hpdGVjdHVyZScsXG4gICAgICAgICdQYWludGluZycsXG4gICAgICAgICdQaG90b2dyYXBoeScsXG4gICAgICAgICdQcmludG1ha2luZycsXG4gICAgICAgICdTY3VscHR1cmUnLFxuICAgICAgICAnVGV4dGlsZXMnXG4gICAgXTtcblxuICAgIHNlbGYud3JhcHBlciA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHdyYXBwZXI7XG4gICAgICAgIHdyYXBwZXIgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYuZGVwYXJ0bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJkZXBhcnRtZW50cyBpcyBhIGdldHRlclwiO1xuICAgICAgICByZXR1cm4gZGVwYXJ0bWVudHM7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXdyYXBwZXIpIHRocm93IFwicmVxdWlyZXMgYSB3cmFwcGVyXCI7XG5cbiAgICAgICAgd3JhcHBlclxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChjbHMpXG4gICAgICAgICAgICAuZGF0YShkZXBhcnRtZW50cylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIHByb3RvdHlwZXMgPSB7XG4gICAgY29uY2VwdDoge1xuICAgICAgICAnMDAnOiBDb25jZXB0XzAwLFxuICAgICAgICAnMDEnOiBDb25jZXB0XzAxLFxuICAgICAgICAnMDFhJzogQ29uY2VwdF8wMWEsXG4gICAgICAgICcwMic6IENvbmNlcHRfMDIsXG4gICAgICAgICcwMyc6IENvbmNlcHRfMDMsXG4gICAgICAgICcwNCc6IENvbmNlcHRfMDQsXG4gICAgICAgICcwNGEnOiBDb25jZXB0XzA0YSxcbiAgICAgICAgJzA0Yic6IENvbmNlcHRfMDRiLFxuICAgICAgICAnMDRjJzogQ29uY2VwdF8wNGMsXG4gICAgICAgICcwNGQnOiBDb25jZXB0XzA0ZCxcbiAgICAgICAgJzA0ZSc6IENvbmNlcHRfMDRlLFxuXHRcdCcwNGcnOiBDb25jZXB0XzA0ZyxcbiAgICAgICAgJzA1JzogQ29uY2VwdF8wNSxcbiAgICAgICAgJzA1YSc6IENvbmNlcHRfMDVhLFxuICAgICAgICAnMDViJzogQ29uY2VwdF8wNWIsXG4gICAgICAgICcwNWMnOiBDb25jZXB0XzA1YyxcbiAgICAgICAgJzA2JzogQ29uY2VwdF8wNlxuICAgIH0sXG4gICAgd29yazoge1xuICAgICAgICAnMDEnOiBXb3JrXzAxLFxuICAgICAgICAnMDFhJzogV29ya18wMWEsXG4gICAgICAgICcwMWInOiBXb3JrXzAxYixcbiAgICAgICAgJzAyJzogV29ya18wMixcbiAgICAgICAgJzAzJzogV29ya18wMyxcbiAgICAgICAgJzA0JzogV29ya18wNFxuICAgIH0sXG4gICAgaW5kZXg6IHtcbiAgICAgICAgJzAwJzogZnVuY3Rpb24gKCkge31cbiAgICB9XG59O1xuXG52YXIgcHJvdG90eXBlX3RvX2xvYWQgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYXNoX3ZhcnMgPSBbJ2luZGV4JywgJzAwJ107XG5cbiAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4gICAgaWYgKGhhc2gpIHtcbiAgICAgICAgaGFzaF92YXJzID0gaGFzaC5zcGxpdCgnIycpWzFdLnNwbGl0KCcmJylbMF0uc3BsaXQoJz0nKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm4gWyd3b3JrJywgJzAxJ11cbiAgICByZXR1cm4gaGFzaF92YXJzO1xufSkoKTtcblxuZXhoaWJpdGlvbiA9IHByb3RvdHlwZXNbcHJvdG90eXBlX3RvX2xvYWRbMF1dW3Byb3RvdHlwZV90b19sb2FkWzFdXSgpO1xuXG53aW5kb3cuZXhoaWJpdGlvbiA9IGV4aGliaXRpb247XG5cbmZ1bmN0aW9uIFdvcmtfMDEgKCkge1xuICAgIHZhciB3b3JrID0gcmVxdWlyZSgnLi93b3JrXzAxL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gd29yaztcbn1cbmZ1bmN0aW9uIFdvcmtfMDFhICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wMWEvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuZnVuY3Rpb24gV29ya18wMWIgKCkge1xuICAgIHZhciB3b3JrID0gcmVxdWlyZSgnLi93b3JrXzAxYi9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIHdvcms7XG59XG5mdW5jdGlvbiBXb3JrXzAyICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wMi9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIHdvcms7XG59XG5mdW5jdGlvbiBXb3JrXzAzICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wMy9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIHdvcms7XG59XG5mdW5jdGlvbiBXb3JrXzA0ICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wNC9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIHdvcms7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDAgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAwL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDEvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzAxYSAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDFhL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMiAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzAzICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wMy9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDQgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzA0L2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wNGEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzA0YS9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDRiICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNGIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA0YyAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDRjL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wNGQgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzA0ZC9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDRlICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNGUvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA0ZyAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDRnL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wNSAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDUvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA1YSAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDVhL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wNWIgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzA1Yi9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDVjICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNWMvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA2ICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNi9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59IiwibW9kdWxlLmV4cG9ydHMgPVxuJzxkaXYgY2xhc3M9XCJncmlkXCI+JyArXG4nICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJzXCI+PC9kaXY+JyArXG4nICAgIDxkaXYgY2xhc3M9XCJ3b3JrXCI+PC9kaXY+JyArXG4nPC9kaXY+JzsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbixcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIGlzbztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wMScsIHRydWUpO1xuXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZ3JpZCcpO1xuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvbi5zZWxlY3QoJy53b3JrJyk7XG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3QoJy5maWx0ZXJzJyk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJlbmRlcl93b3JrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRfYW5kX3JlbmRlcl93b3JrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfYW5kX3JlbmRlcl93b3JrICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG4gICAgICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZSc6IG1kXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyaXNkX3Byb2dyYW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfd29yayAoKSB7XG4gICAgICAgIHdvcmsgPSB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24uc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1vZHVsZS5zcmM7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaXNvID0gbmV3IElzb3RvcGUod29ya19jb250YWluZXJfc2VsZWN0aW9uLm5vZGUoKSwge1xuICAgICAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5waWVjZScsXG4gICAgICAgICAgICAgICAgbWFzb25yeToge1xuICAgICAgICAgICAgICAgICAgICBndXR0ZXI6IDIwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5pc28gPSBpc287XG5cbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbiA9IGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdmaWx0ZXInKVxuICAgICAgICAgICAgLmRhdGEocmlzZF9wcm9ncmFtcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmaWx0ZXInKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3JhbSA9IGQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyYW0gPT09ICdBbGwnKSBwcm9ncmFtID0gJyc7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGZvcm1hdF9wcm9ncmFtKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbixcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIGlzbztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wMWEnLCB0cnVlKTtcblxuICAgICAgICBncmlkX3NlbGVjdGlvbiA9IGQzLnNlbGVjdCgnLmdyaWQnKTtcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb24uc2VsZWN0KCcud29yaycpO1xuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0KCcuZmlsdGVycycpO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZW5kZXJfd29yaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0X2FuZF9yZW5kZXJfd29yaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X2FuZF9yZW5kZXJfd29yayAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuICAgICAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUnOiBtZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKS5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICB3b3JrID0gd29ya19jb250YWluZXJfc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgKyBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUuc3JjO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcblxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uID0gZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2ZpbHRlcicpXG4gICAgICAgICAgICAuZGF0YShyaXNkX3Byb2dyYW1zKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZpbHRlcicpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmFtID0gZDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3JhbSA9PT0gJ0FsbCcpIHByb2dyYW0gPSAnJztcbiAgICAgICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoZm9ybWF0X3Byb2dyYW0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29ya18wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ3JpZF9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19zZWxlY3Rpb24sXG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uLFxuICAgICAgICByaXNkX3Byb2dyYW1zID0gWydBbGwnXSxcbiAgICAgICAgaXNvO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaHRtbChodG1sKTtcbiAgICAgICAgYm9keS5jbGFzc2VkKCd3b3JrXzAxYicsIHRydWUpO1xuXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZ3JpZCcpO1xuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvbi5zZWxlY3QoJy53b3JrJyk7XG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3QoJy5maWx0ZXJzJyk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJlbmRlcl93b3JrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRfYW5kX3JlbmRlcl93b3JrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfYW5kX3JlbmRlcl93b3JrICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG4gICAgICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZSc6IG1kXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyaXNkX3Byb2dyYW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfd29yayAoKSB7XG4gICAgICAgIHdvcmsgPSB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24uc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUud2lkdGgvMiArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1vZHVsZS5oZWlnaHQvMiArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUuc3JjO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgICAgICAgICAgZ3V0dGVyOiAyMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuaXNvID0gaXNvO1xuXG4gICAgICAgIGZpbHRlcl9zZWxlY3Rpb24gPSBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvblxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnZmlsdGVyJylcbiAgICAgICAgICAgIC5kYXRhKHJpc2RfcHJvZ3JhbXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZmlsdGVyJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2dyYW0gPSBkO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmFtID09PSAnQWxsJykgcHJvZ3JhbSA9ICcnO1xuICAgICAgICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QoaXRlbUVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChmb3JtYXRfcHJvZ3JhbShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPVxuJzxkaXYgY2xhc3M9XCJncmlkXCI+JyArXG4nICAgIDxkaXYgY2xhc3M9XCJ3b3JrXCI+PC9kaXY+JyArXG4nPC9kaXY+JzsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaHRtbChodG1sKTtcbiAgICAgICAgYm9keS5jbGFzc2VkKCd3b3JrXzAyJywgdHJ1ZSk7XG5cbiAgICAgICAgZ3JpZF9zZWxlY3Rpb24gPSBkMy5zZWxlY3QoJy5ncmlkJyk7XG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uLnNlbGVjdCgnLndvcmsnKTtcblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldF9hbmRfcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9hbmRfcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICBkMy5qc29uKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnZGF0YS9wcm9qZWN0czIwMTQwNDA4Lmpzb24nLCBmdW5jdGlvbiAod29yaykge1xuXG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcbiAgICAgICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyaXNkX2RlcGFydG1lbnQnOiBkLnJpc2RfZGVwYXJ0bWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9kdWxlJzogbWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKGZvcm1hdHRlZF93b3JrKS5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICB3b3JrID0gd29ya19jb250YWluZXJfc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5tb2R1bGUud2lkdGggPiBkLm1vZHVsZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnMTAwcHgnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoZC5tb2R1bGUuaGVpZ2h0L2QubW9kdWxlLndpZHRoKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDApICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5tb2R1bGUuaGVpZ2h0ID4gZC5tb2R1bGUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnMTAwcHgnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoZC5tb2R1bGUud2lkdGgvZC5tb2R1bGUuaGVpZ2h0KSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDApICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWltYWdlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoJyArIGQubW9kdWxlLnNyYyArICcpJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgdmFyIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgICAgICAgICAgZ3V0dGVyOiAyMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuaXNvID0gaXNvO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29ya18wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ3JpZF9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19zZWxlY3Rpb24sXG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uLFxuICAgICAgICByaXNkX3Byb2dyYW1zID0gWydBbGwnXSxcbiAgICAgICAgaXNvO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaHRtbChodG1sKTtcbiAgICAgICAgYm9keS5jbGFzc2VkKCd3b3JrXzAzJywgdHJ1ZSk7XG5cbiAgICAgICAgZ3JpZF9zZWxlY3Rpb24gPSBkMy5zZWxlY3QoJy5ncmlkJyk7XG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uLnNlbGVjdCgnLndvcmsnKTtcbiAgICAgICAgZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvblxuICAgICAgICAgICAgLnNlbGVjdCgnLmZpbHRlcnMnKTtcblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldF9hbmRfcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9hbmRfcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICBkMy5qc29uKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnZGF0YS9wcm9qZWN0czIwMTQwNDA4Lmpzb24nLCBmdW5jdGlvbiAod29yaykge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd29yaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cod29yayk7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcbiAgICAgICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9kdWxlJzogbWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluZGV4T2YoZC5yaXNkX3Byb2dyYW0pIDwgMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlzZF9wcm9ncmFtcy5wdXNoKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSkucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl93b3JrICgpIHtcbiAgICAgICAgd29yayA9IHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICsgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLm1vZHVsZS53aWR0aCA+IGQubW9kdWxlLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcxMDBweCc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKChkLm1vZHVsZS5oZWlnaHQvZC5tb2R1bGUud2lkdGgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMCkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLm1vZHVsZS5oZWlnaHQgPiBkLm1vZHVsZS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcxMDBweCc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKChkLm1vZHVsZS53aWR0aC9kLm1vZHVsZS5oZWlnaHQpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMCkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtaW1hZ2UnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgnICsgZC5tb2R1bGUuc3JjICsgJyknO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUuc3JjO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcblxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uID0gZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2ZpbHRlcicpXG4gICAgICAgICAgICAuZGF0YShyaXNkX3Byb2dyYW1zKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZpbHRlcicpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmFtID0gZDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3JhbSA9PT0gJ0FsbCcpIHByb2dyYW0gPSAnJztcbiAgICAgICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoZm9ybWF0X3Byb2dyYW0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29ya18wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ3JpZF9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19zZWxlY3Rpb24sXG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uLFxuICAgICAgICByaXNkX3Byb2dyYW1zID0gWydBbGwnXSxcbiAgICAgICAgaXNvO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaHRtbChodG1sKTtcbiAgICAgICAgYm9keS5jbGFzc2VkKCd3b3JrXzA0JywgdHJ1ZSk7XG5cbiAgICAgICAgZ3JpZF9zZWxlY3Rpb24gPSBkMy5zZWxlY3QoJy5ncmlkJyk7XG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uLnNlbGVjdCgnLndvcmsnKTtcbiAgICAgICAgZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvblxuICAgICAgICAgICAgLnNlbGVjdCgnLmZpbHRlcnMnKTtcblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldF9hbmRfcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9hbmRfcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICBkMy5qc29uKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnZGF0YS9wcm9qZWN0czIwMTQwNDA4Lmpzb24nLCBmdW5jdGlvbiAod29yaykge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd29yaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cod29yayk7XG5cbiAgICAgICAgICAgIHZhciBjb3Zlcl9vcHRpb25zID0gWycyMDInLCAnNDA0J107XG4gICAgICAgICAgICB2YXIgY292ZXJfZGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICAgICAnY292ZXIxMTUnOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTUsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogOTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb3ZlcjIwMic6IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNThcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb3ZlcjIzMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIzMCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxODBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb3ZlcjQwNCc6IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwNCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzMTZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcbiAgICAgICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBtb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcbiAgICAgICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3Zlcl9vcHRpb24gPVxuICAgICAgICAgICAgICAgICAgICBjb3Zlcl9vcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Zlcl9vcHRpb25zLmxlbmd0aCldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGNvdmVyX2RpbWVuc2lvbnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3ZlcicrcmFuZG9tX2NvdmVyX29wdGlvbl0ud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogY292ZXJfZGltZW5zaW9uc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdmVyJytyYW5kb21fY292ZXJfb3B0aW9uXS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHNyYzogZC5jb3ZlcnNbcmFuZG9tX2NvdmVyX29wdGlvbl0sXG4gICAgICAgICAgICAgICAgICAgIGNsc3M6ICdjb3ZlcicrcmFuZG9tX2NvdmVyX29wdGlvblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtcy5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmlzZF9wcm9ncmFtcy5wdXNoKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKS5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICB3b3JrID0gd29ya19jb250YWluZXJfc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pICsgJyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIuY2xzcztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6IDIwMixcbiAgICAgICAgICAgICAgICAgICAgZ3V0dGVyOiAyMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuaXNvID0gaXNvO1xuXG4gICAgICAgIGZpbHRlcl9zZWxlY3Rpb24gPSBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvblxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnZmlsdGVyJylcbiAgICAgICAgICAgIC5kYXRhKHJpc2RfcHJvZ3JhbXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZmlsdGVyJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2dyYW0gPSBkO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmFtID09PSAnQWxsJykgcHJvZ3JhbSA9ICcnO1xuICAgICAgICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QoaXRlbUVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChmb3JtYXRfcHJvZ3JhbShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07Il19
