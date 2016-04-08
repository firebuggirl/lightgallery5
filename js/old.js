$('#rightArrow').click(function(){
  //.next() can only select elements, no attributes
  var $activeImg = $(".selected"); // variable for current/selected img
  var $captionText =$(".selected").children("img").attr("alt");
  var $imageNext = $activeImg.next().children().attr("href");//get parent of current img, which is <li>, then get next <li>, then get child href
  //var $captionNext = $captionText.parent().next().children().attr("alt");
  $image.attr("src", $imageNext);//change location of "src" to be equal to next image
  $captionNext = $captionText;
  $caption.text($captionNext);//get caption text of prev image
  //$activeImg = $activeImg.next();//get next image
  //console.log(imageNext);
//  console.log(activeImg);
//  console.log(captionText);
  console.log(captionNext);

});

$('#leftArrow').click(function(){
    //.prev() can only select elements, no attributes
  var $activeImg = $(".selected"); //current img w/selected class
  var $imagePrev = $activeImg.parent().prev().children().attr("href");//get parent of current img, which is <li>, then get prev <li>, then get child href
  var $captionText = $(".selected").children("img").attr("alt");
  $image.attr("src", $imagePrev);//change location of "src" to be equal to previous image
  //$captionText = $activeImg.parent().prev().children("img").attr("alt");//get parent of current img, which is <li>, then get prev <li>, then get child image attribute/alt text
  $captionPrev = $captionText;
  $caption.text($captionPrev);//get caption text of prev image
  //$activePhoto = $activeImg.prev();//get previous image
  //console.log(imagePrev);
  //console.log(activeImg);

});


//Keybaord navigation
$(document).ready(function() {
    $(document).keydown(function(key) {
      var $activeImg = $(".selected");
        switch(parseInt(key.which,10)) {
			// Left arrow key pressed
			case 37:
				 $activeImg.parent().prev().children().attr("href");
				break;
			// Up Arrow Pressed
			case 38:
				 $activeImg.parent().prev().children().attr("href");
				break;
			// Right Arrow Pressed
			case 39:
				 $activeImg.parent().next().children().attr("href");
				break;
			// Down Arrow Pressed
			case 40:
				 $activeImg.parent().prev().children().attr("href");
				break;
      	}
	});
});
