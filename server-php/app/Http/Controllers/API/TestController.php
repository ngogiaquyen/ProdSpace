<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;
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

    public function getQuestionsBySubjectAndTest($subject_id, $test_id)
    {
        $test = Test::with(['subject', 'questions.options'])
            ->where('subject_id', $subject_id)
            ->where('test_id', $test_id)
            ->firstOrFail();

        return [
            'test_id' => $test->test_id,
            'test_name' => $test->name,
            'subject_id' => $test->subject_id,
            'subject_name' => $test->subject->name,
            'questions' => QuestionResource::collection($test->questions)
        ];
    }
}
