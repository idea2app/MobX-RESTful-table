import { configure, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import { Button, Col, Collapse, Container, Row } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import { Icon, PageNav } from 'idea-react';

import { Content } from './content';

configure({ enforceActions: 'never' });

@observer
export class App extends Component {
  componentDidMount() {
    this.updateMeta();
    window.addEventListener('resize', this.updateMeta);
  }

  @observable
  accessor screenPortrait = false;

  @observable
  accessor menuOpen = false;

  updateMeta = () => (this.screenPortrait = window.innerWidth < 768);

  renderMenu() {
    const { screenPortrait, menuOpen } = this;

    return (
      <>
        <Button
          className="my-3 d-md-none"
          onClick={() => (this.menuOpen = !menuOpen)}
        >
          <Icon name="list" />
        </Button>
        <Collapse in={screenPortrait ? menuOpen : true}>
          <div>
            <PageNav
              className="sticky-top"
              onClick={() => screenPortrait && (this.menuOpen = false)}
            />
          </div>
        </Collapse>
      </>
    );
  }

  render() {
    return (
      <div className="bg-light">
        <Container className="pb-3 py-md-5" fluid="md">
          <Row>
            <Col xs={12} md={3} className="sticky-top bg-light">
              {this.renderMenu()}
            </Col>
            <Col xs={12} md={9}>
              <Content />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

createRoot(document.querySelector('#app')).render(<App />);
