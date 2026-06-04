import React from 'react'

import banner from "../../../assets/matrimonial/search.png"
import { Container } from 'react-bootstrap'

const Banner = () => {
    return (
        <div>
            <Container fluid style={{ padding: '0px' }}>
                <div className="image-container mb-0">
                    <img src={banner} className="w-100" alt="" />
                    <div className="overlay12">
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Banner
