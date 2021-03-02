let pinger = []
pinger.config = {
    'tickspeed': 1000,
}

pinger.play = function() {
    console.log('played')
}

pinger.start = function() {
    pinger.clock = setInterval(pinger.play(), pinger.config.tickspeed)
}

pinger.stop = function() {
    clearInterval(pinger.clock)
}