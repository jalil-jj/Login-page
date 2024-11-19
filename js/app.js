let $ = document

let containerDiv = $.querySelector('#container')
let deleteModal = $.querySelector('#delete-modal')
let editModal = $.querySelector('#edit-modal')

let userName = $.querySelector('.firstname')
let userFamily = $.querySelector('.lastname')
let userNumber = $.querySelector('.userNumber')
let userPass = $.querySelector('.password')
let userConfirm = $.querySelector('.confirm')

let userId = null

window.addEventListener('load', () => {
    getAllUsers()
})

// Get User And Dom 

function getAllUsers() {
    fetch('https://login-page-49b09-default-rtdb.firebaseio.com/users.json')
        .then(res => res.json())
        .then(data => {
            let userData = Object.entries(data)

            containerDiv.innerHTML = ''

            userData.forEach(item => {


                containerDiv.insertAdjacentHTML('beforeend', `

               <div class="w-100 d-flex align-items-center justify-content-between  border border-1 border-secondary p-2 mt-2">

               <img class="w-25" src="./img/img/noimg.png" alt="">
   
               <div class="d-flex flex-column gap-1 align-items-center justify-content-center">
                   <h3>${item[1].userName} - ${item[1].userFamily}</h3>
                   <p>pass : ${item[1].userPass}</p>
               </div>
   
               <div class="d-flex flex-column gap-2 align-items-center justify-content-center">
                   <button class="btn btn-outline-danger" onclick="openDeleteModal ('${item[0]}')" >Delete</button>
                   <button class="btn btn-outline-info" onclick="openEditModal ('${item[0]}')">-Edit-</button>
               </div>
   
           </div>
               `)
            })
        })

}

// Delete User

function openDeleteModal(id) {

    userId = id

    deleteModal.classList.add('visible')
}

function closeDeleteModal() {
    deleteModal.classList.remove('visible')
}

async function deleteUser() {

    let res = await fetch(`https://login-page-49b09-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'DELETE'
    })
        .then(res => {
            getAllUsers()
            closeDeleteModal()
        })

}

// Edite User

function openEditModal(id) {

    userId = id

    editModal.classList.add('visible')

}

function closeEditModal() {
    editModal.classList.remove('visible')
}

function updateUser() {


    if (!userName.value || !userFamily.value || !userNumber.value || !userPass.value || !userConfirm) {
        alert('لطفا تمام فیلد هارا پر کنید!');
        return;
    }

    if (userPass.value !== userConfirm.value) {
        alert('رمز عبور و تایید رمز عبور یکسان نیستند!');
        return;
    }

    let newUser = {
        userName: userName.value,
        userFamily: userFamily.value,
        userNumber: userNumber.value,
        userPass: userPass.value,
        userConfirm: userConfirm.value,
    }

    fetch(`https://login-page-49b09-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(res => {
            getAllUsers()
            clear()
        })
        .catch((error) => {
            console.error('خطا در ارسال اطلاعات:', error);
            alert('مشکلی در ارسال اطلاعات رخ داد!');
        });





    closeEditModal()
}

// Clrae Input 

function clear() {
    userConfirm.value = '',
        userFamily.value = '',
        userName.value = '',
        userNumber.value = '',
        userPass.value = ''
}

