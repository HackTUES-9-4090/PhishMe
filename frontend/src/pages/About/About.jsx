import { Card, Typography } from "antd";
import Center from "../../components/Center";
import NavbarProvider from "../../hoc/NavbarProvider";

export default function About(props) {
  return (
    <NavbarProvider>
      <Center>
        <Card style={{ background: "none" }} title="About"></Card>
      </Center>
    </NavbarProvider>
  );
}
