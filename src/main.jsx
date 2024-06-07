import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Candidates from './Components/Candidates/Candidates.jsx'
import Jobs from './Components/Jobs/Jobs.jsx'
import Agency from './Components/Agency/Agency.jsx'
import News from './Components/News/News.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='job' element={<Jobs/>}/>
      <Route path='find-candidates' element={<Candidates/>}/>
      <Route path='agency' element={<Agency/>}/>
      <Route path='news' element={<News/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
