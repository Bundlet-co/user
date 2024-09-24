import MobileNav from "./nav/MobileNav";
import Nav from "./nav/Nav";


const Header = () => {
  return (
    <header className="w-full">
      <Nav />
      <MobileNav/>
    </header>
  )
}

export default Header