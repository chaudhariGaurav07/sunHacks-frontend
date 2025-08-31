import React from 'react'
import Navbar from '../components/Layouts/Navbar'
import Footer from '../components/Layouts/Footer'
import HeroSection from '../components/Hero'
import Features from '../components/Features'
import WorkflowSection from '@/components/WorkflowSection'
import FAQSection from '@/components/FAQ'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <Features/>
        <WorkflowSection/>
        <FAQSection/>
        <Footer/>

    </div>
  )
}

export default Home