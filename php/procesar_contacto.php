<?php

session_start();
require_once 'conexion.php'; if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // 1. Recibir y limpiar datos del formulario HTML
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $email = isset($_POST['email']) ? trim(strtolower($_POST['email'])) : '';
    $telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
    $tipo_consulta = isset($_POST['tipo_consulta']) ? $_POST['tipo_consulta'] : '';
    $mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

    // 2. Validaciones Básicas
    if (empty($nombre) || empty($email) || empty($tipo_consulta) || empty($mensaje)) {
        // Si falta algún dato obligatorio, redirigir con error
        header("Location: ../pages/contacto.html?error=campos_vacios");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../pages/contacto.html?error=email_invalido");
        exit;
    }

    try {
        // 3. Insertar en la Base de Datos
        
        $stmt = $pdo->prepare("
            INSERT INTO contacto (nombre, email, telefono, tipo_consulta, mensaje, fecha_creacion)
            VALUES (:nombre, :email, :telefono, :tipo_consulta, :mensaje, NOW())
        ");
        
        $resultado = $stmt->execute([
            ':nombre' => $nombre,
            ':email' => $email,
            ':telefono' => $telefono,
            ':tipo_consulta' => $tipo_consulta,
            ':mensaje' => $mensaje
        ]);

        if ($resultado) {

            // Redirigir con éxito
            header("Location: ../pages/contacto.html?status=exito");
            exit;
        } else {
            header("Location: ../pages/contacto.html?error=error_bd");
            exit;
        }

    } catch (PDOException $e) {
        // Log del error para el desarrollador (no mostrar al usuario)
        error_log("Error en contacto: " . $e->getMessage());
        header("Location: ../pages/contacto.html?error=servidor");
        exit;
    }
} else {
    // Si intentan entrar directo al archivo sin enviar formulario
    header("Location: ../pages/contacto.html");
    exit;
}
?>