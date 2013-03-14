define([
    'hatchet/core/Component'
], function (Component) {

    var offset = 30,
        maxOffset = 200;
    
    var torpedoOffset = {
        x: 8,
        y: 35
    };

    // Alien component class.
    var AlienComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Object">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.LOGIC;
            this.dependencies = ['spatial', 'velocity', 'cooldown', 'launcher'];
            if (game.debug) {
                this.dependencies.push('debug');
            }
        }, {
            name: 'alien',
            sx: 0,
            index: 0,
            torpedosEnabled: false,
            init: function () {
                /// <summary>Initializes the component.</summary>
                this.randomizeCooldown();
            },
            randomizeCooldown: function () {
                /// <summary>Randomizes the torpedo cooldown.</summary>
                Component.prototype.init.apply(this);
                this._d.cooldown.duration = Math.floor(Math.random() * (10000 - 2000 + 1) + 2000);
                this._d.cooldown.reset();
            },
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                if (this._d.spatial.x > (this.sx + maxOffset)) {
                    this._d.velocity.x = Math.abs(this._d.velocity.x) * -1;
                    this._d.spatial.y += offset;
                } else if (this._d.spatial.x < (this.sx - maxOffset)) {
                    this._d.velocity.x = Math.abs(this._d.velocity.x);
                    this._d.spatial.y += offset;
                }
                
                if (this.torpedosEnabled && this._d.cooldown.downTime === 0) {
                    this._d.launcher.launch(
                        SpaceGame.EntityFactory.types.TORPEDO,
                        this._d.spatial.x + torpedoOffset.x,
                        this._d.spatial.y + torpedoOffset.y
                    );
                    this.randomizeCooldown();
                }

                if (this.torpedosEnabled && this._d.debug) {
                    this._d.debug.color = 'rgb(255, 255, 0)';
                }
            }
        }
    );

    return AlienComponent;
});