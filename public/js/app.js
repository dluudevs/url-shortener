const url = document.querySelector('#input-url')
const form = document.querySelector('#form-url')
const messageUrl = document.querySelector('.message-url')
const originalUrl = document.querySelector('.original-url')
const shortUrl = document.querySelector('.short-url a')
const copyButton = document.querySelector('#copy-button')


form.addEventListener('submit', (e) => {
  const body = JSON.stringify({ url: url.value })
  
  e.preventDefault()
  fetch('/api/shorturl/new', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
    .then(data => data.json())
    .then(res => {
      originalUrl.innerHTML = url.value
      shortUrl.innerHTML = res.url
      messageUrl.style.display = 'flex'
    })
})

