import { configure, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import { Button, Col, Container, Drawer, Icon, PageNav, Row } from 'idea-react';
import { createRoot } from 'react-dom/client';

import { Content } from './content';

configure({ enforceActions: 'never' });

@observer
export class App extends Component {
  componentDidMount() {
    this.updateMeta();
    window.addEventListener('resize', this.updateMeta);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMeta);
  }

  @observable
  accessor screenPortrait = false;

  @observable
  accessor menuOpen = false;

  updateMeta = () => {
    this.screenPortrait = window.innerWidth < 768;
    if (!this.screenPortrait) this.menuOpen = false;
  };

  openMenu = () => (this.menuOpen = true);

  closeMenu = () => (this.menuOpen = false);

  renderMenu() {
    const { screenPortrait, menuOpen } = this;

    return (
      <>
        <Button
          className="my-5 md:d-none"
          aria-label="Open navigation"
          aria-controls="page-navigation"
          aria-expanded={menuOpen}
          onClick={this.openMenu}
        >
          <Icon name="list" />
        </Button>
        <div
          className="d-none md:d-block sticky-top overflow-y-auto"
          style={{ maxHeight: '100dvh' }}
        >
          {!screenPortrait && <PageNav rootSelector="#examples" aria-label="Page navigation" />}
        </div>
        {screenPortrait && (
          <Drawer
            id="page-navigation"
            title="Page navigation"
            placement="start"
            open={menuOpen}
            onDismiss={this.closeMenu}
          >
            <PageNav rootSelector="#examples" onItemClick={this.closeMenu} />
          </Drawer>
        )}
      </>
    );
  }

  render() {
    return (
      <Container className="pb-5 md:py-12" breakpoint="md">
        <Row>
          <Col span={12} md={3} className="sticky-top align-self-start bg-subtle-secondary">
            {this.renderMenu()}
          </Col>
          <Col span={12} md={9} id="examples">
            <Content />
          </Col>
        </Row>
      </Container>
    );
  }
}

createRoot(document.querySelector('#app')!).render(<App />);
