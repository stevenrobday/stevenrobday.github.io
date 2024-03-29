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

> The following js displays the gifs and pngs "super modal" correctly on any resolution.

```javascript

var modalRatio = superModalWidth / superModalHeight;

// for smaller super modal ratio, size image container to 
// the width of the super modal and proportionate height
if(modalRatio < imgRatio) {
  var imgWrapWidth = superModalWidth; 
  var imgWrapHeight = imgHeight * superModalWidth / imgWidth; 
}

// for larger super modal ratio, size image container to 
// the height of the super modal and proportionate width
else {
  var imgWrapHeight = superModalHeight; 
  var imgWrapWidth = imgWidth * superModalHeight / imgHeight; 
}

$superModalImgWrap.height(imgWrapHeight);
$superModalImgWrap.width(imgWrapWidth);

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