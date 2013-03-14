define([
    'hatchet/core/Game',
    'hatchet/core/EntityGroup',
    'hatchet/system/CollisionSystem',
    'hatchet/system/InputSystem',
    'hatchet/system/RenderSystem',
    'hatchet/util/ImageLoader',
    './EntityFactory'
], function (Game, EntityGroup, CollisionSystem, InputSystem, RenderSystem, ImageLoader, EntityFactory) {
    // Space game class.
    var SpaceGame = WinJS.Class.derive(
        Game,
        function () {
            Game.call(this);
            this.entities = new EntityGroup;
        }, {
            entities: null,
            deadAliens: [],
            numAlienRows: 5,
            numAlienCols: 5,
            numAliens: 0,
            init: function () {
                var that = this;

                var render = new RenderSystem(this);
                this.addSystem(render);

                var input = new InputSystem(this);
                this.addSystem(input);

                var collision = new CollisionSystem(this);
                this.addSystem(collision);

                var stars1 = EntityFactory.create(EntityFactory.types.BACKGROUND, this);
                stars1.setProperty('sprite', 'image', ImageLoader.load('/images/stars_01.png'));
                stars1.setProperty('background', 'scrollSpeed', 0.4);
                this.entities.add(stars1);

                var stars2 = EntityFactory.create(EntityFactory.types.BACKGROUND, this);
                stars2.setProperty('sprite', 'image', ImageLoader.load('/images/stars_02.png'));
                stars2.setProperty('background', 'scrollSpeed', 0.2);
                this.entities.add(stars2);

                var stars3 = EntityFactory.create(EntityFactory.types.BACKGROUND, this);
                stars3.setProperty('sprite', 'image', ImageLoader.load('/images/stars_03.png'));
                stars3.setProperty('background', 'scrollSpeed', 0.1);
                this.entities.add(stars3);

                var player = EntityFactory.create(EntityFactory.types.PLAYER, this);
                player.addEventListener('entity:destroy', function (event) {
                    var source = event.detail.source;
                    if (source) {
                        source.removeEventListener('entity:destroy', this);
                        that.gameLost();
                    }
                });
                this.entities.add(player);

                var offset = 30,
                    sx = (this.canvas.width / 2) - ((this.numAlienCols * offset) / 2) + ((offset - 20) / 2),
                    sy = 100,
                    x = sx,
                    y = sy,
                    i, j, alien;

                for (i = 0; i < this.numAlienRows; i++) {
                    for (j = 0; j < this.numAlienCols; j++) {
                        alien = EntityFactory.create(EntityFactory.types.ALIEN, this);
                        alien.setProperty('spatial', 'x', x);
                        alien.setProperty('spatial', 'y', y);
                        alien.setProperty('velocity', 'x', 1);
                        alien.setProperty('alien', 'sx', x);
                        alien.setProperty('alien', 'index', j + (i * this.numAlienCols));
                        alien.setProperty('alien', 'torpedosEnabled', i === (this.numAlienRows - 1)); // enable torpedos for the first row
                        alien.addEventListener('entity:destroy', function (event) {
                            var source = event.detail.source;
                            if (source) {
                                source.removeEventListener('entity:destroy', this);
                                that.deadAliens[source.getProperty('alien', 'index')] = true;
                                that.numAliens--;
                            }
                        });
                        this.entities.add(alien);
                        this.numAliens++;
                        this.deadAliens.push(false);
                        x += offset;
                    }
                    x = sx;
                    y += offset;
                }
            },
            isAlienBlocked: function (entity) {
                var alien = entity.getComponent('alien');
                if (alien) {
                    var i = alien.index + this.numAlienCols;
                    while (i < this.deadAliens.length) {
                        if (!this.deadAliens[i]) {
                            return true;
                        }
                        i += this.numAlienCols;
                    }
                }
                return false;
            },
            update: function () {
                Game.prototype.update.apply(this); // call super method

                this.entities.update();

                var i, len, entity;
                for (i = 0, len = this.entities.size(); i < len; i++) {
                    entity = this.entities.get(i);
                    if (entity.name === 'alien') {
                        if (!this.isAlienBlocked(entity)) {
                            entity.setProperty('alien', 'torpedosEnabled', true);
                        }
                    }
                }

                if (this.isAllAliensDead()) {
                    this.gameWon();
                }
            },
            isAllAliensDead: function() {
                for (var i = 0; i < this.deadAliens.length; i++) {
                    if (!this.deadAliens[i]) {
                        return false;
                    }
                }
                return true;
            },
            draw: function (context) {
                Game.prototype.draw.apply(this, [context]); // call super method

                var system = this.getSystem('render');
                if (system) {
                    system.draw(context);
                }
            },
            gameWon: function () {
                this.stop();
            },
            gameLost: function () {
                this.stop();
            }
        }
    );

    return SpaceGame;
});