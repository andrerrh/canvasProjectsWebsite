import { Routes, Route } from 'react-router-dom'

import style from './App.module.scss'
import MainContainer from './MainContainer/MainContainer'
import ProjectLoader from './ProjectLoader/ProjectLoader'

function App() {
  return (
    <div className={style.appContainer}>
      <Routes>
        <Route  exact path ='/' element={<MainContainer />} />
        <Route path ='/project/*' element={<ProjectLoader />} />
      </Routes>
    </div>
  )
}

export default App;
