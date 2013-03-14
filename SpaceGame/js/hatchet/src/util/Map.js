define([

], function () {
    return WinJS.Class.define(
        function () {
            /// <summary>Creates a new map.</summary>
            this.objects = {};
        }, {
            objects: null,
            length: 0,
            get: function (key) {
                /// <summary>Returns the object with the given key.</summary>
                /// <param name="name" type="String">The key for the object.</param>
                /// <returns type="Object">The object.</returns>
                return this.objects[key];
            },
            add: function (key, object) {
                /// <summary>Adds an object with the given key to the map.</summary>
                /// <param name="name" type="String">The key for the object.</param>
                /// <param name="object" type="Object">The object.</param>
                /// <returns type="Map">The current scope.</returns>
                this.objects[key] = object;
                this.length++;
                return this;
            },
            remove: function (key) {
                /// <summary>Removes the object with the given key from the map.</summary>
                /// <param name="name" type="String">The key for the object.</param>
                /// <returns type="Map">The current scope.</returns>
                if (this.objects[key]) {
                    delete this.objects[key];
                    this.length--;
                }
                return this;
            },
            clear: function () {
                /// <summary>Removes all objects from the map.</summary>
                this.objects = {};
                this.size = 0;
            },
            size: function () {
                /// <summary>Returns the number of items in the map.</summary>
                /// <returns type="Number">The map length.</returns>
                return this.length;
            }
        }
    );
});