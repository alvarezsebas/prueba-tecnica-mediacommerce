<?php

$cliente = [
    'nombre' => 'José Pérez',
    'documento' => '8005000'
];

$productos = [
    [
        'codigo' => '51238',
        'descripcion' => 'Dim PC133 256 MB',
        'precio_unitario' => 115000,
        'cantidad' => 2
    ],
    [
        'codigo' => '00000',
        'descripcion' => 'Producto inválido',
        'precio_unitario' => 50000,
        'cantidad' => 1
    ],
    [
        'codigo' => '68989',
        'descripcion' => 'Samsung Viewmaster 550',
        'precio_unitario' => 380000,
        'cantidad' => 1
    ],
    [
        'codigo' => '99999',
        'descripcion' => 'Producto descontinuado',
        'precio_unitario' => 100000,
        'cantidad' => 1
    ],
    [
        'codigo' => '19899',
        'descripcion' => 'MSI KM266 ATA 133',
        'precio_unitario' => 220000,
        'cantidad' => 0
    ]
];

$totalFactura = 0;

foreach ($productos as $producto) {

    if ($producto['codigo'] === '00000') {
        continue;
    }

    if ($producto['cantidad'] <= 0) {
        continue;
    }

    if ($producto['codigo'] === '99999') {
        break;
    }

    $subtotal = $producto['precio_unitario'] * $producto['cantidad'];
    $totalFactura += $subtotal;
}

$impuesto = $totalFactura * 0.19;
$totalConImpuesto = $totalFactura + $impuesto;

echo "Cliente: {$cliente['nombre']}\n";
echo "Documento: {$cliente['documento']}\n";
echo "Total sin impuesto: {$totalFactura}\n";
echo "Impuesto (19%): {$impuesto}\n";
echo "Total a pagar: {$totalConImpuesto}\n";
