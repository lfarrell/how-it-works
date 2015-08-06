var width = document.body.clientWidth(),
    height = document.body.clientHeight();

var section = d3.selectAll("section"),
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

var stack = stack()
    .on("activate", activate)
    .on("deactivate", deactivate);

/**
 * Earthquake waves
 *
 */
var quake_waves = d3.select('#waves svg g');

var startWave = function() {

};

var stopWave = function() {

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
    cy: 80,
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

var startEnergy = function () {
    for(var i=0; i<3; i++) {
        energy_svg.append('circle')
            .attr(energy_attributes)
            .attr('id', 'energy_' + i);
    }

    // 5.5 quake
    d3.select('#energy_1, #energy_2').transition()
        .delay(6000)
        .duration(1000)
        .attr({
            'r': quake_energy_released(5.5, 5.0),
            "transform": "translate(" + width/6 + "," + height/6 + ")"
        });

    // 6.0 quake
    d3.select('#_energy_2').transition()
        .delay(10000)
        .duration(1000)
        .attr({
            'r': quake_energy_released(6.0, 5.0),
            "transform": "translate(" + width/4 + "," + height/4 + ")"
        });
};

var stopEnergy = function() {
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
            r: radius,
            stroke: 1
        })
        .attr('id', function(d) { return 'tsunami_circle_' + d; })
        .style('stroke-color', 'firebrick');

    var circle_zero = d3.select('#tsunami_circle_zero');
    circle_zero.style('fill', 'none');
    d3.select('#tsunami_circle_one').style('fill', 'redbrick');

    tsunamiInterval = setInterval(function() {
        if(timer < 16) {
            circle_zero.attr('r',  radius + timer);
            d3.select('#clock').text(timer + ':00');
        }
        timer++;
    }, 1000);
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
    if (i === typeIndex) stopType();
    if (i === energyIndex) stopEnergy();
    if (i === tsunamiIndex) stopTsunami();
}
