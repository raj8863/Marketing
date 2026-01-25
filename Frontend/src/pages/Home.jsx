import React from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/hero/Hero'
import Services from './Services'
import About from './About'
import Features from './Features'
import Projects from './Projects'
import Newletter from './Newletter'

const Home = () => {
  return (
    <>
    <Hero/>
    <Services/>
    <About/>
    <Features/>
    <Projects/>
    <Newletter/>
    </>
  )
}

export default Home
