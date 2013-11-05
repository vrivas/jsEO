<?php
$fichero=fopen( "./test.txt", "w" );
fwrite( $fichero, "ejemplo" );
fclose( $fichero );

print "Escribiendo en test.txt";
?>