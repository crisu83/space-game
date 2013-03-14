define([
    'hatchet/core/Component',
    'hatchet/util/Rect'
], function (Component, Rect) {
    // Projectile component class.
    var ProjectileComponent = WinJS.Class.mix(
        WinJS.Class.derive(
            Component,
            function (game) {
                Component.call(this, game); // call super constructor
                this.state = Component.states.LOGIC;
                this.dependencies = ['spatial'];
            }, {
                name: 'projectile',
                update: function () {
                    /// <summary>Updates the component.</summary>
                    Component.prototype.update.apply(this);

                    if (this._d.spatial.x <= this.x
                        || this._d.spatial.y <= this.y
                        || this._d.spatial.x2() >= this.x2()
                        || this._d.spatial.y2() >= this.y2()) {
                        this.fire('entity:destroy');
                    }
                }
            }
        ),
        Rect // Add rectangle mixin
    );

    return ProjectileComponent;
});