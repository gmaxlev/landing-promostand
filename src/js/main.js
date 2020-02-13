new WOW().init();

/* 
  Миминамальная длина для номера телефона
*/
var minPhoneLength = 10;

/* 
  Обработчик ошибок
*/
function showError(error, element) {
  if (
    $(element)
      .parent()
      .find(".valerror").length !== 0
  )
    return false;
  if ($(element).attr("name") == "name") {
    message = "Введите имя";
  } else if ($(element).attr("name") == "phone") {
    message = "Введите номер телефона";
  }
  $(element)
    .parent()
    .prepend("<div class='valerror'>" + message + "</div>");
  return true;
}

/* 
  Маска для номера телефона
*/
$(".phone-input").mask("+38 (000) 000 00 00", {
  placeholder: "+38 (___) ___ __ __"
});

/* 
  Стилизация шапки при прокрутке
*/
(function() {
  function headerToScroll() {
    if ($(window).scrollTop() > 100) {
      $(".header-container").addClass("header-container_scroll");
    } else {
      $(".header-container").removeClass("header-container_scroll");
    }
  }
  headerToScroll();
  $(window).scroll(headerToScroll);
})();

/* 
  Слайдер "Отзывы"
*/
(function() {
  $(".reviews__slider").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    customPaging: function(slick, index) {
      return "<div class='slide-pagin'></div>";
    },
    prevArrow: $(".slider-arrow_prev"),
    nextArrow: $(".slider-arrow_next"),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $(".brands").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    customPaging: function(slick, index) {
      return "<div class='slide-pagin'></div>";
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });
})();

/* 
  Модальные окна
*/
(function() {
  function openModalWindow(id) {
    var modal = $("#" + id);
    var dark = $(modal).find(".modal__dark");
    var win = $(modal).find(".modal__window");
    $(modal).show();
    $(dark).fadeIn(300);
    $(win).fadeIn(500);
  }

  $(".modal__close, .modal__dark").on("click", function() {
    var modal = $(this).closest(".modal");
    var dark = $(modal).find(".modal__dark");
    var win = $(modal).find(".modal__window");
    $(dark).fadeOut(300);
    $(win).fadeOut(500);
    setTimeout(function() {
      $(modal).hide();
    }, 500);
  });

  $("[data-modal]").on("click", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-modal");
    openModalWindow(id);
  });
})();

/* 
  Типы отдыхов
*/
(function() {
  var select = false;
  var anim = false;
  $(".travel-cats__item").on("click", function(e) {
    e.preventDefault();
    if (anim) return;
    var index = $(this).index();
    if (index == select) return;
    if (select === false) {
      anim = true;
      $("#travels").show();
      $(".travels > div:eq(" + index + ")")
        .fadeIn(500)
        .addClass("active");
      select = index;
      setTimeout(function() {
        anim = false;
      }, 500);
    } else {
      anim = true;
      select = index;
      $(".travels")
        .find(".active")
        .removeClass("active")
        .fadeOut(500);
      setTimeout(function() {
        $(".travels > div:eq(" + index + ")")
          .fadeIn(500)
          .addClass("active");
        anim = false;
      }, 500);
    }
  });

  $(".travelto").on("click", function(e) {
    e.preventDefault();
    $(this)
      .closest(".travel-cats__item")
      .find(".travel-details")
      .slideToggle();
  });
})();

(function() {
  /* 
    Окно "Подобрать тур"
  */
  $(".form-modal-1")
    .submit(function(e) {
      e.preventDefault();
    })
    .validate({
      rules: {
        name: {
          required: {
            depends: function() {
              $(this).val($.trim($(this).val()));
              return true;
            }
          }
        },
        phone: {
          required: {
            depends: function() {
              $(this).val($.trim($(this).val()));
              return true;
            }
          },
          minlength: minPhoneLength
        }
      },

      success: function(label, element) {
        $(element)
          .parent()
          .find(".valerror")
          .remove();
        return true;
      },
      errorPlacement: showError,
      submitHandler: function(form) {
        $.ajax({
          url: "send.php",
          type: "POST",
          data: {
            form: "simple",
            name: $(form)
              .find('input[name ="name"]')
              .val(),
            phone: $(form)
              .find('input[name ="phone"]')
              .val(),
            date: $(form)
              .find('input[name ="date"]')
              .val(),
            duration: $(form)
              .find('input[name ="duration"]')
              .val(),
            count: $(form)
              .find('input[name ="count"]')
              .val(),
            baby: $(form)
              .find('input[name ="baby"]')
              .val()
          },
          success: function() {
            $(form)
              .siblings(".formcomplete_ok")
              .slideDown(500);
          },
          error: function() {
            $(form)
              .siblings(".formcomplete_error")
              .slideDown(500);
          }
        });
        $(form)
          .find(".input-text, .textarea")
          .prop("disabled", true)
          .val("");
        $(form)
          .find(".button")
          .prop("disabled", true);
      }
    });

  /* 
    Окно "Задать вопрос"
  */
  $(".form-modal-2")
    .submit(function(e) {
      e.preventDefault();
    })
    .validate({
      rules: {
        name: {
          required: {
            depends: function() {
              $(this).val($.trim($(this).val()));
              return true;
            }
          }
        },
        phone: {
          required: {
            depends: function() {
              $(this).val($.trim($(this).val()));
              return true;
            }
          },
          minlength: minPhoneLength
        }
      },

      success: function(label, element) {
        $(element)
          .parent()
          .find(".valerror")
          .remove();
        return true;
      },
      errorPlacement: showError,
      submitHandler: function(form) {
        $.ajax({
          url: "send.php",
          type: "POST",
          data: {
            form: "help",
            name: $(form)
              .find('input[name ="name"]')
              .val(),
            phone: $(form)
              .find('input[name ="phone"]')
              .val(),
            message: $(form)
              .find('textarea[name ="message"]')
              .val()
          },
          success: function() {
            $(form)
              .siblings(".formcomplete_ok")
              .slideDown(500);
          },
          error: function() {
            $(form)
              .siblings(".formcomplete_error")
              .slideDown(500);
          }
        });
        $(form)
          .find(".input-text, .textarea")
          .prop("disabled", true)
          .val("");
        $(form)
          .find(".button")
          .prop("disabled", true);
      }
    });
})();

/* 
  Формы на странице
*/
(function() {
  validate = {
    rules: {
      name: {
        required: {
          depends: function() {
            $(this).val($.trim($(this).val()));
            return true;
          }
        }
      },
      phone: {
        required: {
          depends: function() {
            $(this).val($.trim($(this).val()));
            return true;
          }
        },
        minlength: minPhoneLength
      }
    },

    success: function(label, element) {
      $(element)
        .parent()
        .find(".valerror")
        .remove();
      return true;
    },
    errorPlacement: showError,
    submitHandler: function(form) {
      $.ajax({
        url: "send.php",
        type: "POST",
        data: {
          form: "landing",
          name: $(form)
            .find('input[name ="name"]')
            .val(),
          phone: $(form)
            .find('input[name ="phone"]')
            .val(),
          orient: $(form)
            .find('input[name ="orient"]')
            .val(),
          price: $(form)
            .find('input[name ="price"]')
            .val(),
          date: $(form)
            .find('input[name ="date"]')
            .val(),
          duration: $(form)
            .find('input[name ="duration"]')
            .val(),
          count: $(form)
            .find('input[name ="count"]')
            .val(),
          baby: $(form)
            .find('input[name ="baby"]')
            .val()
        },
        success: function() {
          $(form)
            .siblings(".formcomplete_ok")
            .slideDown(500);
        },
        error: function() {
          $(form)
            .siblings(".formcomplete_error")
            .slideDown(500);
        }
      });
      $(form)
        .find(".input-text, .textarea")
        .prop("disabled", true)
        .val("");
      $(form)
        .find(".button")
        .prop("disabled", true);
    }
  };

  $(".formfull-1")
    .submit(function(e) {
      e.preventDefault();
    })
    .validate(validate);

  $(".formfull-2")
    .submit(function(e) {
      e.preventDefault();
    })
    .validate(validate);
})();

/* 
  Плавная прокрутка от элемента [data-scrollto="id"] к id
*/
(function() {
  $("[data-scrollto]").on("click", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-scrollto");
    $([document.documentElement, document.body]).animate(
      {
        scrollTop:
          $("#" + id).offset().top - $(".header-container").outerHeight()
      },
      2000
    );
  });
})();
