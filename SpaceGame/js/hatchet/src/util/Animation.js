define([
    
], function () {
    // Animation class.
    var Animation = WinJS.Class.define(
        function() {
            /// <summary>Creates a new animation.</summary>
            this.frames = [];
        }, {
            loop: true,
            frameIndex: 0,
            frames: null,
            currTime: 0,
            lastTime: 0,
            playTime: 0,
            addFrame: function (x, y, duration) {
                /// <summary>Adds a frame to the animation.</summary>
                /// <param name="x" type="Number">Position on the x-axis of the frame.</param>
                /// <param name="y" type="Number">Position on the y-axis of the frame.</param>
                /// <param name="duration" type="Number">The duration of the frame.</param>
                /// <returns type="Animation">The current scope.</returns>
                this.playTime += duration;
                this.frames.push({ x: x, y: y, endTime: this.playTime });
                return this;
            },
            getCurrentFrame: function () {
                /// <summary>Returns the frame that is currently playing.</summary>
                /// <returns type="Object">The frame.</returns>
                return this.frames[this.frameIndex];
            },
            reset: function () {
                /// <summary>Resets the animation.</summary>
                this.frameIndex = 0;
                this.currTime = 0;
                this.lastTime = 0;
            },
            update: function () {
                /// <summary>Updates the animation.</summary>
                var now = new Date().getTime();

                if (this.lastTime === 0) {
                    this.lastTime = now;
                }

                this.currTime = now - this.lastTime;

                var numFrames = this.frames.length;
                if (numFrames > 1) {
                    var frame = this.getCurrentFrame();
                    if (frame && (this.currTime >= frame.endTime)) {
                        var lastFrameIndex = numFrames - 1;
                        if (this.frameIndex < lastFrameIndex) {
                            this.frameIndex++;
                        } else if (this.loop) {
                            this.reset();
                        }
                    }
                }
            }
        }
    );

    return Animation;
});