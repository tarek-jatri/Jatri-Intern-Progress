class Point2d {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    set x(x) {
        this._x = x;
    }
    set y(y) {
        this._y = y;
    }

    getCordinate() {
        return this._x + " " + this._y;
    }
}

class Point3d extends Point2d {
    constructor(x, y, z) {
        super(x, y);
        this._z = z;
    }
    get z() {
        return this._z;
    }
    set z(z) {
        this._z = z;
    }
    getCordinate() {
        return this._x + " " + this._y + " " + this._z;
    }
}


const a = new Point3d(5, 6, 7);
console.log(a.getCordinate());
const b = new Point2d(6, 7);
console.log(b.getCordinate());
