define([
    'hatchet/core/System'
], function (System) {
    // Render system class.
    var RenderSystem = WinJS.Class.derive(
        System,
        function (game) {
            /// <summary>Creates a new system.</summary>
            /// <param name="game" type="Game">The game that this system belongs to.</param>
            System.call(this, game); // call super constructor
            this.queue = [];
        }, {
            name: 'render',
            canvas: null,
            queue: null,
            dirty: false,
            register: function (zIndex, fn) {
                /// <summary>Adds an item to the queue with the given z-index.</summary>
                /// <param name="zIndex" type="Number">The rendering priority.</param>
                /// <param name="fn" type="Function">The rendering callback.</param>
                this.queue.push({
                    zIndex: zIndex,
                    fn: fn
                });
                this.dirty = true;
            },
            update: function () {
                /// <summary>Updates the system.</summary>
                System.prototype.update.apply(this);

                if (this.dirty) {
                    this.queue.sort(function(a, b) {
                        return a.zIndex - b.zIndex;
                    });
                    this.dirty = false;
                }
            },
            draw: function (context) {
                /// <summary>Draws all the items in the queue onto the given context.</summary>
                /// <param name="context" type="Canvas2dContext">The graphical context.</param>
                var item;
                for (var i = 0, len = this.queue.length; i < len; i++) {
                    item = this.queue[i];
                    item.fn.apply(this, [context]);
                }
                this.queue.length = 0; // empty the queue
            }
        }
    );

    return RenderSystem;
});