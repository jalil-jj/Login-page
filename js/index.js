let $ = document

let userName = $.querySelector('.user-name')
let userFamily = $.querySelector('.user-famiy')
let userNumber = $.querySelector('.user-number')
let userPass = $.querySelector('.user-pass')
let userConfirm = $.querySelector('.user-confirm')
let submitBtn = $.querySelector('button')


function userObj(e) {

    e.preventDefault()

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

    fetch('https://login-page-49b09-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('ارسال اطلاعات موفقیت‌آمیز نبود!')
            }
            return res.json();
        })
        .then(data => {
            console.log('اطلاعات با موفقیت ارسال شد:', data);
            alert('طلاعات با موفقیت ارسال شد!')
            userName.value = '';
            userFamily.value = '';
            userNumber.value = '';
            userPass.value = '';
            userConfirm.value = '';
        })
        .catch((error) => {
            console.error('خطا در ارسال اطلاعات:', error);
            alert('مشکلی در ارسال اطلاعات رخ داد!');
        });



}

submitBtn.addEventListener('click', userObj)

