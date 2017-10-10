'use strict';

const VIEW_LIST = "view_list";
const VIEW_MODULE = "view_module";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.defaultCards = props.cards;

    this.state = {
      isViewModule: true,
      icon: VIEW_MODULE
    }

    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  handleLayoutChange() {
    let isViewModule = (this.state.icon === VIEW_MODULE);
    this.setState({
      isViewModule: !isViewModule,
      icon: (isViewModule) ? VIEW_LIST : VIEW_MODULE
    })
  }

  render() {
    return (
      <div>
        <div className="toolbar">
          <IconSwitch
            icon={ this.state.icon }
            onSwitch={ () => this.handleLayoutChange() } />
        </div>
        {this.renderLayout(this.state.isViewModule)}
      </div>
    );
  }

  renderLayout(cardView) {
    if (cardView) {
      return (
        <CardsView
          layout={this.props.layout}
          cards={this.getShopItems(this.props.products, cardView)} />
      );
    }
    return (<ListView items={this.getShopItems(this.props.products, cardView)} />);
  }

  getShopItems(products, cardView) {
    return products.map(product => {
      let cardProps = {
        title: product.name,
        caption: product.color,
        img: product.img,
        price: `$${product.price}`
      };
      if (cardView) {
        return (
          <ShopCard {...cardProps}/>
        );
      }
      return (<ShopItem {...cardProps}/>)
    });
  }
}
