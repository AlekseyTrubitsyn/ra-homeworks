import shortid from 'shortid';

function Listing({ data }) {
  return (
    <div className="item-list">
      { data.map( item => {

        let listing_id = item.listing_id || shortid.generate();
        let url = item.url || '#';
        let imageURL = item.MainImage.url_570xN || ''; // тут в ТЗ должна была быть ссылка на картинку-заглушку!
        let title = item.title || '';
        let currency_code = item.currency_code || '';
        let price = item.price || ' N/A';
        let quantity = item.quantity || 0;

        title = (title.length > 50) ? (title.slice(0, 50) + "...") : title;

        let priceWithCurrency = '';

        switch (currency_code) {
          case 'USD':
            priceWithCurrency = '$' + price;
            break;

          case 'EUR':
            priceWithCurrency = '€' + price;
            break;

          default:
            priceWithCurrency = price + ' GBP';
        }

        let quantityClassName = '';

        if (quantity <= 10) {
          quantityClassName = 'level-low';

        } else if (quantity <= 20) {
          quantityClassName = 'level-medium';

        } else {
          quantityClassName = 'level-high';
        }

        return (
          <div className="item" key={ listing_id }>
            <div className="item-image">
              <a href={ url } >
                <img src={ imageURL } />
              </a>
            </div>
            <div className="item-details">
              <p className="item-title">{ title }</p>
              <p className="item-price">{ priceWithCurrency }</p>
              <p className="item-quantity level-medium">{ quantity } left</p>
            </div>
          </div>
        )
      })}
    </div>
  );
}
