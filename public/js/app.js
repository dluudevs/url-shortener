const date = document.querySelector('#input-date')
const form = document.querySelector('#form-date')
const utcMessage = document.querySelector('#message-utc')
const unixMessage = document.querySelector('#message-unix')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`/api/timestamp/${date.value}`).then(data => data.json())
    .then(res => {
      utcMessage.innerHTML = `Your timestamp in UTC is: <span class="date"> ${res.utc}. </span>`
      unixMessage.innerHTML = `In Unix, your timestamp is: <span class="date"> ${res.unix}. </span>`
    })
})

