define([
    'hatchet/core/Component'
], function (Component) {
    // Cooldown component class.
    var CooldownComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Object">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.LOGIC;
        }, {
            name: 'cooldown',
            duration: 1000, // in ms
            downTime: 0,
            lastTime: 0,
            reset: function () {
                /// <summary>Resets the cooldown.</summary>
                this.downTime = this.duration;
            },
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                if (this.downTime > 0) {
                    var now = new Date().getTime();
                    if (this.lastTime === 0) {
                        this.lastTime = now;
                    }
                    this.downTime -= now - this.lastTime;
                    if (this.downTime <= 0) {
                        this.downTime = 0;
                    }
                    this.lastTime = now;
                }
            }
        }
    );

    return CooldownComponent;
});