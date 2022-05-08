import styles from './ImageFlow.module.scss'
import duneImg from '../../../assets/imgs/dune.webp'

export default function ImageFlow() {



    window.addEventListener('load', () => {
        const canvas = document.querySelector('#ImageFlowCanvas')
        const img = document.querySelector('img')
        const colorCheck = document.querySelector('#colorful')
        const imageInput = document.querySelector('#changeImage')
        const ctx = canvas.getContext('2d')
        let particles = []
        const NumberOfParticles = 5000
        let animationId = 0

        const getBrightnessMap = (rawData) => {
            const result = []
            for (let y = 0; y < canvas.height; y++) {
                let row = []
                for (let x = 0; x < canvas.width; x++) {
                    const r = rawData.data[(y * 4 * rawData.width) + (x * 4)]
                    const g = rawData.data[(y * 4 * rawData.width) + (x * 4 + 1)]
                    const b = rawData.data[(y * 4 * rawData.width) + (x * 4 + 2)]
                    const brightness = (r + g + b) / 3
                    row.push({
                        currentBrightness: brightness,
                        currentRGB: [r, g, b]
                    })
                }
                result.push(row)
            }
            return result
        }

        class Particle {
            constructor() {
                this.x = Math.floor(Math.random() * canvas.width)
                this.y = 0
                this.particleRadius = Math.random() * 2 + 1
            }

            drawParticle(brightnessMap) {
                const [r, g, b] = brightnessMap[Math.floor(this.y)][Math.floor(this.x)]['currentRGB']

                if (colorCheck.checked) {
                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
                } else {
                    ctx.fillStyle = 'white'
                }
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.particleRadius, 0, 2 * Math.PI);
                ctx.fill();
            }

            updatePosition(brightnessMap) {
                const velocity = brightnessMap[Math.floor(this.y)][Math.floor(this.x)]['currentBrightness']
                const speed = (255 - velocity) * 0.01 + 1

                this.y += speed
                if (this.y > canvas.height - 1) {
                    this.y = 0
                    this.x = Math.floor(Math.random() * canvas.width)
                }
            }
        }

        const start = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const rawImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const brightnessMap = getBrightnessMap(rawImageData)


            for (let i = 0; i < NumberOfParticles; i++) {
                particles.push(new Particle())
            }

            const animate = () => {
                ctx.globalAlpha = 0.05
                ctx.fillStyle = 'black'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.globalAlpha = 0.2
                particles.forEach((p) => {
                    p.updatePosition(brightnessMap)
                    p.drawParticle(brightnessMap)
                })
                animationId = requestAnimationFrame(animate)
            }
            animate()
        }

        start()

        imageInput.addEventListener('change', (e) => {
            cancelAnimationFrame(animationId)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles = []
            img.src = window.URL.createObjectURL(e.target.files[0])
            img.onload = () => start()
        })
    })


    return (
        <>
            <img className={styles.image} src={duneImg} alt="loaderimg" />
            <canvas className={styles.canvas} id='ImageFlowCanvas'></canvas>
            <div className={styles.controller}>
                <span className='color-check-container'>
                    <label htmlFor="colorful">Color Mode</label>
                    <input type="checkbox" name="colorful" id="colorful" />
                </span>
                <span className={styles.imgChangeContainer}>
                    <label htmlFor="changeImage">Change Image</label>
                    <input type="file" name="changeImage" id="changeImage" />
                </span>
            </div>
        </>
    )
}