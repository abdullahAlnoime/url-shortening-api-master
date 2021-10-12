let btnNav = document.querySelector('header nav img:last-of-type');
let nav = document.querySelector('header nav div');
btnNav.onclick = () => {
  btnNav.classList.toggle('click');
  nav.classList.toggle('click');
};
window.onscroll = () => {
  btnNav.classList.remove('click');
  nav.classList.remove('click');
};
let myLink = document.getElementById('shortLink');
let sendURL = document.querySelector('section .input-link form');
let errorMsg = document.querySelector('section .input-link span');
let result = document.querySelector('.sp');
let res = '';
sendURL.onsubmit = (event) => {
  if (myLink.validity.valueMissing || myLink.validity.typeMismatch) {
    errorMsg.classList.add('show');
    myLink.style.borderColor = 'hsl(0,87%,67%)' ;
  } else {
    errorMsg.classList.remove('show');
    myLink.style.borderColor = 'transparent' ;
    let respfetch = fetch(`https://api.shrtco.de/v2/shorten?url=${myLink.value}`);
    respfetch.then(response => response.json())
      .then(data => {
        result.innerHTML = '';
        if (data.ok == true) {
          res += `
            <div class="prod-link">
              <p>${data.result.original_link}</p>
              <hr/>
              <p><a class='target' href='${data.result.full_short_link}'>${data.result.full_short_link}</a></p>
                <button class='copy'>Copy</button>
              </div>
            </div>
          `;
          result.innerHTML = res;
          var textToCopy = document.querySelectorAll(".target");
          var copyButton = document.querySelectorAll(".copy");
          copyButton.forEach((el, ind) => {
            el.addEventListener("click", function() {
              el.classList.add('copied');
              el.textContent = 'Copied!';
              var temp = document.createElement("INPUT");
              temp.value = textToCopy[ind];
              document.body.appendChild(temp);
              temp.select();
              document.execCommand("copy");
              temp.remove();
            });
          });
        } else {
          res = '';
          result.innerHTML = `<h1>Sorry, something went wrong</h1>`;
        }
        myLink.value = '';
      });
  }
  event.preventDefault();
};