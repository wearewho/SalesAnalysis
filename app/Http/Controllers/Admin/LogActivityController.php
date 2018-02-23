<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use LogActivity;

class LogActivityController extends Controller
{    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function logActivity()
    {
        if (! Gate::allows('Log_ Activity')) {
            return abort(401);
        }

        $logs = LogActivity::logActivityLists();
        return view('admin.log.index',compact('logs'));
    }

}
