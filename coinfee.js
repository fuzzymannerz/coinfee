/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles.json', function() {
});

$( document ).ready(function() {
  updateDetails();
});

function updateDetails(){
  // Fetch json data from 21.co
  $.ajax({
    url: 'https://bitcoinfees.21.co/api/v1/fees/recommended',
    dataType: 'json',
    success: function(data){
    	$("#fastestfee").html(
    		"<span class=\"feeheader\">Fastest: </span>" + data.fastestFee + " satoshis per byte / " + data.fastestFee/100000 + " BTC per kilobyte.");
    	$("#hourfee").html(
    		"<span class=\"feeheader\">Slowest <span class=\"time\">(~1h)</span>: </span>" + data.hourFee + " satoshis per byte / " + data.hourFee/100000 + " BTC per kilobyte.");
  }});

  // Fetch BTC data from blockchain
  $.ajax({
    url: 'https://blockchain.info/ticker',
    dataType: 'json',
    success: function(data){
      $("#usd").animateNumber({ number: data.USD.last });
  }});

  // Fetch amount of unconfirmed transactions
  $.ajax({
    url: 'https://blockchain.info/q/unconfirmedcount?format=json&cors=true',
    dataType: 'json',
    success: function(data){
      $("#unconfirmed").animateNumber({ number: data });
  }});

  // Fetch amount of transactions last 24 hours
  $.ajax({
    url: 'https://blockchain.info/q/24hrtransactioncount?format=json&cors=true',
    dataType: 'json',
    success: function(data){
      $("#24tx").animateNumber({ number: data });
  }});

  // Fetch amount of BTC sent in the last 24 hours
  $.ajax({
    url: 'https://blockchain.info/q/24hrbtcsent?format=json&cors=true',
    dataType: 'json',
    success: function(data){
      var btcsent = data/100000000;
      $("#btc24").animateNumber({ number: btcsent });
  }});

  // Fetch amount of seconds between blocks
  $.ajax({
    url: 'https://blockchain.info/q/interval?format=json&cors=true',
    dataType: 'json',
    success: function(data){
      var mins = data/60;
      var totalTime = mins.toString().substring(0, 6);
      $("#blocktime").animateNumber({ number: totalTime });
  }});

setTimeout(updateDetails, 15000);
}