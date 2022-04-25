// Add your code here

let SR_CLK = 9;
let INSR0_DATA = DigitalPin.P16;        //Data
let INSR_LATCH = 8;
let BASE = 8;

enum KEY {
    UP = 0,
    DOWN,
    LEFT,
    RIGHT,
    A,
    B,
    MENU,
    IN1,
    IN2,
    IN3,
    IN4
};

//% weight=20 color=#3333ff icon="\uf11b"
namespace SimpleShieldKey {
    let KEYSCAN = 0;
    //% blockID==Listen_Key
    //% block="Listen_Key"
    //% weight=90
    export function Read74HC165(): void {
        pins.setPull(INSR0_DATA, PinPullMode.PullUp)
        Servo.FullOff(INSR_LATCH);
        control.waitMicros(20000);
        Servo.FullOn(INSR_LATCH);
        control.waitMicros(20000);
        KEYSCAN = 0;
        let i = 0;
        Servo.SetLED(1, true);
        for (i = 0; i < 16; i++) {
            KEYSCAN = KEYSCAN << 1;
            let tmp = pins.digitalReadPin(INSR0_DATA);
            KEYSCAN |= tmp;
            Servo.FullOff(SR_CLK);
            control.waitMicros(20000);
            Servo.FullOn(SR_CLK);
            control.waitMicros(20000);
        }
        Servo.SetLED(1, false);
        if (((KEYSCAN >> 15) & 0x01) == 1 || ((KEYSCAN>>4)&0x01) == 0 || ((KEYSCAN>>5)&0x01)==0 || ((KEYSCAN>>6)&0X01)==1 || ((KEYSCAN>>7)&0X01)==1)
        {
            KEYSCAN = 32575;
            return;
        }
        basic.showNumber(KEYSCAN);
    }

    //% blockID==Listen_Key
    //% block="Key %pin |Press"
    //% weight=90
    export function Listen_Key(pin: KEY): boolean {
        let res = 1;
        switch (pin) {
            case KEY.UP:
                res = (KEYSCAN >> 1 + BASE) & 0x01;
                break;
            case KEY.DOWN:
                res = (KEYSCAN >> 2 + BASE) & 0x01;
                break;
            case KEY.LEFT:
                res = (KEYSCAN >> 0 + BASE) & 0x01;
                break;
            case KEY.RIGHT:
                res = (KEYSCAN >> 3 + BASE) & 0x01;
                break;
            case KEY.A:
                res = (KEYSCAN >> 4 + BASE) & 0x01;
                break;
            case KEY.B:
                res = (KEYSCAN >> 5 + BASE) & 0x01;
                break;
            case KEY.MENU:
                res = (KEYSCAN >> 6 + BASE) & 0x01;
                break;
            default:
                return false;
        }
        if (res == 1) {
            return false;
        }
        else {
            return true;
        }
    }
}

