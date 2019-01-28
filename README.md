# Steven Day Portfolio

> Modern Minimalist Professional Portfolio Page

**Layout**

![portfolio layout](/readMeGifs/portfolio1.gif)

---

## Usage

> clone to directory

```shell

git clone git@github.com:stevenrobday/stevenrobday.github.io.git

```

<a href="https://stevenrobday.github.io/" target="_blank">View page here</a>

---

## Features

**Modals**

![portfolio modals](/readMeGifs/portfolio2.gif)

**Responsive**

> Achieved with CSS Variables 

![portfolio responsive](/readMeGifs/portfolio3.gif)

> The following js makes the gifs and pngs "super modal" display correctly on any resolution.

```javascript

var superModalWidth = $superModal.width();
var superModalHeight = $superModal.height()
var modalRatio = superModalWidth / superModalHeight;

// for smaller super modal ratio, stretch image container to the 
// width of the super modal and calculate height based on ratio
if(modalRatio < imgRatio) {
  var tmpWidth = superModalWidth; 
  var tmpHeight = superModalWidth / imgWidth * imgHeight; 
}

// for equal or larger modal ratio, stretch image container to 
// the height of the super modal and calculate width
else {
  var tmpWidth = superModalHeight / imgHeight * imgWidth; 
  var tmpHeight = superModalHeight; 
}

$superModalImgWrap.height(tmpHeight);
$superModalImgWrap.width(tmpWidth);

```
**Contact Form**

> Achieved with AJAX call to PHP file stored on my web hosting (included in repo)

![portfolio contact form](/readMeGifs/portfolio4.gif)

---

## Built With

- HTML5
- CSS3
- JavaScript
- jQuery
- PHP