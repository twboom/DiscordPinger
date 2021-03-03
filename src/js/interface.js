pinger.interface = [];

pinger.interface.update = function(evt) {
    const slider = evt.target;
    console.log('[ Pinger ] Updating ' + slider.id + ' to ' + slider.value);
    if (slider.id === 'tickspeed') { pinger.update.tickspeed(slider.value * 1000); return };
    if (slider.id === 'popularity') { pinger.config.popularity = slider.value; return };
    pinger.config.chances[slider.id] = slider.value;
}

pinger.interface.init = function() {
    function tickspeed() {
        const display = document.querySelector('span.tickspeed.display');
        const slider = document.querySelector('input#tickspeed')
        display.innerHTML = pinger.config.tickspeed / 1000;
        slider.value = pinger.config.tickspeed / 1000;
    }
    function popularity() {
        const display = document.querySelector('span.popularity.display');
        const slider = document.querySelector('input#popularity')
        display.innerHTML = pinger.config.popularity;
        slider.value = pinger.config.popularity;
    }
    tickspeed();
    popularity();
}

document.querySelector('button#start').addEventListener('click', function(evt) {
    console.log('hi')
    console.log(evt.target.innerHTML)
    if (pinger.active === false) { evt.target.innerHTML = 'Stop'; pinger.toggle(); return };
    if (pinger.active === true) { evt.target.innerHTML = 'Start'; pinger.toggle(); return };
})

document.querySelector('button#openAdvanced').addEventListener('click', function() {
    document.querySelector('div#modal').style.display = 'block'
})

document.querySelector('button#closeAdvanced').addEventListener('click', function() {
    document.querySelector('div#modal').style.display = 'none'
})

document.querySelectorAll('input').forEach(item => {
    item.addEventListener('mouseup', pinger.interface.update)
})

pinger.interface.init()