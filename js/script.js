
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();
    var imgHtml = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + street + ', ' + city + '">';
    $body.append(imgHtml);

    $greeting.text('You like ' + city + '?');

    // NYT
    var nytUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest' + '&api-key=c31f2088471240eba7e1744388cb3387';
    $.getJSON(nytUrl, function (data) {
        $nytHeaderElem.text('New York Times Articles About ' + city);
        var articles = data.response.docs;
        var items = [];
        $.each(articles, function (key, a){
            items.push('<li class="article"><a href="' + a.web_url + '">' + a.headline.main + '</a><p>' + a.snippet + '</p></li>')
        });
        $nytElem.append(items.join(''));

    }).fail(function () {
        $nytHeaderElem.text('New York Times Articles weren\' got');
    });

    // WIKI
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&callback=wikiCallback&format=json'

    var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text('failed to get wikipedia resources');
    }, 3000);

    $.ajax(wikiUrl, {
        dataType: 'jsonp',
        success: function (response) {
            var articles = response[1];
            var items = [];
            $.each(articles, function (k, v) {
                var url = 'http://en.wikipedia.org/wiki/' + v;
                items.push('<li><a href="' + url +'">' + v + '</a></li>');
            })
            $wikiElem.append(items.join(''));

            clearTimeout(wikiRequestTimeout);
        }
    })

    return false;
};

$('#form-container').submit(loadData);
