import { textColor } from "../../utils/Constants";
import NavbarProvider from "../../hoc/NavbarProvider";
import Text from "../../components/Text.component";
import { useState } from "react";
import { VerticalLeftOutlined } from "@ant-design/icons";
import styles from "./styles/DashBoard.module.css";
import AttackTable from "./components/AttackTable.component";

function render(text, record) {
  return {
    props: {
      style: {
        background: "rgba(20, 66, 114, 0.8)",
        color: textColor,
        borderColor: "#0A2647",
      },
    },
    children: <div>{text}</div>,
  };
}
export default function DashBoard({ companyName }) {
  const [attackIndex, setAttackIndex] = useState(0);
  console.log(attackIndex);

  const columns = [
    {
      title: "Name",
      width: 300,
      align: "center",
      dataIndex: "name",
      key: "name",
      render,
    },
    {
      title: "Email",
      width: 300,
      align: "center",
      dataIndex: "email",
      key: "email",
      render,
    },
    {
      title: "Clicked fail",
      width: 200,
      align: "center",
      dataIndex: "clickedFail",
      key: "clickedFail",
      render,
    },
    {
      title: "Submit fail",
      width: 200,
      align: "center",
      dataIndex: "submitFail",
      key: "submitFail",
      render,
    },
  ];

  const data = [
    { key: "1", name: "Danail", clickedFail: "da", submitFail: "ne" },
    { key: "2", name: "Danail", clickedFail: "da", submitFail: "ne" },
    { key: "3", name: "Danail", clickedFail: "da", submitFail: "ne" },
    { key: "4", name: "Danail", clickedFail: "da", submitFail: "ne" },
    {
      key: "5",
      name: "Danail",
      clickedFail: <VerticalLeftOutlined />,
      submitFail: "ne",
    },
  ];

  return (
    <NavbarProvider>
      <div className={styles.container}>
        <div className={styles.centered}>
          {[1, 2, 3, 4, 5].map((element, index) => {
            return (
              <Text
                key={index}
                text={"Attack " + index}
                onClick={() => setAttackIndex(index)}
              />
            );
          })}
        </div>

        <div style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
          <AttackTable />
        </div>
      </div>
    </NavbarProvider>
  );
}
