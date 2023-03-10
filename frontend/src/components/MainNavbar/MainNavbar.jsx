import { Typography } from "antd";
import Logo from "../Logo/Logo";
import { useAppContext } from "../../contexts/ContextProvider";
import Controls from "../Controls/Controls";
import Navbar from "../Navbar/Navbar";

export default function MainNavbar(props) {
  const {
    user: {
      userState: { accessToken },
    },
  } = useAppContext();

  return (
    <Navbar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "inherit",
          paddingLeft: "20px",
        }}
      >
        <Logo />
        <Typography
          style={{ alignSelf: "center", display: "flex", paddingLeft: "20px" }}
        >
          <Typography.Text
            style={{
              color: "white",
              alignSelf: "center",
              display: "flex",
              fontSize: "1.2rem",
            }}
          >
            Phishme
          </Typography.Text>
        </Typography>
      </div>
      {!accessToken ? <Controls /> : null}
    </Navbar>
  );
}
