define([

], function () {
    // Node class.
    var Node = WinJS.Class.define(
        function (name) {
            /// <summary>Creates a new entity.</summary>
            /// <param name="name" type="String">The name for this entity.</param>
            this.name = name || 'unknown';
        }, {
            name: null,
            initialized: false,
            init: function () {
                /// <summary>Initializes the node.</summary>
            },
            update: function () {
                /// <summary>Updates the node.</summary>
                if (!this.initialized) {
                    this.init(); // run initialization logic
                    this.initialized = true;
                }
            }
        }
    );

    return Node;
});