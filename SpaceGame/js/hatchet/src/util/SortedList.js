define([
    'hatchet/util/List'
], function (List) {
    // Sorted list class.
    var SortedList = WinJS.Class.derive(
        List,
        function (compare) {
            /// <summary>Creates a new list.</summary>
            /// <param name="compare" type="Function">The compare function.</param>
            List.call(this); // call super constructor
            this.compare = compare;
        }, {
            compare: null,
            dirty: false,
            add: function (object) {
                /// <summary>Adds the given object to the list.</summary>
                /// <param name="object" type="Object">The object to add.</param>
                /// <returns type="Object">The current scope.</returns>
                List.prototype.add.apply(this, [object]); // call super method
                this.dirty = true;
                return this;
            },
            sort: function () {
                /// <summary>Sorts the list.</summary>
                if (typeof this.compare === 'function') {
                    this.objects.sort(this.compare);
                } else {
                    this.objects.sort(); // fallback
                }
            },
            update: function () {
                /// <summary>Updates the list.</summary>
                if (this.dirty) {
                    this.sort();
                    this.dirty = false;
                }
            }
        }
    );

    return SortedList;
});