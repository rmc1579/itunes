var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.searchArtist = function (artist){
        var defer = $q.defer();
        var songsArray = [];
        console.log('good');
        var url = "https://itunes.apple.com/search?term=" + artist + "&callback=JSON_CALLBACK";
        console.log(url);
        $http.jsonp("http://itunes.apple.com/search",{
            params:{
                "callback": "JSON_CALLBACK",
                "term": artist
            }
        })
        .then(function(response){
            
            var oneEntry = function(artistName, collectionName, artwork, kind, collectionPrice, previewUrl, trackName){
                this.Artist = artistName;
                this.Collection = collectionName;
                this.Album = artwork;
                this.Type = kind;
                this.Collection = collectionPrice;
                this.Play = previewUrl;
                this.Song = trackName;
            };
            
            var getR = response.data.results;
            
            for (var i = 0; i<getR.length; i++){
                var newSong = new oneEntry(getR[i].artistName, getR[i].collectionName, getR[i].artworkUrl100, getR[i].kind, getR[i].collectionPrice, getR[i].previewUrl, getR[i].trackName);
                songsArray.push(newSong);
                newSong = null;
            }
            defer.resolve(songsArray); //this gets return after response data gets parse, returns an array of objects
            
            
        });
        return defer.promise; //this gets return right a way. 
       
    };
});
