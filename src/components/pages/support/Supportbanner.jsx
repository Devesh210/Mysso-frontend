import startup from "../../../assets/supportbanner.jpeg"

const Supportbanner = () => {
    return (
        <div>
            <div className="container-fluid" style={{ padding: 0 }}>
                <div className="image-container">
                    <img src={startup} className="w-100" alt="" />
                    <div className="overlay12">
                        <div className="overlaycontentnt starup">
                            <h3>Get in touch with a wide range of exclusive support services from ShreeSSO.</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Supportbanner
