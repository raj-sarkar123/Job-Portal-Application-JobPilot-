import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Children } from 'react';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Joblisting from './pages/Joblisting';
import Job from './pages/Job';
import Postjob from './pages/Postjob';
import Savedjob from './pages/Savedjob';
import Myjob from './pages/Myjob';
import ThemeLayout from './components/ui/ThemeLayout';
import ProtectedRoute from './components/ui/ProtectedRoute';


const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[{ 
        path:'/',
        element:<LandingPage/>

     },
  { 
        path:'/onboarding',
        element:
        <ProtectedRoute>
        <Onboarding/>
        </ProtectedRoute>

     },{ 
        path:'/jobs',
        element:
        <ProtectedRoute><Joblisting/>
        </ProtectedRoute>

     },{ 
        path:'/job/:id',
        element:<ProtectedRoute><Job/>
        </ProtectedRoute>

     },{ 
        path:'/post-job',
        element:<ProtectedRoute><Postjob/>
        </ProtectedRoute>

     },{ 
        path:'/saved-jobs',
        element:<ProtectedRoute><Savedjob/>
        </ProtectedRoute>

     },{ 
        path:'/my-jobs',
        element:<ProtectedRoute><Myjob/>
        </ProtectedRoute>

     }


    ]
  }

])

function App() {
  

  return (
     
  
    <RouterProvider router={router} />
    
  )
}

export default App
