$(document).ready(function () {
    var playlists;
    try {
        $.ajax({
            async: false,
            type: "GET",
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            dataType: "json",
            data: "formdata",
            success: function (userDataID) {
                localStorage['userID'] = userDataID.id;
            }
        });
        $.ajax({
            async: false,
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + localStorage['userID'] + "/playlists",
            headers: { 'Authorization': 'Bearer ' + access_token },
            dataType: "json",
            data: "formdata",
            success: function (data) {
                playlists = [];
                for (i = 0; i < data.items.length; i++) {
                    playlists.push(data.items[i].name);
                }
                localStorage["playlists"] = playlists;
                console.log(data.items.length);
                console.log(localStorage["playlists"]);
                partyPlaylist = localStorage["playlists"].indexOf("Partify");
                if (partyPlaylist > -1) {
                    localStorage['Snapster'] = data.items[partyPlaylist].id;
                    console.log(partyPlaylist);
                }
                else if (playlists.indexOf("Partify") == -1) {
                    baseURL = "https://api.spotify.com/v1/users/";
                    sendInfo = { "name": "Partify", "public": true, }
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: "https://api.spotify.com/v1/users/" + localStorage['userID'] + "/playlists",
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        dataType: "application/json",
                        data: JSON.stringify(sendInfo),
                        success: function (dataFirst) {
                            $.ajax({
                                async: false,
                                type: "GET",
                                url: "https://api.spotify.com/v1/users/" + localStorage['userID'] + "/playlists",
                                headers: { 'Authorization': 'Bearer ' + access_token },
                                dataType: "json",
                                data: "formdata",
                                success: function (data) {
                                    localStorage['Snapster'] = data.items[partyPlaylist].id;
                                    Snapster = localStorage['Snapster'];
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    catch (exception) {
        console.log("TEST");
    }
});
