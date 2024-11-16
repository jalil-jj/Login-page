let $ = document

let containerDiv = $.querySelector('#container')








function getUsers() {
    fetch('https://login-page-49b09-default-rtdb.firebaseio.com/users.json')
        .then(res => res.json())
        .then(data => {
            let userData = Object.entries(data)



            userData.forEach(item => {

                containerDiv.insertAdjacentHTML('beforeend', `
                
               <div class="w-100 d-flex align-items-center justify-content-between  border border-1 border-secondary p-2 mt-2">

               <img class="w-25" src="./img/img/noimg.png" alt="">
   
               <div class="d-flex flex-column gap-1 align-items-center justify-content-center">
                   <h3>${item[1].userName} - ${item[1].userFamily}</h3>
                   <p>pass : ${item[1].userPass}</p>
               </div>
   
               <div class="d-flex flex-column gap-2 align-items-center justify-content-center">
                   <button class="btn btn-outline-danger">Delete</button>
                   <button class="btn btn-outline-info">-Edit-</button>
               </div>
   
           </div>
               `)
            })
        })

}




window.addEventListener('load', getUsers)