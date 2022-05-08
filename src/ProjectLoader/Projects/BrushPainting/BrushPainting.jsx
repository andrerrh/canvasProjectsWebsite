export default function BrushPainting() {
window.onload = () => {
    const canvas = document.querySelector('#BrushPaintingCanvas')
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let rgb = [Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)]
    let rgbDec = [false, false, false]
    window.addEventListener('mousemove', (event) => {
        if(!rgbDec[0] && rgb[0] >= 255) rgbDec[0] = true
        if(!rgbDec[1] && rgb[1] >= 255) rgbDec[1] = true
        if(!rgbDec[2] && rgb[2] >= 255) rgbDec[2] = true
        if(rgbDec[0] && rgb[0] <= 0) rgbDec[0] = false
        if(rgbDec[1] && rgb[1] <= 0) rgbDec[1] = false
        if(rgbDec[2] && rgb[2] <= 0) rgbDec[2] = false
        !rgbDec[0] ? rgb[0] += Math.floor(Math.random() * 3) : rgb[0] -= Math.floor(Math.random() * 3)
        !rgbDec[1] ? rgb[1] += Math.floor(Math.random() * 3) : rgb[1] -= Math.floor(Math.random() * 3)
        !rgbDec[2] ? rgb[2] += Math.floor(Math.random() * 3) : rgb[2] -= Math.floor(Math.random() * 3)

        const color = `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
        new brushing(ctx, canvas.width, canvas.height, event.clientX, event.clientY, color)
    })
}

class brushing {
    constructor(ctx, cWidth, cHeight, mouseX, mouseY, color) {
        this.ctx = ctx
        this.cWidth = cWidth
        this.cHeight = cHeight
        this.radius = 50
        this.ctx.globalCompositeOperation = 'destination-over'
        this.ctx.shadowColor = 'black'
        this.ctx.shadowBlur = 2
        this.ctx.shadowOffsetX = 5
        this.ctx.shadowOffsetY = 5
        this.#drawCircle(mouseX, mouseY, color)
    }

    #drawCircle(x, y, color) {
        !this.rDec ? this.r += Math.floor(Math.random() * 3) : this.r -= Math.floor(Math.random() * 3)
        !this.gDec ? this.g += Math.floor(Math.random() * 3) : this.g -= Math.floor(Math.random() * 3)
        !this.bDec ? this.b += Math.floor(Math.random() * 3) : this.b -= Math.floor(Math.random() * 3)

        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.arc(x, y, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
    }
}



    return (
        <canvas id='BrushPaintingCanvas' style={{backgroundColor: 'white'}}></canvas>
    )
}