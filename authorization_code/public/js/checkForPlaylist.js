$(document).ready(function () {
    var playlists = [];
    var userID;
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
        $("#filename").keypress(function (event) {
            if (event.which === 13) {
                $.ajax({
                    async: false,
                    type: "GET",
                    url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    dataType: "json",
                    data: "formdata",
                    success: function (data) {
                        for (i = 0; i < data.items.length; i++) {
                            playlists.push(data.items[i].name);
                        }
                        if (playlists.indexOf("Partify") == -1) {
                            baseURL = "https://api.spotify.com/v1/users/";
                            searchQry = document.getElementById('filename').value;
                            sendInfo = { "name": "Partify", "public": true, }
                            $.ajax({
                                async: false,
                                type: "POST",
                                url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
                                headers: { 'Authorization': 'Bearer ' + access_token },
                                dataType: "application/json",
                                data: JSON.stringify(sendInfo),
                                success: function (dataFirst) {
                                    $.ajax({
                                        async: false,
                                        type: "GET",
                                        url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
                                        headers: { 'Authorization': 'Bearer ' + access_token },
                                        dataType: "json",
                                        data: "formdata",
                                        success: function (data) {
                                            runSongjs();
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
        });
        // });
    }
    catch (exception) {
        console.log("TEST");
    }
});
