<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $blogs = Blog::orderBy('created_at', 'DESC');
        if(!empty($request->search)){
            $blogs = $blogs->where('title','LIKE','%'.$request->search.'%');
        }
        $blogs = $blogs->get();
        return response()->json([
            'status' => true,
            'blogs' => $blogs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $blog = Validator::make($request->all(), [
            'title' => 'required',
            'author' => 'required',
            'short_description' => 'required',
        ]);
        if ($blog->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $blog->errors()
            ]);
        }
        $blog = new Blog();

        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->short_description = $request->short_description;
        $blog->description = $request->description;
        $blog->save();

        $tempImg =  TempImage::find($request->imageId);

        if ($tempImg != null) {
            $imageExtArray = explode('.', $tempImg->image);
            $ext  = last($imageExtArray);
            $imageName = time() . '-' . $blog->id . '.' . $ext;

            $blog->image = $imageName;
            $blog->save();
            $sourcePath = public_path('uploads/temp/' . $tempImg->image);
            $desPath = public_path('uploads/blogs/' . $imageName);

            File::copy($sourcePath, $desPath);
        }
        return response()->json([
            'status' => true,
            'message' => 'Blog successfully created',
            'data' => $blog
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blog = Blog::find($id);
        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'
            ]);
        }
        $blog['date'] = \Carbon\Carbon::parse($blog->created_at)->format('d-M-Y');
        return response()->json([
            'status' => true,
            'message' => 'Successfully found',
            'blog' => $blog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $blog = Blog::find($id);
        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'
            ]);
        }
        $data = Validator::make($request->all(), [
            'title' => 'required',
            'author' => 'required',
            'short_description' => 'required',
        ]);
        if ($data->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $blog->errors()
            ]);
        }
        

        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->short_description = $request->short_description;
        $blog->description = $request->description;
        $blog->save();

        $tempImg =  TempImage::find($request->imageId);

        if ($tempImg != null) {
            File::delete(public_path('uploads/blogs/'.$blog->image));
            $imageExtArray = explode('.', $tempImg->image);
            $ext  = last($imageExtArray);
            $imageName = time() . '-' . $blog->id . '.' . $ext;

            $blog->image = $imageName;
            $blog->save();
            $sourcePath = public_path('uploads/temp/' . $tempImg->image);
            $desPath = public_path('uploads/blogs/' . $imageName);

            File::copy($sourcePath, $desPath);
        }
        return response()->json([
            'status' => true,
            'message' => 'Blog successfully Updated',
            'data' => $blog
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::find($id);
        File::delete(public_path('uploads/blogs'.$blog->image));
        $blog->delete();
        return response()->json([
            'status' => true,
            'message' => 'Blog successfully Deleted',
        ]);

    }
}
