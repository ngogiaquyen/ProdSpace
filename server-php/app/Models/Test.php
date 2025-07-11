<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $primaryKey = 'test_id';

    protected $fillable = ['subject_id', 'name', 'status'];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'test_id', 'test_id');
    }
}
