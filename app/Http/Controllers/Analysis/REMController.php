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
use App\TargetH; 

class REMController extends Controller
{
    public function SalesSummaryREM()
    {
        if (! Gate::allows('REM')) {
            return abort(401);
        }

        return view('analysis.rem.salessummaryREM');
    }

    public function selectREM(Request $request) {  

        $oldYear = $request->year - 1;
        $tableName1 = "YS_".$request->year."";
        $tableName2 = "YS_".$oldYear."";        
        $Target = TargetH::where('Year', '=', $request->year)->where('Company', '=', 'YSD')->where('Market', '=', 'REM')->first();  
        $messageData = "";
        $messageTarget  = "";  
         
        if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){             
            $strSQL1 = "SELECT DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM ".$tableName1." WHERE SalesPersonGroup = 'REM'   ";
            $strSQL2 = "SELECT DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM ".$tableName2." WHERE SalesPersonGroup = 'REM'   ";
                         
        }
        else if(Schema::hasTable($tableName1) && !Schema::hasTable($tableName2)){
            $strSQL1 = "SELECT DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM ".$tableName1." WHERE SalesPersonGroup = 'REM'  ";
            $strSQL2 = "SELECT DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'   ";
        }
        else if(!Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){
            $strSQL1 = "SELECT DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
            $strSQL2 = "SELECT DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM ".$tableName2." WHERE SalesPersonGroup = 'REM'  ";
        }
        else{
            $messageData = "nullData";
            $strSQL1 = "SELECT DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
            $strSQL2 = "SELECT DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
                         
        }

        if(is_null($Target)){
            $messageTarget  = "nullTarget";
            $strSQL3 = "SELECT * FROM X_TargetDetails WHERE TargetID = 17 ";
        }
        else{
            $strSQL3 = "SELECT * FROM X_TargetDetails WHERE TargetID = ".$Target->TargetID." ";
        }
            
        $table1 = DB::select($strSQL1,[]);   
        $table2 = DB::select($strSQL2,[]);   
        $table3 = DB::select($strSQL3,[]);   
        return Response::json(array($table1,$table2,$table3,$messageData,$messageTarget)); 
        
    }

    public function selectDataTableREM(Request $request) {    
        
        
        $tableName = "YS_".$request->year."";

        if(Schema::hasTable($tableName)){             
            $queryItem = " SELECT ItemCode,Dscription,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'REM' Group by ItemCode,Dscription,Commodity  ";                      
            $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'REM' Group by CustCode,CustName,MasterDealer ";                         
        }
        else{
            $queryItem = " SELECT ItemCode,Dscription,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017  WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'TEST' Group by ItemCode,Dscription,Commodity  ";                      
            $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'TEST' Group by CustCode,CustName,MasterDealer ";   
        }        
                       
        $Item = DB::select($queryItem,[]);    
        $Cust = DB::select($queryCust,[]); 
        return Response::json(array($Item,$Cust));
    }

}
 

