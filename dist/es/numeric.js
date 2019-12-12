var Numeric = /** @class */ (function () {
    function Numeric() {
    }
    /**
     * adaptive Simpson
     */
    Numeric.adaptiveSimpson = function (func, a, b, eps, depth) {
        var h = b - a;
        var fa = func(a);
        var fb = func(b);
        var fc = func((a + b) / 2);
        var s = (h / 6) * (fa + 4 * fc + fb);
        return this._adaptive(func, a, b, eps, s, fa, fb, fc, depth);
    };
    /**
     * root finding: bisection
     */
    Numeric.bisection = function (func, a, b, eps) {
        eps = typeof eps !== 'undefined' ? eps : 1e-9;
        while (Math.abs(a - b) > eps) {
            if (func(a) * func((a + b) / 2) < 0) {
                b = (a + b) / 2;
            }
            else {
                a = (a + b) / 2;
            }
        }
        return (a + b) / 2;
    };
    /**
     * root finding: secant
     */
    Numeric.secant = function (func, a, b, eps) {
        eps = typeof eps !== 'undefined' ? eps : 1e-9;
        var q = [a, b];
        while (Math.abs(q[0] - q[1]) > eps) {
            q.push((q[0] * func(q[1]) - q[1] * func(q[0])) / (func(q[1]) - func(q[0])));
            q.shift();
        }
        return (q[0] + q[1]) / 2;
    };
    Numeric._adaptive = function (func, a, b, eps, s, fa, fb, fc, depth) {
        var c = (a + b) / 2;
        var h = b - a;
        var d = (a + c) / 2;
        var e = (c + b) / 2;
        var fd = func(d);
        var fe = func(e);
        var left = (h / 12) * (fa + 4 * fd + fc);
        var right = (h / 12) * (fc + 4 * fe + fb);
        var s2 = left + right;
        if (depth <= 0 || Math.abs(s2 - s) <= 15 * eps) {
            return s2 + (s2 - s) / 15;
        }
        else {
            return this._adaptive(func, a, c, eps / 2, left, fa, fc, fd, depth - 1)
                + this._adaptive(func, c, b, eps / 2, right, fc, fb, fe, depth - 1);
        }
    };
    return Numeric;
}());
export { Numeric };
