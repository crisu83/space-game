define([
    'hatchet/core/Component'
], function (Component) {

    var rocketOffset = {
        x: 8,
        y: -20
    };

    // Player component class.
    var PlayerComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Object">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.LOGIC;
            this.dependencies = ['animation', 'input', 'spatial', 'velocity', 'cooldown', 'launcher'];
        }, {
            name: 'player',
            speed: 5,
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                var keys = WinJS.Utilities.Key;

                if (this._d.input.isKeyDown(keys.leftArrow)) {
                    this._d.velocity.x = -this.speed;
                    this._d.animation.play('tiltLeft');
                } else if (this._d.input.isKeyDown(keys.rightArrow)) {
                    this._d.velocity.x = this.speed;
                    this._d.animation.play('tiltRight');
                } else {
                    this._d.velocity.x = 0;
                    this._d.animation.play('idle');
                }

                if (this._d.input.isKeyDown(keys.upArrow)) {
                    this._d.velocity.y = -this.speed;
                } else if (this._d.input.isKeyDown(keys.downArrow)) {
                    this._d.velocity.y = this.speed;
                } else {
                    this._d.velocity.y = 0;
                }

                if (this._d.input.isKeyDown(keys.space, true/* ensure that the key is released */) && this._d.cooldown.downTime === 0) {
                    this._d.cooldown.reset();
                    this._d.launcher.launch(
                        SpaceGame.EntityFactory.types.ROCKET,
                        this._d.spatial.x + rocketOffset.x,
                        this._d.spatial.y + rocketOffset.y
                    );
                }
            }
        }
    );

    return PlayerComponent;
});