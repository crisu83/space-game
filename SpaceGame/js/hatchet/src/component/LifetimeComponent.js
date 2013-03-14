define([
    'hatchet/core/Component'
], function (Component) {
    // Lifetime component class.
    var LifetimeComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Object">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.LOGIC;
        }, {
            name: 'lifetime',
            duration: 0, // in ms
            lastTime: 0,
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                if (this.duration > 0) {
                    var now = new Date().getTime();
                    if (this.lastTime === 0) {
                        this.lastTime = now;
                    }
                    this.duration -= now - this.lastTime;
                    if (this.duration <= 0) {
                        this.fire('entity:destroy');
                    }
                    this.lastTime = now;
                }
            }
        }
    );

    return LifetimeComponent;
});