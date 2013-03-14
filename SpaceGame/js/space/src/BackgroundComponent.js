define([
    'hatchet/core/Component'
], function (Component) {
    // Background component class.
    var BackgroundComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Object">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.LOGIC;
            this.dependencies = ['velocity'];
        }, {
            name: 'background',
            scrollSpeed: 0,
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                var player = this.game.entities.find('player');

                if (player && this.scrollSpeed > 0) {
                    var ps = player.getComponent('spatial'),
                        pv = player.getComponent('velocity');

                    if (pv.x < 0 && ps.x > 0) {
                        this._d.velocity.x = this.scrollSpeed;
                    } else if (pv.x > 0 && ps.x2() < this.game.width()) {
                        this._d.velocity.x = -this.scrollSpeed;
                    } else {
                        this._d.velocity.x = 0;
                    }

                    if (pv.y < 0 && ps.y > 0) {
                        this._d.velocity.y = this.scrollSpeed;
                    } else if (pv.y > 0 && ps.y2() < this.game.height()) {
                        this._d.velocity.y = -this.scrollSpeed;
                    } else {
                        this._d.velocity.y = 0;
                    }
                }
            }
        }
    );

    return BackgroundComponent;
});