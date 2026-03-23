(function() {
  var items = document.querySelectorAll(".video-item");
  var player = document.getElementById("featured-vimeo-player");
  var title = document.getElementById("featured-title");
  var label = document.getElementById("featured-label");
  var description = document.getElementById("featured-description");

  if (!items.length || !player || !title || !label || !description) {
    return;
  }

  function setFeaturedVideo(item, autoplay) {
    var vimeoId = item.getAttribute("data-vimeo-id");
    var nextTitle = item.getAttribute("data-title") || "";
    var nextLabel = item.getAttribute("data-label") || "";
    var nextDescription = item.getAttribute("data-description") || "";
    var autoplayFlag = autoplay ? "1" : "0";
    var nextSrc = "https://player.vimeo.com/video/" + vimeoId + "?autoplay=" + autoplayFlag + "&title=0&byline=0&portrait=0";

    player.setAttribute("src", nextSrc);
    title.textContent = nextTitle;
    label.textContent = nextLabel;
    description.textContent = nextDescription;
  }

  items.forEach(function(item) {
    item.addEventListener("click", function(event) {
      event.preventDefault();

      items.forEach(function(link) {
        link.classList.remove("is-active");
      });
      item.classList.add("is-active");

      setFeaturedVideo(item, true);
    });
  });
})();
