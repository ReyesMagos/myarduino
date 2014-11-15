/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var five = require("johnny-five"),
    board, motor, led;
module.exports.bootstrap = function(cb) {

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();


    board = new five.Board();

    board.on("ready", function() {

        // Create an Led on pin 13 and strobe it on/off
        // Optionally set the speed; defaults to 100ms
        //(new five.Led(13)).strobe();
        motor = new five.Motor({
            pin: 5
        });


        var led = new five.Led({
            pin: 7
        });
        var led2 = new five.Led({
            pin: 13
        });
        sails.led = led;
        sails.led2 = led2;

        var ledRgb = new five.Led.RGB({
            pins: {
                red: 3,
                green: 5,
                blue: 6
            }
        });
        sails.ledRgb = ledRgb;


        sails.motor = motor;

        sails.motor.on("start", function(err, timestamp) {
            console.log("start", timestamp);

            // Demonstrate motor stop in 2 seconds
            board.wait(20000, function() {
                motor.stop();
            });
        });

        // "stop" events fire when the motor is started.
        sails.motor.on("stop", function(err, timestamp) {
            console.log("stop", timestamp);
        });

        board.repl.inject({
            motor: motor,
            led2: led2,
            ledRgb: ledRgb
        });

    });
};