//check if browser supports file api and filereader features
if (window.File && window.FileReader && window.FileList && window.Blob) {

    //this is not completely neccesary, just a nice function I found to make the file size format friendlier
    //http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable
    function humanFileSize(bytes, si) {
        var thresh = si ? 1000 : 1024;
        if (bytes < thresh) return bytes + ' B';
        var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (bytes >= thresh);
        return bytes.toFixed(1) + ' ' + units[u];
    }


    //this function is called when the input loads an image
    function renderImage(file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            the_url = event.target.result
            //of course using a template library like handlebars.js is a better solution than just inserting a string
            $('#preview').html("<img src='" + the_url + "' />")
            $('#name').html(file.name)
            $('#size').html(humanFileSize(file.size, "MB"))
            $('#type').html(file.type)
        }

        //when the file is read it triggers the onload event above.
        reader.readAsDataURL(file);
    }


    //this function is called when the input loads a video
    function renderVideo(file) {
        //console.log("objeto archivo");
        //console.log(file);
        var reader = new FileReader();
        //console.log("objeto lector");
        //console.log(reader);
        reader.onload = function(event) {
            the_url = event.target.result
            //of course using a template library like handlebars.js is a better solution than just inserting a string
            $('#data-vid').html("<video width='400' controls><source id='vid-source' src='" + the_url + "' type='video/mp4'></video>")
            $('#name-vid').html(file.name)
            $('#size-vid').html(humanFileSize(file.size, "MB"))
            $('#type-vid').html(file.type)

        }

        //when the file is read it triggers the onload event above.
        reader.readAsDataURL(file);
    }



    //watch for change on the 
    $("#the-photo-file-field").change(function() {
        //console.log("photo file has been chosen")
        //grab the first image in the fileList
        //in this example we are only loading one file.
        //console.log(this.files[0].size)
        renderImage(this.files[0])

    });

    $("#the-video-file-field").change(function() {
        
        var filePath = $(this).val();
        //console.log(filePath);
        
        //console.log("video file has been chosen")
        //grab the first image in the fileList
        //in this example we are only loading one file.
        //console.log(this)
        //console.log(this.files)
        //console.log(this.files[0].size)
        renderVideo(this.files[0])

    });

} else {

    alert('The File APIs are not fully supported in this browser.');

}


$('<input type="file" />')