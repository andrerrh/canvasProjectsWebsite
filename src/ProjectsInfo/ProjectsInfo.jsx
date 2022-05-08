import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'

import styles from './ProjectsInfo.module.scss'

export default function ProjectsInfo({project}) {
    return (
        <div className={styles.infosContainer}>
            <div className={styles.projectsInfo}>
                <h3 className={styles.title}>{project.name}</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>{project.description}</li>
                </ul>
            </div>
            <div className={styles.links}>
                <a
                    href={project.git}
                    className={styles.githubLink}
                >
                    <FontAwesomeIcon icon={faGithubAlt} />
                    <p>Project on GitHub</p>
                </a>
                <a
                    href={project.live}
                    className={styles.liveDemo}
                >
                    <FontAwesomeIcon icon={faRocket} />
                    <p>Live Demo</p>
                </a>
            </div>
        </div>
    )
}