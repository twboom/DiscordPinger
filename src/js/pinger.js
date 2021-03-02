let pinger = []
// Config
pinger.config = {
    'tickspeed': 1000,
    'popularity': 1,
    'chances': {
        'notification': 20,
        'mute': 20,
        'join': 20,
        'leave': 20,
        'call': 20,
    },
    'eastereggs': {
        'call-remix': 0.1
    },
    'callOnly': ['mute', 'leave']
}
pinger.active = false;
pinger.inCall = false;

// Sounds and the paths
pinger.sounds = {
    'notification': 'assets/notification.mp3',
    'mute': 'assets/mute.mp3',
    'join': 'assets/join.mp3',
    'leave': 'assets/leave.mp3',
    'call': 'assets/call.mp3',
    'call-remix': 'assets/call-remix.mp3',
}

pinger.play = function() {
    function playSound(option) {
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
    pinger.clock = setInterval(pinger.play, pinger.config.tickspeed)
    console.log('[ Pinger ] Started with tickspeed of ' + pinger.config.tickspeed + ' ms')
}

pinger.stop = function() {
    if (pinger.active === false) { console.log('[ Pinger ] Already inactive'); return }
    clearInterval(pinger.clock)
    console.log('[ Pinger ] Stopped')
}