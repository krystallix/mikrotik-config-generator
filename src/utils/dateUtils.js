function getDateFormatted() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

function getCurrentUTCDateTime() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').split('.')[0];
}

module.exports = {
    getDateFormatted,
    getCurrentUTCDateTime
};