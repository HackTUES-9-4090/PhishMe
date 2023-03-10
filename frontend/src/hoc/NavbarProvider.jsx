import MainNavbar from "../components/MainNavbar";
import "./styles/NavbarProvider.css";

export default function NavbarProvider(props) {
  return (
    <div className="MainNavbarProvder">
      <MainNavbar />
      <div className="MainNavbarChildren">{props.children}</div>
    </div>
  );
}
