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
var divGr = new Array();
var divGA = new Array();
var numDivs = 50;
function createDivs() {
    var w = parseInt(Math.random() * 300) + 100;
    for (var i = 0; i < numDivs; ++i) {
        divGr[i] = new Object;
        divGr[i].w = w;
        divGr[i].h = parseInt(Math.random() * 300) + 100;
        divGr[i].c = "rgb( " + parseInt(Math.random() * 240) + "," +
                parseInt(Math.random() * 240) + "," +
                parseInt(Math.random() * 240) + ")";

        divGA[i] = new Object;
        divGA[i].w = divGr[i].w;
        divGA[i].h = divGr[i].h;
        divGA[i].c = divGr[i].c;

    }
}
function writeSizes() {
    var theDiv = document.getElementById("forSizes");
    for (var i = 0; i < divs.length; ++i) {
        theDiv.innerHTML += (i + ": " +
                " > " +
                divs[i].w + "," +
                divs[i].h + " , " +
                divs[i].c + " , " +
                "<br/>");
    }
    var vWidth = document.documentElement.clientWidth;
    var vHeight = document.documentElement.clientHeight;
    theDiv.innerHTML += "<hr>Width: " + vWidth + " " + "Height: " + vHeight + "<br/>";
}

function showDivsH(_divs, _label, _divId) {
    var theDiv = document.getElementById("forSizes");
    var vWidth = document.documentElement.clientWidth;
    var vHeight = document.documentElement.clientHeight;
    var top = 0;
    var tmpTop = 0;
    var lef = 0;
    for (var i = 0; i < _divs.length && top + _divs[i].h < vHeight; ++i) {
        var w = _divs[i].w;
        var h = _divs[i].h;
        var c = _divs[i].c;
        if (lef + w > vWidth) {
            lef = 0;
            top += tmpTop;
            tmpTop = 0;
        }
        if (h > tmpTop) {
            tmpTop = h;
        }
        if (top + _divs[i].h < vHeight) {
            theDiv.innerHTML += "<div style='width: " +
                    w + "px; height: " + h + "px; position: absolute; top: " +
                    top + "px; left: " + lef + "px;" +
                    "background-color: " + c + ";" +
                    "border: 5px solid #fff;" +
                    "'>" + w + ", " + h + " / " + top + "," + lef + "</div>";
            lef += w;
        } else {
            --i;
        }
    }
    theDiv = document.getElementById(_divId);
    theDiv.innerHTML = _label + ": " + i;

}


function showDivsV(_divs, _label, _divId) {
    var theDiv = document.getElementById("forSizes");
    var vWidth = document.documentElement.clientWidth;
    var vHeight = document.documentElement.clientHeight;
    var top = 0;
    var tmpLef = 0;
    var lef = 0;
    for (var i = 0; i < _divs.length && lef + _divs[i].w < vWidth; ++i) {
        var w = _divs[i].w+5;
        var h = _divs[i].h+5;
        var c = _divs[i].c;
        if (top + h > vHeight) {
            top = 0;
            lef += tmpLef;
            tmpLef = 0;
        }
        if (w > tmpLef) {
            tmpLef = w;
        }
        if (lef + _divs[i].w < vWidth) {
            theDiv.innerHTML += "<div style='width: " +
                    w + "px; height: " + h + "px; position: absolute; top: " +
                    top + "px; left: " + lef + "px;" +
                    "background-color: " + c + ";" +
                    "border: 5px solid #fff;" +
                    "'>" + w + ", " + h + " / " + top + "," + lef + "</div>";
            top += h;
        } else {
            --i;
        }
    }
    theDiv = document.getElementById(_divId);
    theDiv.innerHTML = _label + ": " + i;

}


function greedyW() {
    var vWidth = document.documentElement.clientWidth;
    var vHeight = document.documentElement.clientHeight;
    var top = 0;
    var tmpTop = 0;
    var lef = 0;
    // ordena de menor a mayor
    for (var i = 0; i < divGr.length - 1; ++i) {
        for (var j = i + 1; j < divGr.length; ++j) {
            if (divGr[j].w < divGr[i].w) {
                var tmp = divGr[j];
                divGr[j] = divGr[i];
                divGr[i] = tmp;
            } else {
                if (divGr[j].w == divGr[i].w && divGr[j].h < divGr[i].h) {
                    var tmp = divGr[j];
                    divGr[j] = divGr[i];
                    divGr[i] = tmp;
                }
            }

        }

    }
}
function greedyH() {
    var theDiv = document.getElementById("forSizes");
    var vWidth = document.documentElement.clientWidth;
    var vHeight = document.documentElement.clientHeight;
    var top = 0;
    var tmpTop = 0;
    var lef = 0;
    // ordena de menor a mayor
    for (var i = 0; i < divGr.length - 1; ++i) {
        for (var j = i + 1; j < divGr.length; ++j) {
            if (divGr[j].h < divGr[i].h) {
                var tmp = divGr[j];
                divGr[j] = divGr[i];
                divGr[i] = tmp;
            } else {
                if (divGr[j].h == divGr[i].h && divGr[j].w < divGr[i].w) {
                    var tmp = divGr[j];
                    divGr[j] = divGr[i];
                    divGr[i] = tmp;
                }
            }

        }

    }

}

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
    
    jsEOUtils.setProblemId("http://jsEO.vrivas.es/20131030120000WEBBLOCKS");
     
     // Initializing algorithm
     var myWBGA = new jsEOWBGA(new jsEOOpSendIndividuals(), new jsEOOpGetIndividuals());
     
     // Stablishing parameters
     myWBGA.popSize = jsEOUtils.getInputParam("popSize", 500);
     myWBGA.tournamentSize = jsEOUtils.getInputParam("tournamentSize", 2);
     myWBGA.xOverRate = jsEOUtils.getInputParam("xOverRate", 10);
     myWBGA.mutRate = jsEOUtils.getInputParam("mutRate", 10);
     myWBGA.mutPower = jsEOUtils.getInputParam("mutPower", 0.5);
     myWBGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 1);
     myWBGA.numGenerations = jsEOUtils.getInputParam("numGenerations", 50);
     myWBGA.replaceRate = jsEOUtils.getInputParam("replaceRate", 0.5);
     myWBGA.showing = jsEOUtils.getInputParam("showing", 3);
     myWBGA.indSize = jsEOUtils.getInputParam("indSize", 128);
     
    
    createDivs();
    showDivsV(divGr, "Original", "forTotal");
    greedyH();
    showDivsV(divGr, "greedy H", "forGreedyH");
    greedyW();
    showDivsV(divGr, "greedy W", "forGreedyW");
    
     // Running algorithm
     myWBGA.run(fitnessFunction);
    
}