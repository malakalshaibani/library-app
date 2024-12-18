import { useState } from 'react';
import oo from '../Images/6.jpeg'; // Import the background image
import { useNavigate } from 'react-router-dom';
import { Col } from 'reactstrap';


function VisaPayment() {

  const [cardDetails, setCardDetails] = useState({cardNumber: "", expiryDate: "", cvv: "", cardHolder: ""});
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/paypage'); // Navigate to visapayment page
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({...prevDetails, [name]: value,
  }));

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment processed:", cardDetails);
    navigate("/payment"); // Navigate to Payment Success page
  };


  return (

    <div style={{backgroundImage: `url(${oo})`, // Apply background image dynamically
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundAttachment: 'fixed', display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>

      <div style={{ width: "400px", padding: "20px", borderRadius: "10px", background: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Visa Payment</h2>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: "15px" }}>

            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Card Number</label>

            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              maxLength="16"
              placeholder="1234 5678 9012 3456"
              style={{width: "100%",padding: "10px",border: "1px solid #ccc",borderRadius: "5px",fontSize: "1rem"

              }}

              required

            />

          </div>

          <div style={{ marginBottom: "15px" }}>

            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Expiry Date</label>

            <input
              type="date"
              name="expiryDate"
              value={cardDetails.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              style={{width: "100%",padding: "10px",border: "1px solid #ccc",borderRadius: "5px",fontSize: "1rem"}}
              required
            />

          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>CVV</label>

            <input
              type="password"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleChange}
              maxLength="3"
              placeholder="123"
              style={{width: "100%",padding: "10px",border: "1px solid #ccc",borderRadius: "5px",fontSize: "1rem"}}
              required
            />

          </div>

          <div style={{ marginBottom: "15px" }}>

            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Card Holder Name</label>

            <input
              type="text"
              name="cardHolder"
              value={cardDetails.cardHolder}
              onChange={handleChange}
              placeholder="The name in the last..."
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
              required
            />

          </div>

          <button type="submit" onClick={handlePayment} style={{width: "100%",padding: "10px",background: "#007bff",color: "#fff",border: "none",borderRadius: "5px",fontSize: "1rem",cursor: "pointer"}}>
              Pay Now
         </button>

        </form>

      </div>

    </div>

  );

}


export default VisaPayment;