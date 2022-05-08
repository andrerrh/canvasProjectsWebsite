import { useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'


import styles from './ProjectLoader.module.scss'
import { info } from '../canvasPages/pagesDescriptions'
import BrushPainting from './Projects/BrushPainting/BrushPainting'
import CircleRebound from './Projects/CircleRebound/CircleRebound'
import Clock from './Projects/Clock/Clock'
import DotsConnection from './Projects/DotsConnection/DotsConnection'
import DynamicTree from './Projects/DynamicTree/DynamicTree'
import ImageFlow from './Projects/ImageFlow/ImageFlow'

export default function ProjectLoader() {

    const location = useLocation()
    console.log(location)
    const navRef = useRef()
    const openBtn = useRef()

    const handleOpen = () => {
        openBtn.current.style.display = 'none'
        navRef.current.style.transform = 'translateY(0%)'
        navRef.current.style.opacity = '1'
    }

    const handleClose = () => {
        navRef.current.style.transform = 'translateY(-100%)'
        navRef.current.style.opacity = '0'
        openBtn.current.style.display = 'block'
    }

    return (
        <>
            <button ref={openBtn} onClick={handleOpen} className={styles.openButton}>V</button>
            <nav ref={navRef} className={styles.nav}>
                <button onClick={handleClose} className={styles.closeButton}>X</button>
                {location && info.map((e, i) => {
                    return (
                        <a
                            style={e.live === location.pathname ?
                                { color: 'white', borderBottom: '1px solid white' } :
                                { color: 'grey', borderBottom: 'none' }}
                            key={`p${i}`}
                            href={e.live}
                        >
                            {e.name}
                        </a>
                    )
                })}
            </nav>
            <div className={styles.projectContainer}>
                <Routes>
                    <Route path='brushpainting' element={<BrushPainting />} />
                    <Route path='circlerebound' element={<CircleRebound />} />
                    <Route path='clock' element={<Clock />} />
                    <Route path='dotsconnection' element={<DotsConnection />} />
                    <Route path='dynamictree' element={<DynamicTree />} />
                    <Route path='imageflow' element={<ImageFlow />} />
                </Routes>
            </div>
        </>
    )
}