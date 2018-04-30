<?php
Route::get('/', function () { return redirect('/home'); });

// Authentication Routes...
$this->get('login', 'Auth\LoginController@showLoginForm')->name('auth.login');
$this->post('login', 'Auth\LoginController@login')->name('auth.login');
$this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('auth.register');
$this->post('register', 'Auth\RegisterController@register')->name('auth.register');
$this->post('logout', 'Auth\LoginController@logout')->name('auth.logout');

// Change Password Routes...
$this->get('change_password', 'Auth\ChangePasswordController@showChangePasswordForm')->name('auth.change_password');
$this->patch('change_password', 'Auth\ChangePasswordController@changePassword')->name('auth.change_password');

// Log Activity...
$this->get('logActivity', 'Admin\LogActivityController@logActivity')->name('logActivity');

// Password Reset Routes...
$this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('auth.password.reset');
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('auth.password.reset');
$this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
$this->post('password/reset', 'Auth\ResetPasswordController@reset')->name('auth.password.reset');

// Dashboard
$this->get('/home', 'HomeController@index');
$this->post('/selectYSD', 'HomeController@selectYSD')->name('selectYSD');
$this->get('/profile/{id}', 'HomeController@profile');
$this->put('/profile/{id} ', 'HomeController@profileUpdate')->name('profile');

// Profile Picture
$this->post('/image-crop', 'HomeController@imageCropPost')->name('image-crop');

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
    Route::resource('company', 'System\CompanyController');
    Route::post('company_mass_destroy', ['uses' => 'System\CompanyController@massDestroy', 'as' => 'company.mass_destroy']);
    Route::resource('department', 'System\DepartmentController');
    Route::post('department_mass_destroy', ['uses' => 'System\DepartmentController@massDestroy', 'as' => 'department.mass_destroy']);
    Route::resource('market', 'System\MarketController');
    Route::post('market_mass_destroy', ['uses' => 'System\MarketController@massDestroy', 'as' => 'market.mass_destroy']); 
    Route::resource('itemgroup', 'System\ItemgroupController');
    Route::post('itemgroup_mass_destroy', ['uses' => 'System\ItemgroupController@massDestroy', 'as' => 'itemgroup.mass_destroy']); 
  });

  //Controls Group
Route::group(['middleware' => ['auth'], 'prefix' => 'controls', 'as' => 'controls.'], function () {
    Route::resource('targetmaster', 'Controls\TargetmasterController');    
    Route::post('targetmaster_mass_destroy', ['uses' => 'Controls\TargetmasterController@massDestroy', 'as' => 'targetmaster.mass_destroy']);
    Route::get('downloadPDF/{id}', ['uses' => 'Controls\TargetmasterController@downloadPDF', 'as' => 'targetmaster.downloadPDF']);     
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
    Route::get('salesenquiryREM', 'Analysis\REMController@salesenquiryREM')->name('SalesEnquiryREM'); 
    Route::post('selectREM', 'Analysis\REMController@selectREM')->name('selectREM');
    Route::post('selectDataTableREM', 'Analysis\REMController@selectDataTableREM')->name('selectDataTableREM');
    Route::post('selectEnquiryDataTableREM', 'Analysis\REMController@selectEnquiryDataTableREM')->name('selectEnquiryDataTableREM');
    Route::post('selectEnquiryDataTableModalREM', 'Analysis\REMController@selectEnquiryDataTableModalREM')->name('selectEnquiryDataTableModalREM');
    Route::post('downloadPDF', ['uses' => 'Analysis\REMController@downloadPDF', 'as' => 'salessummary.downloadPDF']);  
});

Route::group(['middleware' => ['auth'], 'prefix' => 'mtd', 'as' => 'analysis.mtd.'], function () {
    Route::get('salessummaryMTD', 'Analysis\MTDController@salessummaryMTD')->name('SalesSummaryMTD');
    Route::get('salesenquiryMTD', 'Analysis\MTDController@salesenquiryMTD')->name('SalesEnquiryMTD');
    Route::post('selectMTD', 'Analysis\MTDController@selectMTD')->name('selectMTD');
    Route::post('selectDataTableMTD', 'Analysis\MTDController@selectDataTableMTD')->name('selectDataTableMTD');
    Route::post('selectEnquiryDataTableMTD', 'Analysis\MTDController@selectEnquiryDataTableMTD')->name('selectEnquiryDataTableMTD');
    Route::post('selectEnquiryDataTableModalMTD', 'Analysis\MTDController@selectEnquiryDataTableModalMTD')->name('selectEnquiryDataTableModalMTD');
    Route::post('downloadPDF', ['uses' => 'Analysis\MTDController@downloadPDF', 'as' => 'salessummary.downloadPDF']); 
});

Route::group(['middleware' => ['auth'], 'prefix' => 'oem', 'as' => 'analysis.oem.'], function () {
    Route::get('salessummaryOEM', 'Analysis\OEMController@salessummaryOEM')->name('SalesSummaryOEM');
    Route::get('salesenquiryOEM', 'Analysis\OEMController@salesenquiryOEM')->name('SalesEnquiryOEM');
    Route::post('selectOEM', 'Analysis\OEMController@selectOEM')->name('selectOEM');
    Route::post('selectDataTableOEM', 'Analysis\OEMController@selectDataTableOEM')->name('selectDataTableOEM');
    Route::post('selectEnquiryDataTableOEM', 'Analysis\OEMController@selectEnquiryDataTableOEM')->name('selectEnquiryDataTableOEM');
    Route::post('selectEnquiryDataTableModalOEM', 'Analysis\OEMController@selectEnquiryDataTableModalOEM')->name('selectEnquiryDataTableModalOEM');
    Route::post('downloadPDF', ['uses' => 'Analysis\OEMController@downloadPDF', 'as' => 'salessummary.downloadPDF']); 
});

Route::group(['middleware' => ['auth'], 'prefix' => 'oex', 'as' => 'analysis.oex.'], function () {
    Route::get('salessummaryOEX', 'Analysis\OEXController@salessummaryOEX')->name('SalesSummaryOEX');
    Route::get('salesenquiryOEX', 'Analysis\OEXController@salesenquiryOEX')->name('SalesEnquiryOEX');
    Route::post('selectOEX', 'Analysis\OEXController@selectOEX')->name('selectOEX');
    Route::post('selectDataTableOEX', 'Analysis\OEXController@selectDataTableOEX')->name('selectDataTableOEX');
    Route::post('selectEnquiryDataTableOEX', 'Analysis\OEXController@selectEnquiryDataTableOEX')->name('selectEnquiryDataTableOEX');
    Route::post('selectEnquiryDataTableModalOEX', 'Analysis\OEXController@selectEnquiryDataTableModalOEX')->name('selectEnquiryDataTableModalOEX');
    Route::post('downloadPDF', ['uses' => 'Analysis\OEXController@downloadPDF', 'as' => 'salessummary.downloadPDF']); 
});

Route::group(['middleware' => ['auth'], 'prefix' => 'ied', 'as' => 'analysis.ied.'], function () {
    Route::get('salessummaryIED', 'Analysis\IEDController@salessummaryIED')->name('SalesSummaryIED');
    Route::get('salesenquiryIED', 'Analysis\IEDController@salesenquiryIED')->name('SalesEnquiryIED');
    Route::post('selectIED', 'Analysis\IEDController@selectIED')->name('selectIED');
    Route::post('selectDataTableIED', 'Analysis\IEDController@selectDataTableIED')->name('selectDataTableIED');
    Route::post('selectEnquiryDataTableIED', 'Analysis\IEDController@selectEnquiryDataTableIED')->name('selectEnquiryDataTableIED');
    Route::post('selectEnquiryDataTableModalIED', 'Analysis\IEDController@selectEnquiryDataTableModalIED')->name('selectEnquiryDataTableModalIED');
    Route::post('downloadPDF', ['uses' => 'Analysis\IEDController@downloadPDF', 'as' => 'salessummary.downloadPDF']); 
});

Route::group(['middleware' => ['auth'], 'prefix' => 'spd', 'as' => 'analysis.spd.'], function () {
    Route::get('salessummarySPD', 'Analysis\SPDController@salessummarySPD')->name('SalesSummarySPD');
    Route::get('salesenquirySPD', 'Analysis\SPDController@salesenquirySPD')->name('SalesEnquirySPD');
    Route::post('selectSPD', 'Analysis\SPDController@selectSPD')->name('selectSPD');
    Route::post('selectDataTableSPD', 'Analysis\SPDController@selectDataTableSPD')->name('selectDataTableSPD');
    Route::post('selectEnquiryDataTableSPD', 'Analysis\SPDController@selectEnquiryDataTableSPD')->name('selectEnquiryDataTableSPD');
    Route::post('selectEnquiryDataTableModalSPD', 'Analysis\SPDController@selectEnquiryDataTableModalSPD')->name('selectEnquiryDataTableModalSPD');
    Route::post('downloadPDF', ['uses' => 'Analysis\SPDController@downloadPDF', 'as' => 'salessummary.downloadPDF']); 
});


    

   

