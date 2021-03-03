pinger.interface = [];

pinger.interface.config = {
    'tickspeed': 10
}

pinger.interface.tickspeed = function() {
    const display = document.querySelector('span.tickspeed.display');
    const slider = document.querySelector('input#tickspeed')
    display.innerHTML = slider.value
    if (slider.value === pinger.config.tickspeed) { return };
    pinger.config.tickspeed = slider.value * 1000;
    pinger.update.tickspeed();
}

pinger.interface.popularity = function() {
    const display = document.querySelector('span.popularity.display');
    const slider = document.querySelector('input#popularity')
    display.innerHTML = slider.value
    if (slider.value === pinger.config.popularity) { return };
    pinger.config.popularity = slider.value;
    console.log('[ Pinger ] Updated popularity to ' + slider.value)
}

document.querySelector('input#popularity').addEventListener('mouseup', pinger.interface.popularity)
document.querySelector('input#tickspeed').addEventListener('mouseup', pinger.interface.tickspeed)

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

pinger.interface.init()