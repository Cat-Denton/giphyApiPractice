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

function displayGifs(index) {
  let showGifDiv = $("div#showGif");
  let htmlForGifDiv = `<img id='gifToShow${index}'>`
  showGifDiv.append(htmlForGifDiv);
}

$("#giphyForm").submit(function() {
  let searchTerm = $('#searchTerm').val();
  clearFields();
  // displayGifs();
  let promise = GiphyService.getGiphy(searchTerm);
  promise.then(function(response) {
    const body = JSON.parse(response);
    let index
    for(index=0;index<body.data.length;index++) {
      displayGifs(index);
      // /* eslint-disable */
      // debugger;
      /* eslint-enable */
      let gifUrl = `${body.data[index].images.original.url}`;
      let gifTitle = `${body.data[index].title}`;
      $(`#gifToShow${index}`).attr('src',gifUrl);
      $(`#gifToShow${index}`).attr('alt',gifTitle); 
    }
  });
  event.preventDefault();
});