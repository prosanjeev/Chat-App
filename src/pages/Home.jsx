import { Col, Grid, Row } from "rsuite"
import Sidebar from "../components/Sidebar"
import { RoomsProvider } from "../context/room.context"

const Home = () => {
  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
      <Row>
        <Col xs={24} md={8}>
       <Sidebar/>
        </Col>
      </Row>
    </Grid>
    </RoomsProvider>
  )
}

export default Home