/*
 * ImageSelect jQuery Plugin
 * Version 1.3.1
 *
 * xxxx.xx.xx Version 1.2
 * lgalvin
 * http://www.liam-galvin.co.uk/imageselect ← no longer exists
 * 2023.03.26 Version 1.3
 * h.aoshima
 * https://github.com/blue-islands/imageselect
 * 2023.09.08 Version 1.3.1
 * Updated for latest jQuery compatibility
 */

(function ($) {
  const methods = {
    init: function (options) {
      if (!/select/i.test(this.tagName)) {
        return false;
      }

      const element = $(this);
      const selectName = element.attr("name");
      const id = "jq_imageselect_" + selectName;

      if ($("#" + id).length > 0) {
        //already exists
        return;
      }

      const iWidth =
        options.width > options.dropdownWidth
          ? options.width
          : options.dropdownWidth;
      const imageSelect = $("<div>").attr("id", id).addClass("jqis");
      imageSelect
        .css("width", iWidth + "px")
        .css("height", options.height + "px");

      const header = $("<div>").addClass("jqis_header");
      header.css({
        width: options.width + "px",
        height: options.height + "px",
        "text-align": "center",
        "background-color": options.backgroundColor,
        border: "1px solid " + options.borderColor,
      });

      const dropdown = $("<div>").addClass("jqis_dropdown");
      dropdown
        .css({
          width: options.dropdownWidth + "px",
          "z-index": options.z,
          "background-color": options.backgroundColor,
          border: "1px solid " + options.borderColor,
        })
        .hide();

      const selectedImage = $("option:selected", element).text();
      header.attr("lock", options.lock);
      if (options.lock == "height") {
        header.append('<img style="height:' + (options.height - 3) + 'px" />');
      } else {
        header.append('<img style="width:' + (options.width - 75) + 'px" />');
      }

      const $options = $("option", element);
      $options.each(function (i, el) {
        dropdown.append(
          '<img style="width:100%" onclick="jQuery(\'select[name=' +
            selectName +
            "]').val('" +
            $(el).val() +
            "').ImageSelect('close').ImageSelect('update',{src:'" +
            $(el).text() +
            '\'});" src="' +
            $(el).text() +
            '"/>'
        );
      });

      imageSelect.append(header);
      imageSelect.append(dropdown);
      element.after(imageSelect);
      element.hide();

      header.attr("linkedselect", selectName);
      header.children().attr("linkedselect", selectName);
      header.on("click", function () {
        $("select[name=" + $(this).attr("linkedselect") + "]").ImageSelect(
          "open"
        );
      });

      let w = 0;
      $(".jqis_dropdown img")
        .on("mouseover", function () {
          $(this).css("opacity", 1);
        })
        .on("mouseout", function () {
          $(this).css("opacity", 0.7);
        })
        .css("opacity", 0.7)
        .each(function (i, el) {
          w = w + $(el).width();
        });

      dropdown.css("max-height", options.dropdownHeight + "px");
      element.ImageSelect("update", {
        src: selectedImage,
      });
    },
    update: function (options) {
      const element = $(this);
      const selectName = element.attr("name");
      const id = "jq_imageselect_" + selectName;

      if ($("#" + id + " .jqis_header").length == 1) {
        let ffix = false;

        if ($("#" + id + " .jqis_header img").attr("src") != options.src) {
          ffix = true; //run fix for firefox
        }

        $("#" + id + " .jqis_header img")
          .attr("src", options.src)
          .css("opacity", 1);

        if ($("#" + id + " .jqis_header").attr("lock") == "height") {
          $("#" + id + " .jqis_header img").off("load");
          $("#" + id + " .jqis_header img").one("load", function () {
            $(this).parent().stop();
            $(this).parent().parent().stop();
            $(this)
              .parent()
              .animate({
                width: $(this).width() + 60,
              });
            $(this)
              .parent()
              .parent()
              .animate({
                width: $(this).width() + 60,
              });
            $(".jqis_dropdown", $(this).parent().parent()).animate({
              width: $(this).width() + 50,
            });
          });
        } else {
          $("#" + id + " .jqis_header img").off("load");
          $("#" + id + " .jqis_header img").one("load", function () {
            $(this).parent().parent().stop();
            $(this).parent().stop();
            $(this)
              .parent()
              .parent()
              .css("height", $(this).height() + 2 + "px");
            $(this)
              .parent()
              .animate({
                height: $(this).height() + 2,
              });
          });
        }

        $("#" + id + " .jqis_header img").animate({
          opacity: 1,
        });
      }
    },
    open: function () {
      const element = $(this);
      const selectName = element.attr("name");
      const id = "jq_imageselect_" + selectName;
      // const w = 0;

      if ($("#" + id).length == 1) {
        if ($("#" + id + " .jqis_dropdown").is(":visible")) {
          $("#" + id + " .jqis_dropdown").stop();
          $("#" + id + " .jqis_dropdown")
            .slideUp()
            .fadeOut();
        } else {
          $("#" + id + " .jqis_dropdown").stop();
          let mh = $("#" + id + " .jqis_dropdown")
            .css("max-height")
            .replace(/px/, "");
          mh = parseInt(mh);
          window.imageHeightTotal = 0;
          $("#" + id + " .jqis_dropdown").show();
          $("#" + id + " .jqis_dropdown img").each(function (i, el) {
            window.imageHeightTotal = window.imageHeightTotal + $(el).height();
          });
          let ih = window.imageHeightTotal;
          mh = ih < mh && ih > 0 ? ih : mh;
          $("#" + id + " .jqis_dropdown").height(mh);
        }
      }
    },
    close: function () {
      const element = $(this);
      const selectName = element.attr("name");
      const id = "jq_imageselect_" + selectName;
      if ($("#" + id).length == 1) {
        $("#" + id + " .jqis_dropdown")
          .slideUp()
          .hide();
      }
    },
    remove: function () {
      if (!/select/i.test(this.tagName)) {
        return false;
      }
      const element = $(this);
      const selectName = element.attr("name");
      const id = "jq_imageselect_" + selectName;
      if ($("#" + id).length > 0) {
        $("#" + id).remove();
        $("select[name=" + selectName + "]").show();
        return;
      }
    },
  };

  $.fn.ImageSelect = function (method, options) {
    if (method == undefined) {
      method = "init";
    }

    let settings = {
      width: 200,
      height: 75,
      dropdownHeight: 250,
      dropdownWidth: 200,
      z: 99999,
      backgroundColor: "#ffffff",
      border: true,
      borderColor: "#cccccc",
      lock: "height",
    };

    if (options) {
      $.extend(settings, options);
    }

    if (typeof method === "object") {
      $.extend(settings, method);
    }

    settings.dropdownWidth = settings.width - 10;

    return this.each(function () {
      if (methods[method]) {
        return methods[method].apply(this, [settings]);
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, [settings]);
      } else {
        $.error("Method " + method + " does not exist on jQuery.ImageSelect");
      }
    });
  };
})(jQuery);
