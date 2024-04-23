import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
  return (
    <Container>
        <Navbar>
            <main className="main404">
              <div className="textCenter">
                <p className="text404">404</p>
                <h1 className="textBold">
                  Page not found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Sorry, we couldn't find the page you're looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="goBack" onClick={() => navigate(-1)}> &lt; Go back</div>
                  <Link
                    to="/"
                    className="goBackHome"
                  >
                    &lt; Go back home
                  </Link>
                </div>
              </div>
            </main>
        </Navbar>
        <Footer />
    </Container>
  );
}

const Container = styled.div`

.main404{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    .textCenter{
        display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
        text-align: center;
    }
    .text404{
        color:#000000;
    }
    .goBack,.goBackHome{
        cursor: pointer;
        text-decoration: none;
        color: black;
    }
    .goBack:hover,.goBackHome:hover{
        color: #000000;
    }
}
`
export default PageNotFound;
