'use strict';

function FeedbackForm({ data, onSubmit }) {
  let salutation = data.salutation;
  let name = data.name;
  let email = data.email;
  let subject = data.subject;
  let message = data.message;
  let snacks = data.snacks;

  function handleSalutationChange(value) {
    salutation = value;
  }

  function handleNameChange(e) {
    name = e.currentTarget.value;
  }

  function handleEmailChange(e) {
    email = e.currentTarget.value;
  }

  function handleSubjectChange(value) {
    subject = value;
  }

  function handleMessageChange(e) {
    message = e.currentTarget.value;
  }

  function handleSnacksChange(value) {
    snacks = value;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    let snacksFieldsArray = Array.prototype.slice.call(form.querySelectorAll('input[name="snacks"]:checked'));
    let snacks = snacksFieldsArray.map( item => item.value );

    const resultObject = {
      salutation,
      name: (form.querySelector('#name').value || ''),
      email: (form.querySelector('#email').value || ''),
      subject,
      message: (form.querySelector('#message').value || ''),
      snacks
    }

    return JSON.stringify(resultObject);
  }

  return(
    <form className="content__form contact-form" onSubmit={ handleSubmit }>
      <div className="testing">
        <p>Чем мы можем помочь?</p>
      </div>
      <SalutationGroup defaultSelect={ data.salutation } onChange={ handleSalutationChange }/>
      <div className="contact-form__input-group">
        <label className="contact-form__label" htmlFor="name">Имя</label>
        <input className="contact-form__input contact-form__input--text" id="name" name="name" type="text" defaultValue={ data.name } onChange={ handleNameChange }/>
      </div>
      <div className="contact-form__input-group">
        <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
        <input className="contact-form__input contact-form__input--email" id="email" name="email" type="email" defaultValue={ data.email } onChange={ handleEmailChange }/>
      </div>
      <SubjectSelectionGroup defaultSelect={ data.subject } onChange={ handleSubjectChange } />
      <div className="contact-form__input-group">
        <label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
        <textarea className="contact-form__input contact-form__input--textarea" id="message" name="message" rows="6" cols="65" defaultValue={ data.message } onChange={ handleMessageChange }></textarea>
      </div>
      <SnackSelectionGroup defaultSelect={ data.snacks } onChange={ handleSnacksChange } />
      <button className="contact-form__button" type="submit">Отправить сообщение!</button>
      <output id="result" />
    </form>
  )
}

function SalutationGroup({ defaultSelect, onChange }) {
  function handleChange(e) {
    onChange(e.currentTarget.querySelector('input:checked').value);
  };

  // Тут как вариант собирать через map и устанавливать defaultChecked, но тогда изменится верстка...
  return(
    <div className="contact-form__input-group" onChange={ handleChange }>
      <input className="contact-form__input contact-form__input--radio" id="salutation-mr" name="salutation" type="radio" value="Мистер" defaultChecked={ defaultSelect == 'Мистер' }/>
      <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mr">Мистер</label>
      <input className="contact-form__input contact-form__input--radio" id="salutation-mrs" name="salutation" type="radio" value="Мисис"  defaultChecked={ defaultSelect == 'Мисис' }/>
      <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mrs">Мисис</label>
      <input className="contact-form__input contact-form__input--radio" id="salutation-ms" name="salutation" type="radio" value="Мис" defaultChecked={ defaultSelect == 'Мис' }/>
      <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-ms">Мис</label>
    </div>
  );
};

function SubjectSelectionGroup({ defaultSelect, onChange }) {
  function handleChange(e) {
    onChange(e.currentTarget.value);
  }
  return (
    <div className="contact-form__input-group">
      <label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
      <select className="contact-form__input contact-form__input--select" id="subject" name="subject" defaultValue={ defaultSelect } onChange={ handleChange }>
        <option>У меня проблема</option>
        <option>У меня важный вопрос</option>
      </select>
    </div>
  )
}

function SnackSelectionGroup({ defaultSelect, onChange }) {
  defaultSelect = defaultSelect.map( item => item.toLowerCase() );

  // Корректней собирать через map, но также меняется верстка.
  return(
    <div className="contact-form__input-group">
      <p className="contact-form__label--checkbox-group">Хочу получить:</p>
      <input className="contact-form__input contact-form__input--checkbox" id="snacks-pizza" name="snacks" type="checkbox" value="пицца" defaultChecked={ defaultSelect.indexOf('пицца') != -1 }/>
      <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-pizza">Пиццу</label>
      <input className="contact-form__input contact-form__input--checkbox" id="snacks-cake" name="snacks" type="checkbox" value="пирог" defaultChecked={ defaultSelect.indexOf('пирог') != -1 }/>
      <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-cake">Пирог</label>
    </div>
  )
}
