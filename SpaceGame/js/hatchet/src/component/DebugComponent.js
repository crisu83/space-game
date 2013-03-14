define([
    'hatchet/core/Component'
], function (Component) {
    // Debug component class.
    var DebugComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.RENDER;
            this.dependencies = ['spatial'];
            this.systems = ['render'];
        }, {
            name: 'debug',
            zIndex: 1,
            color: 'rgb(255, 0, 255)',
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);
          
                this._s.render.register(this.zIndex, function (context) {
                    context.strokeStyle = this.color;
                    context.strokeRect(this._d.spatial.x, this._d.spatial.y, this._d.spatial.w, this._d.spatial.h);
                }.bind(this));
            }
        }
    );

    return DebugComponent;
});