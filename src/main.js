import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './js/giphy-service';

// function clearFields() {
//   $("#searchTerm").val("");
//   $('.showErrors').text("");
//   $('.showGif').text("");
// }

$("#giphyForm").submit(function() {
  console.log("hi");
  let searchTerm = $('#searchTerm').val();
  // clearFields();
  let promise = GiphyService.getGiphy(searchTerm);
  promise.then(function(response) {
    const body = JSON.parse(response);
    let gifUrl = `${body.data[0].images.original.url}`;
    let gifTitle = `${body.data[0].title}`;
    console.log(gifUrl);
    console.log(gifTitle);
    $('#gifToShow').attr('src',gifUrl);
    $('#gifToShow').attr('alt',gifTitle);
  });
  event.preventDefault();
});