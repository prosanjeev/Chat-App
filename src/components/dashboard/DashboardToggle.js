import {  Drawer } from 'rsuite';
import Button from 'rsuite/Button';
import {  useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';
import { DocPass } from '@rsuite/icons';
import { useCallback } from 'react';
import { auth } from '../../misc/firebase';
import { toast } from 'react-toastify';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const onSignOut = useCallback(()=>{
      auth.signOut();
      toast('Signed Out')
      close();
  },[close])

  return (
    <>
      <Button block appearance="primary" onClick={open}>
      <DocPass/> Dashboard
      </Button> 
      <Drawer full={isMobile}  open={isOpen} onClose={close} placement="left">
       <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;