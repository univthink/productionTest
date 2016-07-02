$(document).ready(function () {
    var userID;
    var baseURL;
    var myData;
    var searchQry;
    var trackID;
    var sendInfo;
    var Snapster;
    var playlists = [];
    var total;
    var totalVariable;
    var urlData;
    var jsonData;
    var obj;
    var userLink;
    var userData;
    var jData;
    var partyPlaylist;
    var count = {};
    $("#filename").keypress(function (event) {
        if (event.which === 13) {
            //if (localStorage.getItem("lastFM") == null || localStorage.getItem("lastFM") == "null" || localStorage.getItem("lastFM") == undefined) {
            //    var userPrompt = prompt("Enter Your LastFM Username");
            //    localStorage.setItem("lastFM", userPrompt);
            //}
            //else {
            try {
            partyPlaylist = [];
            baseURL = "https://api.spotify.com/v1/users/";
            userID = $('#userID2').html();
            searchQry = document.getElementById('filename').value;
            $.ajax({
                async: false,
                type: "GET",
                url: "https://api.spotify.com/v1/search?q=" + searchQry + "&type=track,artist&market=us&limit=50&offset=0",
                headers: { 'Authorization': 'Bearer ' + access_token },
                dataType: "json",
                data: "formdata",
                success: function (myData) {
                    $('#infoHeader').empty();
                    $('#infoHeader').append("Search Results");
                    $.ajax({
                        async: false,
                        type: "GET",
                        url: "https://api.spotify.com/v1/users/" + localStorage['userID'] + "/playlists",
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        dataType: "json",
                        data: "formdata",
                        success: function (data) {
                            for (i = 0; i < data.items.length; i++) {
                                playlists.push(data.items[i].name);
                            }
                            if (playlists.indexOf("Partify") != -1) {
                                for (i = 0; i < playlists.length; i++) {
                                    partyPlaylist = playlists.indexOf("Partify");
                                    localStorage['Snapster'] = data.items[partyPlaylist].id;
                                    Snapster = localStorage['Snapster'];

                                }
                                localStorage['Snapster'] = data.items[partyPlaylist].id;
                                localStorage["myData"] = myData;
                                Snapster = localStorage['Snapster'];
                                $("#results").empty();

                                for (i = 0; i < myData.tracks.items.length; i++) {
                                    $('#results').append("<header class='songLink'>" + myData.tracks.items[i].artists[0].name + "<br />" + myData.tracks.items[i].name + "</header><br/>");
                                    $(".songLink").eq(i).attr("id", "songLink" + i);
                                    $(".songLink").eq(i).attr("name", baseURL + localStorage['userID'] + "/playlists/" + Snapster + "/tracks?&uris=spotify%3Atrack%3A" + myData.tracks.items[i].id);
                                    $('header#songLink' + i).on("click", function () {
                                        $.ajax({
                                            async: false,
                                            type: "POST",
                                            url: $(this).attr('name'),
                                            headers: { 'Authorization': 'Bearer ' + access_token },
                                            dataType: "json",
                                            data: "formdata",
                                            success: function (dataFirst) {
                                                partyPlaylist = [];
                                                $("#results").empty();
                                                $("#results").css("text-align", "center");
                                                $.ajax({
                                                    async: false,
                                                    type: "GET",
                                                    url: "https://api.spotify.com/v1/users/" + localStorage['userID'] + "/playlists/" + Snapster + "/tracks",
                                                    headers: { 'Authorization': 'Bearer ' + access_token },
                                                    dataType: "json",
                                                    data: "formdata",
                                                    success: function (currentPLData) {
                                                        for (i = 0; i < currentPLData.items.length; i++) {
                                                            $('#infoHeader').empty();
                                                            $('#infoHeader').append("Upcoming Songs");
                                                            $('#results').append("<header alt='0' class='songLinkCurrent'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                                                        }
                                                        $.ajax({
                                                            async: false,
                                                            type: "GET",
                                                            url: "https://api.spotify.com/v1/users/" + localStorage['userID'] + "/playlists/" + Snapster + "/tracks?limit=100&offset=" + localStorage["offsetNumber"],
                                                            headers: { 'Authorization': 'Bearer ' + access_token },
                                                            dataType: "json",
                                                            data: "formdata",
                                                            success: function (currentPLData) {
                                                                $('#results').empty();
                                                                for (i = 0; i < currentPLData.items.length; i++) {
                                                                    $('#results').append("<header alt='" + i + "' style='color: gray;' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                                                                }

                                                                for (i = 0; i < localStorage["totalSongs"] + 1; i++) {
                                                                    if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] > 3) {
                                                                        document.getElementById("songLinkClick" + 4).style.color = "pink";
                                                                        $(".songLinkClick:gt(4)").css("color", "white");
                                                                    }
                                                                    else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 0) {
                                                                        document.getElementById("songLinkClick" + 0).style.color = "pink";
                                                                        $(".songLinkClick:gt(0)").css("color", "white");
                                                                    }
                                                                    else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 1) {
                                                                        document.getElementById("songLinkClick" + 1).style.color = "pink";
                                                                        $(".songLinkClick:gt(1)").css("color", "white");
                                                                    }
                                                                    else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 2) {
                                                                        document.getElementById("songLinkClick" + 2).style.color = "pink";
                                                                        $(".songLinkClick:gt(2)").css("color", "white");
                                                                    }
                                                                    else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 3) {
                                                                        document.getElementById("songLinkClick" + 3).style.color = "pink";
                                                                        $(".songLinkClick:gt(3)").css("color", "white");
                                                                    }

                                                                }
                                                            }
                                                        });
                                                        $("#filename").val("");

                                                        location.reload();
                                                    }
                                                });
                                            }
                                        });
                                    });

                                }
                            }
                        }
                    });
                }
            });
        }

         catch (exception) {
            console.log("TEST");
        }

        }
    
    });
});
