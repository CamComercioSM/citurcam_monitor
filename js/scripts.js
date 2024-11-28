// Empty JS for your own code to be here

var username = 'lmontoya@ccsm.org.co';
var password = '1143378864';
function ejecutarOperacionApi(url, formData, functionEjecutable) {
    $.ajax({
        type: "GET",
        url: 'api.php' ,
        data:  { "url": url },
        dataType: "html",
        headers: {
            'Authorization': "Basic " + btoa(username + ":" + password)
        },
        success: function (data) {
//            console.log(JSON.stringify(data)); 
            data = JSON.parse(data);
//            var response = verifiJWT(data);
//            console.log(JSON.stringify(response));   
            functionEjecutable(data);
        },
        error: function (responseData) {
             console.log(JSON.stringify(responseData));
        }
    });
}


