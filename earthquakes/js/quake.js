var width = window.innerWidth,
    height = window.innerHeight;

var stack = stack()
    .on("activate", activate)
    .on("deactivate", deactivate);

var section = d3.selectAll("section"),
    intro = d3.select("#intor"),
    wave = d3.select("#waves"),
    type = d3.select("#types"),
    energy = d3.select("#energy"),
    tsunami = d3.select("#tsunamis"),
    waveIndex = section[0].indexOf(wave.node()),
    typeIndex = section[0].indexOf(type.node()),
    energyIndex = section[0].indexOf(energy.node()),
    tsunamiIndex = section[0].indexOf(tsunami.node()),
    waveInterval,
    typeInterval,
    energyInterval,
    tsunamiInterval;

d3.selectAll('svg').attr('width', width).attr('height', 500);

/**
 * Earthquake waves
 *
 */
var quake_waves = d3.select('#waves svg g');
var wave = d3.select('#wave');
var offset = Math.round(width * .16);
var path_one = "M 10 25 L " + (width - offset) + " 25";
var path_two = "M 10 125 L " + (width - offset) + " 125";
var distancePerPoint = 1;
var drawFPS = 60;
var orig = document.querySelector('path'), length, timer;

d3.select('#slow_wave path').attr('d', path_one);
d3.select('#fast_wave path').attr('d', path_two);

/**
 * Per http://stackoverflow.com/questions/14275249/how-can-i-animate-a-progressive-drawing-of-svg-path?lq=1
 */
function increaseLength(){
    var pathLength = orig.getTotalLength();
    length += distancePerPoint;
    orig.style.strokeDasharray = [length,pathLength].join(' ');
    if (length >= pathLength) clearInterval(timer);
}

var startWave = function() {
    length = 0;
    orig.style.stroke = 'firebrick';
    timer = setInterval(increaseLength,1000/drawFPS);
};

var stopWave = function() {
    clearInterval(timer);
    orig.style.stroke = '';
    orig.style.strokeDasharray = '';
};
/**
 * Earthquake types
 *
 */
var quake_types = d3.select('#types svg g');

var startType = function() {

};

var stopType = function() {

};

/**
 * Earthquake energy
 */
var energy_attributes = {
    r: 5,
    cx: 20,
    cy: 100,
    transform: "translate(" + width/8 + "," + height/8 + ")"
};

/**
 * Calculations from http://earthquake.usgs.gov/learn/topics/how_much_bigger.php
 * @param larger_quake
 * @param smaller_quake
 * @returns {number}
 */
var quake_energy_released = function(larger_quake, smaller_quake) {
    return Math.round(Math.pow(10, 1.5 * (larger_quake - smaller_quake)));
};

var energy_svg = d3.select("#energy svg g");
var five_five_text = d3.select('#text_55');
var six_text = d3.select('#text_6');

var startEnergy = function () {
    for(var i=0; i<3; i++) {
        energy_svg.append('circle')
            .attr(energy_attributes)
            .attr('id', 'energy_' + i);
    }

    // 5.5 quake
    five_five_text.classed('hide', false);

    d3.select('#energy_1, #energy_2').transition()
        .delay(1000)
        .duration(1000)
        .attr({
            'r': quake_energy_released(5.5, 5.0) * 5,
            'cx': 40,
            'cy': 75,
            "transform": "translate(" + width/6 + "," + height/6 + ")"
        });

    // 6.0 quake
    six_text.classed('hide', false);

    d3.select('#energy_2').transition()
        .delay(3000)
        .duration(1000)
        .attr({
            'r': quake_energy_released(6.0, 5.0) * 5,
            'cx': 240,
            'cy': 0,
            "transform": "translate(" + width/5 + "," + height/3.5 + ")"
        });
};

var stopEnergy = function() {
    five_five_text.classed('hide', true);
    six_text.classed('hide', true);
    energy_svg.stop();
};

/**
* Tsunamis
 */
var tsunami_svg = d3.select('#tsunamis svg g');

var startTsunami = function() {
    var timer = 1;
    var radius = 5;

    tsunami_svg.selectAll('circle').data([0,1])
        .enter()
        .append('circle')
        .attr({
            cx: 80,
            cy: 80,
            r: radius
        })
        .attr('id', function(d) { return 'tsunami_circle_' + d; })
        .style('stroke-color', 'firebrick');

    var circle_zero = d3.select('#tsunami_circle_0');
    circle_zero.style({
        'fill': 'none',
        'stroke': 'red',
        'stroke-width': 1.5
    });

    d3.select('#tsunami_circle_1').style('fill', 'redbrick');

    tsunamiInterval = setInterval(function() {
        if(timer < 16) {
            var current_radius = circle_zero.attr('r');
            circle_zero.attr('r',  +current_radius + 5);
            d3.select('#clock').text(timer);
        }
        timer++;
    }, 200);
};

var stopTsunami = function() {
    clearInterval(tsunamiInterval);
};


/**
 * Start & Stop visualizations
 */
function activate(d, i) {
    if (i === waveIndex) startWave();
    if (i === typeIndex) startType();
    if (i === energyIndex) startEnergy();
    if (i === tsunamiIndex) startTsunami();
}

function deactivate(d, i) {
    if (i === waveIndex) stopWave();
    /*  if (i === typeIndex) stopType();
    if (i === energyIndex) stopEnergy();*/
    if (i === tsunamiIndex) stopTsunami();
}
