//demo: https://codepen.io/alekseytrubitsyn/pen/yzoYeM

function ShopItem({ item }) {
  let { brand, title, description, descriptionFull, price, currency } = item;
  
  let correctPrice = ( +price ).toFixed(2);

  if ( isNaN(correctPrice) || (correctPrice == 0) ) {
    correctPrice =  ' N/A';
  }

  return (
    <div className="main-content">
      <h2>{ brand }</h2>
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      <div className="description">{ descriptionFull }</div>
      <div className="highlight-window mobile">
        <div className="highlight-overlay" />
      </div>
      <div className="divider" />
      <div className="purchase-info">
        <div className="price">{ currency }{ correctPrice }</div>
        <button>Добавить в корзину</button>
      </div>
    </div>
  )
}
