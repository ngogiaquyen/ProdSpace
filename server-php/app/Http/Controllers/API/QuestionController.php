<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;
use App\Models\Option;
use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    public function index()
    {
        return Question::all();
    }

    public function show($id)
    {
        return Question::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'test_id' => 'required|exists:tests,test_id',
            'text' => 'required|string'
        ]);

        return Question::create($validated);
    }

    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);
        $validated = $request->validate([
            'test_id' => 'required|exists:tests,test_id',
            'text' => 'required|string'
        ]);

        $question->update($validated);
        return $question;
    }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();
        return response()->json(null, 204);
    }

    // other function
    public function bulkStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject_id' => 'required|exists:subjects,subject_id',
            'test_id' => 'required|exists:tests,test_id',
            'data' => 'required|array',
            'data.*.id' => 'required|integer',
            'data.*.question' => 'required|string',
            'data.*.options' => 'required|array',
            'data.*.answer' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Kiểm tra subject_id và test_id có khớp nhau không
        $test = Test::findOrFail($request->test_id);
        if ($test->subject_id !== $request->subject_id) {
            return response()->json(['error' => 'Test does not belong to the specified subject'], 422);
        }

        $questions = [];
        DB::beginTransaction();
        try {
            foreach ($request->data as $item) {
                // Tạo câu hỏi
                $question = Question::create([
                    'question_id' => $item['id'],
                    'test_id' => $request->test_id,
                    'text' => $item['question']
                ]);

                // Xử lý options và answer
                $options = [];
                $answers = is_array($item['answer']) ? $item['answer'] : (is_string($item['answer']) ? [$item['answer']] : (array)$item['answer']);

                // Xử lý câu hỏi kéo thả (id=14) hoặc đúng/sai (id=8)
                if ($item['id'] == 14) {
                    // Câu hỏi kéo thả
                    foreach ($item['options'] as $term => $definitions) {
                        foreach ((array)$definitions as $definition) {
                            $isCorrect = isset($item['answer'][$definition]) && $item['answer'][$definition] === $term;
                            $options[] = Option::create([
                                'question_id' => $question->question_id,
                                'label' => $term . '_' . (count($options) + 1),
                                'text' => $definition,
                                'is_correct' => $isCorrect
                            ]);
                        }
                    }
                } elseif ($item['id'] == 8) {
                    // Câu hỏi đúng/sai
                    foreach ($item['options'] as $label => $text) {
                        $isCorrect = isset($item['answer'][$label]) && $item['answer'][$label] === 'Đúng';
                        $options[] = Option::create([
                            'question_id' => $question->question_id,
                            'label' => $label,
                            'text' => $text,
                            'is_correct' => $isCorrect
                        ]);
                    }
                } else {
                    // Câu hỏi đơn chọn hoặc đa chọn
                    foreach ($item['options'] as $label => $text) {
                        $isCorrect = in_array($label, $answers);
                        $options[] = Option::create([
                            'question_id' => $question->question_id,
                            'label' => $label,
                            'text' => $text,
                            'is_correct' => $isCorrect
                        ]);
                    }
                }

                $questions[] = new QuestionResource($question->load('options'));
            }

            DB::commit();
            return response()->json(['questions' => $questions], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
