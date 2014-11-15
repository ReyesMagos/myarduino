/**
 * RobotController
 *
 * @description :: Server-side logic for managing robots
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    new: function(req, res) {

        var led;
        var led1Instruction = req.param('led1');
        var led2Instruction = req.param('led2');
        var ledRgbInstruccion = req.param('rgb');
        var color = req.param('color');
        console.log(' instruccion1 ' + led1Instruction);
        console.log(' instruccion2 ' + led2Instruction);
        console.log(' ledRgbInstruccion ' + ledRgbInstruccion);


        switch (led1Instruction) {
            case 'on':
                sails.led.toggle();
                // sails.motor.start(255);
                break;
            case 'strobe':
                sails.led.strobe();
                break;
            case 'stop':
                sails.led.stop();
                break;

        }

        switch (led2Instruction) {
            case 'on':
                sails.led2.toggle();
                break;
            case 'strobe':
                sails.led2.strobe();
                break;
            case 'stop':
                sails.led2.stop();
                break;

        }

        if (color) {
            sails.ledRgb.color(color);
            //sails.ledRgb.blink(1000);
        }


        


        if (sails.led2.isOn)
            console.log('led is on');
        else
            console.log('led are fucking off')

        res.view('hello');

    }

};