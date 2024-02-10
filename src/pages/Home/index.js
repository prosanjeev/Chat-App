import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import { Route, Routes } from 'react-router';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/room.context';
import Chat from './Chat';

const Home = () => {


  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
         
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
         
          <>
            <Routes>
              <Route path="/chat/:chatId" element={<Col xs={24} md={16} className="h-100"><Chat /></Col>} />
              <Route path="*" element={<Col xs={24} md={16} className="h-100"><h6 className="text-center mt-page">Please select chat</h6></Col>} />
            </Routes>
          </>

        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;