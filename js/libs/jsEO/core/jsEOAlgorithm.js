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



var jsEOAlgorithm = new Class({
    opSend: null,
    opGet: null,
    initialize: function(  _opSend, _opGet){
        if( typeof _opSend !='undefined' && _opSend ){
            this.opSend=_opSend;
        }
        if( typeof _opGet !='undefined' && _opGet ){
            this.opGet=_opGet;
        }
        jsEOUtils.debugln( "Initializing a jsEOAlgorithm "+
                "with "+
                " Operator for sending individuals "+this.opSend +
                ", Operator for getting individuals "+this.opGet                
                );
    },
    privateRun: function( _fitFn ) {
      return null;  
    },
    run: function() {
        return null;
    }
});

