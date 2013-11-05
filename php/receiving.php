<?php

$data = (isset($_REQUEST["data"])) ? $_REQUEST["data"] : "";
if (!$data) {
    print( "No data!");
    exit;
}
/* print "Data es $data <br/>";
  $json = json_decode($data);
  print( "Problem ID es ".$json->{"problemID"}."<br/>");
 */

// WITHOUT JSON
$dataArr = explode(",", $data);
$fileName = "./problem_files/" . md5($dataArr[0]) . ".jseo";
print( "Filename is $fileName <br/>");
$newFitness = floatval($dataArr[count($dataArr) - 1]);
$noFile=false;
// Testing if fitness is greater
if ( file_exists($fileName) ) {
    $file = fopen($fileName, "r");
    $tmpStr = fgets($file);
    fclose($file);
    $tmpArr = explode(",", $tmpStr);
    $oldFitness = floatval($tmpArr[count($tmpArr) - 1]);
} else {
    $noFile=true;
}
if ($newFitness > $oldFitness || $noFile ) {
    $file = fopen($fileName, "w");
    fwrite($file, $data);
    fclose($file);
    print( "As $newFitness > $oldFitness, new information has been stored!");
} else {
    print( "As $oldFitness >= $newFitness, NO new information has been stored!");
}


