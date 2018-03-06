<?php

namespace App\Http\Controllers\Controls;

use Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\Controls\StoreTargetmasterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\TargetH;
use App\TargetD;
use App\ItemGroup;
use App\Company;
use App\Market;
use PDF;
use LogActivity;

class TargetmasterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! Gate::allows('Controls')) {
            return abort(401);
        }

        $TargetH = TargetH::where('TargetID', '!=', '17')->orderBy('Year', 'ASC')->orderBy('Market', 'ASC')->get();

        return view('controls.targetmaster.index', compact('TargetH'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (! Gate::allows('Controls')) {
            return abort(401);
        }

        $Market = Market::all();
        $Company = Company::all();
        $ItemGroup = ItemGroup::all();

        return view('controls.targetmaster.create', compact('ItemGroup','Company','Market'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTargetmasterRequest $request)
    { 
        $Count = TargetH::where('Company',$request->company)->where('Year',$request->year)->where('Market',$request->market)->count();
        
        if($Count > 0){
            $request->session()->flash('insertError', 'Cannot Create Target! Because data is already.');
            return redirect()->route('controls.targetmaster.create');
        }
        else{
            $TargetH                = new TargetH();
            $TargetH->Year          = $request->year;
            $TargetH->Company       = $request->company;
            $TargetH->Market        = $request->market;
            $TargetH->save(); 

            $result = count($request->ItemGroup);
            for ($x = 0; $x < $result; $x++) {
                $TargetD               = new TargetD();
                $TargetD->TargetID     = $TargetH->TargetID;
                $TargetD->ItemGroup    = $request->input('ItemGroup.'.$x.'');
                $TargetD->Amt01        = $request->input('Amt_01.'.$x.'');
                $TargetD->Amt02        = $request->input('Amt_02.'.$x.'');
                $TargetD->Amt03        = $request->input('Amt_03.'.$x.'');
                $TargetD->AmtQ1        = $request->input('Amt_Q1.'.$x.'');
                $TargetD->Amt04        = $request->input('Amt_04.'.$x.'');
                $TargetD->Amt05        = $request->input('Amt_05.'.$x.'');
                $TargetD->Amt06        = $request->input('Amt_06.'.$x.'');
                $TargetD->AmtQ2        = $request->input('Amt_Q2.'.$x.'');
                $TargetD->Amt07        = $request->input('Amt_07.'.$x.'');
                $TargetD->Amt08        = $request->input('Amt_08.'.$x.'');
                $TargetD->Amt09        = $request->input('Amt_09.'.$x.'');
                $TargetD->AmtQ3        = $request->input('Amt_Q3.'.$x.'');
                $TargetD->Amt10        = $request->input('Amt_10.'.$x.'');
                $TargetD->Amt11        = $request->input('Amt_11.'.$x.'');
                $TargetD->Amt12        = $request->input('Amt_12.'.$x.'');
                $TargetD->AmtQ4        = $request->input('Amt_Q4.'.$x.'');
                $TargetD->Unit01       = $request->input('Unit_01.'.$x.'');
                $TargetD->Unit02       = $request->input('Unit_02.'.$x.'');
                $TargetD->Unit03       = $request->input('Unit_03.'.$x.'');
                $TargetD->UnitQ1       = $request->input('Unit_Q1.'.$x.'');
                $TargetD->Unit04       = $request->input('Unit_04.'.$x.'');
                $TargetD->Unit05       = $request->input('Unit_05.'.$x.'');
                $TargetD->Unit06       = $request->input('Unit_06.'.$x.'');
                $TargetD->UnitQ2       = $request->input('Unit_Q2.'.$x.'');
                $TargetD->Unit07       = $request->input('Unit_07.'.$x.'');
                $TargetD->Unit08       = $request->input('Unit_08.'.$x.'');
                $TargetD->Unit09       = $request->input('Unit_09.'.$x.'');
                $TargetD->UnitQ3       = $request->input('Unit_Q3.'.$x.'');
                $TargetD->Unit10       = $request->input('Unit_10.'.$x.'');
                $TargetD->Unit11       = $request->input('Unit_11.'.$x.'');
                $TargetD->Unit12       = $request->input('Unit_12.'.$x.'');
                $TargetD->UnitQ4       = $request->input('Unit_Q4.'.$x.'');
                $TargetD->save(); 
            } 

            $request->session()->flash('insertComplete', 'Insert Target Complete!');
            LogActivity::addToLog('Insert Target Master');       
            return redirect()->route('controls.targetmaster.index');
        }
               
        
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
        if (! Gate::allows('Controls')) {
            return abort(401);
        }

        $TargetH = TargetH::findOrFail($id);
        $TargetD = TargetD::where('TargetID', '=', $id)->get(); 
        $ItemGroup = ItemGroup::all();

        return view('controls.targetmaster.edit', compact('TargetH', 'TargetD', 'ItemGroup'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (! Gate::allows('Controls')) {
            return abort(401);  
        }
        
        $oldTargetD = TargetD::where('TargetID',$id);
        $oldTargetD->delete();
               
        $result = count($request->ItemGroup);
        for ($x = 0; $x < $result; $x++) {
            $TargetD               = new TargetD();
            $TargetD->TargetID     = $id;
            $TargetD->ItemGroup    = $request->input('ItemGroup.'.$x.'');
            $TargetD->Amt01        = $request->input('Amt_01.'.$x.'');
            $TargetD->Amt02        = $request->input('Amt_02.'.$x.'');
            $TargetD->Amt03        = $request->input('Amt_03.'.$x.'');
            $TargetD->AmtQ1        = $request->input('Amt_Q1.'.$x.'');
            $TargetD->Amt04        = $request->input('Amt_04.'.$x.'');
            $TargetD->Amt05        = $request->input('Amt_05.'.$x.'');
            $TargetD->Amt06        = $request->input('Amt_06.'.$x.'');
            $TargetD->AmtQ2        = $request->input('Amt_Q2.'.$x.'');
            $TargetD->Amt07        = $request->input('Amt_07.'.$x.'');
            $TargetD->Amt08        = $request->input('Amt_08.'.$x.'');
            $TargetD->Amt09        = $request->input('Amt_09.'.$x.'');
            $TargetD->AmtQ3        = $request->input('Amt_Q3.'.$x.'');
            $TargetD->Amt10        = $request->input('Amt_10.'.$x.'');
            $TargetD->Amt11        = $request->input('Amt_11.'.$x.'');
            $TargetD->Amt12        = $request->input('Amt_12.'.$x.'');
            $TargetD->AmtQ4        = $request->input('Amt_Q4.'.$x.'');
            $TargetD->Unit01       = $request->input('Unit_01.'.$x.'');
            $TargetD->Unit02       = $request->input('Unit_02.'.$x.'');
            $TargetD->Unit03       = $request->input('Unit_03.'.$x.'');
            $TargetD->UnitQ1       = $request->input('Unit_Q1.'.$x.'');
            $TargetD->Unit04       = $request->input('Unit_04.'.$x.'');
            $TargetD->Unit05       = $request->input('Unit_05.'.$x.'');
            $TargetD->Unit06       = $request->input('Unit_06.'.$x.'');
            $TargetD->UnitQ2       = $request->input('Unit_Q2.'.$x.'');
            $TargetD->Unit07       = $request->input('Unit_07.'.$x.'');
            $TargetD->Unit08       = $request->input('Unit_08.'.$x.'');
            $TargetD->Unit09       = $request->input('Unit_09.'.$x.'');
            $TargetD->UnitQ3       = $request->input('Unit_Q3.'.$x.'');
            $TargetD->Unit10       = $request->input('Unit_10.'.$x.'');
            $TargetD->Unit11       = $request->input('Unit_11.'.$x.'');
            $TargetD->Unit12       = $request->input('Unit_12.'.$x.'');
            $TargetD->UnitQ4       = $request->input('Unit_Q4.'.$x.'');
            $TargetD->save(); 
        } 
        
        $request->session()->flash('editComplete', 'Edit Complete!');
        LogActivity::addToLog('Edit Target Master');       
        return redirect()->route('controls.targetmaster.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! Gate::allows('Controls')) {
            return abort(401);
        }
        $TargetH = TargetH::findOrFail($id);   
        $TargetD = TargetD::where('TargetID',$id)->get();
        
        foreach ($TargetD as $item) {
            $item->delete();                
        }
        $TargetH->delete(); 
        
        $allTargetH = TargetH::all();

        session()->flash('deleteComplete', 'Poof! Your imaginary file has been deleted!');
        LogActivity::addToLog('Destroy Target Master');       
        return Response::json(array($allTargetH));
    }

    /**
     * Delete all selected Company at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (! Gate::allows('Controls')) {
            return abort(401);
        }

        if ($request->input('ids')) {
            
            $TargetHs = TargetH::whereIn('TargetID', $request->input('ids'))->get();
            $TargetDs = TargetD::whereIn('TargetID', $request->input('ids'))->get();

            foreach ($TargetHs as $Hentry) {
                $Hentry->delete();                
            }
            
            foreach ($TargetDs as $Dentry) {
                $Dentry->delete();
            }
            
            LogActivity::addToLog('Mass Destroy Target Master'); 
        }
    }
    
    public function downloadPDF($id)
    {
        $TargetH = TargetH::findOrFail($id);
        $TargetD = TargetD::where('TargetID', '=', $id)->get(); 
        $Filename = "TM".$id.date("Ymd").".pdf";
        
        $pdf = PDF::loadView('PDFFormat.targetmaster', compact('TargetH', 'TargetD'))->setPaper('A4', 'landscape');
        return $pdf->download($Filename);
  
      }
}
