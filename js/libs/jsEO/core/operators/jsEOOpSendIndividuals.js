/* 
 * Copyright (C) 2013 vrivas
 *
 * Víctor M. Rivas Santos: vrivas@ujaen.es - http://vrivas.es
 * GeNeura Team- http://geneura.ugr.es
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var jsEOOpSendIndividuals = new Class({
    Extends: jsEOOperator,
    numIndividuals: 1,
    initialize: function(_numIndividuals) {
        this.parent(1);
        if (typeof _numIndividuals === 'undefined') {
            _numIndividuals = 1;
        }
        // By the moment, we only store 1 individual
        _numIndividuals = 1;
        this.numIndividuals = _numIndividuals
        jsEOUtils.debugln("Initializing a jsEOOpSendIndividuals " +
                " with applicationRate " + this.applicationRate +
                ", numIndividuals " + this.numIndividuals
                );

    },
    getNumIndividuals: function() {
        return this.numIndividuals;
    },
    /// @pre _auxPop has to be ordered by fitness
    operate: function(_auxPop) {
        var tmpPop = new jsEOPopulation();
        /*
         var data2bSend = "data={\"problemID\":\"" + jsEOUtils.getProblemId() + "\"";
         var tmpPop = "[";
         for (var i = 0; i < this.numIndividuals; ++i) {
         if (i > 0) {
         tmpPop += ",";
         }
         tmpPop += "{\"chromosome\":[";
         var tmpChr = _auxPop.getAt(i).getChromosome();
         if (Object.prototype.toString.call(tmpChr) === '[object Array]') {
         for (var j = 0; j < tmpChr.length; ++j) {
         if (j > 0) {
         tmpPop += ",";
         }
         tmpPop += "\"" + tmpChr[j] + "\"";
         }
         } else {
         tmpPop += "\"" + tmpChr + "\"";
         }
         
         tmpPop += "],\"fitness\":";
         tmpPop += "\"" + _auxPop.getAt(i).getFitness() + "\"}";
         }
         tmpPop += "]}";
         
         data2bSend += ",\"pop\":" + tmpPop;
         new Request.JSON({
         url: jsEOUtils.getSendURL(),
         method: 'GET',
         async: true,
         data: data2bSend,
         timeout: 1000,
         onTimeout: function() {
         jsEOUtils.println( "Error while conecting to "+jsEOUtils.getSendURL() );
         this.cancel();
         }
         }).send();
         */
        var data2bSend = "data=" + jsEOUtils.getProblemId() + ",";
        var tmpPop = "";
        for (var i = 0; i < this.numIndividuals; ++i) {
            if (i > 0) {
                tmpPop += ",";
            }
            var tmpChr = _auxPop.getAt(i).getChromosome();
            if (Object.prototype.toString.call(tmpChr) === '[object Array]') {
                for (var j = 0; j < tmpChr.length; ++j) {
                    if (j > 0) {
                        tmpPop += ",";
                    }
                    tmpPop += tmpChr[j];
                }
            } else {
                tmpPop += tmpChr;
            }

            tmpPop += "," + _auxPop.getAt(i).getFitness();
        }

        data2bSend += tmpPop;
        try {
            new Request({
                url: jsEOUtils.getSendURL(),
                method: 'GET',
                async: true,
                data: data2bSend,
                timeout: 1000,
                onSuccess: function(responseText) {
                    jsEOUtils.debugln('jsEOOpSendInddividual: Conection response: ' + responseText);
                },
                onTimeout: function() {
                    jsEOUtils.debugln("jsEOOpSendInddividual: Timeout while conecting to " +
                            jsEOUtils.getSendURL());
                    this.cancel();
                },
                onFailure: function() {
                    jsEOUtils.debugln("jsEOOpSendIndividual: Failure while conecting to " +
                            jsEOUtils.getSendURL());
                    this.cancel();
                }

            }).send();
        } catch (err) {
            jsEOUtils.debugln("jsEOOpSendIndividual: Error captured!");
            return null;
        }

        return null;
    }
});

