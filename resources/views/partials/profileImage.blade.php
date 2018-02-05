  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="http://demo.itsolutionstuff.com/plugin/croppie.js"></script>
  <link rel="stylesheet" href="http://demo.itsolutionstuff.com/plugin/croppie.css">

<div class="modal fade" id="modal-default">
    <div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Profile Image</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <div id="upload-demo" style="width:100%;" align="center"></div>
                </div>                
                <div class="col-md-6">               
                    <div id="upload-demo-i" style="padding:30px;margin-top:50px;margin-right:30px;" align="center">
                        <img src="{{ URL::asset('images/profiles/'.$objs->img) }}" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                </div>
                <div class="col-md-4">
                    <br/>
                    <input type="file" id="upload" style="text-align:center;">
                    <br/>
                </div>
                <div class="col-md-4">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success upload-result" id="{{ $objs->id }}">Upload</button>    
        </div>          
            </form>  
    </div>
    <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script type="text/javascript">

    $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
    });

    $uploadCrop = $('#upload-demo').croppie({
        enableExif: true,
        viewport: {
            width: 200,
            height: 200,
            type: 'circle'
        },
        boundary: {
            width: 300,
            height: 300
        }
    });


    $('#upload').on('change', function () {         
        var reader = new FileReader();
        reader.onload = function (e) {
            $uploadCrop.croppie('bind', {
                url: e.target.result
            }).then(function(){
                console.log('jQuery bind complete');
            });
        }
        reader.readAsDataURL(this.files[0]);
    });


    $('.upload-result').on('click', function (ev) {
        var id = $(this).attr('id');
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {    
            $.ajax({
                url: {!! json_encode(url('/image-crop')) !!},
                type: "POST",
                data: {"id": id,"image": resp, _token: "{{ csrf_token() }}"},
                success: function (data) {
                        html = '<img src="' + resp + '" />';
                        $("#upload-demo-i").html(html); 
                        $('#top').load(document.URL +  ' #top');
                        swal({
                        title: "Update Complete!",
                        icon: 'success',
                        showConfirmButton: false
                    });
                }
            });
        });
    });


</script>