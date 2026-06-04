import React from 'react';
import AOA from '../assets/certificates/AoA.pdf';
import Approval_Letter from '../assets/certificates/APPROVAL_LETTER.pdf';
import Coi from '../assets/certificates/COI.pdf';
import Moa from '../assets/certificates/MoA.pdf';

const Governmentregistration = () => {

  const certificates = [
    { name: 'ARTICLES OF ASSOCIATION (AOA)', file: AOA, className: 'certificate-aoa' },
    { name: 'APPROVAL LETTER', file: Approval_Letter, className: 'certificate-approval' },
    { name: 'CERTIFICATE OF INCORPORATION (COI)', file: Coi, className: 'certificate-coi' },
    { name: 'MEMORANDUM OF ASSOCIATION (MOA)', file: Moa, className: 'certificate-moa' }
  ];

  const openPdfInNewWindow = (file) => {
    window.open(file, '_blank');
  };

  return (
    <div className="gov-reg-container mt-4">
      <h1 className="gov-reg-title text-center mb-4">Government Registration Certificates</h1>
      <div className="row">
        {certificates.map((certificate, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className={`gov-reg-card p-3 shadow-sm ${certificate.className}`}>
              <h4 className="gov-reg-card-title text-center">{certificate.name}</h4>
              <button
                className="gov-reg-btn btn btn-primary w-100 mt-3"
                onClick={() => openPdfInNewWindow(certificate.file)}
              >
                View PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Governmentregistration;
