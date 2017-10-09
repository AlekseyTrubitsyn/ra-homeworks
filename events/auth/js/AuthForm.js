'use strict';

function AuthForm({ onAuth }) {
  let nameField;
  let emailField;
  let passwordField;

  function handleDefaultSubmit(e) {
    e.preventDefault();
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isFunction(onAuth)) {
      return null;
    }

    onAuth({
      name: nameField.value || '',
      email: emailField.value || '',
      password: passwordField.value || ''
    })
  }

  function handleEmailChange(e) {
    emailField.value = emailField.value.replace(/[^A-Za-z\d\@\.\_\-]/gi, '');
  }

  function handlePasswordChange(e) {
    passwordField.value = passwordField.value.replace(/[^A-Za-z\d\_]/gi, '');
  }

  function isFunction(functionToCheck) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  // Можно и без ref, но тогда надо менять верстку, да и занятие было в том числе про refs :)
  // Также для сохранения верстки не используем атрибут pattern, а строим свой велосипед.
  return (
    <form className="ModalForm" action="/404/auth/" method="POST" onSubmit={ handleSubmit }>
      <div className="Input">
        <input required type="text" placeholder="Имя" ref={ element => nameField = element }/>
        <label></label>
      </div>
      <div className="Input">
        <input type="email" placeholder="Электронная почта" ref={ element => emailField = element } onChange={ handleEmailChange }/>
        <label></label>
      </div>
      <div className="Input">
        <input required type="password" placeholder="Пароль" ref={ element => passwordField = element } onChange={ handlePasswordChange }/>
        <label></label>
      </div>
      <button type="submit">
        <span>Войти</span>
        <i className="fa fa-fw fa-chevron-right"></i>
      </button>
    </form>
  )
}
