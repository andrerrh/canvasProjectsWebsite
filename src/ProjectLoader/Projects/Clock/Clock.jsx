import styles from './Clock.module.scss'

window.onload = () => {
    const canvas = document.querySelector('#ClockCanvas')
    const ctx = canvas.getContext('2d')
    const stopResumeBtn = document.querySelector('#startStopBtn')

    canvas.width = 900;
    canvas.height = 900;

    var clockAnimationId

    //Draw the clock
    const clockRadius = 380
    const clockCenter = 450
    const sixtyPointerSize = 320
    const hourPointerSize = 200

    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 3
    ctx.arc(clockCenter, clockCenter, clockRadius, 0, 2 * Math.PI)
    ctx.stroke()

    function clearClock() {
        ctx.beginPath()
        ctx.arc(clockCenter, clockCenter, clockRadius - 10, 0, 2 * Math.PI)
        ctx.clip()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function drawSixtyPointer(minuteRadian) {
        ctx.beginPath()
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 5
        ctx.moveTo(clockCenter, clockCenter)
        const pointerX = clockCenter + Math.cos(minuteRadian) * sixtyPointerSize
        const pointerY = clockCenter + Math.sin(minuteRadian) * sixtyPointerSize
        ctx.lineTo(pointerX, pointerY)
        ctx.stroke()

        return { pointerX, pointerY }
    }

    function drawHourPointer(hourRadian) {
        ctx.beginPath()
        ctx.strokeStyle = 'red'
        ctx.moveTo(clockCenter, clockCenter)
        const pointerX = clockCenter + Math.cos(hourRadian) * hourPointerSize
        const pointerY = clockCenter + Math.sin(hourRadian) * hourPointerSize
        ctx.lineTo(pointerX, pointerY)
        ctx.stroke()

        return { pointerX, pointerY }
    }

    function pointerCoordinatesToValue({ pointerX, pointerY }, sixtyPointer) {
        let xToRatio = pointerX - clockCenter
        let yToRatio = pointerY - clockCenter
        if (sixtyPointer) {
            if (pointerX >= clockCenter) {
                return Math.floor(Math.atan(yToRatio / xToRatio) * 180 / Math.PI / 6) + 15
            }
            if (pointerX < clockCenter) {
                return Math.floor(Math.atan(yToRatio / xToRatio) * 180 / Math.PI / 6) + 45
            }
        } else {
            if (pointerX >= clockCenter) {
                return Math.floor(Math.atan(yToRatio / xToRatio) * 180 / Math.PI / 30) + 3
            }
            if (pointerX < clockCenter) {
                return Math.floor(Math.atan(yToRatio / xToRatio) * 180 / Math.PI / 30) + 9
            }
        }
    }

    function drawDigitalClock(hoursCoord, minutesCoord, secondsCoord, currentHour) {
        let second = pointerCoordinatesToValue(secondsCoord, true)
        let minute = pointerCoordinatesToValue(minutesCoord, true)
        let hour = pointerCoordinatesToValue(hoursCoord, false)
        const period = currentHour > 12 ? 'PM' : 'AM'
        second = second >= 10 ? second : `0${second}`
        minute = minute >= 10 ? minute : `0${minute}`
        hour = hour >= 10 ? hour : `0${hour + 1}`
        ctx.font = '40px monospace'
        ctx.fillStyle = "white"
        ctx.textAlign = 'center'
        ctx.fillText(`${hour}:${minute}:${second} ${period}`, clockCenter, clockCenter - 50)
    }

    function getTimeRadiansInfo(secondsFromClick) {
        const date = new Date()
        const mili = date.getMilliseconds()
        const seconds = date.getSeconds() + mili / 1000
        const minute = date.getMinutes() + seconds / 60
        const hourRaw = date.getHours()
        let secondsRadian
        if (secondsFromClick !== undefined) {
            secondsRadian = (secondsFromClick - 15) * 6 * (Math.PI / 180)
        } else {
            secondsRadian = (seconds - 15) * 6 * (Math.PI / 180)
        }
        const minuteRadian = (minute - 15) * 6 * (Math.PI / 180)
        const hourRadian = (hourRaw - 3) * 30 * (Math.PI / 180)

        return { secondsRadian, minuteRadian, hourRadian, hourRaw }
    }

    function animateClock() {
        clearClock()
        const timeRadians = getTimeRadiansInfo()
        const clockSeconds = drawSixtyPointer(timeRadians.secondsRadian)
        const clockMinutes = drawSixtyPointer(timeRadians.minuteRadian)
        const clockHours = drawHourPointer(timeRadians.hourRadian)

        drawDigitalClock(clockHours, clockMinutes, clockSeconds, timeRadians.hourRaw)
        clockAnimationId = requestAnimationFrame(animateClock)
    }

    animateClock()

    stopResumeBtn.addEventListener('click', () => {
        if (stopResumeBtn.innerHTML === 'STOP') {
            stopResumeBtn.innerHTML = 'RESUME'
            cancelAnimationFrame(clockAnimationId)
            return
        }
        animateClock()
        stopResumeBtn.innerHTML = 'STOP'
    })

    //Handle Click in the Canvas
    canvas.addEventListener('click', (event) => {
        cancelAnimationFrame(clockAnimationId)
        stopResumeBtn.innerHTML = "RESUME"
        clearClock()
        const cursorX = event.clientX - canvas.offsetLeft
        const cursorY = event.clientY - canvas.offsetTop
        const pointerX = cursorX
        const pointerY = cursorY
        const secsFromCoord = pointerCoordinatesToValue({ pointerX, pointerY }, true)
        const timeRadians = getTimeRadiansInfo(secsFromCoord)
        const clockSeconds = drawSixtyPointer(timeRadians.secondsRadian)
        const clockMinutes = drawSixtyPointer(timeRadians.minuteRadian)
        const clockHours = drawHourPointer(timeRadians.hourRadian)

        drawDigitalClock(clockHours, clockMinutes, clockSeconds, timeRadians.hourRaw)
    })
}

export default function Clock() {
    return (
        <div id="main-container" className={styles.mainContainer}>
            <button id='startStopBtn' className={styles.startStopBtn}>STOP</button>
            <canvas id='ClockCanvas'></canvas>
        </div>
    )
}