<?php

namespace App\Http\Controllers\System;

use App\Http\Requests\System\StoreItemgroupRequest;
use App\Http\Requests\System\UpdateItemgroupRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\ItemGroup;
class ItemgroupController extends Controller
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

        $ItemGroup = ItemGroup::all();

        return view('system.itemgroup.index', compact('ItemGroup'));
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
        return view('system.itemgroup.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreItemgroupRequest $request)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        
        $ItemGroup = ItemGroup::create($request->all());

        $request->session()->flash('insertComplete', 'Insert Complete!');
        return redirect()->route('system.itemgroup.index');
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

        $ItemGroup = ItemGroup::findOrFail($id);

        return view('system.itemgroup.edit', compact('ItemGroup'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateItemgroupRequest $request, $id)
    {  
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        $ItemGroup = ItemGroup::findOrFail($id);
        $ItemGroup->update($request->all());

        $request->session()->flash('editComplete', 'Edit Complete!');
        return redirect()->route('system.itemgroup.index');
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
        $ItemGroup =ItemGroup::findOrFail($id);
        $ItemGroup->delete();

        $request->session()->flash('deleteComplete', 'Poof! Your imaginary file has been deleted!');
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
            $entries = ItemGroup::whereIn('ItemGroupID', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }
        }
    }
}
