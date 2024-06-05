// Return plural version if number is not 1 or -1
function switchPlural(number, singular, plural) {
    return Math.abs(number)===1 ? singular : plural
}

// Get the difference between two dates
function datediff(start, end) {
    // get the difference between the two dates in seconds (I'm not crazy)
    let remaining = Math.ceil((end - start) / 1000)

    // boring stuff
    const years = Math.floor(remaining / 31_536_000)
    remaining = remaining % 31_536_000
    const months = Math.floor(remaining / 2_628_002.88)
    remaining = remaining % 2_628_002.88
    const weeks = Math.floor(remaining / 604_800)
    remaining = remaining % 604_800
    const days = Math.floor(remaining / 86_400)
    remaining = remaining % 86_400
    const hours = Math.floor(remaining / 3_600)
    remaining = remaining % 3_600
    const minutes = Math.floor(remaining / 60)
    remaining = remaining % 60
    const seconds = Math.floor(remaining)

    // table it and return
    return {
        years: years, months: months, weeks: weeks, days: days,
        hours: hours, minutes: minutes, seconds: seconds
    }
}

// Returns a whatever-separated list of strings. If a string is null or empty, it will be skipped
// @param elements     An array of strings
// @param sep          The list separator string
// @param final        String to put before the final element
function single_line_list(elements, sep, final) {
    let result = ''

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if ((element !== null) && (element !== '')) {
            const next = elements[i+1]
            result += (next===undefined || !next) ? (final + element) : (i===0 ? element : (sep + element))
        }
    }

    return result
}

// Update all relationship duration counters with human-readable date difference
function update_relationship_counters() {
    // set the dates
    const startDate = new Date(2023, 1, 1, 15, 30)
    const currentDate = new Date();

    // calculate the difference
    const difference = datediff(startDate, currentDate)
    // make it readable
    const newValue = single_line_list([
        (difference.years > 0 ? `${difference.years} ${switchPlural(difference.years, 'anno', 'anni')}` : ''),
        (difference.months > 0 ? `${difference.months} ${switchPlural(difference.months, 'mese', 'mesi')}` : ''),
        (difference.weeks > 0 ? `${difference.weeks} ${switchPlural(difference.weeks, 'settimana', 'settimane')}` : ''),
        (difference.days > 0 ? `${difference.days} ${switchPlural(difference.days, 'giorno', 'giorni')}` : ''),
        (difference.hours > 0 ? `${difference.hours} ${switchPlural(difference.hours, 'ora', 'ore')}` : ''),
        (difference.minutes > 0 ? `${difference.minutes} ${switchPlural(difference.minutes, 'minuto', 'minuti')}` : ''),
        (difference.seconds > 0 ? `${difference.seconds} ${switchPlural(difference.seconds, 'secondo', 'secondi')}` : '')
    ], ', ', ' e ')

    // for each updatable element, change its value
    const updateTargets = document.getElementsByClassName('relationship-duration-update')
    for (const updateTarget of updateTargets) {
        updateTarget.innerHTML = newValue
    }
}

// Run it the first time
update_relationship_counters()
// Then schedule it on an interval
setInterval(update_relationship_counters, 1000)

// Remove the scroll arrow and gradient when the user scrolls
document.addEventListener('scroll', () => {
    document.getElementById('scroll-arrow').style.opacity = '0'
    document.getElementById('overlay').style.opacity = '0'
})