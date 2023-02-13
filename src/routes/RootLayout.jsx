import { Outlet } from "react-router";
import MainHeader from "../components/MainHeader";

function RootLayout(props) {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;
