<?php
$host = "localhost";
$port = "5432";
$dbname = "easytas";
$user = "admin";
$password = "1234"; // tu contraseña real

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    die(" Error de conexión: " . $e->getMessage());
}
?>