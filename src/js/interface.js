pinger.interface = [];

pinger.interface.config = {
    'root': ['tickspeed', 'popularity'],
    'chances': ['notification', 'call', 'join', 'leave', 'mute'],
    'webhook': ['probability', 'url', 'message'],
    'call': ['callProbability']
}

pinger.utility.getTarget = function(label) {
    let target;
    for (const [key, value] of Object.entries(pinger.interface.config)) {
        if (value.includes(label) === false) { continue }
        switch (key) {
            case 'root':
                target = pinger.config
                break;

            case 'chances':
                target = pinger.config.chances
                break;

            case 'webhook':
                target = pinger.webhook.config
                break;
            
            case 'call':
                target = pinger.config
        }
    }
    return target
}

pinger.interface.update = function(evt) {
    const slider = evt.target;
    const display = document.querySelector('span.' + slider.id + '.display');
    const target = pinger.utility.getTarget(slider.id);
    if (slider.id === 'tickspeed') { pinger.update.tickspeed(slider.value) };
    target[slider.id] = slider.value;
    console.log('[ Pinger ] Updating ' + slider.id + ' to ' + slider.value)
    if (display === null) { return };
    display.innerHTML = slider.value;
}

pinger.interface.init = function() {
    document.querySelectorAll('span.display').forEach(item => {
        const label = item.classList[0];
        const display = document.querySelector('span.' + label);
        const slider = document.querySelector('input#' + label);
        const target = pinger.utility.getTarget(label)
        const value = target[label]
        display.innerHTML = value;
        slider.value = value;
    })
}

document.querySelector('button#start').addEventListener('click', function(evt) {
    if (pinger.active === false) { evt.target.innerHTML = 'Stop'; pinger.toggle(); return };
    if (pinger.active === true) { evt.target.innerHTML = 'Start'; pinger.toggle(); return };
})

document.querySelectorAll('.modalButton').forEach(item => {
    item.addEventListener('click', function(evt) {
        let action = 'block'
        if (evt.target.classList[1] === 'close') { action = 'none' }
        const modal = evt.target.classList[2];
        document.querySelector('div#' + modal + 'Modal').style.display = action
    })
})


document.querySelectorAll('input').forEach(item => {
    item.addEventListener('mouseup', pinger.interface.update)
    item.addEventListener('touchend', pinger.interface.update)
})

document.querySelectorAll('input[type=text]').forEach(item => {
    item.addEventListener('keydown', function(evt) {
        
    })
})

pinger.interface.init()