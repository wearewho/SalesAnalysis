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

class SPDController extends Controller
{
    public function SalesSummarySPD()
    {
        if (! Gate::allows('SPD')) {
            return abort(401);
        }

        return view('analysis.spd.salessummarySPD');
    }

    public function SalesEnquirySPD()
    {
        if (! Gate::allows('SPD')) {
            return abort(401);
        }

        return view('analysis.spd.salesenquirySPD');
    }

    public function selectSPD(Request $request) {  

        $oldYear = $request->year - 1;
        $tableName1 = "YS_".$request->year."";
        $tableName2 = "YS_".$oldYear."";        
        $Target = TargetH::where('Year', '=', $request->year)->where('Company', '=', 'YBTH')->where('Market', '=', 'SPD')->first();  
        $messageData = "";
        $messageTarget  = "";  
         
        if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){           
            $strSQL1 = "SELECT ItemGroupShort,DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM ".$tableName1." WHERE SalesPersonGroup = 'SPD' ";
            $strSQL2 = "SELECT ItemGroupShort,DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM ".$tableName2." WHERE SalesPersonGroup = 'SPD' ";
                         
        }
        else if(Schema::hasTable($tableName1) && !Schema::hasTable($tableName2)){
            $strSQL1 = "SELECT ItemGroupShort,DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM ".$tableName1." WHERE SalesPersonGroup = 'SPD' ";
            $strSQL2 = "SELECT ItemGroupShort,DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'   ";
        }
        else if(!Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){
            $strSQL1 = "SELECT ItemGroupShort,DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
            $strSQL2 = "SELECT ItemGroupShort,DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM ".$tableName2." WHERE SalesPersonGroup = 'SPD' ";
        }
        else{
            $messageData = "nullData";
            $strSQL1 = "SELECT ItemGroupShort,DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
            $strSQL2 = "SELECT ItemGroupShort,DocMonth,DocYear,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
                         
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

    public function selectDataTableSPD(Request $request) {    
        
        if($request->type == "M"){
            
            $tableName = "YS_".$request->year."";

            if(Schema::hasTable($tableName)){             
                $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'SPD' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                $queryCust = " SELECT CustCode,CustName,MasterDealer,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'SPD' Group by CustCode,CustName,MasterDealer,ItemGroupShort ";                         
            }
            else{
                $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017  WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'TEST' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                $queryCust = " SELECT CustCode,CustName,MasterDealer,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE DocMonth = '$request->month' AND SalesPersonGroup = 'TEST' Group by CustCode,CustName,MasterDealer,ItemGroupShort ";   
            }        
                        
            $Item = DB::select($queryItem,[]);    
            $Cust = DB::select($queryCust,[]); 
            return Response::json(array($Item,$Cust));

        }else{
            $tableName = "YS_".$request->year."";

            if(Schema::hasTable($tableName)){  
                if($request->month == '1'){
                    $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth IN (1,2,3) AND SalesPersonGroup = 'SPD' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                    $queryCust = " SELECT CustCode,CustName,MasterDealer,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth IN (1,2,3) AND SalesPersonGroup = 'SPD' Group by CustCode,CustName,MasterDealer,ItemGroupShort ";  
                }
                else if($request->month == '2'){
                    $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth IN (4,5,6) AND SalesPersonGroup = 'SPD' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                    $queryCust = " SELECT CustCode,CustName,MasterDealer,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth IN (4,5,6) AND SalesPersonGroup = 'SPD' Group by CustCode,CustName,MasterDealer,ItemGroupShort ";  
                }
                else if($request->month == '3'){
                    $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth IN (7,8,9) AND SalesPersonGroup = 'SPD' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                    $queryCust = " SELECT CustCode,CustName,MasterDealer,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth IN (7,8,9) AND SalesPersonGroup = 'SPD' Group by CustCode,CustName,MasterDealer,ItemGroupShort ";  
                }
                else if($request->month == '4'){
                    $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE DocMonth IN (10,11,12) AND SalesPersonGroup = 'SPD' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                    $queryCust = " SELECT CustCode,CustName,MasterDealer,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE DocMonth IN (10,11,12) AND SalesPersonGroup = 'SPD' Group by CustCode,CustName,MasterDealer,ItemGroupShort ";  
                }                      
            }
            else{
                $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017  WHERE DocMonth = '1' AND SalesPersonGroup = 'TEST' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                $queryCust = " SELECT CustCode,CustName,MasterDealer,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE DocMonth = '1' AND SalesPersonGroup = 'TEST' Group by CustCode,CustName,MasterDealer,ItemGroupShort ";   
            }        
                        
            $Item = DB::select($queryItem,[]);    
            $Cust = DB::select($queryCust,[]); 
            return Response::json(array($Item,$Cust));
        }
        
    }

    public function selectEnquiryDataTableSPD(Request $request) {    
        
        if($request->startYear == $request->endYear){
            
            $tableName = "YS_".$request->startYear."";

            if(Schema::hasTable($tableName)){
                            
                $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                $queryCust = " SELECT CustCode,CustName,ItemGroupShort,ProvinceName,RegionName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103)  AND SalesPersonGroup = 'SPD' Group by CustCode,CustName,ItemGroupShort,ProvinceName,RegionName "; 
                
            }
            else{
                $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'TEST' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  ";                      
                $queryCust = " SELECT CustCode,CustName,ItemGroupShort,ProvinceName,RegionName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103)  AND SalesPersonGroup = 'TEST' Group by CustCode,CustName,ItemGroupShort,ProvinceName,RegionName "; 
            }
            
            $Item = DB::select($queryItem,[]);    
            $Cust = DB::select($queryCust,[]); 
            return Response::json(array($Item,$Cust));
        }   
        else{

            $tableName1 = "YS_".$request->startYear."";
            $tableName2 = "YS_".$request->endYear."";

            if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){ 

                $queryItem = "

                DECLARE @lastday varchar(6) = '31/12/';
                DECLARE @lastyear varchar(4) = '$request->startYear';
                DECLARE @firstday varchar(6) = '01/01/';
                DECLARE @firstyear varchar(4) = '$request->endYear';
                DECLARE @last varchar(10) = @lastday + @lastyear;
                DECLARE @first varchar(10) = @firstday + @firstyear;

                    Select * From (
                        SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->startYear." Where DocDate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, (@lastday + @lastyear), 103)  AND SalesPersonGroup = 'SPD' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity
                        union all
                        SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->endYear." Where DocDate BETWEEN convert(datetime, (@firstday + @firstyear), 103) AND convert(datetime, '$request->endDate', 103)  AND SalesPersonGroup = 'SPD' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity
                    ) data                              
                    
                    ";     
                
                $Item = DB::select($queryItem,[]);   

                $queryCust = "

                DECLARE @lastday varchar(6) = '31/12/';
                DECLARE @lastyear varchar(4) = '$request->startYear';
                DECLARE @firstday varchar(6) = '01/01/';
                DECLARE @firstyear varchar(4) = '$request->endYear';
                DECLARE @last varchar(10) = @lastday + @lastyear;
                DECLARE @first varchar(10) = @firstday + @firstyear;
                                       
                    Select * From (
                        SELECT CustCode,CustName,ItemGroupShort,ProvinceName,RegionName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->startYear." Where Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, (@lastday + @lastyear), 103) AND SalesPersonGroup = 'SPD' Group by CustCode,CustName,ItemGroupShort,ProvinceName,RegionName
                        union all
                        SELECT CustCode,CustName,ItemGroupShort,ProvinceName,RegionName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->endYear." Where Docdate BETWEEN convert(datetime, (@firstday + @firstyear), 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' Group by CustCode,CustName,ItemGroupShort,ProvinceName,RegionName 
                    ) data 
                    
                    ";
                    
                $Cust = DB::select($queryCust,[]); 
                return Response::json(array($Item,$Cust));
            }
        }
        
    }

    public function selectEnquiryDataTableModalSPD(Request $request) {   
        
        if($request->type == 'findCustomer'){

            if($request->startYear == $request->endYear){
            
                $tableName = "YS_".$request->startYear."";
                                                      
                $queryCust = " SELECT CustCode,CustName,ItemGroupShort,ProvinceName,RegionName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName."  WHERE Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103)  AND SalesPersonGroup = 'SPD' AND ItemCode = '$request->data' Group by CustCode,CustName,ItemGroupShort,ProvinceName,RegionName "; 
                    
                $Type = 'findCustomer';
                $Cust = DB::select($queryCust,[]); 
                return Response::json(array($Cust,$Type));
            }   
            else{
    
                $tableName1 = "YS_".$request->startYear."";
                $tableName2 = "YS_".$request->endYear."";
    
                if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){ 
               
                    $queryCust = "
    
                    DECLARE @lastday varchar(6) = '31/12/';
                    DECLARE @lastyear varchar(4) = '$request->startYear';
                    DECLARE @firstday varchar(6) = '01/01/';
                    DECLARE @firstyear varchar(4) = '$request->endYear';
                    DECLARE @last varchar(10) = @lastday + @lastyear;
                    DECLARE @first varchar(10) = @firstday + @firstyear;
                                           
                        Select * From (
                            SELECT CustCode,CustName,ItemGroupShort,ProvinceName,RegionName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->startYear." Where Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, (@lastday + @lastyear), 103) AND SalesPersonGroup = 'SPD' AND ItemCode = '$request->data' Group by CustCode,CustName,ItemGroupShort,ProvinceName,RegionName 
                            union all
                            SELECT CustCode,CustName,ItemGroupShort,ProvinceName,RegionName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->endYear." Where Docdate BETWEEN convert(datetime, (@firstday + @firstyear), 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' AND ItemCode = '$request->data' Group by CustCode,CustName,ItemGroupShort,ProvinceName,RegionName
                        ) data 
                        
                        ";
                    $Type = 'findCustomer';
                    $Cust = DB::select($queryCust,[]); 
                    return Response::json(array($Cust,$Type));
                }
            }

        } 
        else if($request->type == 'findItem'){

            if($request->startYear == $request->endYear){
            
                $tableName = "YS_".$request->startYear."";
                          
                $queryItem = " SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' AND CustCode = '$request->data' Group by ItemCode,Dscription,ItemGroupShort,Brand,Commodity  "; 
                    
                $Type = 'findItem';
                $Item = DB::select($queryItem,[]); 
                return Response::json(array($Item,$Type));
            }   
            else{
    
                $tableName1 = "YS_".$request->startYear."";
                $tableName2 = "YS_".$request->endYear."";
    
                if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){ 
               
                    $queryItem = "
    
                    DECLARE @lastday varchar(6) = '31/12/';
                    DECLARE @lastyear varchar(4) = '$request->startYear';
                    DECLARE @firstday varchar(6) = '01/01/';
                    DECLARE @firstyear varchar(4) = '$request->endYear';
                    DECLARE @last varchar(10) = @lastday + @lastyear;
                    DECLARE @first varchar(10) = @firstday + @firstyear;                   
                                           
                        Select * From (
                            SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->startYear." Where Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, (@lastday + @lastyear), 103) AND SalesPersonGroup = 'SPD' AND CustCode = '$request->data' Group by ItemCode,Dscription,Brand,Commodity 
                            union all
                            SELECT ItemCode,Dscription,ItemGroupShort,Brand,Commodity,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->endYear." Where Docdate BETWEEN convert(datetime, (@firstday + @firstyear), 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' AND CustCode = '$request->data' Group by ItemCode,Dscription,Brand,Commodity 
                        ) data 
                        
                        ";
                    $Type = 'findItem';
                    $Item = DB::select($queryItem,[]); 
                    return Response::json(array($Item,$Type));
                }
            }

        }
        else if($request->type == "findInItem"){

            if($request->startYear == $request->endYear){
            
                $tableName = "YS_".$request->startYear."";
                          
                $queryItem = " SELECT DocNum,[Document Type] AS DocumentType,DocDate,CustName,ItemGroupShort,UnitPrice,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' AND ItemCode = '$request->data' Group by DocNum,[Document Type],DocDate,CustName,ItemGroupShort,UnitPrice  "; 
                    
                $Type = 'findInItem';
                $Item = DB::select($queryItem,[]); 
                return Response::json(array($Item,$Type));
            }   
            else{
    
                $tableName1 = "YS_".$request->startYear."";
                $tableName2 = "YS_".$request->endYear."";
    
                if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){ 
               
                    $queryItem = "
    
                    DECLARE @lastday varchar(6) = '31/12/';
                    DECLARE @lastyear varchar(4) = '$request->startYear';
                    DECLARE @firstday varchar(6) = '01/01/';
                    DECLARE @firstyear varchar(4) = '$request->endYear';
                    DECLARE @last varchar(10) = @lastday + @lastyear;
                    DECLARE @first varchar(10) = @firstday + @firstyear;                   
                                           
                        Select * From (
                            SELECT DocNum,[Document Type] AS DocumentType,DocDate,CustName,ItemGroupShort,UnitPrice,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->startYear." Where Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, (@lastday + @lastyear), 103) AND SalesPersonGroup = 'SPD' AND ItemCode = '$request->data' Group by DocNum,[Document Type],DocDate,CustName,ItemGroupShort,UnitPrice 
                            union all
                            SELECT DocNum,[Document Type] AS DocumentType,DocDate,CustName,ItemGroupShort,UnitPrice,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->endYear." Where Docdate BETWEEN convert(datetime, (@firstday + @firstyear), 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' AND ItemCode = '$request->data' Group by DocNum,[Document Type],DocDate,CustName,ItemGroupShort,UnitPrice
                        ) data 
                        
                        ";
                    $Type = 'findInItem';
                    $Item = DB::select($queryItem,[]); 
                    return Response::json(array($Item,$Type));
                }
            }

        }
        else if($request->type == "findInCust"){

            if($request->startYear == $request->endYear){
            
                $tableName = "YS_".$request->startYear."";
                          
                $queryCust= " SELECT DocNum,[Document Type] AS DocumentType,DocDate,ItemCode,Dscription,Commodity,ItemGroupShort,UnitPrice,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName." WHERE Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' AND CustCode = '$request->data' Group by DocNum,[Document Type],DocDate,ItemCode,Dscription,Commodity,ItemGroupShort,UnitPrice  "; 
                    
                $Type = 'findInCust';
                $Cust = DB::select($queryCust,[]); 
                return Response::json(array($Cust,$Type));
            }   
            else{
    
                $tableName1 = "YS_".$request->startYear."";
                $tableName2 = "YS_".$request->endYear."";
    
                if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){ 
               
                    $queryCust = "
    
                    DECLARE @lastday varchar(6) = '31/12/';
                    DECLARE @lastyear varchar(4) = '$request->startYear';
                    DECLARE @firstday varchar(6) = '01/01/';
                    DECLARE @firstyear varchar(4) = '$request->endYear';
                    DECLARE @last varchar(10) = @lastday + @lastyear;
                    DECLARE @first varchar(10) = @firstday + @firstyear;                   
                                           
                        Select * From (
                            SELECT  DocNum,[Document Type] AS DocumentType,DocDate,ItemCode,Dscription,Commodity,ItemGroupShort,UnitPrice,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->startYear." Where Docdate BETWEEN convert(datetime, '$request->startDate', 103) AND convert(datetime, (@lastday + @lastyear), 103) AND SalesPersonGroup = 'SPD' AND CustCode = '$request->data' Group by DocNum,[Document Type],DocDate,ItemCode,Dscription,Commodity,ItemGroupShort,UnitPrice
                            union all
                            SELECT  DocNum,[Document Type] AS DocumentType,DocDate,ItemCode,Dscription,Commodity,ItemGroupShort,UnitPrice,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_".$request->endYear." Where Docdate BETWEEN convert(datetime, (@firstday + @firstyear), 103) AND convert(datetime, '$request->endDate', 103) AND SalesPersonGroup = 'SPD' AND CustCode = '$request->data' Group by DocNum,[Document Type],DocDate,ItemCode,Dscription,Commodity,ItemGroupShort,UnitPrice
                        ) data 
                        
                        ";
                    $Type = 'findInCust';
                    $Cust = DB::select($queryCust,[]); 
                    return Response::json(array($Cust,$Type));
                }
            }

        }
        
        
    }

    public function downloadPDF(Request $request)
    {
        $oldYear = $request->year - 1;
        $data["doc"] = "SPD";
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
    
                $Filename = "SPD SSGraph".$oldYear."&".$request->year.".pdf";        
                $pdf = PDF::loadView('PDFFormat.salessummaryGraph', compact('data'))->setPaper('A4', 'landscape');    
                file_put_contents(public_path() . "/tempfiles/" .$Filename, $pdf->output()); 
                
                foreach($pathImage as $path){
                    unlink($path);
                }
    
                return response()->download(public_path() . "/tempfiles/" .$Filename)->deleteFileAfterSend(true);
            }
            else{
                         
                $Target = TargetH::where('Year', '=', $request->year)->where('Company', '=', 'YBTH')->where('Market', '=', 'Export')->first();  
                $messageData = "";
                $messageTarget  = "";  
                
                if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){             
                    $strSQL1 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM ".$tableName1." WHERE SalesPersonGroup = 'SPD' ";
                    $strSQL2 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM ".$tableName2." WHERE SalesPersonGroup = 'SPD' ";
                                
                }
                else if(Schema::hasTable($tableName1) && !Schema::hasTable($tableName2)){
                    $strSQL1 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM ".$tableName1." WHERE SalesPersonGroup = 'SPD' ";
                    $strSQL2 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'   ";
                }
                else if(!Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){
                    $strSQL1 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
                    $strSQL2 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM ".$tableName2." WHERE SalesPersonGroup = 'SPD' ";
                }
                else{
                    $messageData = "nullData";
                    $strSQL1 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
                    $strSQL2 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
                                
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
                $pdf = PDF::loadView('PDFFormat.salessummarySPDYearTable', compact('data','currYearData','oldYearData','targetData'))->setPaper('A4', 'landscape');  
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
    
                $Filename = "SPD SSGraphQuaterof".$request->year.".pdf";        
                $pdf = PDF::loadView('PDFFormat.salessummaryGraph', compact('data'))->setPaper('A4', 'landscape');    
                file_put_contents(public_path() . "/tempfiles/" .$Filename, $pdf->output()); 
                
                foreach($pathImage as $path){
                    unlink($path);
                }
    
                return response()->download(public_path() . "/tempfiles/" .$Filename)->deleteFileAfterSend(true);
            }
            else{
                         
                $Target = TargetH::where('Year', '=', $request->year)->where('Company', '=', 'YBTH')->where('Market', '=', 'Export')->first();  
                $messageData = "";
                $messageTarget  = "";  
                
                if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){             
                    $strSQL1 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM ".$tableName1." WHERE SalesPersonGroup = 'SPD' ";
                    $strSQL2 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM ".$tableName2." WHERE SalesPersonGroup = 'SPD' ";
                                
                }
                else if(Schema::hasTable($tableName1) && !Schema::hasTable($tableName2)){
                    $strSQL1 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM ".$tableName1." WHERE SalesPersonGroup = 'SPD' ";
                    $strSQL2 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'   ";
                }
                else if(!Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){
                    $strSQL1 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
                    $strSQL2 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM ".$tableName2." WHERE SalesPersonGroup = 'SPD' ";
                }
                else{
                    $messageData = "nullData";
                    $strSQL1 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
                    $strSQL2 = "SELECT DocMonth,DocYear,ItemGroupShort,CustCode,Quantity,UnitPrice,Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST'  ";
                                
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
                $pdf = PDF::loadView('PDFFormat.salessummarySPDQuaterTable', compact('data','currYearData','oldYearData','targetData'))->setPaper('A4', 'landscape'); 
                return $pdf->download($Filename);  
            }
    
        }
    }

}
 

