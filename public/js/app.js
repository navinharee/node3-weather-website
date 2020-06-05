console.log("client side javascript is loaded!!!");

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector("form");
const loc = document.querySelector("input");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  const address = loc.value;
  console.log("form submitted::", address);

  fetch(`/weather?address=${address}`).then(response => {
    response.json().then(data => {
      console.log(JSON.stringify(data));
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});