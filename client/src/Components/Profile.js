import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Location from "./Location";



const Profile = () => {
  const {user , isLogin} = useSelector((state) => state.users);
  const navigate=useNavigate()
   useEffect(()=>{
    if(!isLogin)navigate('/login')
   },[isLogin])
   return (
     <div className='login-container' style={{
      minHeight: '80vh', // Make sure it covers the full height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Container className="bg-white p-4 rounded shadow" style={{ maxWidth: "600px" }}><Row>
      <Row>
        <Col>
      <h1 className='hh'> Profile Component</h1>
      </Col></Row>
      <Row><Col>
       <h6>Name: {user?.name}</h6>
       <h6>Email: {user?.email}</h6>
       <h6>Ip Address:<Location /></h6>
       </Col></Row>
       </Row>
       </Container>
     </div>
   );
 };
 

export default Profile;