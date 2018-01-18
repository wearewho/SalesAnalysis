<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemGroup extends Model
{
    protected $table = 'S_OITB'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล

    protected $guarded = array();
    
    public function getKeyName(){
        return "ItmsGrpCod";
    }
}
