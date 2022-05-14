var width = 4,
  height = 4,
  size = 100,
  duration = 2,
  delay = duration / (width * height),
  tiles = [],
  styles = [];

Array.prototype.shuffle = function () {
  var i = this.length,
    j,
    temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

var rand = function (min, max) {
    return max
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : Math.floor(Math.random() * (min + 1));
  },
  bezier = function () {
    return (
      "cubic-bezier(" +
      rand(250, 500) / 500 +
      ", " +
      (rand(250, 1000) - rand(250, 1000)) / 500 +
      ", " +
      rand(250, 500) / 500 +
      ", " +
      (rand(250, 1000) - rand(250, 1000)) / 500 +
      ")"
    );
  };

for (var y = 0; y < height; y++) {
  for (var x = 0; x < width; x++) {
    tiles.push(
      $("<div>", {
        class: "tile",
        css: {
          width: size,
          height: size,
          left: size * x,
          top: size * y,
        },
      })
    );

    styles.push(
      (function (delay) {
        return {
          left: size * x,
          top: size * y,
          get transition() {
            return (
              "top " +
              duration +
              "s " +
              bezier() +
              " " +
              delay +
              "s" +
              ", left " +
              duration +
              "s " +
              bezier() +
              " " +
              delay +
              "s"
            );
          },
        };
      })((x + y) * delay)
    );
  }
}

$(".tiles")
  .css({
    width: width * size,
    height: height * size,
  })
  .append(tiles);

document.body.addEventListener("click", function () {
  styles.reverse().forEach(function (d, i) {
    tiles[i].css(d);
  });
});

document.body.addEventListener("dblclick", function () {
  styles.shuffle().forEach(function (d, i) {
    tiles[i].css(d);
  });
});
