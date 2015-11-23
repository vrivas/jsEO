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


var jsEOGA = new Class({
    Extends: jsEOAlgorithm,
    indivSelector: null,
    operSelector: null,
    population: null,
    initialize: function(_opSend, _opGet) {
        this.parent(_opSend, _opGet);
        jsEOUtils.debugln("Initializing a jsEOGA" +
                " with this.population " + this.population +
                ", selector of individuals " + this.indivSelector +
                ", selector of operators " + this.operSelector
                );

    },
    setPopulation: function(_pop) {
        this.population = _pop;
        return this;
    },
    setOperSelector: function(_op) {
        this.operSelector = _op;
        return this;
    },
    setIndividSelector: function(_op) {
        this.indivSelector = _op;
        return this;
    },
    getPopulation: function( ) {
        return this.population;
    },
    getOperSelector: function( ) {
        return this.operSelector;
    },
    getIndividSelector: function( ) {
        return this.indivSelector;
    },
    privateRun: function(_fitFn, _fitFnParams, _numGenerations) {
        var popSize = this.population.length();
        this.population.sort();
        jsEOUtils.h2("Starting evolution");
        jsEOUtils.print("Generation number: <span id='genNum'>0</span>");
        //jsEOUtils.print(" Best fitness: <span id='bestFit'>0</span>");
        jsEOUtils.print(" Average fitness: <span id='aveFit'>" +
                jsEOUtils.averageFitness(this.population) + "</span>");
        var bestFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5)) + 1;
        var averFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5));
        for (var j = 0; (j < _numGenerations); ++j) {
            jsEOUtils.replace(j, "genNum");
            //jsEOUtils.replace(bestFit, "bestFit");
            jsEOUtils.replace(
                    parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5)),
                    "aveFit");

            var newPop = this.indivSelector.operate(this.population);
            for (var i = 0; i < newPop.length(); ++i) {
                var tmpPop = new jsEOPopulation();
                tmpPop.add(newPop.getAt(i)).join(newPop);
                tmpPop = this.operSelector.
                        operate().
                        operate(tmpPop).
                        evaluate(_fitFn, _fitFnParams);
                newPop.setAt(i, tmpPop.getAt(0));
            }
            this.population.join(newPop).sort().crop(popSize);
            if (typeof this.opSend != 'undefined' && this.opSend != null) {
                this.opSend.operate(this.population);
            }
            bestFit = parseFloat(this.population.getAt(0).getFitness().toFixed(5));
            averFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5));

            jsEOUtils.recordStats(this.population.getLast().getFitness(),
                    jsEOUtils.averageFitness(this.population),
                    this.population.getAt(0).getFitness());

        } //for numGenerations
    },
    run: function(_fitFn, _fitFnParams, _numGenerations) {
        this.privateRun(_fitFn, _fitFnParams, _numGenerations);
    }
});

