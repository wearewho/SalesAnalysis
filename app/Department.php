<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = 'X_Department'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล

    protected $guarded = array();

    public function getKeyName(){
        return "DepartmentID";
    }

    public function User() {         
        return $this->hasMany(User::class);
    }
}
