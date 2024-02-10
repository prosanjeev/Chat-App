import { Navigate, Outlet} from 'react-router-dom';
import { useProfile } from '../context/profile.context';
import { Container, Loader } from 'rsuite';

const PrivateRoute = () => {

    const {profile, isLoading} = useProfile();
    console.log('from private Route', profile)

  if (isLoading && !profile) {
    return <Container>
      <Loader center vertical size='md' content='Loading...' speed='slow' />
    </Container>
  } 
  if (!isLoading && !profile){
    return (<Navigate to="/signin" />)
  }

  return (
    profile? <Outlet/> : <Navigate to="/signin" />
  );
};

export default PrivateRoute;
