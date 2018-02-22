<?php

namespace App\Http\Controllers\System;

use App\Http\Requests\System\StoreCompanyRequest;
use App\Http\Requests\System\UpdateCompanyRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Company;
use LogActivity;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }

        $company = Company::all();

        return view('system.company.index', compact('company'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        return view('system.company.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCompanyRequest $request)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
    
        $company = Company::create($request->all());

        $request->session()->flash('insertComplete', 'Insert Complete!');
        LogActivity::addToLog('Create Company');       
        return redirect()->route('system.company.index');
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
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }

        $company = Company::findOrFail($id);

        return view('system.company.edit', compact('company'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCompanyRequest $request, $id)
    {  
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        $company = Company::findOrFail($id);
        $company->update($request->all());

        $request->session()->flash('editComplete', 'Edit Complete!');
        LogActivity::addToLog('Edit Company');  
        return redirect()->route('system.company.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        $company =Company::findOrFail($id);
        $company->delete();

        $request->session()->flash('deleteComplete', 'Poof! Your imaginary file has been deleted!');
        LogActivity::addToLog('Destroy Company');  
        return back();
    }

    /**
     * Delete all selected Company at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Company::whereIn('CompanyID', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }

            LogActivity::addToLog('Mass Destroy Company');  
        }
    }
}
