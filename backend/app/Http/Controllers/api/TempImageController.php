<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
    public function store(Request $request){
        $Image = Validator::make($request->all(),[
            'image' => 'required'
        ]);
        if($Image->fails()){
            return response()->json([
                'status' => false,
                'errors' => $Image->errors(),
                'message' => 'Validation failed'
            ]);
        }
        $image = $request->image;
        $ext  =  $image->getClientOriginalExtension();
        $imageName = time().'.'.$ext;

        $tempImage = new TempImage();
        $tempImage->image = $imageName;
        $tempImage->save();

        $image->move(public_path('uploads/temp'),$imageName);
        
        return response()->json([
            'status'=> true,
            'message' => 'Image Uploaded successfully',
            'image' => $tempImage
        ]);
    }
}
