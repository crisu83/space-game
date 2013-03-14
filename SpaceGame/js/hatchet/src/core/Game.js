define([
    'hatchet/util/List'
], function (List) {
    // Game class.
    var Game = WinJS.Class.define(
        function () {
            /// <summary>Creates a new game.</summary>
            this.systems = new List;
        }, {
            canvas: null,
            systems: null,
            initialized: false,
            running: false,
            paused: false,
            debug: false,
            run: function () {
                /// <summary>Starts the game loop.</summary>
                this.canvas = document.getElementById('gameContainer');

                var that = this,
                    context = this.canvas.getContext('2d'),
                    id;

                var gameLoop = function () {
                    that.input(); // handle input

                    if (!that.paused) {
                        that.update(); // update logic
                        that.draw(context); // render frame
                    }

                    id = window.requestAnimationFrame(gameLoop);

                    if (!that.running) {
                        window.cancelAnimationFrame(id);
                    }
                };

                this.running = true;
                gameLoop();

                console.log('Game started.');
            },
            stop: function () {
                /// <summary>Stops the game.</summary>
                this.running = false;
            },
            pause: function () {
                /// <summary>Pauses the game.</summary>
                console.log('Game paused.');
                this.paused = true;
            },
            resume: function () {
                /// <summary>Resumes the game.</summary>
                console.log('Game resumed.');
                this.paused = false;
            },
            init: function () {
                /// <summary>Initializes the game. Override to perform initialization logic.</summary>
            },
            input: function () {
                /// <summary>Processes input from the user.</summary>
            },
            update: function () {
                /// <summary>Updates the game logic.</summary>
                if (!this.initialized) {
                    this.init();
                    this.initialized = true;
                }

                var i, len, system;
                for (i = 0, len = this.systems.size(); i < len; i++) {
                    system = this.systems.get(i);
                    if (system && typeof system.update === 'function') {
                        system.update();
                    }
                }
            },
            draw: function (context) {
                /// <summary>Renders the game onto the canvas.</summary>
                /// <param name="context" type="Canvas2dContext">The graphics context.</param>
                context.clearRect(0, 0, this.canvas.width, this.canvas.height); // empty the canvas
            },
            addSystem: function (system) {
                /// <summary>Adds the given system to the game.</summary>
                /// <param name="system" type="System">The system to add.</param>
                /// <returns type="CanvasGame">The current scope.</returns>
                this.systems.add(system);
                return this;
            },
            removeSystem: function (system) {
                /// <summary>Removes the given system from the game.</summary>
                /// <param name="system" type="System">The system to remove.</param>
                /// <returns type="CanvasGame">The current scope.</returns>
                this.systems.remove(system);
                return this;
            },
            getSystem: function (name) {
                /// <summary>Returns the system with the given name.</summary>
                /// <param name="name" type="String">The name of the system.</param>
                /// <returns type="System">The system.</returns>
                var i, len, system;
                for (i = 0, len = this.systems.size(); i < len; i++) {
                    system = this.systems.get(i);
                    if (system.name === name) {
                        return system;
                    }
                }
                return null;
            },
            width: function () {
                /// <summary>Returns the width of the game area.</summary>
                /// <returns type="Number">The width.</returns>
                return this.canvas ? this.canvas.width : 0;
            },
            height: function () {
                /// <summary>Returns the height of the game area.</summary>
                /// <returns type="Number">The height.</returns>
                return this.canvas ? this.canvas.height : 0;
            }
        }
    );
    
    return Game;
});