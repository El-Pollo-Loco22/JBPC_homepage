(function() {
  var items = document.querySelectorAll(".video-item");
  var player = document.getElementById("featured-vimeo-player");
  var title = document.getElementById("featured-title");
  var label = document.getElementById("featured-label");
  var description = document.getElementById("featured-description");

  if (!items.length || !player || !title || !label || !description) {
    return;
  }

  function setThumbnailForItem(item) {
    var vimeoId = item.getAttribute("data-vimeo-id");
    var thumb = item.querySelector(".video-thumb");

    if (!vimeoId || !thumb) {
      return;
    }

    var oembedUrl = "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent("https://vimeo.com/" + vimeoId);

    fetch(oembedUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Unable to fetch Vimeo thumbnail");
        }
        return response.json();
      })
      .then(function(data) {
        if (!data || !data.thumbnail_url) {
          return;
        }

        thumb.style.backgroundImage = "url('" + data.thumbnail_url + "')";
        thumb.classList.add("has-thumbnail");
      })
      .catch(function() {
        // Keep existing CSS gradient fallback when thumbnail fetch fails.
      });
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
    setThumbnailForItem(item);

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
