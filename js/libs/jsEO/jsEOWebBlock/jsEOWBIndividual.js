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




var jsEOWBIndividual = new Class({
    Extends: jsEOIndividual,
    initialize: function(_floats) {
        this.parent(_floats); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug("Initializating a jsEOWBIndividual ");
    },
    randomize: function(_length) {
        var chr = new Array();
        if (typeof _length == 'undefined') {
            _length = 8;
        }
        if (typeof _min == 'undefined') {
            _min = 0;
        }
        if (typeof _max == 'undefined') {
            _max = 1;
        }

        var tmpChr=new Array();
        var tmpLen=_length;
        for (var i = 0; i < _length; ++i) {
            tmpChr.push(i);
        }

        for (var i = 0; i < _length; ++i) {
            var data=parseInt (Math.random() * tmpLen );
            chr.push( tmpChr[data] );
            tmpChr[data]=tmpChr[--tmpLen];
        }
          
     
        this.setChromosome(chr);
        return this;
    },
    evaluate: function(_fitFn) {
        this.setFitness(_fitFn(this.chromosome));
        return this;
    }
});
