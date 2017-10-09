'use strict';

const dataUrl = 'https://neto-api.herokuapp.com/etsy';

httpGet(dataUrl).then(
  response => JSON.parse(response),
  error => { alert('Rejected: ${error}'); }
).then(
  response => {
    ReactDOM.render(<Listing data={ response }/>, document.getElementById('root'));
  }
);

function httpGet(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    }

    xhr.send();
  });
}
