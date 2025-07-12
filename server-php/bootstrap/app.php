<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
         web: [
            __DIR__ . '/../routes/web.php',
            // __DIR__ . '/../routes/api-product.php', // Thêm file route ở đây
        ],
        // api: __DIR__ . '/../routes/api.php', // bỏ dòng này
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
