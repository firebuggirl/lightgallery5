$("#search").keyup(function () {
    var search = $(this).val();
    console.log(search);
    $(".galleryDiv img").each(function () {
        console.log($(this).attr("alt").search);
        var searchAttr = $(this).attr("alt");
        if (searchAttr.toLowerCase().search(search.toLowerCase()) > -1) {
            $(this).show();
        } else {
            $(this).fadeOut();
        }
    });
});

//hide arrows on page load
$(document).ready(function () {
    $(".arrows").hide();//hide arrows div on page load
    $("iframe").hide();//hide iframe on page load
});
//Problem: User when clicking on image goes to a dead end
//Solution: Create an overlay with the large image - Lightbox

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
//var $arrows = $(".arrows");
var $iframe = $("<iframe></iframe>");


//Keep track of image index for prev/next, we will use a list index
//position to determine where we are and what it means to move forward
//and backwards by 1.

var $index = 0;


//An image to overlay
$overlay.append($image);


//A caption to overlay
$overlay.append($caption);

//$overlay.append($arrows);

//add video to overlay
$overlay.append($iframe);


//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$("#imageGallery a").click(function (event) {
    event.preventDefault();//prevent default browser behavior

    //get the href of the image we will display in the lightbox from the link that was clicked
    var imageLocation = $(this).addClass("selected").attr("href");
    //ditto for video....same as above
    var videoLocation = $(this).addClass("selected").attr("href");

    $image.on("mouseover", function () {//hover style for image in overlay
        $(this).css("border-color", "#FCAD0D");
    });

    $image.on("mouseout", function () {//get rid of hover style in overlay
        $(this).css("border-color", "");
    });

    $iframe.on("mouseover", function () {//hover style for image in overlay
        $(this).css("border-color", "#FCAD0D");
    });

    $iframe.on("mouseout", function () {//get rid of hover style in overlay
        $(this).css("border-color", "");
    });
    //Update overlay with the image linked in the link
    $('.video').remove();
    if($(this).data('type') == 'video') {//check to see if the href clicked is the video
        $image.addClass('hidden');//hide thumbnail image
        $caption.addClass('hidden');//hide caption text
        var videoURL = $(this).data('video-url');//establish a connection with the url for the video
        var $video = ('<div class="video"><iframe width="730" height="515" style="margin-top: calc(10% + 20px); border: 3px solid beige;" src="'+videoURL+'" frameborder="0" allowfullscreen></iframe></div>');//create div for video and include videoURL variable to show video
        $overlay.append($video);
    }
    else {
        $image.removeClass('hidden');//unhide imageLocation
        $caption.removeClass('hidden');//unhide caption text
        $image.attr("src", imageLocation);//establish image location with src attribute
        $iframe.attr("src", videoLocation);//establish video location with src attribute
    }

    //Show the overlay.
    $overlay.show();

    //show arrows div
    $(".arrows").show();

    //Hide fixed scroll bar with z-index that was previously getting in the way of te close button
    $("#top").hide();

    $("#leftArrow").show();//show leftArrow in overlay

    $("#rightArrow").show();//show rightArrow in overlay

    //Get child's alt attribute and set caption
    var captionText = $(this).children("img").attr("alt");
    $caption.text(captionText);//show caption text for current image
});


    //When overlay is clicked
    $overlay.click(function () {
    //Hide the overlay
    $overlay.hide();

    //Show fixed scroll bar with z-index
    $("#top").show();//bring back search bar when overlay is hidden

   //hide arrows
    $(".arrows").hide();

  //remove video when overlay is hidden
    $overlay.remove('.video');


});

var $closeLightbox = $("<div id='closeLightbox'></div>");//create div for close button and style in css

$image.before($closeLightbox);//tell DOM where close button fits in the DOM sturcture of the overlay

$("#top").click(function () {

    $overlay.hide();//close the overlay
});

//style arows on hover, then remove new styles on mouseout
$("#rightArrow").on("mouseover", function () {
    $(this).css("width", "+=8");//expand width of rightArrow slightly for hover effect
    $(this).css("background-color", "#FCAD0D");//change color on hover
});

$("#rightArrow").on("mouseout", function () {
    $(this).css("width", "-=8");
    $(this).css("background-color", "");
});

$("#leftArrow").on("mouseover", function () {
    $(this).css("width", "+=8");
    $(this).css("background-color", "#FCAD0D");
});

$("#leftArrow").on("mouseout", function () {
    $(this).css("width", "-=8");
    $(this).css("background-color", "");
});


$("body").on("click", '#rightArrow', function () {//creat anonymous function when clicking on rightArrow on body

    var $activeImg = $(".selected");//create location for current image selected by assigning .selected class (established above) to variable within function @ the local scope
    var $next = $activeImg.closest('li').next();//find the closest <li> tag of the active image and select the next image in the gallery
    if($activeImg.closest('li').hasClass('last')) {//if last item in gallery is chosen, assign .first class to $next variable to return to 1st image in gallery
        $next = $('.first');
    }
    var $captionText = $next.find('a').addClass('selected').children("img").attr("alt");//grab current image then navigate to the closest <li>, then move to the next <li> and find it's associated <a> and make it the currently selected anchor, then find the child img of the <a> tag and grab the caption text via the alt attribute
    var $imageNext = $next.find('a').addClass('selected').attr("href");//same as above, but grab href instead to show the next photo
    var $imageNextLink = $next.find('a');//locate next image href attribute

    $activeImg.removeClass('selected');//remove class of currently selected elements in order to transfer .selected class to next and prev elements
    setImageWhenArrowsClick($imageNextLink, $imageNext, $captionText);//establish link, image and caption text all in one location

});

$("body").on("click", '#leftArrow', function () {//creat anonymous function when clicking on leftArrow on body

    var $activeImg = $(".selected");
    var $previous = $activeImg.closest('li').prev().find('a');
    if($activeImg.closest('li').hasClass('first')) {
        $previous = $('.last').find('a');
    }
    var $captionText = $previous.addClass('selected').children("img").attr("alt");
    //var $imagePrev = $activeImg.closest('li').prev('li').find('a').addClass('selected').attr("href");
    var $imagePrev = $previous.addClass('selected').attr("href");
    $activeImg.removeClass('selected');

    setImageWhenArrowsClick($previous, $imagePrev, $captionText);


});

function setImageWhenArrowsClick($imageLink, $imageSrc, $captionText) {
    $('.video').remove();//remove video from overlay
    if($imageLink.data('type') == 'video') {//show video if date type = video
        $image.addClass('hidden');//hide images from overlay and show video only
        $caption.addClass('hidden');//hide caption text for images from overlay when vidio <a> -> thumbnail is clicked
        var videoURL = $imageLink.data('video-url');//locate the url that is associated with the video data type in gallery list
        var $video = ('<div class="video"><iframe width="760" height="500" style="margin-top: calc(10% + 20px); border: 3px solid beige;" src="'+videoURL+'" frameborder="0" allowfullscreen></iframe></div>');
        $overlay.append($video);//append the video to the overlay
    }
    else {//unhide images, caption text, and image src location
        $image.removeClass('hidden');
        $caption.removeClass('hidden');
        $image.attr("src", $imageSrc);
        $captionNext = $captionText;
        $caption.text($captionNext);
    }
}


$(document).keydown(function (k) {

    if (k.keyCode == 39) {
      var $activeImg = $(".selected");//create location for current image selected by assigning .selected class (established above) to variable within function @ the local scope
      var $next = $activeImg.closest('li').next();//find the closest <li> tag of the active image and select the next image in the gallery
      if($activeImg.closest('li').hasClass('last')) {//if last item in gallery is chosen, assign .first class to $next variable to return to 1st image in gallery
          $next = $('.first');
      }
      var $captionText = $next.find('a').addClass('selected').children("img").attr("alt");//grab current image then navigate to the closest <li>, then move to the next <li> and find it's associated <a> and make it the currently selected anchor, then find the child img of the <a> tag and grab the caption text via the alt attribute
      var $imageNext = $next.find('a').addClass('selected').attr("href");//same as above, but grab href instead to show the next photo
      var $imageNextLink = $next.find('a');//locate next image href attribute

      $activeImg.removeClass('selected');//remove class of currently selected elements in order to transfer .selected class to next and prev elements
      setImageWhenArrowsClick($imageNextLink, $imageNext, $captionText);//establish link, image and caption text all in one location

    }
});

$(document).keydown(function (k) {
    if (k.keyCode == 37) {
      var $activeImg = $(".selected");
      var $previous = $activeImg.closest('li').prev().find('a');
      if($activeImg.closest('li').hasClass('first')) {
          $previous = $('.last').find('a');
      }
      var $captionText = $previous.addClass('selected').children("img").attr("alt");
      //var $imagePrev = $activeImg.closest('li').prev('li').find('a').addClass('selected').attr("href");
      var $imagePrev = $previous.addClass('selected').attr("href");
      $activeImg.removeClass('selected');

      setImageWhenArrowsClick($previous, $imagePrev, $captionText);
    }
});
