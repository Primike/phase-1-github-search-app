document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("github-form")
    form.addEventListener('submit', searchUsers)

  });

function searchUsers(e) {
    e.preventDefault()
    let value = document.getElementById("search").value

    fetch(`https://api.github.com/search/users?q=${value}`)
        .then(function(response) {
           return response.json();
        })
        .then(function(json){
           displayUsers(json.items)
        })
}

function displayUsers(array) {
    let usersList = document.getElementById("user-list")
    usersList.innerHTML = ""

    let reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""

    for(const i of array) {
        setupList(i, usersList)
    }
}

function setupList(user, usersList) {

    let userInfo = document.createElement('li')
    userInfo.innerHTML = user.login
    userInfo.addEventListener('click', fetchRepos)

    usersList.appendChild(userInfo)
}

function fetchRepos(e) {
    let reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""

    fetch(`https://api.github.com/users/${e.target.innerHTML}/repos`)
    .then(function(response) {
       return response.json();
    })
    .then(function(json){
       if (json.length == 0) {
         let repo = document.createElement('li')
         repo.innerHTML = "No Repos Available"

         reposList.appendChild(repo)

         return
       }

       for(const i of json) {
          setupReposList(i, reposList)
       }
    })
}

function setupReposList(object, reposList) {
    let repo = document.createElement('li')
    repo.innerHTML = object.full_name

    reposList.appendChild(repo)
}