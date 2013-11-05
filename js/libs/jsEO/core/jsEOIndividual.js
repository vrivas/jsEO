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




var jsEOIndividual=new Class({
    Extends: jsEO,
    chromosome: null,
    initialize: function( _chromosome ) {
        this.parent();
        this.chromosome=_chromosome;
        jsEOUtils.debug( "Inicializado un jsEOIndividual con chromosome "+this.chromosome+
                "<br/>");

    },
    copy: function() {
        var toRet=new jsEOIndividual();
        toRet.fitness=this.fitness;
        toRet.chromosome=this.chromosome;
        return toRet;
    },
    getChromosome: function() {
      return this.chromosome;  
    },
    setChromosome: function( _chromosome ) {
        this.chromosome=_chromosome;
        return this;
    },
    evaluate: function( _fitFn ) {
        this.setFitness( _fitFn( this.chromosome ) );
        return this;
    }
});

