import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import FeaturedProducts from '../components/Home/FeaturedProducts'
import CustomerTestimonials from '../components/Home/CustomerTestimonials'
import WhyUsSection from '../components/Home/WhyUsSection'

export const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CustomerTestimonials />
      <WhyUsSection />
    </>
  )
}
