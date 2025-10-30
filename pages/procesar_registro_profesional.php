<?php
session_start();
require_once '../php/conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recibir y limpiar datos
    $nombre = trim($_POST['nombre']);
    $email = trim(strtolower($_POST['email']));
    $telefono = trim($_POST['telefono']);
    $fecha_nacimiento = $_POST['fecha_nacimiento'];
    $password = $_POST['password'];
    $confirmar_password = $_POST['confirmar_password'];
    
    // Validaciones
    if (strlen($nombre) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
        header("Location: registro_profesional.html?error=datos_invalidos");
        exit;
    }

    // Validar edad (mayor de 18)
    $fecha_actual = new DateTime();
    $fecha_nac = new DateTime($fecha_nacimiento);
    $edad = $fecha_actual->diff($fecha_nac)->y;

    if ($edad < 18) {
        header("Location: registro_profesional.html?error=edad_minima");
        exit;
    }

    if ($password !== $confirmar_password) {
        header("Location: registro_profesional.html?error=datos_invalidos");
        exit;
    }

    try {
        // Verificar si el email ya existe
        $stmt = $pdo->prepare("SELECT id FROM profesional WHERE email = :email");
        $stmt->execute([':email' => $email]);

        if ($stmt->fetch()) {
            header("Location: registro_profesional.html?error=email_existente");
            exit;
        }

        // Encriptar contraseña
        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        // Insertar usuario
        $stmt = $pdo->prepare("
            INSERT INTO profesional (nombre, email, telefono, fecha_nacimiento, password)
            VALUES (:nombre, :email, :telefono, :fecha_nacimiento, :password)
            RETURNING id
        ");
        
        $stmt->execute([
            ':nombre' => $nombre,
            ':email' => $email,
            ':telefono' => $telefono,
            ':fecha_nacimiento' => $fecha_nacimiento,
            ':password' => $password_hash
        ]);

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            // Registro exitoso
            $_SESSION['tipo_usuario'] = 'cliente';
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['nombre_usuario'] = $nombre;
            $_SESSION['email_usuario'] = $email;

            header("Location: http://localhost/EASYTAS/?registro=exitoso");
            exit;
        } else {
            header("Location: registro_profesional.html?error=servidor");
            exit;
        }

    } catch (PDOException $e) {
        error_log("Error en registro: " . $e->getMessage());
        header("Location: registro_profesional.html?error=servidor");
        exit;
    }
} else {
    header("Location: registro_profesional.html");
    exit;
}
?>