import Center from "../../components/Center";
import { textColor } from "../../utils/Constants";
import UserAttacks from "../../components/UserAttacks.component";
import NavbarProvider from "../../hoc/NavbarProvider";

export default function DashBoard({ companyName }) {
  return (
    <NavbarProvider>
      <Center>
        <h1 style={{ color: textColor }}>Company name dashboard</h1>
        <UserAttacks />
        <UserAttacks />
      </Center>
    </NavbarProvider>
  );
}
