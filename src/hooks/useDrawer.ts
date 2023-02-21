import * as React from 'react';
import {DrawerActions} from '@react-navigation/native';
import {navigationRef} from 'navigation/RootNavigation';
import {useDrawerStatus} from '@react-navigation/drawer';

const useDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const drawerOpen = useDrawerStatus() === 'open';

  React.useEffect(() => {
    if (drawerOpen) {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  }, [drawerOpen]);
  const openDrawer = () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.openDrawer());
    }
  };
  const toggleDrawer = () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.toggleDrawer());
    }
  };
  const closeDrawer = () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.closeDrawer());
    }
  };

  return {openDrawer, closeDrawer, toggleDrawer, isDrawerOpen};
};
export default useDrawer;
