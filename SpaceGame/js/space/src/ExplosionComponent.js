define([
    'hatchet/core/Component',
    'hatchet/core/Message',
    'SpaceGame/EntityFactory'
], function (Component, Message, EntityFactory) {
    // Explosion component class.
    var ExplosionComponent = WinJS.Class.derive(
        Component,
        function (game) {
            Component.call(this, game); // call super constructor
            this.state = Component.states.LOGIC;
            this.dependencies = ['spatial', 'velocity'];
        }, {
            name: 'explosion',
            image: null,
            init: function () {
                /// <summary>Initializes the component.</summary>
                Component.prototype.init.apply(this);
                this.on('collision:collide', this.onCollide.bind(this));
            },
            onCollide: function () {
                this.createExplosion(); // create an explosion on collision.
                this.fire('entity:destroy');
            },
            createExplosion: function () {
                /// <summary>Creates an explosion entity.</summary>
                var explosion = SpaceGame.EntityFactory.create(SpaceGame.EntityFactory.types.EXPLOSION, this.game);
                explosion.setProperty('sprite', 'image', this.image);
                explosion.setProperty('spatial', 'x', this._d.spatial.x);
                explosion.setProperty('spatial', 'y', this._d.spatial.y);
                this._game.entities.add(explosion);
            },
        }
    );

    return ExplosionComponent;
});