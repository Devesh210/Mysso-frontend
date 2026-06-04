import Medicalsupportbanner from "./Medicalsupportbanner"
import Supporttestimonial from "../Supporttestimonial"
import Supporttypes from "../Supporttypes"
import Medicalbanner from "./Medicalbanner"
import Medicalintro from "./Medicalintro"

const Medicalsupport = () => {
  return (
    <div>
      <Medicalbanner />
      <Medicalsupportbanner />
      <Medicalintro />
      <Supporttypes />
      <Supporttestimonial />
    </div>
  )
}

export default Medicalsupport
