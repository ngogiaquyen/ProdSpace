<?php


use App\Http\Controllers\API\OptionController;
use App\Http\Controllers\API\QuestionController;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\TestController;
use Illuminate\Support\Facades\Route;



Route::prefix('subjects')->group(function () {
    Route::get('/', [SubjectController::class, 'index'])->name('subjects.index');
    Route::get('/{id}', [SubjectController::class, 'show'])->name('subjects.show');
    Route::get('/{id}/tests', [SubjectController::class, 'tests'])->name('subjects.tests');
    Route::post('/', [SubjectController::class, 'store'])->name('subjects.store');
    Route::put('/{id}', [SubjectController::class, 'update'])->name('subjects.update');
    Route::delete('/{id}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
    Route::get('/{subject_id}/tests/{test_id}/questions', [TestController::class, 'getQuestionsBySubjectAndTest'])->name('subjects.tests.questions');
    Route::post('/{subject_id}/tests/{test_id}/questions/bulk', [QuestionController::class, 'bulkStore'])->name('subjects.tests.questions.bulk');
});


// Routes cho bảng Tests
Route::prefix('tests')->group(function () {
    Route::get('/', [TestController::class, 'index'])->name('tests.index');
    Route::get('/{id}', [TestController::class, 'show'])->name('tests.show');
    Route::post('/', [TestController::class, 'store'])->name('tests.store');
    Route::put('/{id}', [TestController::class, 'update'])->name('tests.update');
    Route::delete('/{id}', [TestController::class, 'destroy'])->name('tests.destroy');
});

// Routes cho bảng Questions
Route::prefix('questions')->group(function () {
    Route::get('/', [QuestionController::class, 'index'])->name('questions.index');
    Route::get('/{id}', [QuestionController::class, 'show'])->name('questions.show');
    Route::post('/', [QuestionController::class, 'store'])->name('questions.store');
    Route::put('/{id}', [QuestionController::class, 'update'])->name('questions.update');
    Route::delete('/{id}', [QuestionController::class, 'destroy'])->name('questions.destroy');
    // Route::post('/bulk', [QuestionController::class, 'bulkStore'])->name('questions.bulkStore');
});

// Routes cho bảng Options
Route::prefix('options')->group(function () {
    Route::get('/', [OptionController::class, 'index'])->name('options.index');
    Route::get('/{id}', [OptionController::class, 'show'])->name('options.show');
    Route::post('/', [OptionController::class, 'store'])->name('options.store');
    Route::put('/{id}', [OptionController::class, 'update'])->name('options.update');
    Route::delete('/{id}', [OptionController::class, 'destroy'])->name('options.destroy');
});
