import styles from '../assets/GlobalStyles.module.css';

function Center(props) 
{
  return (
    <div className = {styles.Center}>{props.children}</div>
  )
}

export default Center;
