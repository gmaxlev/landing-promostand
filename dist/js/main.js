$(document).ready(function() {
  new WOW().init();

  /**
   * Обработчик ошибок в формах
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
    Контрольные точки
  */
  var breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1920
  };

  /**
   * Маска для номера телефона
   */
  $(".phone-input").mask("+38 (000) 000 00 00", {
    placeholder: "+38 (___) ___ __ __"
  });

  /**
   * Первый экран
   */
  (function() {
    $(".places-hover__item").hover(
      function() {
        var index = $(this).index();
        $(".places__item:eq(" + index + ")").addClass("places__item_hover");
      },
      function() {
        var index = $(this).index();
        $(".places__item:eq(" + index + ")").removeClass("places__item_hover");
      }
    );
  })();

  /**
   * Header при прокрутке
   */
  (function() {
    function headerToScroll() {
      if ($(window).scrollTop() > 50) {
        $(".header").addClass("header_scroll");
      } else {
        $(".header").removeClass("header_scroll");
      }
    }
    headerToScroll();
    $(window).scroll(headerToScroll);
  })();

  /**
   * Модальные окна
   */
  (function() {
    function openModalWindow(id) {
      $("body, html").css("overflow", "hidden");
      var modal = $("#" + id);
      var dark = $(modal).find(".modal__dark");
      var win = $(modal).find(".modal__window");
      $(modal).show();
      $(dark).fadeIn(300);
      setTimeout(function() {
        $(win).fadeIn(500);
      }, 300);
    }

    $(".modal__close, .modal__dark").on("click", function() {
      var modal = $(this).closest(".modal");
      var dark = $(modal).find(".modal__dark");
      var win = $(modal).find(".modal__window");
      $(win).fadeOut(300);
      setTimeout(function() {
        $(dark).fadeOut(500);
      }, 300);
      setTimeout(function() {
        $(modal).hide();
        $("body, html").css("overflow", "auto");
      }, 900);
    });

    $("[data-modal]").on("click", function(e) {
      e.preventDefault();
      var id = $(this).attr("data-modal");
      openModalWindow(id);
    });
  })();

  /**
   * Форма "Узнать стоимость"
   */
  $("#form-price")
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
          minlength: 12
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
            form: "price",
            name: $(form)
              .find('input[name ="name"]')
              .val(),
            phone: $(form)
              .find('input[name ="phone"]')
              .val()
          },
          success: function() {
            $(form)
              .find(".formcomplete_ok")
              .slideDown(600);
          },
          error: function() {
            $(form)
              .find(".formcomplete_error")
              .slideDown(600);
          }
        });
        $(form)
          .find("input, .textarea, .button")
          .prop("disabled", true);
      }
    });

  /**
   * Форма "Задать вопрос"
   */
  $("#form-question")
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
          minlength: 12
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
            form: "question",
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
              .find(".formcomplete_ok")
              .slideDown(600);
          },
          error: function() {
            $(form)
              .find(".formcomplete_error")
              .slideDown(600);
          }
        });
        $(form)
          .find("input, .textarea, .button")
          .prop("disabled", true);
      }
    });
});

/**
 * Карта с маркерами
 */
function initMap() {
  // Пути к иконкам
  var icons = {
    red: "img/icons/marker-red.png",
    blue: "img/icons/marker-blue.png",
    yellow: "img/icons/marker-yellow.png"
  };

  var markers = [
    {
      location: [50.438901, 30.480514], // Координаты
      img: icons["blue"] // Файл с иконкой
    },
    {
      location: [50.530743, 30.617933],
      img: icons["blue"]
    },
    {
      location: [50.399265, 30.536859],
      img: icons["yellow"]
    },
    {
      location: [50.446126, 30.662561],
      img: icons["red"]
    },
    {
      location: [50.510427, 30.463359],
      img: icons["blue"]
    },
    {
      location: [50.449435, 30.504932],
      img: icons["yellow"]
    }
  ];

  (function() {
    function setMarkers(map) {
      for (let i = 0; i < markers.length; i++) {
        (function() {
          var beach = markers[i];
          var marker = new google.maps.Marker({
            position: {
              lat: beach.location[0],
              lng: beach.location[1]
            },
            map: map,
            icon: beach.img
          });
        })();
      }
    }

    var map;
    map = new google.maps.Map(document.getElementById("mapmarkers"), {
      center: {
        lat: 50.448136,
        lng: 30.577984
      },
      zoom: 11
    });
    setMarkers(map);
  })();
}
