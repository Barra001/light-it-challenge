import theme from "./loader.theme.module.scss";
import Logo from "../../assets/spinner.svg";

function Loader() {
  return (
    <div className={theme.mainContainer}>
      <img height={70} width={70} src={Logo} className={theme.loader} />
    </div>
  );
}

export default Loader;
