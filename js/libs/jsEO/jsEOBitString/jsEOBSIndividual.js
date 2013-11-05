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




var jsEOBSIndividual=new Class( {
    Extends: jsEOIndividual,
    initialize: function( _bitString ){
        this.parent(_bitString); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug( "Initializating a jsEOBSIndividual ");
    },
    randomize: function( _length ) {
      var chr="";
      if(!_length) _length=8;
      for( var i=0; i<_length; ++i ) {
          chr+=(Math.random()*100<50)?0:1;
      }
      this.chromosome=chr;
      return this;      
    }
});
