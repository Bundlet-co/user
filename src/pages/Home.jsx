import Hero from "@/components/home/Hero";
import ItemSection from "@/components/home/ItemSection";
import useMainContext from "@/hooks/useMainContext";


const Home = () =>
{
  const {categories} = useMainContext()
  return (
    <div>
      <Hero />
      {
        categories.map( category =>
        (
          category.subCategory.map( item => (
            <ItemSection name={ `Latest ${item.name} product` } category={ item.name } key={ category.subCategory.id } />
          ))
        ))
      }
    </div>
  )
}

export default Home