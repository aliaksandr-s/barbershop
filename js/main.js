window.onload = function () {
    var overlay = document.querySelector('.modal-overlay')
    var loginLink = document.querySelector('.login')
    var loginForm = document.querySelector('.modal')
    var closeModal = loginForm.querySelector('.close-modal')

    var form = loginForm.querySelector('form')
    var loginInput = loginForm.querySelector('[name=login]')
    var passwordInput = loginForm.querySelector('[name=password]')
    var login = localStorage.getItem('login')

	var myMap = document.querySelector('.modal-map')
    var openMyMap = document.querySelector('.open-my-map')
    var closeMyMap = myMap.querySelector('.close-modal')

    // ----------------- MODAL ------------------ //

    function closeLoginForm () {
        if (overlay.classList.contains('show') && loginForm.classList.contains('show')) {
            overlay.classList.remove('show');
            loginForm.classList.remove('show');
        }
        loginForm.classList.remove('modal-error')
    }

    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.classList.add('show');
        loginForm.classList.add('show');
        if (login) {
            loginInput.value = login;
            passwordInput.focus()
        } else {
            loginInput.focus();
        }
    });

    form.addEventListener('submit', function (e) {
        if (!loginInput.value || !passwordInput.value) {
            e.preventDefault();
            loginForm.classList.add('modal-error');
            // setTimeout(function(){
            //     loginForm.classList.remove('modal-error');
            // }, 600);
        }   else {
            localStorage.setItem('login', loginInput.value)
        }
    })

    closeModal.addEventListener('click', function (e) {
        e.preventDefault();
        closeLoginForm();
    })

    window.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
            closeLoginForm();
            closeMap();
        }
    })

    //------------------MAP-------------------//

    function closeMap () {
        if (overlay.classList.contains('show') && myMap.classList.contains('show')) {
            overlay.classList.remove('show');
            myMap.classList.remove('show');
        }
    }

    openMyMap.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.classList.add('show');
        myMap.classList.add('show');
    });

    closeMyMap.addEventListener('click', function (e) {
        e.preventDefault();
        closeMap();
    })

}
