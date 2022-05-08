import { useState } from 'react'

import styles from './DotsConnection.module.scss'

export default function DotsConnection() {

    const [inputValue, setInputValue] = useState(100)

    window.onload = () => {
        const canvas = document.querySelector('#DotsConnectionCanvas')
        const blackBtn = document.querySelector('.black-btn')
        const whiteBtn = document.querySelector('.white-btn')
        const topDiv = document.querySelector('#topDiv')

        blackBtn.addEventListener('mouseover', () => {
            blackBtn.style.backgroundColor = 'white';
            whiteBtn.style.backgroundColor = 'white';
            blackBtn.style.color = 'black';
            whiteBtn.style.color = 'black';
            canvas.style.backgroundColor = 'black'
        })

        whiteBtn.addEventListener('mouseover', () => {
            blackBtn.style.backgroundColor = 'black';
            whiteBtn.style.backgroundColor = 'black';
            blackBtn.style.color = 'white';
            whiteBtn.style.color = 'white';
            canvas.style.backgroundColor = 'white'
        })

        blackBtn.addEventListener('click', () => {
            topDiv.style.display = 'none'
            startMouseAnimation()
        })
        whiteBtn.addEventListener('click', () => {
            topDiv.style.display = 'none'
            startMouseAnimation()
        })

        //Animation Code
        const ctx = canvas.getContext('2d')
        const input = document.querySelector('input')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        let multX
        let multY
        let numberOfDots = 100
        let dotsList = []

        function startDefaultAnimation(numberOfDots) {
            let dotsList = []

            for (let i = 0; i < numberOfDots; i++) {
                const randomX = Math.random() * canvas.width
                const randomY = Math.random() * canvas.height
                const xSpeed = Math.random() * (3 + 1) - 1
                const ySpeed = Math.random() * (3 + 1) - 1
                if (i < numberOfDots / 5) {
                    multX = 1
                    multY = 1
                }
                if (i >= numberOfDots / 5 * 2) {
                    multX = 1
                    multY = -1
                }
                if (i >= numberOfDots / 5 * 3) {
                    multX = -1
                    multY = 1
                }
                if (i >= numberOfDots / 5 * 4) {
                    multX = -1
                    multY = -1
                }

                dotsList.push(new dotsConnection(canvas, ctx, randomX, randomY, xSpeed * multX, ySpeed * multY))
            }
            return dotsList
        }
        let mouseArea = {}
        let areaSize = 10
        dotsList = startDefaultAnimation(numberOfDots)

        function startMouseAnimation() {
            window.addEventListener('mousemove', (event) => {
                mouseArea = {
                    xStart: Math.floor(event.clientX - canvas.width / areaSize),
                    yStart: Math.floor(event.clientY - canvas.height / areaSize),
                    xEnd: Math.floor(event.clientX + canvas.width / areaSize),
                    yEnd: Math.floor(event.clientY + canvas.height / areaSize)
                }
            })

            window.addEventListener('wheel', (event) => {
                areaSize += event.deltaY / 100
                if (areaSize > 18) areaSize = 18
                if (areaSize < 2) areaSize = 2
                mouseArea = {
                    xStart: Math.floor(event.clientX - canvas.width / areaSize),
                    yStart: Math.floor(event.clientY - canvas.height / areaSize),
                    xEnd: Math.floor(event.clientX + canvas.width / areaSize),
                    yEnd: Math.floor(event.clientY + canvas.height / areaSize)
                }
            })

            setInterval(() => {

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                let dotsInsideArea = []

                dotsList.forEach((dot) => {
                    if (dot.isInsideMouseArea(mouseArea)) {
                        dotsInsideArea.push(dot)
                    }
                })

                dotsInsideArea.forEach(dot => dot.createConnection(dotsInsideArea))
            }, 20)
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            dotsList.forEach((dot) => {
                dot.cancelAnimation()
                dot.startCircleMovement()
            })
        })

        input.addEventListener('keyup', () => {
            dotsList.forEach((dot) => {
                dot.cancelAnimation()
            })
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            dotsList = startDefaultAnimation(input.value)
        })
    }

    class dotsConnection {
        #radius = Math.random() * (5 - 3) + 3
        #color = 0
        #animationId

        constructor(canvas, ctx, x, y, xAdder, yAdder) {
            this.canvas = canvas
            this.ctx = ctx
            this.x = x
            this.y = y
            this.xAdder = xAdder
            this.yAdder = yAdder
            this.startCircleMovement()
        }

        isInsideMouseArea(area) {
            return this.x > area.xStart && this.x < area.xEnd && this.y > area.yStart && this.y < area.yEnd
        }

        createConnection(dotsInsideArea) {
            dotsInsideArea.forEach((dot) => {
                this.ctx.beginPath()
                this.ctx.moveTo(this.x, this.y)
                this.ctx.lineTo(dot.x, dot.y)
                this.ctx.stroke()
            })

        }

        #drawCircle() {
            this.ctx.beginPath()
            this.ctx.arc(this.x, this.y, this.#radius, 0, Math.PI * 2)
            this.ctx.fill()
        }

        checkAndChangePosition() {
            if (this.x > this.canvas.width) this.x = 0
            if (this.y > this.canvas.height) this.y = 0
            if (this.x < 0) this.x = this.canvas.width
            if (this.y < 0) this.y = this.canvas.height
        }

        startCircleMovement() {
            this.ctx.clearRect(this.x - this.#radius - 1, this.y - this.#radius - 1, this.#radius * 2.5, this.#radius * 2.5)
            this.#color += 0.1
            this.ctx.fillStyle = `HSL(${this.#color}, 100%, 50%)`
            this.ctx.strokeStyle = `HSL(${this.#color}, 100%, 50%)`
            this.x += this.xAdder
            this.y += this.yAdder
            this.checkAndChangePosition()
            this.#drawCircle()
            this.#animationId = requestAnimationFrame(this.startCircleMovement.bind(this))
        }

        cancelAnimation() {
            cancelAnimationFrame(this.#animationId)
        }
    }

    return (
            <div className={styles.mainContainer}>
                <div id='topDiv'className={styles.inputContainer}>
                    <button className='black-btn'>Black Background</button>
                    <button className='white-btn'>White Background</button>
                    <input className={styles.input} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                </div>
                <canvas id='DotsConnectionCanvas'></canvas>
            </div>
    )
} 