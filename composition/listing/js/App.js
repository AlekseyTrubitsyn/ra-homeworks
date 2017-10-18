'use strict';

function List({items}) {
  return (
    <div>
      {items.map(item => {
        switch(item.type) {
          case 'unisex':
            return <Item color="black" item={item} />;
          case 'male':
            return <Item color="blue" item={item} />;
          case 'female':
            return <Item color="orange" item={item} />;
        }
      })}
    </div>
  )
};

const App = ({items}) => (
  <main>
    <List items={items} />
  </main>
);
