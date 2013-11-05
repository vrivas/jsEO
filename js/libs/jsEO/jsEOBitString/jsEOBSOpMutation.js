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

var jsEOBSOpMutation = new Class({
    Extends: jsEOOperator,
    bitsRate: null,
    initialize: function(_applicationRate, _bitsRate) {
        this.parent(_applicationRate);
        this.bitsRate = _bitsRate;
        jsEOUtils.debugln("Initializing a jsEOBSOpBitFlip with " +
                "applicationRate " + this.applicationRate +
                " and bitsRate " + this.bitsRate);

    },
    operate: function(_auxPop) {
        jsEOUtils.debugln("Applying jsEOBSOpBitFlip");
        var toRet = new jsEOPopulation();
        var tmpChr = _auxPop.getAt(0).getChromosome();
        var newChr = "";
        jsEOUtils.debugln("  Individual is " + tmpChr);
        for (var i = 0; i < tmpChr.length; ++i) {
            newChr += (Math.random() < this.bitsRate) ? ((tmpChr[i] == "0") ? "1" : "0") : tmpChr[i];
        }
        jsEOUtils.debugln("  Final  " + newChr);
        toRet.add(new jsEOBSIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});

