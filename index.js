
let myUrl = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const saveBtn = document.querySelector("#save-btn")
const deleteBtn = document.querySelector("#delete-btn")
const fromLocalStorage = JSON.parse( localStorage.getItem("myUrl"))
const outputEl = document.querySelector("#output-el")



let render = (leads) => {
    let listitems = ""
    myUrl.push(inputEl.value)//getting the text from the input text area

    for (let x = 0; x < leads.length; x++) {
        listitems += `
          <li> 
            <a target = "_blank" href="${leads[x]}">
                 ${leads[x]}
            </a>
          </li>
          <br/>
        `
    }/**takes the arrays and adds them to this element 
    before passing it to the outputEl**/

    outputEl.innerHTML = listitems

    inputEl.value = ""
    localStorage.clear()
}

saveBtn.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
     myUrl.push(tabs[0].url)
     localStorage.setItem("myUrl", JSON.stringify(myUrl))
     render(myUrl)
  })
})


if (fromLocalStorage) {
  myUrl = fromLocalStorage
  render(myUrl)
}


deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear()
  myUrl = []
  render(myUrl)
})


inputBtn.addEventListener("click", () => {
    myUrl.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myUrl", JSON.stringify(myUrl))
    render(myUrl)
})

