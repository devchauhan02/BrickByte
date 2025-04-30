import React from 'react'
import Hero from '../component/Hero'
import Companies from '../component/Companies'
import Residencies from '../component/Residencies'
import Value from '../component/Value'
import Contact from '../component/Contact'
import GetStarted from '../component/GetStarted'
const Website = () => {
  return (
    <div className="relative overflow-x-clip ">
      {/* White Gradient Blur */}
      <div className="absolute top-0 left-0 w-[25rem] h-[25rem] bg-white opacity-20 blur-[90px] rounded-full z-[51]" />

      {/* Main Content */}
      <div className="relative z-[1]">
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value/>
      <Contact />
      <GetStarted />
    </div>
  )
}

export default Website