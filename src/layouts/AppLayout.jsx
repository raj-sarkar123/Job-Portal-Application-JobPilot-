import React from 'react'
import { Outlet } from 'react-router-dom'
import ThemeLayout from '@/components/ui/ThemeLayout'
import  Header  from '../components/header'
import Footer from '../components/Footer'
const AppLayout = () => {
  return (
    <ThemeLayout>
      
     {/* <div className='grid-background' ></div> */}
     <div  ></div>
      {/* <main className='min-h-screen container'> */}
      <main >
      <Header/>
      <Outlet /> 
      </main>
     <Footer/>
      
    </ThemeLayout>
  )
}

export default AppLayout
