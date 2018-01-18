<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    protected $table = 'S_SALEEMPGROUP'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล

    protected $guarded = array();

    public function getKeyName(){
        return "id";
    }
}
