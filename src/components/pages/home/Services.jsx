import React from 'react'
import { Link } from 'react-router-dom'
const Services = (props) => {

    const { Slider, settings1, images, texts, links } = props
    return (
        <div>
            <Slider className="slider1" {...settings1}>
                {images.map((image, index) => (
                    <div key={index}>
                        <Link to={links[index]} >
                            <img className='w-100' src={image} alt="" />
                            <h3 className='servicetext'>{texts[index]}</h3>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Services
