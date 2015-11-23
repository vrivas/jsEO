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



var jsEOPopulation = new Class({
    pop: []
    , initialize: function ( ) {
        jsEOUtils.debug("Initialising a jsEOPopulation" +
                "<br/>");
    }
    , getPopulation: function () {
        return this.pop;
    }
    , setPopulation: function (_indivs) {
        this.pop = _indivs;
        return this;
    }
    , getAt: function (_i, _j) {
        if (typeof _i === 'undefined') {
            return null;
        }
        if (typeof _j === 'undefined') {
            return this.pop[_i]; // Returns and individual
        }
        return this.pop.slice(_i, _j + 1); // Returns an array        
    }
    // Alias of getAt
    , getIndividualAt: function (_i) {
        return this.getAt(_i);
    }
    , getLast: function () {
        return this.pop[this.pop.length - 1];
    }
    // Alias of getLast
    , getLastIndividual: function () {
        return this.getLast();
    }
    , setAt: function (_i, _indiv) {
        this.pop[_i] = _indiv;
        return this;
    }
    // Alias of setAt
    , setIndividualAt: function (_i, _indiv) {
        return this.setAt(_i, _indiv);
    }
    , add: function (_indiv) {
        this.pop.push(_indiv);
        return this;
    }
    // alias of add
    , addIndividual: function (_indiv) {
        return this.add(_indiv);
    }
    , length: function () {
        return this.pop.length;
    }
    , sort: function () {
        pop = this.pop.sort(function (a, b) {
            return a.lt(b);
        });
        return this;
    }
    , crop: function (_size) {
        if (typeof _size == 'undefined') {
            _size = this.pop.length;
        }
        if (_size < 0) {
            _size = 0;
        }
        this.pop = this.pop.slice(0, _size);
        return this;
    }
    , join: function (_aPop) {
        this.pop = this.pop.concat(_aPop.pop);
        return this;
    }
    , replace: function (_i, _aPop) {
        for (var j = 0; j < _aPop.pop.length; ++j) {
            this.pop[j + _i] = _aPop.pop[j];
        }
        return this;
    }
    /**
     * Evaluates the individuals of the population, one after other
     * @param {function} _aFunction The function to evaluate
     * @param {array of different objects} _params Other parameters the function could need
     * @returns {The population object itself (to concatenate operations)}
     */
    , evaluate: function (_aFunction, _params) {
        this.pop.forEach(function (e) {
            e.evaluate(_aFunction, _params);
        });
        return this;
    }
});

