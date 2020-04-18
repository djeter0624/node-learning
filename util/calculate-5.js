// calculate the difference between dates
function calculateDaysDiff(timestamp)
    {
        let createOn = new Date(timestamp).getTime(); // Mongo Createon for item.
        let currentTime = new Date().getTime()
        let diff = (currentTime - createOn) / 1000 / 3600 / 24
        return Math.floor(diff);
    }

// export module
module.exports = {
    calculateDaysDiff
}