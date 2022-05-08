export default function CircleRebound() {
let canvas
let ctx

window.onload = () => {
    canvas = document.querySelector('#CircleReboundCanvas')
    ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.font = '80px monospace'
    ctx.fillStyle = "white"
    ctx.textAlign = 'center'
    ctx.fillText('CLICK ME!', canvas.width / 2, canvas.height / 2)

    let circlesCreated = []

    canvas.addEventListener('click', (event) => {
        const randomRadius = Math.random() * (80 - 10) + 10
        const circle1 = new animationFlow(ctx, canvas.width, canvas.height, event.clientX, event.clientY, randomRadius, true, true, window)
        const circle2 = new animationFlow(ctx, canvas.width, canvas.height, event.clientX, event.clientY, randomRadius, true, false, window)
        const circle3 = new animationFlow(ctx, canvas.width, canvas.height, event.clientX, event.clientY, randomRadius, false, true, window)
        const circle4 = new animationFlow(ctx, canvas.width, canvas.height, event.clientX, event.clientY, randomRadius, false, false, window)
        circlesCreated.push(circle1, circle2, circle3, circle4)
    })

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        circlesCreated.forEach((circle) => {
            circle.cancelAnimation()
        })
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        circlesCreated.forEach((circle) => {
            circle.cWidth = canvas.width
            circle.cHeight = canvas.height
            circle.animate()
        })
    })
}

class animationFlow {
    #oldCircleX
    #oldCircleY
    #circleXV = 8
    #circleYV = 4

    constructor(ctx, width, height, circleX, circleY, circleR, goDown, goRight, window) {
        this.ctx = ctx
        this.cWidth = width
        this.cHeight = height
        this.circleX = circleX
        this.circleY = circleY
        this.circleR = circleR
        this.goDown = goDown
        this.goRight = goRight
        this.window = window
        this.animationId = 0
        this.animate()
        this.ctx.strokeStyle = 'white'
    }

    #buildCircle() {
        this.ctx.beginPath()
        this.ctx.lineWidth = 3
        this.ctx.arc(this.circleX, this.circleY, this.circleR, 0, 2 * Math.PI)
        this.ctx.stroke()
    }

    #changeCircleColor() {
        const color = `RGB(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        this.ctx.strokeStyle = color
    }

    #checkAndChangeDirection() {
        if (this.goRight && this.circleX + this.circleR >= this.cWidth) {
            this.goRight = false
            this.#changeCircleColor()
        }
        if (!this.goRight && this.circleX - this.circleR <= 0) {
            this.goRight = true
            this.#changeCircleColor()
        }

        if (this.goDown && this.circleY + this.circleR >= this.cHeight) {
            this.goDown = false
            this.#changeCircleColor()
        } 
        if (!this.goDown && this.circleY - this.circleR <= 0) {
            this.goDown = true
            this.#changeCircleColor()
        } 

        this.goRight ? this.circleX += this.#circleXV : this.circleX -= this.#circleXV
        this.goDown ? this.circleY += this.#circleYV : this.circleY -= this.#circleYV
    }

    animate() {
        this.ctx.clearRect(this.#oldCircleX - this.circleR - 3, this.#oldCircleY - this.circleR - 3, this.circleR * 2.1, this.circleR * 2.1)
        this.#oldCircleX = this.circleX
        this.#oldCircleY = this.circleY
        this.#buildCircle()
        this.#checkAndChangeDirection()
        this.animationId = requestAnimationFrame(this.animate.bind(this))
    }

    cancelAnimation() {
        cancelAnimationFrame(this.animationId)
    }
}

    return (
        <canvas id='CircleReboundCanvas'style={{backgroundColor: 'black'}}></canvas>
    )
}