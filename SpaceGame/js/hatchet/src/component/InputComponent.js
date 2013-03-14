define([
    'hatchet/core/Component'
], function (Component) {
    // Input component class.
    var InputComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.INIT;
            this.systems = ['input'];
        }, {
            name: 'input',
            isKeyDown: function (keyCode, release) {
                /// <summary>Returns whether the given key is pressed.</summary>
                /// <param name="keyCode" type="Number">The key code.</param>
                /// <param name="release" type="Boolean">Whether the key should be force-released.</param>
                /// <returns type="Boolean">Whether the key is pressed.</returns>
                return this._s.input.isKeyDown(keyCode, release);
            }
        }
    );

    return InputComponent;
});