<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\DB;
use App\Http\Requests\Admin\StoreAbilitiesRequest;
use App\Http\Requests\Admin\UpdateAbilitiesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use Silber\Bouncer\Database\Ability;
use LogActivity;

class AbilitiesController extends Controller
{
    /**
     * Display a listing of Abilities.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }

        $abilities = Ability::all();

        return view('admin.abilities.index', compact('abilities'));
    }

    /**
     * Show the form for creating new Ability.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {  
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        return view('admin.abilities.create');
    }

    /**
     * Store a newly created Ability in storage.
     *
     * @param  \App\Http\Requests\StoreAbilitiesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAbilitiesRequest $request)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        Ability::create($request->all());

        $request->session()->flash('insertComplete', 'Insert Complete!');        
        LogActivity::addToLog('Create Abilities');
        return redirect()->route('admin.abilities.index');
    }


    /**
     * Show the form for editing Ability.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        $ability = Ability::findOrFail($id);

        return view('admin.abilities.edit', compact('ability'));
    }

    /**
     * Update Ability in storage.
     *
     * @param  \App\Http\Requests\UpdateAbilitiesRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAbilitiesRequest $request, $id)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        $ability = Ability::findOrFail($id);
        $ability->update($request->all());

        $request->session()->flash('editComplete', 'Edit Complete!');        
        LogActivity::addToLog('Edit Abilities');        
        return redirect()->route('admin.abilities.index');
    }


    /**
     * Remove Ability from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        $ability = Ability::findOrFail($id);
        $ability->delete();

        $request->session()->flash('deleteComplete', 'Poof! Your imaginary file has been deleted!');        
        LogActivity::addToLog('Destroy Abilities');        
        return back();
    }

    /**
     * Delete all selected Ability at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Ability::whereIn('id', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }
            
        LogActivity::addToLog('Mass Destroy Abilities');
            
        }
    }

}
