import { Container, Row, Col } from "react-bootstrap"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ash1 from "../../../assets/supportlogo.png"
import PatronMember from "./PatronMember";
import ChiefPatronMember from "./ChiefPatronMember";
import DirectorMember from "./DirectorMember";
const Aboutmembercards = () => {
    return (
        <>
            <div className='edutionalbanner'>
                <Container fluid>

                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-5 mt-5 members-details-tabs"
                    >
                        <Tab eventKey="profile" title="Patron Members">
                            <PatronMember/>
                        </Tab>

                        <Tab eventKey="home" title="Chief Patron Members">
                            <ChiefPatronMember/>
                        </Tab>
                        
                        {/* <Tab eventKey="contact" title="Directors">
                            <DirectorMember />
                        </Tab> */}
                    </Tabs>
                </Container>
            </div>
        </>
    )
}

export default Aboutmembercards