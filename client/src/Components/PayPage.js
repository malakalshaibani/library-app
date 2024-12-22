import { useNavigate } from 'react-router-dom';
import check from '../Images/check.png'

import oo from '../Images/6.jpeg';  // Import the background image

function PayPage() {

  const navigate =useNavigate();


  const handleGoBack = () => {

    navigate("/home"); // Redirect to the homepage or desired route

  };


  return (

    <div style={{ backgroundImage: `url(${oo})`, // Apply background image dynamically

          backgroundSize: 'cover',

          backgroundPosition: 'center',

          backgroundAttachment: 'fixed', display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>

      <div style={{ textAlign: "center", padding: "20px", borderRadius: "10px", background: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>

        <h1 style={{ color: "#28a745" }}>Payment Successful!</h1>

        <p style={{ fontSize: "1.2rem", color: "#555" }}>

          Thank you for your payment. Your transaction has been successfully processed.

        </p>

        <div style={{ margin: "20px 0" }}>

          <img

            src={check} // Replace with your own image URL

            alt="Success Icon"

            style={{ width: "150px", height: "150px" }}

          />

        </div>

       
      </div>

    </div>

  );

}


export default PayPage;