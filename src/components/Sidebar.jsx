import useMainContext from "@/hooks/useMainContext";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link, useSearchParams } from "react-router-dom";

const Sidebar = () =>
{
  const {categories} = useMainContext()
  const [ searchParams ] = useSearchParams()
  
  const cat = searchParams.get('category');
  return (
    <div>
      <p className="text-regular font-bold uppercase">
        Categories
      </p>
      <hr />
      <Accordion isCompact>
        { categories.map( category => (
          <AccordionItem  key={category.id} title={`${category.name.slice(0,15)}...`} classNames={{ title:"text-small font-semibold" }}>
            <div className="flex flex-col gap-2 my-2">
              { category.subCategory.map( item => (
                <Link to={`/product?category=${item.name}`} key={item.id} className={cat && cat.toLowerCase()=== item.name.toLowerCase() ?"text-tiny ms-4 bg-neutral-100 p-2 rounded-md hover:bg-neutral-200 border-l-2 border-r-2 border-primary-300": "text-tiny ms-4 bg-neutral-100 p-2 rounded-md hover:bg-neutral-200"} role="button">
                  {item.name}
                </Link>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default Sidebar