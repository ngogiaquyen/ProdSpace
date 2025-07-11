<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        return Test::all();
    }

    public function show($id)
    {
        return Test::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject_id' => 'required|exists:subjects,subject_id',
            'name' => 'required|string|max:100',
            'status' => 'required|in:Draft,Active'
        ]);

        return Test::create($validated);
    }

    public function update(Request $request, $id)
    {
        $test = Test::findOrFail($id);
        $validated = $request->validate([
            'subject_id' => 'required|exists:subjects,subject_id',
            'name' => 'required|string|max:100',
            'status' => 'required|in:Draft,Active'
        ]);

        $test->update($validated);
        return $test;
    }

    public function destroy($id)
    {
        $test = Test::findOrFail($id);
        $test->delete();
        return response()->json(null, 204);
    }
}
