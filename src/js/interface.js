pinger.interface = [];

pinger.interface.update = function(evt) {
    const slider = evt.target;
    console.log('[ Pinger ] Updating ' + slider.id + ' to ' + slider.value);
    if (slider.id === 'tickspeed') { pinger.update.tickspeed(slider.value * 1000); return };
    if (slider.id === 'popularity') { pinger.config.popularity = slider.value; return };
    pinger.config.chances[slider.id] = slider.value;
}

pinger.interface.init = function() {
    document.querySelectorAll('span.display').forEach(item => {
        const label = item.classList[0]
        const display = document.querySelector('span.' + label)
        const slider = document.querySelector('input#' + label)
        let value;
        if (label === 'tickspeed' || label === 'popularity') { value = pinger.config[label] }
        else { value = pinger.config.chances[label] };
        if (label === 'tickspeed') { value /= 1000 }
        display.innerHTML = value;
        slider.value = value
    })
}

document.querySelector('button#start').addEventListener('click', function(evt) {
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