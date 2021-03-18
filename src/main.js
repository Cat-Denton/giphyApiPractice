import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './js/giphy-service';

function clearFields() {
  $("#searchTerm").val("");
  $('#showErrors').text("");
  $('#showGif').attr("src", "");
  $('#showGif').attr("alt", "");
}

function displayGifs() {
  let showGifDiv = $("div#showGif");
  let htmlForGifDiv = `<img id='gifToShow'>`
  showGifDiv.html(htmlForGifDiv);
}

$("#giphyForm").submit(function() {
  let searchTerm = $('#searchTerm').val();
  clearFields();
  displayGifs();
  let promise = GiphyService.getGiphy(searchTerm);
  promise.then(function(response) {
    const body = JSON.parse(response);
    let gifUrl = `${body.data[0].images.original.url}`;
    let gifTitle = `${body.data[0].title}`;
    $('#gifToShow').attr('src',gifUrl);
    $('#gifToShow').attr('alt',gifTitle);
  });
  event.preventDefault();
});