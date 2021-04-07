<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$Expediente = (isset($_POST['Expediente'])) ? $_POST['Expediente'] : '';
$NombreCompleto = (isset($_POST['NombreCompleto'])) ? $_POST['NombreCompleto'] : '';
$Area = (isset($_POST['Area'])) ? $_POST['Area'] : '';
$Usuario = (isset($_POST['Usuario'])) ? $_POST['Usuario'] : '';
$Pwd = (isset($_POST['Pwd'])) ? $_POST['Pwd'] : '';
$TipoCuenta = (isset($_POST['TipoCuenta'])) ? $_POST['TipoCuenta'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$IdUsuario = (isset($_POST['IdUsuario'])) ? $_POST['IdUsuario'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO usuarios (Expediente, NombreCompleto, Area, Usuario, Pwd, TipoCuenta) VALUES('$Expediente', '$NombreCompleto', '$Area', '$Usuario', MD5('$Pwd'), '$TipoCuenta') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM usuarios ORDER BY IdUsuario DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE usuarios SET Expediente='$Expediente', NombreCompleto='$NombreCompleto', Area='$Area', Usuario='$Usuario', Pwd=MD5('$Pwd'), TipoCuenta='$TipoCuenta' WHERE IdUsuario='$IdUsuario' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM usuarios WHERE IdUsuario='$IdUsuario' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM usuarios WHERE IdUsuario='$IdUsuario' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM usuarios";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;