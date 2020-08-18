const url = document.querySelector('#input-url')
const form = document.querySelector('#form-url')
const messageUrl = document.querySelector('.message-url')
const originalUrl = document.querySelector('.original-url')
const shortUrl = document.querySelector('.short-url a')
const copyButton = document.querySelector('#copy-button')

// potential improvement. keep adding new paragraphs below for new links

form.addEventListener('submit', (e) => {
  e.preventDefault()
  
  fetch('/api/shorturl/new', { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ url: url.value })
  })
    .then(data => data.json())
    .then(result => {
      console.log(result)
      if(result.error){
        return url.value = result.error
      }
      originalUrl.innerHTML = url.value
      // will not work in dev environment
      const link = `https://${result.url}`
      shortUrl.innerHTML = link
      shortUrl.setAttribute('target', "_blank")
      shortUrl.setAttribute('href', link)
      messageUrl.style.display = 'flex'
    })
})

copyButton.addEventListener('click', () => {
  const el = document.createElement('textarea');
  el.value = shortUrl.textContent;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
})

url.addEventListener('focus', () => {
  if(url.value = "Invalid URL"){
    url.value = ''
  }
})
