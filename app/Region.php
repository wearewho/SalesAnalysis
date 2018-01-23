<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $table = 'S_REGION'; //กําหนดชือตารางให้ตรงกับฐานข้อมูล

    public function Province() {         
        return $this->hasMany(Province::class); //กําหนดความสัมพันธ์รูปแบบ One To Many ไปยังตาราง Province
    }
}
