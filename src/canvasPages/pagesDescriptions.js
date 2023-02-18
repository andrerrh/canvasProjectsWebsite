import brushImg from '../assets/imgs/brushpainting.webp'
import circleImg from '../assets/imgs/circlerebound.webp'
import clockImg from '../assets/imgs/clock.webp'
import dotsImg from '../assets/imgs/dotsconnection.webp'
import flowImg from '../assets/imgs/imageflow.webp'
import treeImg from '../assets/imgs/dynamictree.webp'

const circleRebound = {
    name: 'Circle Rebound',
    description: 'Draw rebouncing circles at position by clicking the canvas',
    image: circleImg,
    git: 'https://github.com/andrerrh/JSCanvasCircleRebound',
    live: 'canvasProjectsWebsite/project/circlerebound'
}

const brushPainting = {
    name: 'Brush Painting',
    description: 'Simple mouse movement based project that allows the user to draw shadowed circles',
    image: brushImg,
    git: 'https://github.com/andrerrh/JSCanvasBrushPainting',
    live: 'canvasProjectsWebsite/project/brushpainting'
}

const clock = {
    name: 'Math Clock',
    description: 'Draws a analog clock based on user\' current time, using trigonometry to draw it\'s pointers, also possible to set seconds by clicking on the clock ',
    image: clockImg,
    git: 'https://github.com/andrerrh/JSCanvasClock',
    live: 'canvasProjectsWebsite/project/clock'
}

const dotsConnection = {
    name: 'Dots Connection',
    description: 'A Vanilla JavaScript Canvas project for visual animation of line-connecting dots with mouse interaction, in both mouse movement and scroll up/down.',
    image: dotsImg,
    git: 'https://github.com/andrerrh/JSCanvasDotsConnection',
    live: 'canvasProjectsWebsite/project/dotsconnection'
}

const imageFlow = {
    name: 'Image Flow',
    description: 'Image redraw project based on particles speed and position on JS Vanilla Canvas, based on Franks laboratory\'s incredible videos',
    image: flowImg,
    git: 'https://github.com/andrerrh/JSCanvasImageFlow',
    live: 'canvasProjectsWebsite/project/imageflow'
}

const dynamicTree = {
    name: 'Dynamic Binary Tree',
    description: 'Draws a binary tree on screen, based on a "heap" input by the user, highlights nodes and their paths when hovered',
    image: treeImg,
    git: 'https://github.com/andrerrh/JSCanvasDynamicBinaryTree',
    live: 'canvasProjectsWebsite/project/dynamictree'
}

export const info = [circleRebound, brushPainting, clock, dotsConnection, imageFlow, dynamicTree]