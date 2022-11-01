import Image from "react-bootstrap/Image";
import logo from "../../images/logo.png";
import "./Loading.css";


function Loading() {
  return (
    <div style={{
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
    }}>
      <div>
        <Image src={logo} className="logo-spinner" style={{ width: "6rem" }} />
        <div className="loading my-5">&nbsp; &nbsp; Loading</div>
      </div>
    </div>
  );
}

export default Loading;