import { Icon } from "@rsuite/icons"
import { Button, Col, Container, Grid, Panel, Row } from "rsuite"
import {auth, database} from '../misc/firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, child, get, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";

const Signin = () => {
const googleProvider = new GoogleAuthProvider();

async function onGoogleSignIn() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user is new
    const userId = user.uid;
    const userRef = ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      // Store user information in Realtime Database
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        // Add any other fields you want to store
      };

      await set(userRef, userData);
      console.log("User data added for new user:", userId);
    } else {
      alert("User already exists: " + userId);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
   

  return (
    <Container>
      <ToastContainer/>
    <Grid className="mt-page">
      <Row>
        <Col xs={24} md={12} mdOffset={6}>
          <Panel>
            <div className="text-center">
              <h2>Welcome to Chat</h2>
              <p>Progressive chat platform for neophytes</p>
            </div>

            <div className="mt-3">
              <Button block color="blue" >
                <Icon icon="facebook" /> Continue with Facebook
              </Button>

              <Button block color="green" onClick={onGoogleSignIn} >
                <Icon icon="google" /> Continue with Google
              </Button>
            </div>
          </Panel>
        </Col>
      </Row>
    </Grid>
  </Container>
  )
}

export default Signin