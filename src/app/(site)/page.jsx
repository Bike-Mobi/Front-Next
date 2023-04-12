import AboutUs from "@/components/site/AboutUs";
import Author from "@/components/site/Author";
import Feedback from "@/components/site/Feedback";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Feedback />
      <Author />
      <Footer/>
    </main>
  )
}
