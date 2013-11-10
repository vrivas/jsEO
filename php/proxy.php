<?php
/**
* FICHERO: proxy.php
* ==================
*/
header( "Content-type: text/xml" );
header( "Cache-Control: no-cache, must-revalidate" );
$direccion=$_REQUEST['rss'];
$contenido = file_get_contents( $direccion );
echo $contenido;
?>