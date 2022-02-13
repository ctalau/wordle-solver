
function sum(array) {
    return [...array].reduce((a, b) => a + b, 0);
}

export default class PlayHistogram {

    constructor() {
        this.histogram = new Map();
    }

    add(duration) {
        var newCount = (this.histogram.get(duration) || 0) + 1;
        this.histogram.set(duration, newCount);
    }

    getMax() {
        return Math.max(...this.histogram.keys());
    }

    getSum() {
        return sum(this.entries_().map(([duration, count]) => duration * count));
    }


    entries_() {
        return [...this.histogram.entries()];
    }

    getAvg() {
        return this.getSum() / sum(this.histogram.values());
    }

    getFails() {
        var failureBuckets = this.entries_().filter(([duration]) => duration > 6);
        return sum(failureBuckets.map(([_, count]) => count));
    }

    toObject() {
        return this.entries_().reduce((obj, [duration, count]) => Object.assign(obj, {[duration]: count}), {});
    }

    toString() {
        return `Avg: ${this.getAvg()},\t fails: ${this.getFails()},\t max: ${this.getMax()}`;
    }
}