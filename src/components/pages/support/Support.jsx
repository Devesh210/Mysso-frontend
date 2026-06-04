import Supportbanner from "./Supportbanner"
import SupportCategories from "./SupportCategories"
import Supportintro from "./Supportintro"
import Supportnum from "./Supportnum"
import Supporttestimonial from "./Supporttestimonial"
import Supporttypes from "./Supporttypes"

const Support = () => {
    return (
        <div>
            <Supportbanner/>
            <Supportintro/>
            {/* <Supportnum/> */}
            <SupportCategories/>
            <Supporttypes/>
            <Supporttestimonial/>
        </div>
    )
}

export default Support