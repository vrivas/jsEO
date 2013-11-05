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
coefs = new Array(-7.156, 2.229, -5.535, -4.618, 6.902, -3.912, 7.246,
        -9.204, 8.919, 5.979, 9.348, 9.444, 8.353, 5.018, 4.606, 0.961,
        7.225, 1.903, 1.452, -5.583, -9.210, 4.003, -2.308, -9.555, 5.903,
        -3.676, -9.837, -5.272, 3.882, -5.365, 8.509, -8.524, 5.927,
        -5.617, 8.877, 6.647, 6.081, 0.921, 5.566, -7.609, -0.804, -8.849,
        6.493, -3.435, 9.561, 1.836, -8.239, 4.165, -0.434, 5.654, -6.245,
        -8.889, -2.784, 2.473, 1.843, -4.917, -3.704, 0.405, 5.132, 2.956,
        -6.344, 8.843, 2.651, -0.127, -5.662, -5.994, -8.043, 1.111, -2.832,
        -3.571, -5.677, -5.370, -9.045, -0.591, 7.523, -0.441, 4.587, 7.550,
        -4.303, -6.137, 3.080, 5.412, 9.824, 3.046, 6.025, -2.371, 2.083, -9.011,
        4.910, 3.966, -7.329, -6.136, -8.572, -4.568, 8.636, 8.604, 0.157,
        -9.133, 0.860, 8.441, -4.106, 7.366, -2.493, 9.860, -1.570, -7.574,
        -9.881, -2.417, -4.276, 0.906, -8.008, 7.272, -9.818, -4.328, -2.490,
        9.182, -7.859, 7.229, 5.884, -9.712, -0.302, 4.695, -6.982, -2.770,
        4.645, 8.147, 1.214, -2.052);
var numCoefs = coefs.length;

function describeProblem() {
    jsEOUtils.setOutput( "jsEODescription" );
    jsEOUtils.print( "<h2>128 terms' equation!</h2>\n");
    
    jsEOUtils.print( "<p class='english'>Thanks for helping us to test jsEO library.</p>\n")
    jsEOUtils.print( "<p class='english'>We are trying to solve the following equation:</p>\n")
    var tmp="";
    for( var i=0; i<coefs.length; ++i ) {
        tmp+=((i>0)?"+":"")+"(x#sub>"+i+"#/sub> "+
                ((coefs[i]>=0)?"+":"")+
                coefs[i].toFixed(3)+")";
    }
    tmp+=" = 0 ";
    jsEOUtils.print( "<p><em>"+tmp+"</em></p>\n");
    jsEOUtils.setOutput();
    
}
/*for (var i = 0; i < numCoefs; ++i) {
 coefs[i] = (Math.random() * 20) - 10;
 }*/
function fitnessFunction(_chr) {
    if (typeof _chr == 'undefined') {
        return null;
    }
    var tmp = 0;
    for (var i = 0; i < coefs.length; ++i) {
        tmp += (parseFloat(_chr[i]) + coefs[i]);
    }
    return (tmp != 0.0) ? 1 / tmp : 1e10;
}

function main() {
    var verbose = jsEOUtils.getInputParam("verbose", false);
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    jsEOUtils.setProblemId("http://jsEO.vrivas.es/20131030120000_FLOAT" + numCoefs);

    
    
    var myFVGA = new jsEOFVGA(new jsEOOpSendIndividuals(), new jsEOOpGetIndividuals());
    //var myFVGA = new jsEOFVGA();

    myFVGA.popSize = parseInt(jsEOUtils.getInputParam("popSize", 500));
    myFVGA.tournamentSize = parseInt(jsEOUtils.getInputParam("tournamentSize", 2));
    myFVGA.xOverRate = parseFloat(jsEOUtils.getInputParam("xOverRate", 10));
    myFVGA.mutRate = parseFloat(jsEOUtils.getInputParam("mutRate", 10));
    myFVGA.mutPower = parseFloat(jsEOUtils.getInputParam("mutPower", 0.5));
    myFVGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 1);    
    myFVGA.numGenerations = parseInt(jsEOUtils.getInputParam("numGenerations", 50));
    myFVGA.replaceRate = parseFloat(jsEOUtils.getInputParam("replaceRate", 0.5));
    myFVGA.showing = parseInt(jsEOUtils.getInputParam("showing", 3));
    myFVGA.minValue = parseInt(jsEOUtils.getInputParam("minValue", -10));
    myFVGA.maxValue = parseInt(jsEOUtils.getInputParam("maxValue", 10));
    myFVGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", numCoefs));

    myFVGA.run(fitnessFunction);
    /*
     jsEOUtils.print("coefs=new Array( ");
     for (var i = 0; i < numCoefs; ++i) {
     if (i) {
     jsEOUtils.print(", ");
     }
     jsEOUtils.print(coefs[i].toFixed(3));
     }
     jsEOUtils.print(");");
     */

}