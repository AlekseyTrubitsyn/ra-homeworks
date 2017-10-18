'use strict';

let content = [{
  id: 0,
  title: "Компоненты",
  text: "Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой."
}, {
  id: 1,
  title: "Выучил раз, используй везде!",
  text: "После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native."
}, {
  id: 2,
  title: "Использование JSX",
  text: "JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода."
}];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      current: 0
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(e) {
    e.preventDefault();

    let sectionToOpen = e.currentTarget.parentElement.id;
    this.setState({
      current: sectionToOpen
    });
  }

  render () {
    return (
      <main className="main">
        <h2 className="title">React</h2>
        { this.props.data.map( item => {
          let isOpened = this.state.current == item.id;

          return (
            <AccordionSection key={ item.id } id={ item.id } onButtonClick={ this.handleButtonClick } title={ item.title } text={ item.text } isOpened={ isOpened }/>
          )
        })}
      </main>
    )
  }
}

const AccordionSection = (props) => {
  const { id, isOpened, onButtonClick, title, text } = props;
  let className = 'section' + ((isOpened) ? ' open' : '');

  return (
    <section className={ className } id={ id }>
      <button onClick={ onButtonClick }>toggle</button>
      <h3 className="sectionhead" onClick={ onButtonClick }>{ title }</h3>
      <div className="articlewrap">
        <div className="article">
          { text }
        </div>
      </div>
    </section>
  )
}

ReactDOM.render(<App data={ content }/>, document.getElementById('accordian'))
