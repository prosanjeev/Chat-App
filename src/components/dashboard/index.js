import { Button, Divider, Drawer } from "rsuite"
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";
import { auth, database } from "../../misc/firebase";
import { toast } from "react-toastify";
import { child, get, getDatabase, ref, update } from "firebase/database";
import { updateProfile } from "firebase/auth";
import AvatarUploadBtn from "./AvatarUploadBtn";

const Dashboard = ({onSignOut, name}) => {

  const {profile} = useProfile();

  console.log('Dashboard Profile:', profile);

  const onSave = async (newName) => {
    const userNicknameRef = ref(getDatabase());
  
    try {
      // Update the name property in the Realtime Database
      await update(child(userNicknameRef, `/users/${profile.uid}`), { displayName: newName });
  
      // Update the displayName property in Firebase Authentication
      await updateProfile(auth.currentUser, { displayName: newName });
  
      toast.success('Nickname and displayName have been updated', 4000);
    } catch (err) {
      toast.error(err.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        {( profile) ? (
          <>
          <h3>Hey, {profile.name}</h3>
          
            <Divider />
            <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn/>
          </>
        ) : (
          <p>Loading...</p>
        )}
        
        <Drawer.Footer >
          <Button  block color="red" appearance="primary" onClick={onSignOut} >
            Sign out
          </Button>
        </Drawer.Footer>
      </Drawer.Body>

    </>
  )
}

export default Dashboard