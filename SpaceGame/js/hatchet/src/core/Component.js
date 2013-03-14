define([
    'hatchet/core/Node'
], function (Node) {
    // Base component class. 
    // All components should be extended from this class.
    var Component = WinJS.Class.derive(
        Node,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="CanvasGame">The game that this component belongs to.</param>
            Node.call(this, this.name); // call super constructor
            this.dependencies = [];
            this.systems = [];
            this._d = {};
            this._s = {};
            this._game = game;
        }, {
            state: null,
            systems: null,
            dependencies: null,
            _d: null,
            _s: null,
            _owner: null,
            _game: null,
            init: function () {
                /// <summary>Initializes the component.</summary>
                this.initDependencies();
                this.initSystems();
            },
            initDependencies: function () {
                var name, dependency;
                for (var i = 0, len = this.dependencies.length; i < len; i++) {
                    name = this.dependencies[i];
                    dependency = this.getComponent(name);
                    if (!dependency) {
                        throw new Error('Component.init: Cannot initialize component without dependency.');
                    }
                    this._d[name] = dependency;
                }
            },
            initSystems: function () {
                var name, system;
                for (var i = 0, len = this.systems.length; i < len; i++) {
                    name = this.systems[i];
                    system = this.getSystem(name);
                    if (!system) {
                        throw new Error('Component.init: Cannot initializes component without its system.');
                    }
                    this._s[name] = system;
                }
            },
            on: function (type, fn) {
                this._owner.addEventListener(type, fn);
            },
            off: function (type, fn) {
                this._owner.removeEventListener(type, fn);
            },
            fire: function (type, data) {
                detail = data || {};
                detail.source = this._owner;
                this._owner.dispatchEvent(type, detail);
            },
            getSystem: function (name) {
                /// <summary>Returns the system with the given name.</summary>
                /// <param name="name" type="String">The name of the system.</param>
                /// <returns type="System">The system.</returns>
                var system = this._game.getSystem(name);
                if (!system) {
                    throw new Error('Component.getSystem: System not found.');
                }
                return system;
            },
            getComponent: function (name) {
                /// <summary>Returns the component with the given name for the entity that this component belongs to.</summary>
                /// <param name="name" type="String">The name of the component.</param>
                /// <returns type="Component">The component.</returns>
                var component = this._owner.getComponent(name);
                if (!component) {
                    throw new Error('Component.getComponent: Component not found.');
                }
                return component;
            },
            owner: {
                get: function () { return this._owner; }
            },
            game: {
                get: function () { return this._game; }
            }
        }, {
            // Component states in which they can choose to run.
            states: {
                INIT: 1,
                LOGIC: 2,
                PHYSICS: 3,
                MOVEMENT: 4,
                RENDER: 5
            }
        }
    );

    return Component;
});