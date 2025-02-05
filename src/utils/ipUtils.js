function ipToLong(ip) {
    return ip.split('.')
        .reduce((total, part) => total * 256 + parseInt(part), 0);
}

function longToIP(long) {
    return [
        (long >>> 24) & 255,
        (long >>> 16) & 255,
        (long >>> 8) & 255,
        long & 255
    ].join('.');
}

function generateIPRange(start, end) {
    const startIP = ipToLong(start);
    const endIP = ipToLong(end);
    const ips = [];

    for (let i = startIP; i <= endIP; i++) {
        ips.push(longToIP(i));
    }

    return ips;
}

module.exports = {
    ipToLong,
    longToIP,
    generateIPRange
};