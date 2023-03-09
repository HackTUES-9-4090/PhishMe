import MainNavbar from "../../pages/About/components/MainNavbar/MainNavbar";

export default function NavbarProvider(props) {
  return (
    <>
      <MainNavbar />
      {props.children}
    </>
  );
}
