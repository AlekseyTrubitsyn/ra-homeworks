// demo: https://codepen.io/alekseytrubitsyn/pen/borVgp

function Menu({ items, opened }) {
  let className = (opened) ? 'menu menu-open' : 'menu';

  return(
    <div className={ className }>
      <div className="menu-toggle"><span /></div>
      { opened && (<nav>
        <ul>
          { items.map( item => { return (
            <li>
              <a href={ item.href }>{ item.title }</a>
            </li>
          )})}
        </ul>
      </nav>) }
    </div>
  )
}
