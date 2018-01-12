<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemGroup extends Model
{
    protected $table = 'X_ItemGroup'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล

    protected $guarded = array();
    
    public function getKeyName(){
        return "ItemGroupID";
    }
}
