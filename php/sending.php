<?php
$data = (isset($_REQUEST["data"])) ? $_REQUEST["data"] : "";
if (!$data) {
    print( "No data!");
    exit;
}
/*
$jData = json_decode($data);
$fileName = "./problem_files/" . md5($jData->{'problemID'}) . "jseo";
$file = fopen($filename, "r");
$tmpStr=fgets( $fichero );
fclose($fileName);
$json=json_decode( $tmpStr );
print "Fitness es ".$json->{'pop'}[0]->{'fitness'};
*/
// WITHOUT JSON
$dataArr = explode(",", $data);
$fileName = "./problem_files/" . md5($dataArr[0]) . ".jseo";
$tmpStr = "";

$noFile=false;
// Testing if fitness is greater
if ( file_exists($fileName) ) {
    $file = fopen($fileName, "r");
    $tmpStr = fgets($file);
    fclose($file);    
}
print $tmpStr;

