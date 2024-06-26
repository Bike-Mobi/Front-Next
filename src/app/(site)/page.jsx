'use client'

import AboutUs from "@/components/site/AboutUs";
import Author from "@/components/site/Author";
import Feedback from "@/components/site/Feedback";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import { ApiContext } from "@/contexts/Api";
import { useContext, useEffect, useState } from "react";

export default function Home() {

  const { instance } = useContext(ApiContext)

  const [infos, setInfos] = useState({})

  useEffect(() => {
    instance.get('/abouts').then(resp => {
      const data = resp.data;
      setInfos(data)
    })
  }, [])

  return (
    <main>
      <Hero />
      <AboutUs title={infos.title} description={infos.description}/>
      <Feedback 
        feedback_title_1={infos.feedback_title_1} feedback_text_1={infos.feedback_text_1} feedback_author_1={infos.feedback_author_1} feedback_type_1={infos.feedback_type_1}
        feedback_title_2={infos.feedback_title_2} feedback_text_2={infos.feedback_text_2} feedback_author_2={infos.feedback_author_2} feedback_type_2={infos.feedback_type_2}
        feedback_title_3={infos.feedback_title_3} feedback_text_3={infos.feedback_text_3} feedback_author_3={infos.feedback_author_3} feedback_type_3={infos.feedback_type_3}
      />
      <Author 
        mission={infos.mission} instagram_roberlan={infos.instagram_roberlan} facebook_roberlan={infos.facebook_roberlan} linkedin_roberlan={infos.linkedin_roberlan}
      />
      <Footer
        instagram={infos.instagram} facebook={infos.facebook} youtube={infos.youtube} email={infos.email}
      />
    </main>
  )
}
