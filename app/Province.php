<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $table = 'S_PROVINCE'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล
    
    public function getKeyName(){
        return "U_Region";
    }
    
    public function Region() {
        return $this->belongsTo(Region::class, 'Code'); //กําหนด FK ด้วย
    }
}
