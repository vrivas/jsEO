/* 
 * Copyright (C) 2013 vrivas
 *
 * Víctor M. Rivas Santos: vrivas@ujaen.es - http://vrivas.es
 * GeNeura Team- http://geneura.ugr.es
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function fitnessFunction(_chr) {
    if( typeof _chr == 'undefined' || !_chr ) { return null; }
    var tmp = _chr.match(/101/g);
    return (tmp) ? tmp.length : 0;
}

function main() {
   var verbose = jsEOUtils.getInputParam("verbose", false);    
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    jsEOUtils.setProblemId("http://jsEO.vrivas.es/20131030120000MAX101");        
    var myBSGA = new jsEOBSGA(new jsEOOpSendIndividuals(), new jsEOOpGetIndividuals());
    myBSGA.run(fitnessFunction);
}