define([

], function () {
    // Rectangle class.
    var Rect = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        x2: function () {
            /// <summary>Returns the x-coordinate for the right side of the rectangle.</summary>
            /// <returns type="Number">The coordinate.</returns>
            return this.x + this.w;
        },
        y2: function () {
            /// <summary>Returns the y-coordinate for the bottom of the rectangle.</summary>
            /// <returns type="Number">The coordinate.</returns>
            return this.y + this.h;
        }
    }

    return Rect;
});