define([
    'hatchet/core/Component'
], function (Component) {
    // Launcher component class.
    var LauncherComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Object">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.LOGIC;
        }, {
            name: 'launcher',
            launch: function (type, x, y) {
                var projectile = SpaceGame.EntityFactory.create(type, this.game);
                if (projectile) {
                    projectile.setProperty('spatial', 'x', x);
                    projectile.setProperty('spatial', 'y', y);
                    this.game.entities.add(projectile);
                }
            }
        }
    );

    return LauncherComponent;
});