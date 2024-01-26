import Logo from "../../assets/img/pokemon-logo.png";

export default function Navbar(){
  return (
    <nav className="bg-[#ef5350] h-32 flex justify-center items-center">
      <img src={Logo} alt={Logo} className="h-24"/>
    </nav> 
  )
}
