define([
    'hatchet/core/Component',
    'hatchet/util/Rect'
], function (Component, Rect) {
    // Spatial component class.
    var SpatialComponent = WinJS.Class.mix(
        WinJS.Class.derive(
            Component,
            function (game) {
                /// <summary>Creates a new component.</summary>
                /// <param name="game" type="Game">The game that this component belongs to.</param>
                Component.call(this, game); // call super constructor
                this.state = Component.states.INIT;
            }, {
                name: 'spatial',
            }
        ),
        Rect // Add rectangle mixin
    );

    return SpatialComponent;
});