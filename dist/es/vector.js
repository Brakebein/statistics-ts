var Vector = /** @class */ (function () {
    function Vector(elements) {
        this.elements = elements;
    }
    Vector.prototype.push = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.elements).push.apply(_a, values);
    };
    Vector.prototype.map = function (callback) {
        return new Vector(this.elements.map(callback));
    };
    Vector.prototype.length = function () {
        return this.elements.length;
    };
    Vector.prototype.concat = function () {
        var _a;
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return new Vector((_a = this.elements).concat.apply(_a, vectors.map(function (v) { return v.elements; })));
    };
    Vector.prototype.abs = function () {
        return new Vector(this.elements.map(function (value) { return Math.abs(value); }));
    };
    Vector.prototype.dot = function (v) {
        if (this.length() !== v.length()) {
            throw new Error('Unequal vector lengths!');
        }
        return this.elements.reduce(function (result, currentValue, index) { return result + currentValue * v.elements[index]; }, 0);
    };
    Vector.prototype.sum = function () {
        return this.elements.reduce(function (sum, currentValue) { return sum + currentValue; }, 0);
    };
    Vector.prototype.log = function () {
        return new Vector(this.elements.map(function (value) { return Math.log(value); }));
    };
    Vector.prototype.add = function (v) {
        if (v instanceof Vector) {
            if (this.length() !== v.length()) {
                throw new Error('Unequal vector lengths!');
            }
            return new Vector(this.elements.map(function (value, index) { return value + v.elements[index]; }));
        }
        else {
            return new Vector(this.elements.map(function (value) { return value + v; }));
        }
    };
    Vector.prototype.subtract = function (v) {
        if (v instanceof Vector) {
            return this.add(v.multiply(-1));
        }
        else {
            return this.add(v * -1);
        }
    };
    Vector.prototype.multiply = function (v) {
        if (v instanceof Vector) {
            if (this.length() !== v.length()) {
                throw new Error('Unequal vector lengths!');
            }
            return new Vector(this.elements.map(function (value, index) { return value * v.elements[index]; }));
        }
        else {
            return new Vector(this.elements.map(function (value) { return value * v; }));
        }
    };
    Vector.prototype.pow = function (v) {
        if (v instanceof Vector) {
            if (this.length() !== v.length()) {
                throw new Error('Unequal vector lengths!');
            }
            return new Vector(this.elements.map(function (value, index) { return Math.pow(value, v.elements[index]); }));
        }
        else {
            return new Vector(this.elements.map(function (value) { return Math.pow(value, v); }));
        }
    };
    Vector.prototype.mean = function () {
        return this.elements.reduce(function (sum, currentValue, index, array) { return sum + currentValue / array.length; }, 0);
    };
    Vector.prototype.median = function () {
        var sorted = this.sortElements();
        var middle = Math.floor(sorted.length / 2);
        if (sorted.length % 2) {
            return sorted[middle];
        }
        else {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
    };
    Vector.prototype.q1 = function () {
        var sorted = this.sort();
        var middle = Math.floor(sorted.length() / 2);
        var e = sorted.slice(0, middle);
        return e.median();
    };
    Vector.prototype.q3 = function () {
        var sorted = this.sort();
        var middle = Math.ceil(sorted.length() / 2);
        var e = sorted.slice(middle);
        return e.median();
    };
    Vector.prototype.geomean = function () {
        return Math.exp(this.log().sum() / this.elements.length);
    };
    Vector.prototype.slice = function (start, end) {
        if (typeof end === 'undefined') {
            return new Vector(this.elements.slice(start));
        }
        else {
            return new Vector(this.elements.slice(start, end));
        }
    };
    Vector.prototype.sortElements = function () {
        return [].concat(this.elements).sort(function (a, b) { return a - b; });
    };
    Vector.prototype._ecdf = function (x) {
        var sorted = this.sortElements();
        var count = 0;
        while (count < sorted.length && sorted[count] <= x) {
            count++;
        }
        return count / sorted.length;
    };
    Vector.prototype.ecdf = function (v) {
        var _this = this;
        if (v instanceof Vector) {
            return new Vector(v.elements.map(function (value) { return _this._ecdf(value); }));
        }
        else {
            return this._ecdf(v);
        }
    };
    Vector.prototype.sort = function () {
        return new Vector(this.sortElements());
    };
    Vector.prototype.min = function () {
        return this.sortElements().shift();
    };
    Vector.prototype.max = function () {
        return this.sortElements().pop();
    };
    /**
     * unbiased sample variance
     */
    Vector.prototype.variance = function () {
        return this.ss() / (this.elements.length - 1);
    };
    /**
     * biased sample variance
     */
    Vector.prototype.biasedVariance = function () {
        return this.ss() / this.elements.length;
    };
    /**
     * corrected sample standard deviation
     */
    Vector.prototype.sd = function () {
        return Math.sqrt(this.variance());
    };
    /**
     * uncorrected sample standard deviation
     */
    Vector.prototype.uncorrectedSd = function () {
        return Math.sqrt(this.biasedVariance());
    };
    /**
     * standard error of the mean
     */
    Vector.prototype.sem = function () {
        return this.sd() / Math.sqrt(this.elements.length);
    };
    /**
     * total sum of squares
     */
    Vector.prototype.ss = function () {
        var m = this.mean();
        return this.elements.reduce(function (sum, currentValue) { return sum + Math.pow(currentValue - m, 2); }, 0);
    };
    /**
     * residuals
     */
    Vector.prototype.res = function () {
        return this.add(-this.mean());
    };
    Vector.prototype.kurtosis = function () {
        return this.res().pow(4).mean() / Math.pow(this.res().pow(2).mean(), 2);
    };
    Vector.prototype.skewness = function () {
        return this.res().pow(3).mean() / Math.pow(this.res().pow(2).mean(), 3 / 2);
    };
    Vector.prototype.toString = function () {
        return "[" + this.elements.join(', ') + "]";
    };
    return Vector;
}());
export { Vector };
