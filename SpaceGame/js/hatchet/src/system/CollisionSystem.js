define([
    'hatchet/core/System',
    'hatchet/util/List',
    'hatchet/util/QuadTree'
], function (System, List, QuadTree) {
    // Collision system class.
    var CollisionSystem = WinJS.Class.derive(
        System,
        function (game) {
            /// <summary>Creates a new system.</summary>
            /// <param name="game" type="Game">The game that this system belongs to.</param>
            System.call(this, game); // call super constructor
            //this.quadTree = new QuadTree(0, 0, game.width(), game.height());
            this.volumes = [];
        }, {
            name: 'collision',
            quadTree: null,
            volumes: null,
            register: function (volume) {
                this.volumes.push(volume);
            },
            update: function () {
                System.prototype.update.apply(this);
                
                var len = this.volumes.length,
                    i;

                //for (i = 0, len = this.volumes.length ; i < len; i++) {
                //    this.quadTree.add(this.volumes[i]);
                //}

                var volume, neighbours, other;

                for (i = 0; i < len; i++) {
                    volume = this.volumes[i];
                    //neighbours = this.quadTree.neighbours(volume);
                    //for (var j = 0, len2 = neighbours.length; j < len2; j++) {
                    //    other = neighbours[j];
                    for (var j = 0; j < len; j++) {
                        other = this.volumes[j];
                        if (other === volume) {
                            continue;
                        }
                        if (volume.collides(other)) {
                            volume.fire('collision:collide', { other: other });
                            other.fire('collision:collide', { other: volume });
                        }
                    }
                }

                this.volumes.length = 0;
                //this.quadTree.empty();
            }
        }
    );

    return CollisionSystem;
});