var stack = stack()
    .on("activate", activate)
    .on("deactivate", deactivate);

/**
 * Calculations from http://earthquake.usgs.gov/learn/topics/how_much_bigger.php
 * @param larger_quake
 * @param smaller_quake
 * @returns {number}
 */
var quake_energy_released = function(larger_quake, smaller_quake) {
    return Math.round(Math.pow(10, 1.5 * (larger_quake - smaller_quake)));
};

console.log(quake_energy_released(8.7, 5.8))

/**
 *
 * @param d
 * @param i
 */
function activate(d, i) {
    if (i === followIndex) mystack.on("scroll.follow", refollow);
    if (i === lorenzIndex) startLorenz();
}

function deactivate(d, i) {
    if (i === followIndex) mystack.on("scroll.follow", null);
    if (i === lorenzIndex) stopLorenz();
}