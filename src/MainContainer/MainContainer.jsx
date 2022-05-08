import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import styles from './MainContainer.module.scss'
import ProjectsInfo from '../ProjectsInfo/ProjectsInfo'
import { info } from '../canvasPages/pagesDescriptions'

export default function MainContainer() {

    const [currentImg, setCurrentImg] = useState(info[0].image)
    const [currentProject, setCurrentProject] = useState(info[0])

    const btnsRef = useRef([])
    const underlineRef = useRef()

    useEffect(() => {
        btnsRef.current[0].style.color = 'white'
    }, [btnsRef])

    const handleClick = (e, i) => {
        setCurrentImg(e.image)
        setCurrentProject(e)
        btnsRef.current.forEach((e) => {
            i === 1 ? e.style.color = 'purple' : e.style.color = 'grey'
        })
        btnsRef.current[i].style.color = 'white'
        underlineRef.current.style.transform = `translateX(${i * 100}%)`
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <header className={styles.header}>
                    <div ref={underlineRef} className={styles.underline}></div>
                    {info.map((e, i) => {
                        return <button
                            key={`btn${i}`}
                            ref={e => btnsRef.current[i] = e}
                            onClick={() => handleClick(e, i)}
                        >
                            {e.name}
                        </button>
                    })}
                </header>
                <div className={styles.siteDisplay}>
                    <div className={styles.infosContainer}>
                        <ProjectsInfo project={currentProject} />
                    </div>
                    <img className={styles.img}
                        src={currentImg}
                        alt="dynamictree" />
                </div>
                <footer className={styles.footer}>
                    <a href="https://github.com/andrerrh">
                    <FontAwesomeIcon icon={faGithub} />
                    </a>
                </footer>
            </div>
        </>
    )
}