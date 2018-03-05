<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Silber\Bouncer\Database\Role;
use File;  
use DB;
use Response;
use PDF;
use App;
use LogActivity;
use Schema;
use App\TargetH; 
use App\User;
use App\Department;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    /* public function index()
    {    
        $strSQL = "SELECT DocMonth,DocYear,SalesPersonGroup,Sum(Quantity) AS Quantity,Sum(Total) As Total 
                    FROM YS_2017 Group by DocMonth,DocYear,SalesPersonGroup  ";

        $result = DB::select($strSQL,[]); 
        return view('home', compact('result'));
    } */
    public function index()
    {  
         $result = session('data');   
        return view('home', compact('result'));
    }

    /**
     * Show the application profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function profile($id)
    {    
        if (session('data')->id != $id) {
            return abort(401);
        }

        $department = Department::all();
        $user = User::findOrFail($id);

        return view('profile', compact('user', 'department'));
    }

    /**
     * Update the application profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function profileUpdate(Request $request, $id)
    {    
        $user = User::findOrFail($id);
        $user->update($request->all());
        
        if(session('data')->id == $id){
            $newSession = User::with('roles')->where('id', $id)->first();
            $department = Department::where('DepartmentID', $newSession->DepartmentID)->first();
            $newSession->department = $department;
            $request->session()->forget('data');
            $request->session()->put('data',$newSession);
        }

        $department = Department::all();

        $request->session()->flash('editComplete', 'Edit Complete!');    
        LogActivity::addToLog('Edit Profile');
        return redirect()->route('profile', compact('user', 'department'));
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function imageCropPost(Request $request)
    {        
        $data = $request->image;
        $userId = $request->id;

        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);

        $data = base64_decode($data);
        $image_name= str_random(10).'.png';
        $path = public_path() . "/images/profiles/" . $image_name;

        $user = User::with('roles')->where('id', $userId)->first(); 
        $oldImg = $user->img;
        $user->img = $image_name;
        $user->save();       
        $department = Department::where('DepartmentID', $user->DepartmentID)->first();
        $user->department = $department;
   
        if($request->session()->has('data')) {
            $request->session()->forget('data');
        }
        $request->session()->put('data',$user);

        file_put_contents($path, $data);
        
        if($oldImg != "0h3TrRZ9Pb.png"){
            $pathFile = public_path() . "/images/profiles/" . $oldImg;
            File::delete($pathFile);
        }

        LogActivity::addToLog('Edit Profile Picture');
        return response()->json(['success'=>'done']);
    }   

    public function selectYSD(Request $request) {  

        $oldYear = $request->year - 1;
        $tableName1 = "YS_".$request->year."";
        $tableName2 = "YS_".$oldYear."";        
        $Target1 = TargetH::where('Year', '=', $request->year)->where('Company', '=', 'YSD')->where('Market', '=', 'REM')->first();  
        $Target2 = TargetH::where('Year', '=', $request->year)->where('Company', '=', 'YSD')->where('Market', '=', 'MTD')->first();  
        $messageData = "";
        $messageTarget  = "";  
         
        if(Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){    
            $strSQL1 = "SELECT SalesPersonGroup,ItemGroupShort,DocMonth,DocYear,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName1." WHERE SalesPersonGroup = 'REM' or  SalesPersonGroup = 'MTD' and ItemGroupShort  IN ('AMB', 'MCB') Group by SalesPersonGroup,ItemGroupShort,DocMonth,DocYear ";     
            $strSQL2 = "SELECT SalesPersonGroup,ItemGroupShort,DocMonth,DocYear,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName2." WHERE SalesPersonGroup = 'REM' or  SalesPersonGroup = 'MTD' and ItemGroupShort  IN ('AMB', 'MCB') Group by SalesPersonGroup,ItemGroupShort,DocMonth,DocYear ";   
        }
        else if(Schema::hasTable($tableName1) && !Schema::hasTable($tableName2)){
            $strSQL1 = "SELECT SalesPersonGroup,ItemGroupShort,DocMonth,DocYear,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName1." WHERE SalesPersonGroup = 'REM' or  SalesPersonGroup = 'MTD' and ItemGroupShort  IN ('AMB', 'MCB') Group by SalesPersonGroup,ItemGroupShort,DocMonth,DocYear ";   
            $strSQL2 = "SELECT SalesPersonGroup,ItemGroupShort,DocMonth,DocYear,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST' Group by SalesPersonGroup,DocMonth,DocYear  ";
        }
        else if(!Schema::hasTable($tableName1) && Schema::hasTable($tableName2)){
            $strSQL1 = "SELECT SalesPersonGroup,ItemGroupShort,DocMonth,DocYear,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST' Group by SalesPersonGroup,DocMonth,DocYear  ";
            $strSQL2 = "SELECT SalesPersonGroup,ItemGroupShort,DocMonth,DocYear,SUM(Quantity) As Quantity,SUM(Total) As Total FROM ".$tableName2." WHERE SalesPersonGroup = 'REM' or  SalesPersonGroup = 'MTD' and ItemGroupShort  IN ('AMB', 'MCB') Group by SalesPersonGroup,ItemGroupShort,DocMonth,DocYear ";   
        }
        else{
            $messageData = "nullData";
            $strSQL1 = "SELECT SalesPersonGroup,ItemGroupShort,DocMonth,DocYear,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST' Group by SalesPersonGroup,ItemGroupShort,DocMonth,DocYear  ";
            $strSQL2 = "SELECT SalesPersonGroup,ItemGroupShort,DocMonth,DocYear,SUM(Quantity) As Quantity,SUM(Total) As Total FROM YS_2017 WHERE SalesPersonGroup = 'TEST' Group by SalesPersonGroup,ItemGroupShort,DocMonth,DocYear  ";                         
        }

        if(is_null($Target1) && is_null($Target2)){
            $messageTarget  = "nullTarget";
            $strSQL3 = "SELECT * FROM X_TargetDetails WHERE TargetID = 17 ";
            $strSQL4 = "SELECT * FROM X_TargetDetails WHERE TargetID = 17 ";
        }
        else if(is_null($Target1) && !is_null($Target2)){
            $messageTarget  = "nullTarget";
            $strSQL3 = "SELECT * FROM X_TargetDetails WHERE TargetID = 17 ";
            $strSQL4 = "SELECT * FROM X_TargetDetails WHERE TargetID = ".$Target2->TargetID." ";
        }
        else if(!is_null($Target1) && is_null($Target2)){
            $messageTarget  = "nullTarget";
            $strSQL3 = "SELECT * FROM X_TargetDetails WHERE TargetID = ".$Target1->TargetID." ";
            $strSQL4 = "SELECT * FROM X_TargetDetails WHERE TargetID = 17 ";
        }
        else{
            $strSQL3 = "SELECT * FROM X_TargetDetails WHERE TargetID = ".$Target1->TargetID." ";
            $strSQL4 = "SELECT * FROM X_TargetDetails WHERE TargetID = ".$Target2->TargetID." ";
        }

        $strSQL5 = "Select Top 5 ItemCode,Dscription,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM [SalesPortal].[dbo].[YS_2017] WHERE SalesPersonGroup = 'REM'  Group by ItemCode,Dscription,ItemGroupShort Order by Total desc";
        $strSQL6 = "Select Top 5 ItemCode,Dscription,ItemGroupShort,SUM(Quantity) As Quantity,SUM(Total) As Total FROM [SalesPortal].[dbo].[YS_2017] WHERE SalesPersonGroup = 'MTD' and ItemGroupShort  IN ('AMB', 'MCB') Group by ItemCode,Dscription,ItemGroupShort Order by Total desc";
        $strSQL7 = "Select Top 5 CustCode,CustName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM [SalesPortal].[dbo].[YS_2017] WHERE SalesPersonGroup = 'REM'  Group by CustCode,CustName Order by Total desc";
        $strSQL8 = "Select Top 5 CustCode,CustName,SUM(Quantity) As Quantity,SUM(Total) As Total FROM [SalesPortal].[dbo].[YS_2017] WHERE SalesPersonGroup = 'MTD' and ItemGroupShort  IN ('AMB', 'MCB') Group by CustCode,CustName Order by Total desc";
            
        $table1 = DB::select($strSQL1,[]);   
        $table2 = DB::select($strSQL2,[]);   
        $table3 = DB::select($strSQL3,[]);   
        $table4 = DB::select($strSQL4,[]);  
        $table5 = DB::select($strSQL5,[]);  
        $table6 = DB::select($strSQL6,[]);  
        $table7 = DB::select($strSQL7,[]);  
        $table8 = DB::select($strSQL8,[]);  
        return Response::json(array($table1,$table2,$table3,$table4,$table5,$table6,$table7,$table8,$messageData,$messageTarget)); 
        
    } 
      

}
