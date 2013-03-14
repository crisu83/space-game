define([
    'hatchet/core/Component'
], function (Component) {
    // Render component class.
    var RenderComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.RENDER;
            this.dependencies = ['spatial', 'sprite'];
            this.systems = ['render'];
        }, {
            name: 'render',
            zIndex: 0,
            visible: true,
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                if (this.visible) {
                    this._s.render.register(this.zIndex, function (context) {
                        context.drawImage(
                            this._d.sprite.image,
                            this._d.sprite.x, this._d.sprite.y, // image x, y
                            this._d.spatial.w, this._d.spatial.h, // image w, h
                            this._d.spatial.x, this._d.spatial.y, // canvas x, y
                            this._d.spatial.w, this._d.spatial.h // canvas w, h
                        );
                    }.bind(this));
                }
            }
        }
    );

    return RenderComponent;
});