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