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
    if (typeof _chr == 'undefined' || !_chr) {
        return null;
    }
    var toRet = 0;
    for (var i = 0; i < _chr.length - 3; ++i) {
        toRet += (_chr.substr(i, 4) == "1111") ? 1 : 0;
        toRet += (_chr.substr(i, 4) == "0000") ? 1 : 0;
    }
    return toRet;
}


function main() {
    var verbose = jsEOUtils.getInputParam("verbose", false);
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    jsEOUtils.setProblemId("http://jsEO.vrivas.es/20131030120000256ROYALFUNCTION");
    
    // Initializing algorithm
    var myBSGA = new jsEOBSGA(new jsEOOpSendIndividuals(), new jsEOOpGetIndividuals());

    // Stablishing parameters
    myBSGA.popSize = jsEOUtils.getInputParam("popSize", 500);
    myBSGA.tournamentSize = jsEOUtils.getInputParam("tournamentSize", 2);
    myBSGA.xOverRate = jsEOUtils.getInputParam("xOverRate", 10);
    myBSGA.mutRate = jsEOUtils.getInputParam("mutRate", 10);
    myBSGA.mutPower = jsEOUtils.getInputParam("mutPower", 0.5);
    myBSGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 1);
    myBSGA.numGenerations = jsEOUtils.getInputParam("numGenerations", 50);
    myBSGA.replaceRate = jsEOUtils.getInputParam("replaceRate", 0.5);
    myBSGA.showing = jsEOUtils.getInputParam("showing", 3);
    myBSGA.indSize = jsEOUtils.getInputParam("indSize", 128);

    // Running algorithm
    myBSGA.run(fitnessFunction);
}