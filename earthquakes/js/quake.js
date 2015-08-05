var stack = stack()
    .on("activate", activate)
    .on("deactivate", deactivate);

var quake_energy = function(larger_quake, smaller_quake) {
    return Math.round(Math.pow(10, 1.5 * (larger_quake - smaller_quake)));
};

console.log(quake_energy(8.7, 5.8))

function activate(d, i) {
    if (i === followIndex) mystack.on("scroll.follow", refollow);
    if (i === lorenzIndex) startLorenz();
}

function deactivate(d, i) {
    if (i === followIndex) mystack.on("scroll.follow", null);
    if (i === lorenzIndex) stopLorenz();
}