(() => {
  "use strict";
// start menu
  document.getElementById('menu-btn').onclick = function () {
    document.getElementById('menu-btn').classList.toggle('active');
    document.getElementById('header').classList.toggle('active');
    document.getElementById('updates')?.classList.toggle('active');
  }
  document.getElementById('header__menu-item--platform').onclick = function () {
    document.getElementById('header__menu-item--sub-wrap').classList.toggle('active');
    document.getElementById('header__menu-item--platform').classList.toggle('active');
  }
// end menu

//start close update modal
  if (document.getElementById('updates__close')) {
    if (!sessionStorage.getItem('updates__news__closed')) {
      document.getElementById('updates').classList.remove('hide');
    }
    document.getElementById('updates__close').onclick = () => {
      sessionStorage.setItem('updates__news__closed', 'true');
      document.getElementById('updates').classList.add('hide');
    }
  }
//end close update modal

  //start close update modal
  if (document.getElementById('cookie__alert')) {
    if (!localStorage.getItem('amadeo__cookie__accepted')) {
      document.getElementById('cookie__alert').classList.remove('hide');
      document.getElementById('cookie__alert__accept').onclick = () => {
        localStorage.setItem('amadeo__cookie__accepted', 'true');
        document.getElementById('cookie__alert').classList.add('hide');
      }
      document.getElementById('cookie__alert__reject').onclick = () => {
        localStorage.removeItem('amadeo__cookie__accepted');
        document.getElementById('cookie__alert').classList.add('hide');
      }
    }
  }
//end close update modal

//start video  modal open
  if (document.getElementById('video-btn')) {
    document.getElementById('video-btn').onclick = function () {
      document.getElementById('video-modal').classList.add('active');
    }
    //start video  modal close and turn off video on click close button
    document.getElementById('close-modal').onclick = function () {
      document.getElementById('video-modal').classList.remove('active');
      const myFrame = document.getElementById('iframe');
      myFrame.setAttribute('src', myFrame.getAttribute('src').replace(/blank/, 'bank'));
    }
//and video  modal close and turn off video on click close button

//start video  modal close and turn off video on clicking on empty space
    const popup = document.querySelector('.video-modal');
    document.getElementById('video-modal').onclick = function (e) {
      if (event.target.className !== 'video-modal') {
        popup.classList.remove('active');
        const myFrame = document.getElementById('iframe');
        myFrame.setAttribute('src', myFrame.getAttribute('src').replace(/blank/, 'bank'));
      }
    };
//end video  modal close and turn off video on clicking on empty space

  }
//end video  modal open

/////------------staer swiper init--------
  if (document.getElementById('swiper-logos')) {
    const swiper = new Swiper('.swiper-container--logos', {
      slidesPerView: 4,
      autoplay: true,
      loop: true,
      breakpoints: {
        // when window width is >= 320px
        0: {
          slidesPerView: 1,

        },
        // when window width is >= 480px
        576: {
          slidesPerView: 3,

        },
        // when window width is >= 480px
        768: {
          slidesPerView: 4,

        },
        // when window width is >= 640px
        992: {
          slidesPerView: 4,

        }
      }
    });
  }
////// ------end swiper init-----


/////------------staer swiper init--------
  if (document.getElementById('swiper-smart_solution')) {
    const swiper2 = new Swiper('.swiper-container--smart_solution', {
      slidesPerView: 3,
      // slidesPerGroup: 3,
      navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev',


      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        // when window width is >= 320px
        0: {
          slidesPerView: 1,

        },
        // when window width is >= 480px
        768: {
          slidesPerView: 2,

        },
        // when window width is >= 640px
        992: {
          slidesPerView: 3,

        }
      }
    });
  }
////// ------end swiper init-----
})()
