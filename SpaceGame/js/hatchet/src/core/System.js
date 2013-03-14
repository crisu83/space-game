define([
    'hatchet/core/Node'
], function (Node) {
    // Base system class.
    var System = WinJS.Class.derive(
        Node,
        function (game) {
            /// <summary>Creates a new system.</summary>
            /// <param name="game" type="Game">The game that this system belongs to.</param>
            Node.call(this, this.name);
            this.game = game;
        }, {
            name: null,
            game: null
        }
    );

    return System;
});