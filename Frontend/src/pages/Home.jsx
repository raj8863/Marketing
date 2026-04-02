import React from 'react'
import Hero from '../components/hero/Hero'
import About from './About'
import Services from './Services'
import Testimonials from './Testimonials'
import Features from './Features'

import Projects from './project/Projects'
import Newletter from './Newletter'
import UtilityController from './UtilityController'
import VideoReview from './project/VideoReview'
import Certifications from './Certifications'
import FAQSection from './FAQSection'
import VideoSection from './VideoSection'
import FeedbackSection from './AddFeedback'




const Home = () => {
  return (
    <>
      {/* Alpha Utilities */}
      <UtilityController />
      {/* Page Content */}
      <Hero />
      <About showHero={false} />
      <Services showHero={false} />
      <Testimonials />
      <Features />
      <Projects showHero={false} />
      <VideoSection />
      <FeedbackSection />
      <VideoReview />
      <Newletter />
      <FAQSection showHero={false}/>
       <Certifications />





    </>
  )
}

export default Home