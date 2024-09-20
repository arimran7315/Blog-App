<?php

use App\Http\Controllers\api\BlogController;
use App\Http\Controllers\api\TempImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/createBlog', [BlogController::class,'store']);
Route::get('/blogs',[BlogController::class,'index']);
Route::post('/temp_image', [TempImageController::class,'store']);
Route::get('/blog/{id}', [BlogController::class,'show']);
Route::put('/blog-update/{id}',[BlogController::class,'update']);
Route::delete('/blog/{id}', [BlogController::class,'destroy']);