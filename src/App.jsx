import { Routes, Route } from 'react-router-dom'

import style from './App.module.scss'
import MainContainer from './MainContainer/MainContainer'
import ProjectLoader from './ProjectLoader/ProjectLoader'

function App() {
  return (
    <div className={style.appContainer}>
      <Routes>
        <Route  path ='/canvasProjectsWebsite' element={<MainContainer />} />
        <Route path ='canvasProjectsWebsite/project/*' element={<ProjectLoader />} />
      </Routes>
    </div>
  )
}

export default App;
