<?php

namespace App\Http\Controllers\Analysis;

use DB;
use Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

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
        
        $strSQL = "SELECT * FROM ( select DocMonth,DocYear,CustCode,SalesPersonGroup,ItemGroupName,Quantity,Price,Total from YS17_Invoice union all select DocMonth,DocYear,CustCode,SalesPersonGroup,ItemGroupName,Quantity,Price,Total from YS17_Credit ) YS17 ";
          
        if($request->month != '13'){
            $strSQL .= "WHERE DocMonth = '".$request->month."' AND DocYear = '".$request->year."' ";
        }
        else {
            $strSQL .=  "WHERE DocYear = '".$request->year."' ";
        }
        
        $result = DB::select($strSQL,[]);    
        return Response::json(array($result));
    }

    public function selectDataTableYSD(Request $request) {        
          
        if($request->sort == 'Market'){
            $queryItem = " SELECT ItemCode,Dscription,SUM(Quantity) As Quantity,SUM(Total) As Total
                        FROM
                        (
                            select DocMonth,DocYear,SalesPersonGroup,ItemCode,Dscription,Quantity,Total
                            from YS17_Invoice
                            union all
                            select DocMonth,DocYear,SalesPersonGroup,ItemCode,Dscription,Quantity,Total
                            from YS17_Credit
                        ) YS17   ";

                        if($request->month != '13'){
                            $queryItem .= "WHERE DocMonth = '$request->month' AND DocYear = '$request->year' AND SalesPersonGroup = '$request->type' Group by ItemCode,Dscription  ";    
                        }
                        else{
                            $queryItem .= "WHERE DocYear = '$request->year' AND SalesPersonGroup = '$request->type' Group by ItemCode,Dscription  ";    
                        }
                        
                        
            $queryCust = " SELECT CustCode,CustName,SUM(Quantity) As Quantity,SUM(Total) As Total 
                        FROM
                        (
                            select DocMonth,DocYear,SalesPersonGroup,CustCode,CustName,Quantity,Total
                            from YS17_Invoice
                            union all
                            select DocMonth,DocYear,SalesPersonGroup,CustCode,CustName,Quantity,Total
                            from YS17_Credit
                        ) YS17 ";

                        if($request->month != '13'){
                            $queryCust .= "WHERE DocMonth = '$request->month' AND DocYear = '$request->year' AND SalesPersonGroup = '$request->type' Group by CustCode,CustName ";
                        }
                        else{
                            $queryCust .= "WHERE DocYear = '$request->year' AND SalesPersonGroup = '$request->type' Group by CustCode,CustName ";
                        }
                        

        }
        else if($request->sort == 'Type') {

            $queryItem = " SELECT ItemCode,Dscription,SUM(Quantity) As Quantity,SUM(Total) As Total
                        FROM
                        (
                            select DocMonth,DocYear,ItemGroupName,ItemCode,Dscription,Quantity,Total
                            from YS17_Invoice
                            union all
                            select DocMonth,DocYear,ItemGroupName,ItemCode,Dscription,Quantity,Total
                            from YS17_Credit
                        ) YS17  ";

                        if($request->month != '13'){
                            $queryItem .= "WHERE DocMonth = '$request->month' AND DocYear = '$request->year' AND ItemGroupName = '$request->type' Group by ItemCode,Dscription  "; 
                        }
                        else{
                            $queryItem .= "WHERE DocYear = '$request->year' AND ItemGroupName = '$request->type' Group by ItemCode,Dscription  "; 
                        }
                           
                        
            $queryCust = " SELECT CustCode,CustName,SUM(Quantity) As Quantity,SUM(Total) As Total 
                        FROM
                        (
                            select DocMonth,DocYear,ItemGroupName,CustCode,CustName,Quantity,Total
                            from YS17_Invoice
                            union all
                            select DocMonth,DocYear,ItemGroupName,CustCode,CustName,Quantity,Total
                            from YS17_Credit
                        ) YS17 ";

                        if($request->month != '13'){
                            $queryCust .= "WHERE DocMonth = '$request->month' AND DocYear = '$request->year' AND ItemGroupName = '$request->type' Group by CustCode,CustName ";
                        }
                        else{
                            $queryCust .= "WHERE DocYear = '$request->year' AND ItemGroupName = '$request->type' Group by CustCode,CustName ";
                        }
                        
        
        }        
        
        $Item = DB::select($queryItem,[]);    
        $Cust = DB::select($queryCust,[]); 
        return Response::json(array($Item,$Cust));
    }
}
