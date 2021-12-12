<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user= User::all();
        if(count($user)!=0)
        {
            return response()->json($user,200);
        }
        else{
            $response=[
                "message"=>"Users Does not Exits",
                "status"=>"error"
            ];
            return response()->json($response,200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return "hello";
        if($request->has(['email','name','password']))
        {
            $user = new User();
            $user->email = $request->email;
            $user->name = $request->name;
            $user->password = $request->password;
            $user->save();

            $response = [
                'data' => $user,
                'status' => 'success'
            ];
            return response()->json($response, 200);
        }
        else
        {
            $response=[
                "message"=>"Please fill up all the inputs",
                "status"=>"error"
            ];
            return response()->json($response,200);
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
        $user = User::find($id);
        if($user)
        {
            return response()->json($user, 200);
        }
        else
        {
            $response=[
                "message"=>"User Does not Exits",
                "status"=>"error"
            ];
            return response()->json($response,200);
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $user = User::find($id);
        if($user)
        {
            if ($request->has('email')) {
                $user->email = $request->email;
            }
            if ($request->has('name')) {
                $user->name = $request->name;
            }
            $user->save();
            $response = [
                "message" => "User has been successfully updated",
                "status" => "success"
            ];
            return response()->json($response, 200);
        }
        else
        {
            $response = [
                "message" => "User does not Exits",
                "status" => "error"
            ];
            return response()->json($response, 200);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if($user)
        {
            $user->delete();
            $response=[
                "message"=>"User has been successfully Deleted",
                "status"=>"success"
            ];
            return response()->json($response,200);
        }
        else
        {
            $response=[
                "message"=>"User Does Not Exits",
                "status"=>"error"
            ];
            return response()->json($response,200);
        }




    }
}
