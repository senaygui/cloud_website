// Manifest (Sprockets Directives)
//= require jquery3
//= require datatables
//= require popper
//= require bootstrap
//= require adminlte.min.js
//= require jquery.overlayScrollbars.min
//= require rails-ujs
//= require turbolinks
//= require activestorage
//= require bs-stepper.min
//= require flatpickr
//= require jquery.inputmask.min
//= require jquery.slideform
//= require validation
//= require jquery.magnific-popup.min
//= require owl.carousel.min
//= require jquery.ajaxchimp.min
//= require form-validator.min
//= require contact-form-script
//= require jquery.meanmenu.min

$(document).on('turbolinks:load', function () {
  // Input masks
  $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
  $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' });
  $('#student_emergency_contact_attributes_office_phone_number').inputmask();
  $('#student_emergency_contact_attributes_email_of_employer').inputmask();

  $(".student-mark").on('click', (e) => {
    e.preventDefault();
    updateMark(e.target);
  });

  // Mean menu
  $('.mean-menu').meanmenu({ meanScreenWidth: "1059" });

  // Sticky navbar
  $(window).on('scroll', function () {
    $('.navbar-area').toggleClass('is-sticky', $(this).scrollTop() > 50);
  });

  // Preloader
  $('body').addClass('pre-loaded');

  // Scroll to top
  $(window).on('scroll', function () {
    $("#scrolltop").fadeToggle($(this).scrollTop() > 300);
  });
  $("#scrolltop").on('click', function () {
    $("html").animate({ scrollTop: 0 }, 2000);
    return false;
  });

  // Tooltip
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(el => new bootstrap.Tooltip(el));

  // Countdown Timer
  function dealTimer() {
    const endTime = Date.parse("15 October 2029 9:56:00 GMT+01:00") / 1000;
    const now = Date.now() / 1000;
    const timeLeft = endTime - now;

    const days = Math.floor(timeLeft / 86400);
    const hours = String(Math.floor((timeLeft % 86400) / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(timeLeft % 60)).padStart(2, '0');

    $("#days").html(days);
    $("#hours").html(hours);
    $("#minutes").html(minutes);
    $("#seconds").html(seconds);
  }
  setInterval(dealTimer, 1000);

  // Logo carousel
  $('.logo-slider').owlCarousel({
    loop: true,
    margin: 50,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2520,
    smartSpeed: 1500,
    responsive: {
      0: { items: 2 },
      768: { items: 3 },
      1000: { items: 5 }
    }
  });

  // Language switcher
  $(".navbar-language").each(function () {
    const each = $(this);
    each.find(".lang-name").html(each.find(".language-top-menu a:nth-child(1)").html());
    each.find(".language-option img").addClass("language-flag");

    const allOptions = $(".language-dropdown-menu").children('a');
    const allOptions2 = $(".language-top-menu").children('a');

    each.find(".language-dropdown-menu").on("click", "a", function () {
      allOptions.removeClass('selected');
      $(this).addClass('selected');
      each.find(".lang-name").html($(this).text());
    });

    each.find(".language-top-menu").on("click", "a", function () {
      allOptions2.removeClass('selected');
      $(this).addClass('selected');
      each.find(".lang-name").html($(this).html());
    });
  });

  // Navbar dots toggle
  $("#dot").on("click", function (e) {
    $(this).siblings(".navbar-dots-dropdown").toggleClass("show");
  });
  $('body').on('click', function (e) {
    if (!$('#dot').is(e.target) &&
      $('#dot').has(e.target).length === 0 &&
      $('.show').has(e.target).length === 0) {
      $('.navbar-dots-dropdown').removeClass('show');
    }
  });

  // Video popup
  $("#video-popup").magnificPopup({
    disableOn: 0,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  // Client carousel
  $('.client-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      "<span class='bx bxs-left-arrow-circle'></span>",
      "<span class='bx bxs-right-arrow-circle'></span>"
    ],
    dots: false,
    smartSpeed: 1500,
    responsive: {
      0: { items: 1 }
    }
  });

  // Client content sync carousel
  var sync1 = $('.client-content-carousel'),
    sync2 = $('.client-thumb-carousel'),
    slidesPerPage = 5,
    syncedSecondary = true;

  sync1.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: true,
    autoplay: false,
    dots: false,
    loop: true,
    responsiveRefreshRate: 200,
    navText: [
      "<span class='bx bxs-left-arrow-circle'></span>",
      "<span class='bx bxs-right-arrow-circle'></span>"
    ]
  }).on('changed.owl.carousel', syncPosition);

  sync2.on('initialized.owl.carousel', function () {
    sync2.find(".owl-item").eq(0).addClass("current");
  }).owlCarousel({
    items: slidesPerPage,
    dots: true,
    nav: true,
    smartSpeed: 200,
    slideBy: slidesPerPage,
    responsiveRefreshRate: 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);
    if (current < 0) current = count;
    if (current > count) current = 0;

    sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");

    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });

  // Accordion
  $(".faq-accordion-header").click(function () {
    $(this).parent(".faq-accordion-item").toggleClass("faq-accordion-item-active").siblings().removeClass("faq-accordion-item-active");
  });

  // Tabs
  $(".feature-tab-item").click(function () {
    var tab_modal = $(this).attr("data-feature-tab");
    $(this).addClass("active").siblings().removeClass("active");
    $(".feature-tab-content-item[data-feature-details=" + tab_modal + "]").slideDown(600).siblings().slideUp(500);
  });

  $(".authentication-tab-item").click(function () {
    var tab_modal = $(this).attr("data-authentcation-tab");
    $(this).addClass("authentication-tab-active").siblings().removeClass("authentication-tab-active");
    $(".authentication-tab-details-item[data-authentcation-details=" + tab_modal + "]").addClass("authentication-tab-details-active").siblings().removeClass("authentication-tab-details-active");
  });

  // Newsletter validation
  $(".newsletter-form").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
      formErrorSub();
      submitMSGSub(false, "Please enter your email correctly.");
    } else {
      event.preventDefault();
    }
  });

  function callbackFunction(resp) {
    if (resp.result === "success") {
      formSuccessSub();
    } else {
      formErrorSub();
    }
  }

  function formSuccessSub() {
    $(".newsletter-form")[0].reset();
    submitMSGSub(true, "Thank you for subscribing!");
    setTimeout(() => $("#validator-newsletter").addClass('hide'), 4000);
  }

  function formErrorSub() {
    $(".newsletter-form").addClass("animate__animated animate__shakeX");
    setTimeout(() => $(".newsletter-form").removeClass("animate__animated animate__shakeX"), 1000);
  }

  function submitMSGSub(valid, msg) {
    var msgClasses = valid ? "validation-success" : "validation-danger";
    $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
  }

  // Mailchimp
  $(".newsletter-form").ajaxChimp({
    url: "https://hibootstrap.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&id=42d6d188d9",
    callback: callbackFunction
  });

  // BS-Stepper Init
  var stepperElement = document.querySelector('.bs-stepper');
  if (stepperElement) {
    new Stepper(stepperElement);
  }

  // Datepicker
  flatpickr('.datepicker');

  // Theme toggle state restore
  var $checkbox = $('#slider');
  if ($checkbox.length) {
    $checkbox.prop('checked', localStorage.getItem('blim_theme') !== 'theme-dark');
  }

  // Theme toggle (if missing)
  if (!$('#switch').length) {
    $('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");
  }

});

// Theme functions
function setTheme(themeName) {
  localStorage.setItem('blim_theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem('blim_theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}

// Initial theme load
(function () {
  const theme = localStorage.getItem('blim_theme');
  const slider = document.getElementById('slider');
  if (theme === 'theme-dark') {
    setTheme('theme-dark');
    if (slider) slider.checked = false;
  } else {
    setTheme('theme-light');
    if (slider) slider.checked = true;
  }
})();

// Custom mark update
const updateMark = (target) => {
  const mark = $(target).prev("input").val();
  if (mark == target.dataset.result) {
    alert(`You are not changing the current mark ${mark}`);
  } else {
    $.ajax({
      type: "put",
      url: `/assessmens/update_mark`,
      dataType: "json",
      data: {
        id: target.dataset.id,
        key: target.dataset.key,
        result: mark
      },
      success: function (response) {
        alert(response.result);
      }
    });
  }
};