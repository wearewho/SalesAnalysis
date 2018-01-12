<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'X_Company'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล

    protected $guarded = array();

    public function getKeyName(){
        return "CompanyID";
    }
}
