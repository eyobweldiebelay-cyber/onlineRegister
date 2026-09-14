import React, { useState } from "react";
import api from "../../api";
import '../../css/document.css';
function Documents() {

  const [certificate, setCertificate] = useState(null);
  const [nationalId, setNationalId] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const submitDocuments = async () => {

    if (!certificate) {
      setMessage("Please select certificate");
      return;
    }

    if (!nationalId) {
      setMessage("Please select National ID");
      return;
    }

    const formData = new FormData();

    formData.append("certificate", certificate);
    formData.append("national_id", nationalId);

    try {

      await api.post("/documents/upload",formData);

      setMessage("Documents uploaded successfully");

    } catch (error) {

      setMessage(error.response?.data?.message ||"Upload failed"
      );

    }
  };

  return (
    <div className="all-continer">

      <strong className="strong">Document Submission</strong>

      <p className="p">
        Upload the required documents to complete your registration.
      </p>

      {/* PROGRESS */}

      <div className="content">

        <div className="progress">
          <strong>Document Progress</strong>

          <strong>{progress}%</strong>
        </div>

        <div className="progress-style">
          <div
            style={{
              width: `${progress}%`
            }}
          />
        </div>

        <div>
          <span className="span-correct">
            {certificate ? "✓ Certificate" : "○ Certificate"}
          </span>

          <span className="span-false">
            {nationalId ? "✓ National ID" : "○ National ID"}
          </span>
        </div>

      </div>

      {/* CERTIFICATE */}

      <div>

        <strong className="strong">Your Certificate</strong>

        <p className="p">
          Accepted: PDF only • Maximum size: 5 MB
        </p>

        <input className="input"
          type="file"
          accept=".pdf"
          onChange={(e) => {

            const file = e.target.files[0];

            setCertificate(file);

            if (file) {
              setProgress(nationalId ? 100 : 50);
            }

          }}
        />

        {certificate && (
          <p className="p">
            ✓ {certificate.name}
          </p>
        )}

      </div>

      {/* NATIONAL ID */}

      <div className="natinalid">

        <strong className="strong"> Sent Your National ID</strong>

        <p className="p">
          Accepted: PDF, JPG, PNG • Maximum size: 5 MB
        </p>

        <input
          type="file" className="input"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {

            const file = e.target.files[0];

            setNationalId(file);

            if (file) {
              setProgress(certificate ? 100 : 50);
            }

          }}
        />

        {nationalId && (
          <p className="p">
            ✓ {nationalId.name}
          </p>
        )}

      </div>

      {/* SUBMIT */}

      <button className="button"
        onClick={submitDocuments}
        disabled={!certificate || !nationalId}
      >
        Submit Documents
      </button>

      {/* MESSAGE */}

      {message && (
        <p className="p">
          {message}
        </p>
      )}

    </div>
  );
}

export default Documents;