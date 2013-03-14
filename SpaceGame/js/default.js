(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var game;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {

                require([
                    'space/SpaceGame'
                ], function (Game) {
                    game = new Game;
                    //game.debug = true; // enable debugging mode
                    game.run();
                });

            } else {
                game.resume();
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        game.pause();
    };

    app.start();
})();
