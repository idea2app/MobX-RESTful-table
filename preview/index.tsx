import { configure, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import { Button, Col, Container, PageNav, Row } from 'idea-react';
import { createRoot } from 'react-dom/client';
import { Icon } from 'idea-react';

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
        <Button className="my-3 d-md-none" onClick={() => (this.menuOpen = !menuOpen)}>
          <Icon name="list" />
        </Button>
        <div hidden={screenPortrait && !menuOpen}>
          <div className="sticky-top">
            <PageNav onClick={() => screenPortrait && (this.menuOpen = false)} />
          </div>
        </div>
      </>
    );
  }

  render() {
    return (
      <Container className="pb-3 py-md-5" breakpoint="md">
        <Row>
          <Col span={12} md={3} className="sticky-top bg-subtle-secondary">
            {this.renderMenu()}
          </Col>
          <Col span={12} md={9}>
            <Content />
          </Col>
        </Row>
      </Container>
    );
  }
}

createRoot(document.querySelector('#app')!).render(<App />);
