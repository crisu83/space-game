define([
    'hatchet/util/QuadTreeNode'
], function (QuadTreeNode) {
    // Quad tree class.
    var QuadTree = WinJS.Class.define(
        function (x, y, w, h, maxChildren, maxDepth) {
            /// <summary>Creates a new quadtree.</summary>
            /// <param name="x" type="Number">The x-coordinate for the left of the tree.</param>
            /// <param name="y" type="Number">The y-coordinate for the top of the tree.</param>
            /// <param name="w" type="Number">The width of the tree.</param>
            /// <param name="h" type="Number">The height of the tree.</param>
            /// <param name="maxChildren" type="Number">The maximum number of children for each branch in the tree.</param>
            /// <param name="maxDepth" type="Number">The maximum depth of the tree.</param>
            this.root = new QuadTreeNode(x, y, w, h, maxChildren, maxDepth);
        }, {
            root: null,
            add: function (item) {
                this.root.add(item);
            },
            neighbours: function (item) {
                return this.root.neighbours(item);
            },
            empty: function () {
                this.root.empty();
            },
        }, {

        }
    );

    return QuadTree;
});