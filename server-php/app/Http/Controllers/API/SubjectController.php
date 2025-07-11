<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestResource;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController
{
    public function index()
    {
        return Subject::all();
    }

    public function show($id)
    {
        return Subject::findOrFail($id);
    }

    public function tests($id){
        $subject = Subject::findOrFail($id);
        $tests = $subject->tests()->get();
        return TestResource::collection($tests);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string'
        ]);
        return Subject::create($validated);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string'
        ]);
        $subject->update($validated);
        return $subject;
    }

    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();
        return response()->json(null, 204);
    }
}
