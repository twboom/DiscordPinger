let pinger = []
// Config
pinger.config = {
    'tickspeed': 1000, // This is in milliseconds
    'popularity': 0.2,
    'chances': {
        'notification': 45,
        'mute': 20,
        'join': 20,
        'leave': 20,
        'call': 5,
    },
    'easteregg': {
        'call': 0.1
    },
    'callOnly': ['mute', 'leave', 'join'],
    'ringTimeout': 30000 // This is in milliseconds
}
pinger.active = false;
pinger.inCall = false;
pinger.latestRing = 0;

pinger.isRinging = function() {
    const time = Date.now() - pinger.latestRing;
    if (time < pinger.config.ringTimeout) { return true }
    else { return false }
};

// Sounds and the paths
pinger.sounds = {
    'notification': 'assets/notification.mp3',
    'mute': 'assets/mute.mp3',
    'join': 'assets/join.mp3',
    'leave': 'assets/leave.mp3',
    'call': 'assets/call.mp3',
    'call-easteregg': 'assets/call-easteregg.mp3',
}

pinger.play = function() {
    function playSound(option) {
        if (pinger.config.easteregg.hasOwnProperty(option)) {
            if ((Math.random() < pinger.config.easteregg[option]) ? true : false)
            option += '-easteregg'
        }
        if (option === 'call') { pinger.latestRing = Date.now() }
        const path = pinger.sounds[option]
        const audio = new Audio(path)
        audio.play()
        console.log('[ Pinger ] Played ' + option)
    }

    console.log('[ Pinger ] Tick')

    const stop = (Math.random() < pinger.config.popularity) ? false : true;
    if (stop) { return }

    let options = []
    for (const [key, value] of Object.entries(pinger.config.chances)) {
        if (key === 'call' && pinger.isRinging()) { continue }
        if (pinger.config.callOnly.includes(key) && pinger.inCall === false) { continue }
        for (let i = 0; i < value; i++) {
            options.push(key)
        }
    }
    const option = options[Math.floor(Math.random() * options.length)]
    playSound(option)
}

pinger.start = function() {
    if (pinger.active === true) { console.log('[ Pinger ] Already active'); return }
    pinger.active = true;
    pinger.clock = setInterval(pinger.play, pinger.config.tickspeed)
    console.log('[ Pinger ] Started with tickspeed of ' + pinger.config.tickspeed + ' ms')
}

pinger.stop = function() {
    if (pinger.active === false) { console.log('[ Pinger ] Already inactive'); return }
    clearInterval(pinger.clock)
    console.log('[ Pinger ] Stopped')
    pinger.active = false;
}

pinger.toggle = function() {
    if (pinger.active === false) { pinger.start(); return };
    if (pinger.active === true) { pinger.stop(); return };
}

pinger.update = [];
pinger.update.tickspeed = function() {
    console.log('[ Pinger ] Updated tickspeed to ' + pinger.config.tickspeed / 1000 + ' seconds')
    if(pinger.active === false) { return };
    clearInterval(pinger.clock);
    pinger.clock = setInterval(pinger.play, pinger.config.tickspeed)
}