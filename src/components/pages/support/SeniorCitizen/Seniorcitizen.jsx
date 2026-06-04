
import Seniorcitizenbanner from "./Seniorcitizenbanner"
import Supporttestimonial from "../Supporttestimonial"
import Supporttypes from "../Supporttypes"
import Seniorcitizenintro from "./Seniorcitizenintro"
import SeniorMainbanner from "./SeniorMainbanner"

const Seniorcitizen = () => {
  return (
    <div>
      <SeniorMainbanner/>
      <Seniorcitizenbanner/>
      <Seniorcitizenintro/>
      {/* <Supporttypes/> */}
      <Supporttestimonial/>
    </div>
  )
}

export default Seniorcitizen
