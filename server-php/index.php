<?php

$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

// Nếu là request đến API PRODUCT → chuyển cho API PRODUCT xử lý
if (preg_match("#^/api-product#", $path)) {
    require __DIR__ . '/vendor/autoload.php';
    $app = require_once __DIR__ . '/bootstrap/app.php';

    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

    $response = $kernel->handle(
        $request = Illuminate\Http\Request::capture()
    );

    $response->send();

    $kernel->terminate($request, $response);
    exit;
}