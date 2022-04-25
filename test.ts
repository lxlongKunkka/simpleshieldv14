Servo.SetLED(2, true)
Servo.SetLED(3, false)
LCD1IN8.LCD_Init()
LCD1IN8.LCD_Filling(COLOR.BLUE)
LCD1IN8.DrawRectangle(randint(0, 80), randint(0, 60), randint(80, 159), randint(60, 119), randint(0, 65535), DRAW_FILL.DRAW_EMPTY, DOT_PIXEL.DOT_PIXEL_1)
randint(0, 80)
music.playTone(Note.C, music.beat())
basic.forever(function() {
    Servo.SetLED(2, true)
    Servo.SetLED(3, false)
    basic.pause(1000)
    Servo.SetLED(2, false)
    Servo.SetLED(3, true)
    basic.pause(1000)
})

input.onButtonPressed(Button.A, function() {
    LCD1IN8.DrawRectangle(randint(0, 80), randint(0, 60), randint(80, 159), randint(60, 119), randint(0, 65535), DRAW_FILL.DRAW_EMPTY, DOT_PIXEL.DOT_PIXEL_1)
})
input.onButtonPressed(Button.B, function () {
    LCD1IN8.LCD_Filling(randint(0, 65535))
})
basic.forever(function () {
    SimpleShieldKey.Read74HC165()
    
    if (SimpleShieldKey.Listen_Key(KEY.UP)) {
        Motor.MotorRun(Motors.M1, 100)
    }
    else if (SimpleShieldKey.Listen_Key(KEY.DOWN)) {
        Motor.MotorRun(Motors.M1, -100)
    }
    else if (SimpleShieldKey.Listen_Key(KEY.A)) {
        Motor.MotorRun(Motors.M1, 0)
    }
})