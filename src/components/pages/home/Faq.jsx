import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';

import borderimg from '../../../assets/border.svg';

const Faq = () => {
    const achieveBanner = [
        "1- Is My Profile Secure On The Swaminarayan Satsangi Organisation Matrimonial Platform?",
        "2- Are All The Profiles Uploaded To The Swaminarayan Satsangi Organisation Of Swaminarayan Followers, And Are They Verified?",
        "3- Who Can Register Their Profile For Marriage On The Swaminarayan Satsangi Organisation Matrimonial Platform?",
        "4- How Does The Swaminarayan Satsangi Organisation Foster Community And Support Among Its Members Through Its Various Services And Initiatives?",
        "5- How Can Employers And Employees Devotees of Swaminarayan Get In Touch With Each Other?",
        "6- Does The Swaminarayan Satsangi Organisation Offer Students Vocational Educational Guidance?",
        "7- How Do You Get Investors Support For Startup Businesses?",
        "8- How Do You Join Business Networking And Professional Networking To Expand Business Growth?",
        "9- Does ShreeSSO Provide Regular Health Checkups For The Satangi Community?",
        "10. What support a senior citizen can get from ShreeSSO ?",
    ];

    const achievetitleText = [
        "Your Profile is secure on the Swaminarayan Satsangi organisation's matrimonial platform. The organisation prioritises the privacy and security of its members' information. Strong security measures protect your data, ensuring only authorized users can access the platform.",
        "Yes, all profiles uploaded on the Swaminarayan Satsangi Organisation of Swaminarayan followers undergo a thorough verification process. Each Profile is carefully reviewed to ensure authenticity and adherence to the community's standards and values.",
        "Only followers of the Swaminarayan Sampraday can register their profiles on the Swaminarayan Satsangi Organisation's  (ShreeSSO) matrimonial platform. This platform is designed explicitly for Swaminarayan devotees seeking a life partner within the same religious community. Registrants must adhere to the principles and values of the Swaminarayan Sampraday, ensuring that all profiles reflect the organization's cultural and spiritual standards.",
        "The Swaminarayan Satsangi Organisation fosters community and support among its members through various services and initiatives. Its matrimonial platform helps followers find compatible life partners within the Sampraday, while the jobs portal connects job seekers with opportunities. Education assistance, innovation and startup support, and business and professional networking foster personal and professional growth. Health First initiatives promote wellness, and senior citizens' welfare programs ensure the care of older adults. The organisation creates a supportive, interconnected community that provides these services to enhance its members' spiritual and practical lives.",
        "The ShreeSSO platform plays a significant role in the job portal. Here, Swaminarayan devotees can join this platform in search of a job. Employers and employees can connect, trust each other, and be loyal to their jobs.",
        "Swaminarayan Satsangi Organisation helps students offer vocational educational guidance for better future growth.",
        "ShreeSSO supports Swaminarayan devotees in becoming members of this digital platform. Any business entrepreneur seeking investment through innovative ideas can reach this platform. Even investors can capitalise on the business according to their ideas and business strategy.",
        "All Satsangi from different business and professional networks can join this platform to seek assistance for their industry or career. They must be Satsangi members and can quickly enter this platform to approach one another for growth.",
        "ShreeSSO is pleased to offer small health camps for the Satsangi Community so they can easily access these health services and checkups to stay healthy. These camps include routine health and eye check camps and women's breast and cervical cancer check camps. ",
        "A. ShreeSSO will be periodically planning medical check up for senior citizen",
    ]

    return (
        <div className='faq-section'>
            <Container fluid>
                <div className='faq'>
                    <h3>Frequently Asked  <span>Questions</span> <img className='imgfaq' src={borderimg} alt="border" /></h3>
                </div>
                <div className='faqsec'>
                    <Accordion defaultActiveKey="0">
                        {achieveBanner.map((text, index) => (
                            <Accordion.Item key={index} eventKey={index.toString()}>
                                <Accordion.Header>{text}</Accordion.Header>
                                <Accordion.Body>
                                    {achievetitleText[index]}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </Container>
        </div>
    );
};

export default Faq;
