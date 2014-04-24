var Nav = require('./overlay_nav');

module.exports = function site () {
    var self = {},
        color_values = {
            purple: 'rgb(38, 34, 98);',
            orange: 'rgb(255, 61, 56);',
            'lt-purple': 'rgb(146, 53, 125)',
            green: 'rgb(144, 218, 73)',
            blue: 'rgb(43, 89, 184)'
        };

    var colors = Object.keys(color_values);

    var nav = Nav();

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

            nav.targetActivatePairs(pairs)
                .rotateBackground(
                        d3.selectAll('.rotating-background-image'))
                .setup();
        });
        return self;
    };

    return self;
};