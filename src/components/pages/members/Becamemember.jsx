import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../../assets/matrimonial/search.png"
import { Container, Form } from 'react-bootstrap'

const Becamemember = () => {
    const Navigate = useNavigate();

    const [proceed, setProceed] = useState(false)

const handleproceed = () => {
    try {
        if (!proceed) {
            swal({
                text: "Please accept the terms and conditions",
                icon: "warning",
                dangerMode: true,
            })
        } else {
        Navigate('/MemberForm')
        }
    } catch (error) {
        console.log(error)
    }
}

console.log("proceed",proceed)

    return (
        <div>
            <Container fluid style={{ padding: '0px' }}>
                <div className="image-container mb-3">
                    <img src={banner} className="w-100" alt="" />
                    <div className="overlay12">
                    </div>
                </div>
            </Container>
            <Container>
                <div className="became-member-text">
                    <h3>Become a Member of ShreeSSO</h3>
                    <p>   At ShreeSSO, you can support our community by becoming a member and helping us
                        achieve our vision and mission. We offer three membership tiers, starting with the
                        Patron Member tier:</p>
                    <ul className="listi-meber">
                        <li><b>Patron Member -</b> To become a Patron Member, you can donate  ₹1,11,111.</li>
                        <li><b>Chief Patron Member -</b> You can either upgrade to Chief Patron after
                            becoming a Patron Member or start directly at this level by donating
                            ₹11,11,111. The choice is yours.</li>
                        <li><b>Director -</b> To become a Director, you must first be a Chief Patron Member,
                            and then you can upgrade to this exclusive tier.</li>
                    </ul>
                    <p>Each membership tier plays a vital role in helping ShreeSSO grow and thrive. Your
                        support as a member will be crucial in achieving our community’s goals.
                        For more details or to make a membership payment, please contact us at:</p>
                    <div className="socials-abcd">
                        <h4><b>Email:</b> info@shreesso.org</h4>
                        <h4><b>Phone:</b> +91 9321131170</h4>
                    </div>
                    <Form.Group className="mb-5 mt-3" id="formGridCheckbox">
                        <Form.Check 
                        type="checkbox" 
                        label="I have read and agree to the terms and conditions" 
                        onChange={(e) => setProceed(e.target.checked)}
                        />
                </Form.Group>
        </div>
            </Container >
            <button type='submit' className='submitforms' onClick={handleproceed}  >Proceed</button>
        </div >
    )
}

export default Becamemember