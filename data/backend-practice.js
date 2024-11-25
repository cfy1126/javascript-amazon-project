const xhr = new XMLHttpRequest();
xhr.addEventListener('load', ()=>{
  console.log(JSON.parse(xhr.response));
});
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
xhr.send();