<?php

namespace App\Http\Controllers\Analysis;

use DB;
use Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use PDF;
use Schema;

class SAController extends Controller
{
    public function SalesSummary()
    {
        if (! Gate::allows('sales_analysis')) {
            return abort(401);
        }

        return view('analysis.sa.salessummary');
    }

    public function TargetComparison()
    {
        if (! Gate::allows('sales_analysis')) {
            return abort(401);
        }

        return view('analysis.sa.targetcomparison');
    }

    public function TopList()
    {
        if (! Gate::allows('sales_analysis')) {
            return abort(401);
        }

        return view('analysis.sa.toplist');
    }

    public function Region()
    {
        if (! Gate::allows('sales_analysis')) {
            return abort(401);
        }

        return view('analysis.sa.region');
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
            $queryItem = " SELECT ItemCode,Dscription,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->year." ";

                        if($request->month != '13'){
                            $queryItem .= "WHERE DocMonth = '$request->month' AND SalesPersonGroup = '$request->type' Group by ItemCode,Dscription  ";    
                        }
                        else{
                            $queryItem .= "WHERE SalesPersonGroup = '$request->type' Group by ItemCode,Dscription  ";    
                        }
                        
                        
            $queryCust = " SELECT CustCode,CustName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->year." ";

                        if($request->month != '13'){
                            $queryCust .= "WHERE DocMonth = '$request->month' AND SalesPersonGroup = '$request->type' Group by CustCode,CustName ";
                        }
                        else{
                            $queryCust .= "WHERE SalesPersonGroup = '$request->type' Group by CustCode,CustName ";
                        }
                        

        }
        else if($request->sort == 'Type') {

            $queryItem = " SELECT ItemCode,Dscription,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->year." ";

                        if($request->month != '13'){
                            $queryItem .= "WHERE DocMonth = '$request->month' AND ItemGroupName = '$request->type' Group by ItemCode,Dscription  "; 
                        }
                        else{
                            $queryItem .= "WHERE ItemGroupName = '$request->type' Group by ItemCode,Dscription  "; 
                        }
                           
                        
            $queryCust = " SELECT CustCode,CustName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->year." ";

                        if($request->month != '13'){
                            $queryCust .= "WHERE DocMonth = '$request->month' AND ItemGroupName = '$request->type' Group by CustCode,CustName ";
                        }
                        else{
                            $queryCust .= "WHERE ItemGroupName = '$request->type' Group by CustCode,CustName ";
                        }
                        
        
        }        
        
        $Item = DB::select($queryItem,[]);    
        $Cust = DB::select($queryCust,[]); 
        return Response::json(array($Item,$Cust));
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

        $Filename = "SS".date("Ymd").".pdf";
        
        $pdf = PDF::loadView('PDFFormat.salessummary', compact('data', 'result'))->setPaper('A4', 'landscape');
        return $pdf->download($Filename);
  
    }
}
