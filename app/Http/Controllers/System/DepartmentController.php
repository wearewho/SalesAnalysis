<?php

namespace App\Http\Controllers\System;

use App\Http\Requests\System\StoreDepartmentRequest;
use App\Http\Requests\System\UpdateDepartmentRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Department;
use LogActivity;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }

        $department = Department::all();

        return view('system.department.index', compact('department'));
    }

    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        return view('system.department.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDepartmentRequest $request)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        
        $department = Department::create($request->all());

        $request->session()->flash('insertComplete', 'Insert Complete!');
        LogActivity::addToLog('Create Department');  
        return redirect()->route('system.department.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }

        $department = Department::findOrFail($id);

        return view('system.department.edit', compact('department'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDepartmentRequest $request, $id)
    {  
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        $department = Department::findOrFail($id);
        $department->update($request->all());

        $request->session()->flash('editComplete', 'Edit Complete!');
        LogActivity::addToLog('Edit Department');  
        return redirect()->route('system.department.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        
        $department = Department::findOrFail($id);
        $department->delete();

        $request->session()->flash('deleteComplete', 'Poof! Your imaginary file has been deleted!');
        LogActivity::addToLog('Destroy Department');  
        return back();
    }

    /**
     * Delete all selected Department at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Department::whereIn('DepartmentID', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }

            LogActivity::addToLog('Mass Destroy Department');  
        }
    }
}
