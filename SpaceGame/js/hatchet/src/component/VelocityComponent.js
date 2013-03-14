define([
    'hatchet/core/Component',
    'hatchet/util/Vect'
], function (Component, Vect) {
    // Velocity component class.
    var VelocityComponent = WinJS.Class.mix(
        WinJS.Class.derive(
            Component,
            function (game) {
                /// <summary>Creates a new component.</summary>
                /// <param name="game" type="Game">The game that this component belongs to.</param>
                Component.call(this, game); // call super constructor
                this.state = Component.states.INIT;
                this.dependencies = ['spatial'];
            }, {
                name: 'velocity',
                update: function () {
                    /// <summary>Updates the component.</summary>
                    Component.prototype.update.apply(this);

                    this._d.spatial.x += this.x;
                    this._d.spatial.y += this.y;
                }
            }
        ),
        Vect // Add vector mixin
    );

    return VelocityComponent;
});