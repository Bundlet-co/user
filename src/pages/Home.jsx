import Hero from "@/components/home/Hero";
import ItemSection from "@/components/home/ItemSection";


const Home = () => {
  return (
    <div>
      <Hero/>
      <ItemSection name={ "limited offers" } category={"latest"}/>
      <ItemSection name={ "New Phones" } category={"phone"}/>
      <ItemSection name={ "Top Fashion" } category={ "fashion" } />
    </div>
  )
}

export default Home