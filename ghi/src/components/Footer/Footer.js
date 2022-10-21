import "./footer.css";

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
              <li>Collection</li>
              <li>Advanced Search</li>
              <li>Decks</li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h5>Links</h5>
            <hr className="divider"></hr>
            <ul className="list-unstyled">
              <li>My Account</li>
              <li>Home</li>
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
