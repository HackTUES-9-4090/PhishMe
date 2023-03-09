import Center from '../../components/Center';
import { textColor } from '../../assets/Constants';
import UserAttacks from '../../components/UserAttacks.component';

export default function DashBoard({ companyName }) 
{
  return (
    <Center>
      <h1 style = {{ color: textColor }}>Company name dashboard</h1>
      <UserAttacks/>
      <UserAttacks/>
    </Center>
  )
}
