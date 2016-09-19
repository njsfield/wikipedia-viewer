var search = document.getElementById("search");
var head = document.getElementsByTagName('head')[0];
var results = document.getElementById('results');
var script;

var globalData = Object.create(null);

// event listener to handle wikipedia request

search.addEventListener("input", function(){

    var that = this;

    setTimeout(function(){

        if (that.value) retrieveWikiPages(that.value);
        else results.innerHTML = "";

    }, 500);

})


// retrieve wiki pages based on search

function retrieveWikiPages(value) {

    var title = value;

    var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";

    var callback = "&callback=json_callback";

    var url = api + title + callback;

    script = document.createElement('script');

    script.src = url;

    head.appendChild(script);
    head.removeChild(script);
}


// handle callback

function json_callback(data) {

    globalData = data.query.pages;

    generateElements();

}

function generateElements(){

    results.innerHTML = "";


    for (var sub in globalData) {

        var container = document.createElement("div");
        var img = document.createElement("img");
        var title = document.createElement("h2");
        var extract = document.createElement("p");

        var imageSource = globalData[sub].thumbnail;
        imageSource = (imageSource)? imageSource.source : "";



        container.classList.add("container");
        title.classList.add("title");
        extract.classList.add("extract");


        title.innerHTML = globalData[sub].title;
        img.src = imageSource;
        extract.innerHTML = globalData[sub].extract;


        container.appendChild(img);
        container.appendChild(title);
        container.appendChild(extract);


        results.appendChild(container);
    }

}
