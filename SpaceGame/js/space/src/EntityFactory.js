define([
    'hatchet/component/AnimationComponent',
    'hatchet/component/BoundComponent',
    'hatchet/component/CollisionComponent',
    'hatchet/component/CooldownComponent',
    'hatchet/component/DebugComponent',
    'hatchet/component/InputComponent',
    'hatchet/component/LifetimeComponent',
    'hatchet/component/RenderComponent',
    'hatchet/component/SpatialComponent',
    'hatchet/component/SpriteComponent',
    'hatchet/component/VelocityComponent',
    'hatchet/core/Entity',
    'hatchet/util/Animation',
    'hatchet/util/ImageLoader',
    './AlienComponent',
    './BackgroundComponent',
    './ExplosionComponent',
    './PlayerComponent',
    './ProjectileComponent',
    './LauncherComponent'
], function (AnimationComponent, BoundComponent, CollisionComponent, CooldownComponent,
        DebugComponent, InputComponent, LifetimeComponent, RenderComponent, SpatialComponent,
        SpriteComponent, VelocityComponent, Entity, Animation, ImageLoader, AlienComponent,
        BackgroundComponent, ExplosionComponent, PlayerComponent, ProjectileComponent,
        LauncherComponent) {
    // Entity factory class.
    var EntityFactory = WinJS.Class.define(
        function () {
            // Empty constructor.
        }, {
            // No member properties.
        }, {
            types: {
                PLAYER: 1,
                ALIEN: 2,
                ROCKET: 3,
                TORPEDO: 4,
                EXPLOSION: 5,
                BACKGROUND: 6
            },
            create: function (type, game) {
                /// <summary>Creates the entity of the given type.</summary>
                /// <param name="type" type="String">The type of entity to create.</param>
                /// <param name="game" type="CanvasGame">The game the entity belongs to.</param>
                /// <returns type=""></returns>
                switch (type) {
                    case this.types.PLAYER:
                        return this.createPlayer(game);
                    case this.types.ALIEN:
                        return this.createAlien(game);
                    case this.types.ROCKET:
                        return this.createRocket(game);
                    case this.types.TORPEDO:
                        return this.createTorpedo(game);
                    case this.types.EXPLOSION:
                        return this.createExplosion(game);
                    case this.types.BACKGROUND:
                        return this.createBackground(game);
                    default:
                        throw new Error('EntityFactory.create: Entity type is invalid.');
                }
            },
            createActor: function (game) {
                var entity = new Entity;

                if (game.debug) {
                    var debug = new DebugComponent(game);
                    entity.addComponent(debug);
                }

                return entity;
            },
            createMissile: function (game) {
                /// <summary>Creates a new projectile.</summary>
                /// <param name="game" type="CanvasGame">The game the entity belongs to.</param>
                /// <returns type="Entity">The entity.</returns>
                var entity = this.createActor(game);

                var render = new RenderComponent(game);
                render.zIndex = 1;
                entity.addComponent(render);

                var spatial = new SpatialComponent(game);
                spatial.w = 5;
                spatial.h = 20;
                entity.addComponent(spatial);

                var projectile = new ProjectileComponent(game);
                projectile.x = projectile.y = -50;
                projectile.w = game.canvas.width + 50;
                projectile.h = game.canvas.height + 50;
                entity.addComponent(projectile);
                
                var flightAnimation = new Animation();
                flightAnimation.addFrame(0, 0, 100);
                flightAnimation.addFrame(5, 0, 100);

                var animation = new AnimationComponent(game);
                animation.addAnimation('flight', flightAnimation);
                animation.play('flight');
                entity.addComponent(animation);

                return entity;
            },
            createTorpedo: function (game) {
                /// <summary>Creates a new torpedo projectile.</summary>
                /// <param name="game" type="CanvasGame">The game the entity belongs to.</param>
                /// <returns type="Entity">The entity.</returns>
                var entity = this.createMissile(game);

                entity.name = 'torpedo';

                var collision = new CollisionComponent(game);
                collision.collidesWith = ['rocket', 'player'];
                entity.addComponent(collision);

                var sprite = new SpriteComponent(game);
                sprite.image = ImageLoader.load('/images/missile_02.png');
                sprite.w = 5;
                sprite.h = 20;
                entity.addComponent(sprite);

                var velocity = new VelocityComponent(game);
                velocity.y = 10;
                entity.addComponent(velocity);

                var explosion = new ExplosionComponent(game);
                explosion.image = ImageLoader.load('/images/explosion_03.png');
                entity.addComponent(explosion);

                return entity;
            },
            createRocket: function (game) {
                /// <summary>Creates a new rocket projectile.</summary>
                /// <param name="game" type="CanvasGame">The game the entity belongs to.</param>
                /// <returns type="Entity">The entity.</returns>
                var entity = this.createMissile(game);

                entity.name = 'rocket';

                var collision = new CollisionComponent(game);
                collision.collidesWith = ['torpedo', 'alien'];
                entity.addComponent(collision);

                var sprite = new SpriteComponent(game);
                sprite.image = ImageLoader.load('/images/missile_01.png');
                sprite.w = 5;
                sprite.h = 20;
                entity.addComponent(sprite);

                var velocity = new VelocityComponent(game);
                velocity.y = -10;
                entity.addComponent(velocity);

                var explosion = new ExplosionComponent(game);
                explosion.image = ImageLoader.load('/images/explosion_01.png');
                entity.addComponent(explosion);

                return entity;
            },
            createShip: function(game) {
                /// <summary>Creates a new space ship.</summary>
                /// <param name="game" type="CanvasGame">The game the entity belongs to.</param>
                /// <returns type="Entity">The entity.</returns>
                var entity = this.createActor(game);

                var render = new RenderComponent(game);
                render.zIndex = 2;
                entity.addComponent(render);

                var velocity = new VelocityComponent(game);
                entity.addComponent(velocity);
                
                var cooldown = new CooldownComponent(game);
                cooldown.duration = 500;
                entity.addComponent(cooldown);

                return entity;
            },
            createAlien: function(game) {
                /// <summary>Creates a new alien space ship.</summary>
                /// <param name="game" type="CanvasGame">The game the entity belongs to.</param>
                /// <returns type="Entity">The entity.</returns>
                var entity = this.createShip(game);

                entity.name = 'alien';

                var collision = new CollisionComponent(game);
                collision.collidesWith = ['rocket', 'player'];
                entity.addComponent(collision);

                var spatial = new SpatialComponent(game);
                spatial.w = spatial.h = 20;
                entity.addComponent(spatial);

                var sprite = new SpriteComponent(game);
                sprite.image = ImageLoader.load('/images/ship_02.png');
                sprite.w = sprite.h = 20;
                entity.addComponent(sprite);

                var idleAnimation = new Animation();
                idleAnimation.addFrame(0, 0, 100);
                idleAnimation.addFrame(20, 0, 100);

                var animation = new AnimationComponent(game);
                animation.addAnimation('idle', idleAnimation);
                animation.play('idle');
                entity.addComponent(animation);

                var launcher = new LauncherComponent(game);
                entity.addComponent(launcher);

                var alien = new AlienComponent(game);
                entity.addComponent(alien);

                var explosion = new ExplosionComponent(game);
                explosion.image = ImageLoader.load('/images/explosion_04.png');
                entity.addComponent(explosion);

                return entity;
            },
            createPlayer: function(game) {
                /// <summary>Creates a new player space ship.</summary>
                /// <param name="game" type="CanvasGame">The game the entity belongs to.</param>
                /// <returns type="Entity">The entity.</returns>
                var entity = this.createShip(game);

                entity.name = 'player';

                var collision = new CollisionComponent(game);
                collision.collidesWith = ['torpedo', 'alien'];
                entity.addComponent(collision);

                var spatial = new SpatialComponent(game);
                spatial.x = 374;
                spatial.y = 1000;
                spatial.w = spatial.h = 20;
                entity.addComponent(spatial);

                var bound = new BoundComponent(game);
                bound.x = bound.y = 0;
                bound.w = game.canvas.width;
                bound.h = game.canvas.height;
                entity.addComponent(bound);

                var sprite = new SpriteComponent(game);
                sprite.image = ImageLoader.load('/images/ship_01.png');
                sprite.w = sprite.h = 20;
                entity.addComponent(sprite);

                var idleAnimation = new Animation();
                idleAnimation.addFrame(0, 0, 100);
                idleAnimation.addFrame(20, 0, 100);

                var tiltLeftAnimation = new Animation();
                tiltLeftAnimation.addFrame(40, 0, 100);
                tiltLeftAnimation.addFrame(60, 0, 100);
                tiltLeftAnimation.loop = false;

                var tiltRightAnimation = new Animation();
                tiltRightAnimation.addFrame(80, 0, 100);
                tiltRightAnimation.addFrame(100, 0, 100);
                tiltRightAnimation.loop = false;

                var animation = new AnimationComponent(game);
                animation.addAnimation('idle', idleAnimation);
                animation.addAnimation('tiltLeft', tiltLeftAnimation);
                animation.addAnimation('tiltRight', tiltRightAnimation);
                animation.play('idle');
                entity.addComponent(animation);

                var input = new InputComponent(game);
                entity.addComponent(input);

                var launcher = new LauncherComponent(game);
                entity.addComponent(launcher);

                var player = new PlayerComponent(game);
                entity.addComponent(player);

                var explosion = new ExplosionComponent(game);
                explosion.image = ImageLoader.load('/images/explosion_02.png');
                entity.addComponent(explosion);

                return entity;
            },
            createExplosion: function (game) {
                /// <summary>Creates a new explosion.</summary>
                /// <param name="game" type="CanvasGame">The game the entity belongs to.</param>
                /// <returns type="Entity">The entity.</returns>
                var entity = new Entity;

                entity.name = 'explosion';

                if (game.debug) {
                    var debug = new DebugComponent(game);
                    entity.addComponent(debug);
                }

                var render = new RenderComponent(game);
                entity.addComponent(render);

                var velocity = new VelocityComponent(game);
                entity.addComponent(velocity);

                var spatial = new SpatialComponent(game);
                spatial.w = spatial.h = 20;
                entity.addComponent(spatial);

                var sprite = new SpriteComponent(game);
                sprite.w = sprite.h = 20;
                entity.addComponent(sprite);

                var explodeAnimation = new Animation();
                explodeAnimation.addFrame(0, 0, 100);
                explodeAnimation.addFrame(20, 0, 100);
                explodeAnimation.addFrame(40, 0, 100);
                explodeAnimation.addFrame(60, 0, 100);
                explodeAnimation.addFrame(80, 0, 100);
                explodeAnimation.loop = false;

                var animation = new AnimationComponent(game);
                animation.addAnimation('explode', explodeAnimation);
                animation.play('explode');
                entity.addComponent(animation);

                var lifetime = new LifetimeComponent(game);
                lifetime.duration = 500;
                entity.addComponent(lifetime);

                return entity;
            },
            createBackground: function (game) {
                var entity = new Entity;

                entity.name = 'background';

                if (game.debug) {
                    var debug = new DebugComponent(game);
                    entity.addComponent(debug);
                }

                var render = new RenderComponent(game);
                render.zIndex = -1;
                entity.addComponent(render);

                var velocity = new VelocityComponent(game);
                entity.addComponent(velocity);

                var spatial = new SpatialComponent(game);
                spatial.w = 700;
                spatial.h = 1100;
                entity.addComponent(spatial);

                var sprite = new SpriteComponent(game);
                sprite.w = 720;
                sprite.h = 1200;
                entity.addComponent(sprite);

                var background = new BackgroundComponent(game);
                entity.addComponent(background);

                return entity;
            }
        }
    );

    // todo: figure out why this class has to be namespaced in order to work.
    WinJS.Namespace.define('SpaceGame', {
        EntityFactory: EntityFactory
    });

    return EntityFactory;
});