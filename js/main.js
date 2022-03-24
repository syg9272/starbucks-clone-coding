const searchEL = document.querySelector('.search');
const searchInputEL = searchEL.querySelector('input');

searchEL.addEventListener('click', function(){
  searchInputEL.focus();
});

searchInputEL.addEventListener('focus', function(){
  searchEL.classList.add('focused');
  searchInputEL.setAttribute('placeholder', '통합검색');
});

searchInputEL.addEventListener('blur', function(){
  searchEL.classList.remove('focused');
  searchInputEL.setAttribute('placeholder', '');
});

const badgeEL = document.querySelector('header .badges');
const toTopEL = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY);
  if(window.scrollY > 500){
    //배지 숨기기
    // gsap.to(요소, 지속시간(초단위), 옵션);
    gsap.to(badgeEL, .6, {
      opacity: 0,
      display: 'none'
    });
    //버튼 보이기
    gsap.to(toTopEL, .2, {
      x: 0
    });
  }else{
    //배지 보이기
    gsap.to(badgeEL, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEL, .2, {
      x: 100
    });
  }
}, 300));
// _.throttle(함수, 시간(밀리세컨즈단위))


toTopEL.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo: 0
  });
});


const fadeELs = document.querySelectorAll('.visual .fade-in');
fadeELs.forEach(function(fadeEL, index){
  gsap.to(fadeEL, 1, {
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.7
    opacity: 1
  });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});  

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 // 5초
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
    nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
});


const promotionEL = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion; //반대값 전환
  if (isHidePromotion){
    promotionEL.classList.add('hide');
  }else {
    promotionEL.classList.remove('hide');
  }
});


//youtube 반복 애니메이션

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size, // y축으로 움직임
      repeat: -1, //무한반복
      yoyo: true, //재생된 애니메이션 뒤로 재생
      ease: Power1.easeInOut, //움직임 제어
      delay: random(0, delay) //지연시간
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

//스크롤매직
const spyELs = document.querySelectorAll('section.scroll-spy');
spyELs.forEach(function(spyEL){
  
  new ScrollMagic
    .Scene({
      triggerElement: spyEL, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8
    })
    .setClassToggle(spyEL, 'show')
    .addTo(new ScrollMagic.Controller());
});


// 올해가 몇년도인지 확인
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2022