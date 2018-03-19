<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="https://cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/select/1.2.0/js/dataTables.select.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
<script src="{{ URL::asset('adminlte/js/bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/js/select2.full.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/js/main.js') }}"></script>
<script src="{{ URL::asset('adminlte/plugins/slimScroll/jquery.slimscroll.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/plugins/fastclick/fastclick.js') }}"></script>
<script src="{{ URL::asset('adminlte/js/app.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/js/accounting.min.js') }}"></script>
<!-- Any Charts -->
<script src="{{ URL::asset('anychart/js/anychart-base.min.js') }}"></script>
<script src="{{ URL::asset('anychart/js/anychart-exports.min.js') }}"></script>
<script src="{{ URL::asset('anychart/js/anychart-ui.min.js') }}"></script>
<script src="{{ URL::asset('anychart/js/anychart-bundle.min.js') }}"></script>
<!-- Sweet Alert -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<!-- bootstrap datepicker -->
<script src="{{ URL::asset('adminlte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js') }}"></script>
<!-- date-range-picker -->
<script src="{{ URL::asset('adminlte/bower_components/moment/min/moment.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.js') }}"></script>

<!-- Token -->
<script type="text/javascript">
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
</script>
    
    <!-- Sweet Alert -->
    @if (session()->has('complete'))
    <script>
        swal({
        title: "Login Complete!",
        text: "Welcome back, "+"<?php echo session()->get('complete'); ?>",
        icon: 'success',
        showConfirmButton: false
        });
    </script>
    @endif 
    @if (session()->has('insertComplete'))
    <script>
        swal({
        title: "<?php echo session()->get('insertComplete'); ?>",
        icon: 'success',
        showConfirmButton: false
        });
    </script>
    @endif 
    @if (session()->has('editComplete'))
    <script>
        swal({
        title: "<?php echo session()->get('editComplete'); ?>",
        icon: 'success',
        showConfirmButton: false
        });
    </script>
    @endif 
    @if (session()->has('changeSuccess'))
    <script>
        swal({
        title: "<?php echo session()->get('changeSuccess'); ?>",
        icon: 'success',
        showConfirmButton: false
        });
    </script>
    @endif 
    @if (session()->has('changeIncorrect'))
    <script>
        swal({
        title: "<?php echo session()->get('changeIncorrect'); ?>",
        icon: 'error',
        showConfirmButton: false
        });
    </script>
    @endif 
    @if (session()->has('insertError'))
    <script>
        swal({
        title: "<?php echo session()->get('insertError'); ?>",
        text: " Please edit or delete old data before create.",
        icon: 'error',
        showConfirmButton: false
        });
    </script>
    @endif 
    <script>
        window._token = '{{ csrf_token() }}';
    </script>     

    <!-- function Delete TargetMaster -->
    <script type="text/javascript">
        $(document).on('click', '.delete-btn', function(e) {
        var $this = $(this),
            $id = $(this).attr('id');
            $path = $(this).attr('data-route');
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this !",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    callAjax($id,$path);                                
                    location.reload();                        
                } 
            });
    });
    function callAjax(id,path) {
        $.ajax({
            url: path+id,
            type: 'post',
            data: {_method: 'delete', _token: "{{ csrf_token() }}"},
            success: function (data) {
                // do something with ajax data
                if (data) {
                    console.log(data);
                }

                return false;

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('error...', xhr);
                return false;
                //error logging
            },
            complete: function () {
                //afer ajax call is completed
            }
        });
    }

    </script>      

<script type="text/javascript">
    $(document).ready(function(){
	
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});	
});
</script> 

@yield('javascript')

