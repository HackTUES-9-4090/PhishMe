import { Typography } from "antd";
import Center from "../../components/Center";
import { textColor } from "../../utils/Constants";
import NavbarProvider from "../../hoc/NavbarProvider";

export default function PageNotFound() {
  return (
    <NavbarProvider>
      <Center>
        <Typography>
          <Typography.Title style={{ color: textColor }} level={1}>
            404 Found
          </Typography.Title>
        </Typography>
      </Center>
    </NavbarProvider>
  );
}
