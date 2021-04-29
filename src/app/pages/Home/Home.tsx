import React, { ComponentType, ReactElement } from "react";
import { connect } from "react-redux";
import Notifications, { NotificationsState } from "react-notification-system-redux";

import { Footer } from "../../components";
import { MainLayout, HeaderLayout } from "../../containers";
import { State } from "../../core";

const Home = ({ notifications }: { notifications: NotificationsState }): ReactElement => {
  return (
    <>
      <HeaderLayout />
      <MainLayout />
      <Footer />
      <Notifications notifications={notifications} />
    </>
  );
};

const mapStateToProps = (state: State): { notifications: NotificationsState } => ({
  notifications: state.notifications
});

export default connect(mapStateToProps)(Home as ComponentType<any>);
