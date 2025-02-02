import { Outlet } from "react-router-dom";
import { Container } from "../Container/container";
import { NavBar } from "../NavBar/NavBar";

export const Layout = () => {
  return (
    <Container>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </Container>
  );
};
