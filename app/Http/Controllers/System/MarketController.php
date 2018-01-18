<?php

namespace App\Http\Controllers\System;

use App\Http\Requests\System\StoreMarketRequest;
use App\Http\Requests\System\UpdateMarketRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Market;

class MarketController extends Controller
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

        $market = Market::all();

        return view('system.market.index', compact('market'));
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
        return view('system.market.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMarketRequest $request)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        
        $market = Market::create($request->all());

        $request->session()->flash('insertComplete', 'Insert Complete!');
        return redirect()->route('system.market.index');
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

        $market = Market::findOrFail($id);

        return view('system.market.edit', compact('market'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMarketRequest $request, $id)
    {  
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        $market = Market::findOrFail($id);
        $market->update($request->all());

        $request->session()->flash('editComplete', 'Edit Complete!');
        return redirect()->route('system.market.index');
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
        
        $market = Market::findOrFail($id);
        $market->delete();

        $request->session()->flash('deleteComplete', 'Poof! Your imaginary file has been deleted!');
        return back();
    }

    /**
     * Delete all selected Market at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (! Gate::allows('admin_manage')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Market::whereIn('Code', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }
        }
    }
}
