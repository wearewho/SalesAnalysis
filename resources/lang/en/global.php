<?php

return [
	
	'user-management' => [
		'title' => 'User Management',
		'created_at' => 'Time',
		'fields' => [
		],
	],

	'controls' => [
		'title' => 'Controls',
		'created_at' => 'Time',
		'fields' => [
		],
	],

	'system-management' => [
		'title' => 'System Management',
		'created_at' => 'Time',
		'fields' => [
		],
	],

	'SA' => [
		'title' => 'Sales Analysis Portal',
		'created_at' => 'Time',
		'fields' => [
			'01' => 'Sales Summary',
			'02' => 'Sales Report by Date',
			'03' => 'Target Comparison',
			'04' => 'Top List',
			'05' => 'Region',
		],
	],

	'REM' => [
		'title' => 'REM',
		'created_at' => 'Time',
		'fields' => [
			'01' => 'Sales Summary',
			'02' => 'Sales Enquiry',
		],
	],

	'MTD' => [
		'title' => 'MTD',
		'created_at' => 'Time',
		'fields' => [
			'01' => 'Sales Summary',
			'02' => 'Sales Enquiry',
		],
	],

	'targetmaster' => [
		'title' => 'Target Master',
		'created_at' => 'Time'
	],
	
	'abilities' => [
		'title' => 'Abilities',
		'created_at' => 'Time',
		'fields' => [
			'name' => 'Name',
		],
	],
	
	'roles' => [
		'title' => 'Roles',
		'created_at' => 'Time',
		'fields' => [
			'name' => 'Name',
			'abilities' => 'Abilities',
		],
	],
	
	'users' => [
		'title' => 'Users',
		'created_at' => 'Time',
		'fields' => [
			'name' => 'Name',
			'email' => 'Email',
			'password' => 'Password',
			'roles' => 'Roles',
			'remember-token' => 'Remember token',
		],
	],

	'company' => [
		'title' => 'Company',
		'created_at' => 'Time',
		'fields' => [
			'id' => 'Company ID',
			'name' => 'Company Name',
		],
	], 

	'department' => [
		'title' => 'Department',
		'created_at' => 'Time',
		'fields' => [
			'id' => 'Department ID',
			'name' => 'Department Name',
		],
	], 

	'market' => [
		'title' => 'Market',
		'created_at' => 'Time',
		'fields' => [
			'id' => 'Market Code',
			'name' => 'Market Name',
		],
	], 

	'itemgroup' => [
		'title' => 'Item Group',
		'created_at' => 'Time',
		'fields' => [
			'id' => 'Item Group ID',
			'name' => 'Item Group Name',
		],
	],

	'app_create' => 'Create',
	'app_save' => 'Save',
	'app_edit' => 'Edit',
	'app_view' => 'View',
	'app_update' => 'Update',
	'app_list' => 'List',
	'app_no_entries_in_table' => 'No entries in table',
	'custom_controller_index' => 'Custom controller index.',
	'app_logout' => 'Logout',
	'app_add' => 'Add',
	'app_new' => 'New',
	'app_are_you_sure' => 'Are you sure?',
	'app_back_to_list' => 'Back to list',
	'app_dashboard' => 'Dashboard',
	'app_delete' => 'Delete',
	'global_title' => 'Sales Analysis Portal V.1.0',	
	'global_title_mini' => 'SA',
	'title1' => 'Sales',
	'title2' => 'Analysis',
];