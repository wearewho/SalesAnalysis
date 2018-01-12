<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TargetD extends Model
{
    protected $table = 'X_TargetDetails'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล

    public function getKeyName(){
        return "DetailID";
    }
    
    public function TargetH() {
        return $this->belongsTo(TargetH::class, 'TargetID'); //กําหนด FK ด้วย
    }
}
