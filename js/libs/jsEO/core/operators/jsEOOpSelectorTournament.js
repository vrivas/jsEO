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

var jsEOOpSelectorTournament = new Class({
    Extends: jsEOOperator,
    tournamentSize: null,
    numIndividuals: null, 
    initialize: function(_tournamentSize, _numIndividuals ) {
        this.parent(1);
        if (typeof _tournamentSize === 'undefined') {
            _tournamentSize = 2;
        }
        if (typeof _numIndividuals === 'undefined') {
            _numIndividuals = 1;
        }
        this.tournamentSize = _tournamentSize;
        this.numIndividuals = _numIndividuals
        jsEOUtils.debugln("Initializing a jsEOOpSelectorTournament " +
                " with applicationRate " + this.applicationRate +
                ", tournamentSize " + this.tournamentSize +
                ", numIndividuals " + this.numIndividuals 
                );

    },
    getTournamentSize: function () {
        return this.tournamentSize;
    },
    getNumIndividuals: function () {
        return this.numIndividuals;
    },
    setTournamentSize: function ( _value ) {
        this.tournamentSize=_value;
        return this;
    },
    setNumIndividuals: function ( _value ) {
        this.numIndividuals=_value;
        return this;
    },
    
    operate: function( _auxPop ) {
        var toRet = new jsEOPopulation();
        for (var j = 0; j <this.numIndividuals; ++j) {
            var tmpInd = Math.floor(Math.random() * _auxPop.length());
            for (var i = 1; i < this.tournamentSize; ++i) {
                rnd = Math.floor(Math.random() * _auxPop.length());
                jsEOUtils.debugln("  Comparando  " + 
                        _auxPop.getAt(rnd).getFitness() +
                        " con " + _auxPop.getAt(tmpInd).getFitness());
                tmpInd = (_auxPop.getAt(rnd).gt(_auxPop.getAt(tmpInd))) ? rnd : tmpInd;
            }
            jsEOUtils.debugln("  Final  " + _auxPop.getAt(tmpInd).getFitness());
            toRet.add(_auxPop.getAt(tmpInd).copy());
        }
        return toRet;
    }
});

