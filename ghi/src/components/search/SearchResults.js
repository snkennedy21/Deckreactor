import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";

import { useSelector } from "react-redux";
import { useGetCardsQuery } from "../../store/scryfallApi";

function ContainerExample() {
  const search = useSelector((state) => state.search);
  const { data, error, isLoading } = useGetCardsQuery(search);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  if (data === undefined) {
    return <div>Banana</div>;
  }

  if ("message" in data) {
    return <div>Hello</div>;
  }

  return (
    <Container>
      <Row>
        {data.cards.map((card) => {
          return (
            <Col
              key={card.multiverse_id}
              xxl="2"
              xl="3"
              l="3"
              md="4"
              sm="6"
              xs="12"
            >
              <Image
                className="mb-4"
                src={card.picture_url}
                style={{ width: "100%" }}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ContainerExample;
