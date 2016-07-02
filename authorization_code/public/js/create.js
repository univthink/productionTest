$(document).ready(function () {
    var party;
    var userPrompt;
    try {
        $.ajax({
        async: false,
        type: "GET",
        url: "https://api.spotify.com/v1/me",
        headers: { 'Authorization': 'Bearer ' + access_token },
        dataType: "json",
        data: "formdata",
        success: function (userData) {
            localStorage['userID'] = userData.id;
            userID = localStorage['userID'];
        }
    });

    if (window.location.hash && localStorage["host"] != false && localStorage["host"] != "false") {
        lastFM = localStorage["lastFM"];
        obj2 = {};
        if ((localStorage["party"] != null && localStorage["party"] != undefined) && (localStorage["lastFM"] != null && localStorage["lastFM"] != undefined)) {
          console.log(localStorage["party"]);  
          obj2["party"] = localStorage["party"];
          obj2["lastFM"] = localStorage["lastFM"];
        }
        else {
          userPrompt = prompt("Enter Your LastFM Username");
          localStorage.setItem("lastFM", userPrompt);
          party = prompt("Name Your Party");
          localStorage.setItem("party", party);
          obj2["party"] = localStorage["party"];
          obj2["lastFM"] = localStorage["lastFM"];
        }
        obj2["access_token"] = window.location.href;
        obj2["username"] = localStorage['userID'];
        console.log(obj2);
        $.ajax({
            async: false,
            type: "POST",
            data: obj2,
            url: '/create',
            success: function (accessDataset) {
                console.log(accessDataset);
                var token = accessDataset;
                console.log(token.results);
                localStorage["host"] = false;
                window.location.reload();
                $("#results").hide().fadeIn('fast');
            }
            });
            localStorage["host"] = false;
        }
    }
    catch (exception) {
        console.log(exception);
    }
});
