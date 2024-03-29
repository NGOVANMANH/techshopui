import { Col, Container, Row } from 'react-bootstrap';
import { Category, Slide, ProductCarousel, CategoryBlock, HorizontalLine, Reload } from '../../components';
import { useEffect, useState } from 'react';
import { useContextData } from '../../hooks';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    document.title = "Home - Techshop";
  }, [])

  const [phones, setPhones] = useState([]);
  const [cables, setCables] = useState([]);
  const [backupchargers, setBackupchargers] = useState([]);
  const [adapters, setAdapters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { products } = useContextData();

  useEffect(() => {

    if (products && products.length > 0) {

      setPhones(products.filter(item => item.category === 1));

      setAdapters(products.filter(item => item.category === 2));

      setCables(products.filter(item => item.category === 3));

      setBackupchargers(products.filter(item => item.category === 4));

      setIsLoading(false);
    }
    else {
      setIsLoading(true);
    }

  }, [products]);

  return (isLoading
    ?
    <Reload />
    :
    <Container className="Home mt-3">
      <Row>
        <Col md="auto" lg={2}>
          <Category />
        </Col>
        <Col>
          <Slide />
        </Col>
      </Row>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Điện thoại"} isShow={true} type={"phone"} products={phones}>
        <ProductCarousel className="pt-3 pb-3" products={phones}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Dây sạc"} isShow={true} type={"cable"} products={cables}>
        <ProductCarousel className="pt-3 pb-3" products={cables}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Sạc dự phòng"} isShow={true} type={"backupcharger"} products={backupchargers}>
        <ProductCarousel className="pt-3 pb-3" products={backupchargers}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Củ sạc"} isShow={true} type={"adapter"} products={adapters}>
        <ProductCarousel className="pt-3 pb-3" products={adapters}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

    </Container>);
}

export default Home;
