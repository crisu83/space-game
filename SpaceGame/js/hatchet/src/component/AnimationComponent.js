define([
    'hatchet/core/Component',
    'hatchet/util/Map'
], function (Component, Map) {
    // Animation component class.
    var AnimationComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.animations = new Map;
            this.state = Component.states.INIT;
            this.dependencies = ['sprite'];
        }, {
            name: 'animation',
            animationName: null,
            animations: null,
            addAnimation: function (name, animation) {
                /// <summary>Adds an animation with the given name to the component.</summary>
                /// <param name="name" type="String">The name of the animation.</param>
                /// <param name="animation" type="Animation">The animation.</param>
                this.animations.add(name, animation);
            },
            getCurrentAnimation: function () {
                /// <summary>Returns the animation that is currently playing.</summary>
                /// <returns type="Animation">The animation.</returns>
                return this.animations.get(this.animationName);
            },
            play: function (name) {
                /// <summary>Plays the animation with the given name.</summary>
                /// <param name="name" type="String">The name of the animation.</param>
                this.animationName = name;
            },
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                if (this.animations.size()) {
                    this.updateCurrentAnimation();
                }
            },
            updateCurrentAnimation: function () {
                /// <summary>Updates the current animation.</summary>
                var animation = this.getCurrentAnimation();
                if (animation) {
                    animation.update();
                    this.updateAnimationFrame(animation);
                }
            },
            updateAnimationFrame: function (animation) {
                /// <summary>Updates the current animation frame.</summary> 
                var frame = animation.getCurrentFrame();
                if (frame) {
                    this._d.sprite.x = frame.x;
                    this._d.sprite.y = frame.y;
                }
            },
        }
    );

    return AnimationComponent;
});