define([
    'hatchet/util/Rect'
], function (Rect) {
    // Quad tree node class.
    var QuadTreeNode = WinJS.Class.mix(
        WinJS.Class.define(
            function (x, y, w, h, maxChildren, maxDepth) {
                /// <summary>Creates a new quadtree item.</summary>
                /// <param name="x" type="Number">The x-coordinate for the left of the tree.</param>
                /// <param name="y" type="Number">The y-coordinate for the top of the tree.</param>
                /// <param name="w" type="Number">The width of the tree.</param>
                /// <param name="h" type="Number">The height of the tree.</param>
                /// <param name="maxChildren" type="Number">The maximum number of children for each branch in the tree.</param>
                /// <param name="maxDepth" type="Number">The maximum depth of the tree.</param>
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.maxChildren = maxChildren || this.maxChildren;
                this.maxDepth = maxDepth || this.maxDepth;
                this.items = [];
                this.overlaps = [];
                this.children = [];
            }, {
                maxChildren: 2,
                maxDepth: 4,
                depth: 0,
                items: null,
                overlaps: null,
                children: null,
                add: function (item) {
                    /// <summary>Adds an item to this node.</summary>
                    /// <param name="item" type="Object">The item to add.</param>
                    if (this.children.length === 0) {
                        this.items.push(item);
                        if (this.items.length > this.maxChildren && this.depth < this.maxDepth) {
                            this.divide();
                            for (var i = 0; i < this.items.length; i++) {
                                this.add(this.items[i]);
                            }
                            this.items.length = 0; // empty the items
                        }
                    } else {
                        var i = this.find(item),
                            node = this.children[i];

                        if (item.x >= node.x && item.y >= node.y && item.x2() <= node.x2() && item.y2() <= node.y2()) {
                            this.children[i].add(item);
                        } else {
                            this.overlaps.push(item);
                        }
                    }
                },
                neighbours: function (item) {
                    /// <summary>Returns all nodes that are in the same (or overlapping) region as the given item.</summary>
                    /// <param name="item" type="Object">The item to get the neighbours for.</param>
                    /// <returns type="Array">The neighbouring nodes.</returns>
                    if (this.children.lenght > 0) {
                        var i = this.find(item);
                        return this.items.concat(this.children[i].neighbours(item), this.overlaps);
                    } else {
                        return this.items.concat(this.overlaps);
                    }
                },
                empty: function () {
                    /// <summary>Removes all the items from this node.</summary>
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].empty();
                    }
                    this.items.length = 0;
                    this.overlaps.length = 0;
                    this.children.length = 0;
                },
                find: function (item) {
                    /// <summary>Returns in which quadrant the given item is located in.</summary>
                    /// <param name="item" type="Object">The item to find.</param>
                    /// <returns type="Number">The quadrant.</returns>
                    var left = item.x < (this.x + (this.w / 2)),
                        top = item.y < (this.y + (this.h / 2));

                    if (left && top) {
                        return QuadTreeNode.quadrants.NORTH_WEST
                    } else if (left && !top) {
                        return QuadTreeNode.quadrants.SOUTH_WEST;
                    } else if (!left && top) {
                        return QuadTreeNode.quadrants.NORTH_EAST;
                    } else {
                        return QuadTreeNode.quadrants.SOUTH_EAST;
                    }
                },
                divide: function () {
                    /// <summary>Divides this node into four subnodes.</summary>
                    var x = this.x,
                        y = this.y,
                        w = this.w / 2,
                        h = this.h / 2,
                        d = this.depth + 1;

                    this.children.push(new QuadTreeNode(x, y, w, h, d, this.maxChildren, this.maxDepth));
                    this.children.push(new QuadTreeNode(x + w, y, w, h, d, this.maxChildren, this.maxDepth));
                    this.children.push(new QuadTreeNode(x, y + h, w, h, d, this.maxChildren, this.maxDepth));
                    this.children.push(new QuadTreeNode(x + w, y + h, w, h, d, this.maxChildren, this.maxDepth));
                }
            }, {
                // Quadrants.
                quadrants: {
                    NORTH_WEST: 0,
                    NORTH_EAST: 1,
                    SOUTH_WEST: 2,
                    SOUTH_EAST: 3
                }
            }
        ),
        Rect // Add rectangle mixin
    );

    return QuadTreeNode;
});
