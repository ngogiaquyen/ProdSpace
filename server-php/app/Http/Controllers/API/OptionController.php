<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Option;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    public function index()
    {
        return Option::all();
    }

    public function show($id)
    {
        return Option::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question_id' => 'required|exists:questions,question_id',
            'label' => 'required|string|max:255',
            'text' => 'required|string',
            'is_correct' => 'required|boolean'
        ]);

        return Option::create($validated);
    }

    public function update(Request $request, $id)
    {
        $option = Option::findOrFail($id);
        $validated = $request->validate([
            'question_id' => 'required|exists:questions,question_id',
            'label' => 'required|string|max:255',
            'text' => 'required|string',
            'is_correct' => 'required|boolean'
        ]);

        $option->update($validated);
        return $option;
    }

    public function destroy($id)
    {
        $option = Option::findOrFail($id);
        $option->delete();
        return response()->json(null, 204);
    }
}
