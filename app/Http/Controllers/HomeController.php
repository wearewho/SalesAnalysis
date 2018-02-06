<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use File;  
use DB;
use Response;
use PDF;
use App;
use App\User;
use App\Department;
use Silber\Bouncer\Database\Role;

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

        return response()->json(['success'=>'done']);
    }
      

}
