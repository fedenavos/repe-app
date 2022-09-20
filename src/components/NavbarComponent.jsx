// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Outlet, Link } from 'react-router-dom';
// import styled from 'styled-components'

// function NavbarComponent() {
//   return (
//     <>    
//         <NavContainer>
//             <Navbar className="navBg" variant="dark" expand="lg">
//             <Container>
//                 <Navbar.Brand as={Link} to="/" >Repe-App</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="me-auto">
//                     <Nav.Link as={Link} to="/" >Dashboard</Nav.Link>
//                     <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                     <Nav.Link as={Link} to="/signup">Signup</Nav.Link>                
//                 </Nav>
//                 </Navbar.Collapse>
//             </Container>
//             </Navbar>  

//             <section className='outlet-navbar'>
//                 <Outlet></Outlet>
//             </section> 
//         </NavContainer>
//     </> 
//   );
// }

// export default NavbarComponent;

// const NavContainer = styled.nav`
//     .navBg {
//         background-color: #7952b3;
//     }
// `