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
        
        if($request->type == "M"){
            
            $tableName = "YS_".$request->year."";

            if(Schema::hasTable($tableName)){             
                $queryItem = " SELECT ItemCode,Dscription,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'REM' Group by ItemCode,Dscription,Brand,Commodity  ";                      
                $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'REM' Group by CustCode,CustName,MasterDealer ";                         
            }
            else{
                $queryItem = " SELECT ItemCode,Dscription,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017  WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'TEST' Group by ItemCode,Dscription,Brand,Commodity  ";                      
                $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'TEST' Group by CustCode,CustName,MasterDealer ";   
            }        
                        
            $Item = DB::select($queryItem,[]);    
            $Cust = DB::select($queryCust,[]); 
            return Response::json(array($Item,$Cust));

        }else{
            $tableName = "YS_".$request->year."";

            if(Schema::hasTable($tableName)){  
                if($request->month == '1'){
                    $queryItem = " SELECT ItemCode,Dscription,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth IN (1,2,3) AND SalesPersonGroup = 'REM' Group by ItemCode,Dscription,Brand,Commodity  ";                      
                    $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth IN (1,2,3) AND SalesPersonGroup = 'REM' Group by CustCode,CustName,MasterDealer ";  
                }
                else if($request->month == '2'){
                    $queryItem = " SELECT ItemCode,Dscription,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth IN (4,5,6) AND SalesPersonGroup = 'REM' Group by ItemCode,Dscription,Brand,Commodity  ";                      
                    $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth IN (4,5,6) AND SalesPersonGroup = 'REM' Group by CustCode,CustName,MasterDealer ";  
                }
                else if($request->month == '3'){
                    $queryItem = " SELECT ItemCode,Dscription,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth IN (7,8,9) AND SalesPersonGroup = 'REM' Group by ItemCode,Dscription,Brand,Commodity  ";                      
                    $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth IN (7,8,9) AND SalesPersonGroup = 'REM' Group by CustCode,CustName,MasterDealer ";  
                }
                else if($request->month == '4'){
                    $queryItem = " SELECT ItemCode,Dscription,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth IN (10,11,12) AND SalesPersonGroup = 'REM' Group by ItemCode,Dscription,Brand,Commodity  ";                      
                    $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth IN (10,11,12) AND SalesPersonGroup = 'REM' Group by CustCode,CustName,MasterDealer ";  
                }                      
            }
            else{
                $queryItem = " SELECT ItemCode,Dscription,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017  WHERE DocMonth = '1' AND SalesPersonGroup = 'TEST' Group by ItemCode,Dscription,Brand,Commodity  ";                      
                $queryCust = " SELECT CustCode,CustName,MasterDealer,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE DocMonth = '1' AND SalesPersonGroup = 'TEST' Group by CustCode,CustName,MasterDealer ";   
            }        
                        
            $Item = DB::select($queryItem,[]);    
            $Cust = DB::select($queryCust,[]); 
            return Response::json(array($Item,$Cust));
        }
        
    }

    public function downloadPDF(Request $request)
    {
        $oldYear = $request->year - 1;
        $data["year"] = $request->year;
        $data["oldYear"] = $oldYear;
        
        $tableName1 = "YS_".$request->year."";
        $tableName2 = "YS_".$oldYear."";  

        if($request->mode == "Yearly"){   
            if($request->type == "Graph"){             
                $arrayImage = array($request->chart1, $request->chart2);
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
    
                $Filename = "SSGraph".$oldYear."&".$request->year.".pdf";        
                $pdf = PDF::loadView('PDFFormat.salessummaryGraph', compact('data'))->setPaper('A4', 'landscape');    
                file_put_contents(public_path() . "/tempfiles/" .$Filename, $pdf->output()); 
                
                foreach($pathImage as $path){
                    unlink($path);
                }
    
                return response()->download(public_path() . "/tempfiles/" .$Filename)->deleteFileAfterSend(true);
            }
            else{
                         
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
                    
                $currYearData = DB::select($strSQL1,[]);   
                $oldYearData = DB::select($strSQL2,[]);   
                $targetData = DB::select($strSQL3,[]);
    
                $Filename = "SSTable".$request->month.$request->year.".pdf";        
                $pdf = PDF::loadView('PDFFormat.salessummaryYearTable', compact('data','currYearData','oldYearData','targetData'))->setPaper('A4', 'landscape');  
                return $pdf->download($Filename);  
            }
    
        }
        else{
            if($request->type == "Graph"){
             
                $data["year"] = $request->year;
                $data["oldYear"] = $oldYear;
                $arrayImage = array($request->chart1, $request->chart2);
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
    
                $Filename = "SSGraphQuaterof".$request->year.".pdf";        
                $pdf = PDF::loadView('PDFFormat.salessummaryGraph', compact('data'))->setPaper('A4', 'landscape');    
                file_put_contents(public_path() . "/tempfiles/" .$Filename, $pdf->output()); 
                
                foreach($pathImage as $path){
                    unlink($path);
                }
    
                return response()->download(public_path() . "/tempfiles/" .$Filename)->deleteFileAfterSend(true);
            }
            else{
                         
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
                    
                $currYearData = DB::select($strSQL1,[]);   
                $oldYearData = DB::select($strSQL2,[]);   
                $targetData = DB::select($strSQL3,[]);   
    
                $Filename = "SSTableQuaterof".$request->year.".pdf";        
                $pdf = PDF::loadView('PDFFormat.salessummaryQuaterTable', compact('data','currYearData','oldYearData','targetData'))->setPaper('A4', 'landscape'); 
                return $pdf->download($Filename);  
            }
    
        }
    }

}
 

