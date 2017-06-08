Меню
===

Реализовать React-компонент `Menu`, который бы реализовывал интерфейс выпадающего меню в раскрытом виде, или в закрытом, как представлено на скриншоте ниже:
![Два примера использования компонента](./res/preview.png)

## Пример использования
```jsx
const items = [
  { title: 'Главная страница', href: '#home' },
  { title: 'О компании', href: '#about' },
  { title: 'Контакты', href: '#contact' }
];

const app = (
  <div>
    <Menu items={items} opened={true} />
    <Menu items={items} />
  </div>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);
```

## Описание компонента

Компонент `Menu` принимает два аргумента:
- `items` — список пунктов меню, _массив объектов_, у каждого объект доступно два свойства `title` — заголовок и `href` — адрес ссылки.
- `opened` — состояние меню, _логический_ тип, если `true`, то меню раскрыто и мы видим пункты меню, если `false` — меню закрыто, и мы видим только кнопку-триггер. Не обязательный, по умолчанию `false`.

Раскрытое меню должно создавать такую структуру DOM:
```html
<div class="menu menu-open">
  <div class="menu-toggle"><span></span></div>
  <nav>
    <ul>
      <li><a href="#home">Главная страница</a></li>
      <li><a href="#about">О компании</a></li>
      <li><a href="#contact">Контакты</a></li>
    </ul>
  </nav>
</div>
```

Если меню закрыто, то структура DOM должна иметь вид:
```html
<div class="menu">
  <div class="menu-toggle"><span></span></div>
</div>
```

## Реализация

### Локально с использованием git

Компонент необходимо реализовать в файле `./js/Menu.js`. Файл уже подключен к документы, поэтому другие файлы изменять не требуется.

### В песочнице CodePen

Реализуйте компонент во вкладке JS(Babel). Перед началом работы сделайте форк этого пена:

https://codepen.io/dfitiskin/pen/YVoKYv