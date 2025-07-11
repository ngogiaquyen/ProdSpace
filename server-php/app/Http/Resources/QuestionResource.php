<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'question_id' => $this->question_id,
            'test_id' => $this->test_id,
            'text' => $this->text,
            'test' => new TestResource($this->whenLoaded('test')),
            'options' => OptionResource::collection($this->whenLoaded('options')),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
