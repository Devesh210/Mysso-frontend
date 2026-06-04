import Pricing from "../matrimonial/Pricing"
import Aboutmemberbanner from "./Aboutmemberbanner"
import Aboutmemberintro from "./Aboutmemberintro"
import Aboutmembersteps from "./Aboutmembersteps"
import MemberSupport from "./MemberSupport"

const Aboutmember = () => {
  return (
    <div>
        <Aboutmemberbanner/>
        <Aboutmemberintro/>
        {/* <Aboutmembersteps/> */}
        <MemberSupport/>
        {/* <Pricing/> */}
    </div>
  )
}

export default Aboutmember
