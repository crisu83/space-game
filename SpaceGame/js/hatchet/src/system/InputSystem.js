define([
    'hatchet/core/System'
], function (System) {
    // Input system class.
    var InputSystem = WinJS.Class.derive(
        System,
        function (game) {
            /// <summary>Creates a new system.</summary>
            /// <param name="game" type="Game">The game that this system belongs to.</param>
            System.call(this, game); // call super constructor
            this.keysDown = {};
            var that = this;
            window.addEventListener('keydown', function(event) {
                that.keysDown[event.keyCode] = true;
            });
            window.addEventListener('keyup', function(event) {
                that.keysDown[event.keyCode] = false; 
            });
        }, {
            name: 'input',
            keysDown: null,
            isKeyDown: function (keyCode, release) {
                /// <summary>Returns whether the given key is pressed.</summary>
                /// <param name="keyCode" type="Number">The key code.</param>
                /// /// <param name="release" type="Boolean">Whether the key should be force-released.</param>
                /// <returns type="Boolean">Whether the key is pressed.</returns>
                down = this.keysDown[keyCode];
                if (release) {
                    this.keysDown[keyCode] = false;
                }
                return down;
            }
        }
    );
    
    return InputSystem;
});