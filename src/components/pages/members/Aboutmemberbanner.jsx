import { useNavigate } from "react-router-dom"
import startup from "../../../assets/memberbanner.jpeg"

const Aboutmemberbanner = () => {
    const Navigate = useNavigate();
    return (
        <div>
            <div className="container-fluid" style={{ padding: 0 }}>
                <div className="image-container">
                    <img src={startup} className="w-100" alt="" />
                    <div className="overlay12">
                        <div className="overlaycontentnt starup">
                            {/* <h3>Lorem Ipsum is simply dummy text of the <br/>printing and typesetting industry.</h3> */}
                            <button className="search-partner" onClick={() => Navigate('/Aboutmemberdetail')}>View All Members</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Aboutmemberbanner