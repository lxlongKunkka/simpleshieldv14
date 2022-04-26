/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/**
 * 自定义图形块
 */
//% weight=5 color=#0fbc11 icon="\uf113"
namespace AlphaBot2 {
    let last_value = 0; // assume initially that the line is left.
    let calibratedMax = [650, 650, 650, 650, 650];
    let calibratedMin = [100, 100, 100, 100, 100];
    let TLC_1543_CS = 10;


    //% blockId=AlphaBot2_AnalogRead block="AnalogRead"
    //% weight=80 advanced=true
    export function AnalogRead(): number[] {
        let i = 0;
        let j = 0;
        let channel = 0;
        let values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let sensor_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //pins.digitalWritePin(DigitalPin.P16, 0);
        Servo.FullOff(TLC_1543_CS);
        basic.pause(2);
        for (i = 0; i < 12; i++) {
            for (j = 0; j < 10; j++) {
                //0 to 4 clock transfer channel address
                if (j < 4) {
                    if ((i >> (3 - j)) & 0x01) {
                        pins.digitalWritePin(DigitalPin.P15, 1);
                    } else {
                        pins.digitalWritePin(DigitalPin.P15, 0);
                    }
                }
                //0 to 10 clock receives the previous conversion result
                values[i] <<= 1;
                if (pins.digitalReadPin(DigitalPin.P14)) {
                    values[i] |= 0x01;
                }
                pins.digitalWritePin(DigitalPin.P13, 1);
                pins.digitalWritePin(DigitalPin.P13, 0);
            }
            for (j = 0; j < 12; j++) {
                pins.digitalWritePin(DigitalPin.P13, 1);
                pins.digitalWritePin(DigitalPin.P13, 0);

            }
        }
        //pins.digitalWritePin(DigitalPin.P16, 1);
        Servo.FullOn(TLC_1543_CS);
        for (i = 0; i < 11; i++) {
            sensor_values[i] = values[i + 1];
        }
        basic.showNumber(sensor_values[5]);
        return sensor_values;
    }
}