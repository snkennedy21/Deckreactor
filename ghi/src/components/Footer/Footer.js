import SignUp from "../accounts/SignUp";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="main-footer border-bottom-5">
      <div className="container">
        <div className="row">
          <div className="h5 text-muted">DeckReactor</div>
          <div>
            <hr className="divider"></hr>
          </div>
          <small className="text-muted col-sm">
            &copy;{new Date().getFullYear()} DeckReactor | All rights reserved |
            Terms Of Service | Privacy
          </small>
        </div>
      </div>
    </div>
  );
}
export default Footer;
