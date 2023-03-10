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
  const [attackData, setAttackData] = useState([]);

  useEffect(() => 
  {
      async function fetchAttackData()
      {
        const result = await request('get', '/attack');
        console.log(result);
      }

      fetchAttackData();
  }, []);

  return (
      <NavbarProvider>
        <div className = {styles.container}>
            <div className = {styles.centered} >
              {
                [1, 2, 3, 4, 5].map((element, index) => 
                {
                  return(
                    <Text 
                      key = {index} 
                      text = {'Attack ' + index} 
                      onClick = {() => setAttackIndex(index)}
                    />
                  )
                })
              }
            
            </div>

            <div style = {{ width: '80%', marginLeft: 40, marginRight: 40  }}>
                <AttackTable attackName = {attackIndex}/>
            </div>
          </div>
      </NavbarProvider>
  )
}
