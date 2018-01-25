<?php
Route::get('/', function () { return redirect('/home'); });

// Authentication Routes...
$this->get('login', 'Auth\LoginController@showLoginForm')->name('auth.login');
$this->post('login', 'Auth\LoginController@login')->name('auth.login');
$this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('auth.register');
$this->post('register', 'Auth\RegisterController@registerbyuser')->name('auth.register');
//$this->post('register', 'Auth\RegisterController@register')->name('auth.register');
$this->post('logout', 'Auth\LoginController@logout')->name('auth.logout');

// Change Password Routes...
$this->get('change_password', 'Auth\ChangePasswordController@showChangePasswordForm')->name('auth.change_password');
$this->patch('change_password', 'Auth\ChangePasswordController@changePassword')->name('auth.change_password');

// Password Reset Routes...
$this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('auth.password.reset');
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('auth.password.reset');
$this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
$this->post('password/reset', 'Auth\ResetPasswordController@reset')->name('auth.password.reset');

// Dashboard
Route::get('/home', 'HomeController@index');

// Profile Picture
Route::get('/image-crop', 'HomeController@imageCrop');
Route::post('/image-crop', 'HomeController@imageCropPost');

//Admin Group
Route::group(['middleware' => ['auth'], 'prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::resource('abilities', 'Admin\AbilitiesController');
    Route::post('abilities_mass_destroy', ['uses' => 'Admin\AbilitiesController@massDestroy', 'as' => 'abilities.mass_destroy']);
    Route::resource('roles', 'Admin\RolesController');
    Route::post('roles_mass_destroy', ['uses' => 'Admin\RolesController@massDestroy', 'as' => 'roles.mass_destroy']);
    Route::resource('users', 'Admin\UsersController');
    Route::post('users_mass_destroy', ['uses' => 'Admin\UsersController@massDestroy', 'as' => 'users.mass_destroy']);
});

//System Group
Route::group(['middleware' => ['auth'], 'prefix' => 'system', 'as' => 'system.'], function () {
    Route::resource('targetmaster', 'System\TargetmasterController');    
    Route::post('targetmaster_mass_destroy', ['uses' => 'System\TargetmasterController@massDestroy', 'as' => 'targetmaster.mass_destroy']);
    Route::get('downloadPDF/{id}', ['uses' => 'System\TargetmasterController@downloadPDF', 'as' => 'targetmaster.downloadPDF']); 
    Route::resource('company', 'System\CompanyController');
    Route::post('company_mass_destroy', ['uses' => 'System\CompanyController@massDestroy', 'as' => 'company.mass_destroy']);
    Route::resource('department', 'System\DepartmentController');
    Route::post('department_mass_destroy', ['uses' => 'System\DepartmentController@massDestroy', 'as' => 'department.mass_destroy']);
    Route::resource('market', 'System\MarketController');
    Route::post('market_mass_destroy', ['uses' => 'System\MarketController@massDestroy', 'as' => 'market.mass_destroy']); 
    Route::resource('itemgroup', 'System\ItemgroupController');
    Route::post('itemgroup_mass_destroy', ['uses' => 'System\ItemgroupController@massDestroy', 'as' => 'itemgroup.mass_destroy']); 
  });

  //Analysis Group
  Route::group(['middleware' => ['auth'], 'prefix' => 'sa', 'as' => 'analysis.sa.'], function () {
    Route::get('salessummary', 'Analysis\SAController@salessummary')->name('SalesSummary');
    Route::post('selectYSD', 'Analysis\SAController@selectYSD')->name('selectYSD');
    Route::post('selectDataTableYSD', 'Analysis\SAController@selectDataTableYSD')->name('selectDataTableYSD');    
    Route::post('downloadPDF', ['uses' => 'Analysis\SAController@downloadPDF', 'as' => 'salessummary.downloadPDF']);  
    Route::get('targetcomparison', 'Analysis\SAController@targetcomparison')->name('TargetComparison');
    Route::get('toplist', 'Analysis\SAController@toplist')->name('TopList');
    Route::get('region', 'Analysis\SAController@region')->name('Region');
    Route::post('selectProvince', 'Analysis\SAController@selectProvince')->name('selectProvince');  
    Route::post('test', 'Analysis\SAController@test')->name('test');  
    Route::get('byDate', 'Analysis\SAController@byDate')->name('byDate');
    Route::post('selectByDate', 'Analysis\SAController@selectByDate')->name('selectByDate');
});

Route::group(['middleware' => ['auth'], 'prefix' => 'rem', 'as' => 'analysis.rem.'], function () {
    Route::get('salessummaryREM', 'Analysis\REMController@salessummaryREM')->name('SalesSummaryREM'); 
    Route::post('selectREM', 'Analysis\REMController@selectREM')->name('selectREM');
    Route::post('selectDataTableREM', 'Analysis\REMController@selectDataTableREM')->name('selectDataTableREM');
});




    

   

