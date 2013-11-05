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



var jsEO = new Class({
    fitness:null,
    initialize: function(){
        jsEOUtils.debug( "Initializing a jsEO <br/>");
    },
    copy: function() {
        var toRet=new jsEO();
        toRet.fitness=this.fitness;
        return toRet;
    },
    getFitness: function() {
        return this.fitness;
    },
    setFitness: function(_fitness) {
        return this.fitness=_fitness;
    },
    evaluate: function() {
        this.fitness=null;
        return this;
    },
    // Less than
    lt: function( _eo ) {
        return this.fitness<_eo.fitness;
    },
    // Equal to
    eq: function( _eo ) {
       return this.fitness===_eo.fitness; 
    },
    // Greater than
    gt: function( _eo ) {
        return ! (this.lt(_eo) || this.eq( _eo ) );
    },
    // Less than or equal to
    le: function( _eo ) {
        return (this.lt(_eo) || this.eq( _eo ) );
    },
    // Greater than or equal to
    ge: function( _eo ) {
        return (!this.lt(_eo) || this.eq( _eo ) );
    }
});

