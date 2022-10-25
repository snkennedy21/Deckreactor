import SignUp from "../accounts/SignUp";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-light main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h5>Cards</h5>
            <hr className="divider"></hr>
            <ul className="list-unstyled">
              <li>Advanced Search</li>
              <li>Decks</li>
              <li>Collection</li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h5>Links</h5>
            <hr className="divider"></hr>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Sign up</li>
              <li>Log in</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h5>Social</h5>
            <hr className="divider"></hr>
            <ul className="list-unstyled">
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Reddit</li>
            </ul>
          </div>
        </div>

        <div className="row">
          <small className=" text-muted col-sm">
            &copy;{new Date().getFullYear()} DeckReactor | All rights reserved |
            Terms Of Service | Privacy
          </small>
        </div>
      </div>
    </div>
  );
}
export default Footer;
