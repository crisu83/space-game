define([

], function () {
    return WinJS.Class.define(
        function () {
            /// <summary>Creates a new list.</summary>
            this.objects = [];
        }, {
            objects: null,
            get: function (index) {
                /// <summary>Returns the object at the given index.</summary>
                /// <param name="index" type="Number">The object index.</param>
                /// <returns type="Object">The object.</returns>
                return this.objects[index];
            },
            add: function (object) {
                /// <summary>Adds the given object to the list.</summary>
                /// <param name="object" type="Object">The object to add.</param>
                /// <returns type="Object">The current scope.</returns>
                this.objects.push(object);
                return this;
            },
            remove: function (object) {
                /// <summary>Removes the given object from the list.</summary>
                /// <param name="object" type="Object">The object to remove.</param>
                /// <returns type="Object">The current scope.</returns>
                var index = this.objects.indexOf(object);
                if (index !== -1) {
                    this.objects.splice(index, 1);
                }
                return this;
            },
            clear: function () {
                /// <summary>Removes all objects from the list.</summary>
                /// <returns type="Object">The current scope.</returns>
                this.objects.length = 0;
                return this;
            },
            size: function () {
                /// <summary>Returns the number of objects in the list.</summary>
                /// <returns type="Number">The list length.</returns>
                return this.objects.length;
            }
        }
    );
});