<?php

namespace App\Http\Controllers\Analysis;

use DB;
use Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use PDF;
use Schema;
use App\ItemGroup;
use App\Market;
use App\Region;
use App\Province;

class SAController extends Controller
{
    public function SalesSummary()
    {
        if (! Gate::allows('Sales_Analysis')) {
            return abort(401);
        }

        return view('analysis.sa.salessummary');
    }

    public function TargetComparison()
    {
        if (! Gate::allows('Sales_Analysis')) {
            return abort(401);
        }

        return view('analysis.sa.targetcomparison');
    }

    public function TopList()
    {
        if (! Gate::allows('Sales_Analysis')) {
            return abort(401);
        }

        return view('analysis.sa.toplist');
    }

    public function Region()
    {
        if (! Gate::allows('Sales_Analysis')) {
            return abort(401);
        }

        $Market = Market::all();
        $Region = Region::all();
        $Province = Province::all();
        return view('analysis.sa.region', compact('Market','Region','Province'));
    }

    public function test(Request $request)
    {
        dd($request->all());
    }

    public function selectProvince(Request $request)
    {
    	if($request->ajax()){
            $URegion = Region::where('Name', $request->region)->pluck('Code');
            $Province = Province::where('U_Region',$URegion)->get();  
            return Response::json(array($Province));
    	}
    }

    public function byDate()
    {
        if (! Gate::allows('Sales_Analysis')) {
            return abort(401);
        }
        
        $Market = Market::all();
        $ItemGroup = ItemGroup::all();

        return view('analysis.sa.bydate', compact('ItemGroup','Market'));
    }

    public function selectYSD(Request $request) {      

        $tableName = "YS_".$request->year."";
        
        if(Schema::hasTable($tableName)){

            $strSQL = "SELECT DocMonth,DocYear,CustCode,SalesPersonGroup,ItemGroupName,Quantity,UnitPrice,Total FROM YS_".$request->year." ";
          
            if($request->month != '13'){
                $strSQL .= "WHERE DocMonth = '".$request->month."' ";
            }

        }
        else{
            $strSQL = "SELECT DocMonth,DocYear,CustCode,SalesPersonGroup,ItemGroupName,Quantity,UnitPrice,Total FROM YS_2017 WHERE DocMonth = '13' ";
        }
        
        $result = DB::select($strSQL,[]);    
        return Response::json(array($result));
    }

    public function selectDataTableYSD(Request $request) {        
          
        if($request->sort == 'Market'){
            $queryItem = " SELECT ItemCode,Dscription,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->year." ";

                        if($request->month != '13'){
                            $queryItem .= "WHERE DocMonth = '$request->month' AND SalesPersonGroup = '$request->type' Group by ItemCode,Dscription,Commodity  ";    
                        }
                        else{
                            $queryItem .= "WHERE SalesPersonGroup = '$request->type' Group by ItemCode,Dscription,Commodity  ";    
                        }
                        
                        
            $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->year." ";

                        if($request->month != '13'){
                            $queryCust .= "WHERE DocMonth = '$request->month' AND SalesPersonGroup = '$request->type' Group by CustCode,CustName,MasterDealer ";
                        }
                        else{
                            $queryCust .= "WHERE SalesPersonGroup = '$request->type' Group by CustCode,CustName,MasterDealer ";
                        }
                        

        }
        else if($request->sort == 'Type') {

            $queryItem = " SELECT ItemCode,Dscription,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->year." ";

                        if($request->month != '13'){
                            $queryItem .= "WHERE DocMonth = '$request->month' AND ItemGroupName = '$request->type' Group by ItemCode,Dscription,Commodity  "; 
                        }
                        else{
                            $queryItem .= "WHERE ItemGroupName = '$request->type' Group by ItemCode,Dscription,Commodity  "; 
                        }
                           
                        
            $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->year." ";

                        if($request->month != '13'){
                            $queryCust .= "WHERE DocMonth = '$request->month' AND ItemGroupName = '$request->type' Group by CustCode,CustName,MasterDealer ";
                        }
                        else{
                            $queryCust .= "WHERE ItemGroupName = '$request->type' Group by CustCode,CustName,MasterDealer ";
                        }
                        
        
        }        
        
        $Item = DB::select($queryItem,[]);    
        $Cust = DB::select($queryCust,[]); 
        return Response::json(array($Item,$Cust));
    }

    public function selectByDate(Request $request) {      
        

        if($request->startYear == $request->endYear){
            
            $tableName = "YS_".$request->startYear."";

            if(Schema::hasTable($tableName)){ 

                $strSQL = "SELECT Docdate,CustCode,SalesPersonGroup,ItemGroupName,ItemGroupShort,Quantity,UnitPrice,Total FROM YS_".$request->startYear." Where Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103) ";              
    
                if($request->market != "All"){
                    $strSQL .= "And SalesPersonGroup = '$request->market' ";
                }

                if($request->itemGroup != "All"){
                    $strSQL .= "And ItemGroupName = '$request->itemGroup'";
                }

                $strSQL .= "ORDER BY Docdate";
                
                $data = DB::select($strSQL,[]);  
                return Response::json(array($data));
            }
        }   
        else{

            $tableName1 = "YS_".$request->startYear."";
            $tableName2 = "YS_".$request->endYear."";

            if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){ 

                $strSQL = "

                DECLARE @lastday varchar(6) = '31/12/';
                DECLARE @lastyear varchar(4) = '$request->startYear';
                DECLARE @firstday varchar(6) = '01/01/';
                DECLARE @firstyear varchar(4) = '$request->endYear';
                DECLARE @last varchar(10) = @lastday + @lastyear;
                DECLARE @first varchar(10) = @firstday + @firstyear;

                    Select * From (
                        SELECT Docdate,CustCode,SalesPersonGroup,ItemGroupName,ItemGroupShort,Quantity,UnitPrice,Total FROM YS_".$request->startYear." Where Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, (@lastday + @lastyear), 103) 
                        union all
                        SELECT Docdate,CustCode,SalesPersonGroup,ItemGroupName,ItemGroupShort,Quantity,UnitPrice,Total FROM YS_".$request->endYear." Where Docdate BETWEEN convert(datetime, (@firstday + @firstyear), 103) AND convert(datetime, '$request->endDate', 103) 
                    ) data 
                    Where Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103)";      
                    
                    if($request->market != "All"){
                        $strSQL .= "And SalesPersonGroup = '$request->market' ";
                    }
    
                    if($request->itemGroup != "All"){
                        $strSQL .= "And ItemGroupName = '$request->itemGroup'";
                    }                

                $strSQL .= "ORDER BY Docdate";
                
                $data = DB::select($strSQL,[]);  
                return Response::json(array($data));
            }
        }    
                 
    }
    
    public function downloadPDF(Request $request)
    {
        if(is_null($request->month)){
            $strSQL = "SELECT DocMonth,DocYear,CustCode,SalesPersonGroup,ItemGroupName,Quantity,UnitPrice,Total FROM YS_".$request->year."  ";      
        }
        else{
            $strSQL = "SELECT DocMonth,DocYear,CustCode,SalesPersonGroup,ItemGroupName,Quantity,UnitPrice,Total FROM YS_".$request->year." WHERE DocMonth = '$request->month' ";      
        }

        $result = DB::select($strSQL,[]);  
        $data["month"] = $request->month;
        $data["year"] = $request->year;
        $data["company"] = $request->company;
        $arrayImage = array($request->chart1, $request->chart2, $request->chart3, $request->chart4);
        $pathImage = array();

        $x = 0;

        foreach($arrayImage as $chart){
            $x++;
            list($type, $chart) = explode(';', $chart);
            list(, $chart)      = explode(',', $chart);
            $image = base64_decode($chart);
            $image_name= str_random(10).'.jpeg';
            $path = public_path() . "/images/tempcharts/" . $image_name;
            file_put_contents($path, $image); 
            $data["chart".$x] = $image_name;
            $pathImage[] = $path;
        }       

        $Filename = "SS".$request->month.$request->year.".pdf";        
        $pdf = PDF::loadView('PDFFormat.salessummary', compact('data', 'result'))->setPaper('A4', 'landscape');    
        file_put_contents(public_path() . "/tempfiles/" .$Filename, $pdf->output()); 
        
        foreach($pathImage as $path){
            unlink($path);
        }

        return response()->download(public_path() . "/tempfiles/" .$Filename)->deleteFileAfterSend(true);

    }
}
 