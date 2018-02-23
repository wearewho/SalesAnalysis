<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Department;
use Silber\Bouncer\Database\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUsersRequest;
use App\Http\Requests\Admin\UpdateUsersRequest;
use LogActivity;

class UsersController extends Controller
{
    /**
     * Display a listing of User.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }

        $users = User::with('roles')->get();

        return view('admin.users.index', compact('users'));
    }

    /**
     * Show the form for creating new User.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }

        $department = Department::all();
        $roles = Role::get()->pluck('name', 'name');

        return view('admin.users.create', compact('roles','department'));
    }

    /**
     * Store a newly created User in storage.
     *
     * @param  \App\Http\Requests\StoreUsersRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUsersRequest $request)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        
        $user = User::create($request->all());

        foreach ($request->input('roles') as $role) {
            $user->assign($role);
        }

        $request->session()->flash('insertComplete', 'Insert Target Complete!');
        LogActivity::addToLog('Create Users');
        return redirect()->route('admin.users.index');
    }


    /**
     * Show the form for editing User.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }

        $roles = Role::get()->pluck('name', 'name');
        $department = Department::all();
        $user = User::findOrFail($id);

        return view('admin.users.edit', compact('user', 'roles', 'department'));
    }

    /**
     * Update User in storage.
     *
     * @param  \App\Http\Requests\UpdateUsersRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUsersRequest $request, $id)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        
        $user = User::findOrFail($id);
        $user->update($request->all());

        foreach ($user->roles as $role) {
            $user->retract($role);
        }
        foreach ($request->input('roles') as $role) {
            $user->assign($role);
        }
        
        if(session('data')->id == $id){
            $newSession = User::with('roles')->where('id', $id)->first();
            $department = Department::where('DepartmentID', $newSession->DepartmentID)->first();
            $newSession->department = $department;
            $request->session()->forget('data');
            $request->session()->put('data',$newSession);
        }

        $request->session()->flash('editComplete', 'Edit Complete!');
        LogActivity::addToLog('Edit Users');
        return redirect()->route('admin.users.index');
    }

    /**
     * Remove User from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        $user = User::findOrFail($id);
        $user->delete();

        $request->session()->flash('deleteComplete', 'Poof! Your imaginary file has been deleted!');
        LogActivity::addToLog('Destroy Users');
        return back();
    }

    /**
     * Delete all selected User at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (! Gate::allows('Admin_Manage')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = User::whereIn('id', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }

            LogActivity::addToLog('Mass Destroy Users');
        }
    }

}
