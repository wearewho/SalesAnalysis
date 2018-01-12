<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TargetH extends Model
{
    protected $table = 'X_TargetHead'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล

        public function getKeyName(){
            return "TargetID";
        }
    
        public function TargetD() {         
            return $this->hasMany(TargetD::class); //กําหนดความสัมพันธ์รูปแบบ One To Many ไปยังตาราง X_TargetD
        }
}
