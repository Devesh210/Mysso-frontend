import banner from "../../../assets/matrimonial/search.png"
import { Container } from 'react-bootstrap'
import Aboutmembercards from "./Aboutmembercards"

const Aboutmemberdetail = () => {
    return (
        <div>
            <Container fluid style={{ padding: '0px' }}>
                <div className="image-container mb-3">
                    <img src={banner} className="w-100" alt="" />
                    <div className="overlay12">
                    </div>
                </div>
            </Container>
            <Aboutmembercards/>
        </div>
    )
}

export default Aboutmemberdetail