// We can attach the `fileselect` event to all file inputs on the page
      $(document).on('change', ':file', function () {
        var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
      });

      // We can watch for our custom `fileselect` event like this

      $(':file').on('fileselect', function (event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
          input.val(log);
        } else {
          if (log)
            alert(log);
        }

      });


      var allImages = localStorage.getItem("allIamges");
      if(allImages){
        var imgArr = JSON.parse(allImages);
        $("#imgWrap").html('<img src="' + imgArr[imgArr.length - 1].src + '">');
      }

      function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var src = e.target.result;
            $("#imgWrap").html('<img src="' + src + '">');

            if(localStorage.getItem("allIamges")){

              var allImages = JSON.parse(localStorage.getItem("allIamges"));
              allImages.push({
                index: allImages.length,
                src: src
              });
              localStorage.setItem('allIamges', JSON.stringify(allImages));
            }
            else {
              var allImages = [{
                index: 0,
                src: src
              }];
              localStorage.setItem('allIamges', JSON.stringify(allImages));
            }
          }
          reader.readAsDataURL(input.files[0]);
        }

      }


      $("#img").change(function () {
        readURL(this);
      });