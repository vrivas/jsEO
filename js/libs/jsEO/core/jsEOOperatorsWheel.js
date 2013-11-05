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

var jsEOOperatorsWheel = new Class({
    operators: [],
    appRateSum: null,
    initialize: function(_operators) {
        this.appRateSum = 0;
        if (typeof _operators !== 'undefined') {
            this.operators = _operators;
            for (var i = 0; i < _operators.length; ++i) {
                this.appRateSum += parseFloat( _operators.getApplicationRate() );
            }
        }
        jsEOUtils.debugln("Initializing a jsEOOperatorsWheel " );
    },
    addOperator: function(_operator) {
        this.operators.push(_operator);
        this.appRateSum += parseFloat( _operator.getApplicationRate() );
        jsEOUtils.debugln( "Adding a new operator with appRate  "+
                _operator.getApplicationRate())
        return this;
    },
    removeOperator: function(_operator) {
        var pos;
        if (typeof _operator === "number") {
            pos = _operator;
        } else {
            pos = this.operators.indexOf(_operator);
        }
        var toRet = this.operators[pos];
        var last = this.operators.pop();
        if (pos < this.operators.length) {
            this.operators[pos] = last;
        }
        this.appRateSum -= parseFloat( toRet.getApplicationRate() );
        return this;
    },
    getOperators: function() {
        return this.operators;
    },
    getOperatorAt: function(_i) {
        if (typeof _i == 'number' && _i >= 0 && _i < this.operators.length) {
            return this.operators[i];
        } else {
            return null;
        }
    },
    setOperators: function(_operators) {
        if (typeof _operators !== 'undefined') {
            this.appRateSum = 0;
            this.operators = _operators;
            for (var i = 0; i < _operators.length; ++i) {
                this.appRateSum += parseFloat( _operators.getApplicationRate());
            }
        }
        return this;
    },
    setOperatorAt: function(_i, _operator) {
        if (typeof _i === 'number' && _i >= 0 && _i < this.operators.length) {
            this.appRateSum -= parseFloat( this.operators[i].getApplicationRate() ) + 
                    parseFloat( _operator.getOperatorRate() );
            this.operators[i] = _operator;
        }
        return this;
    },
    getSumOfApplicationRates: function() {
        return this.appRateSum;
    },
    operate: function() {
        var rnd = Math.random() * this.appRateSum;
        var i = 0;
        var tmp = this.operators[i].getApplicationRate();
        while (i < this.operators.length && tmp < rnd) {
            tmp += this.operators[++i].getApplicationRate();
        }
        jsEOUtils.debugln( "Selecting operator "+i+" "+this.appRateSum+" "+
                rnd );
        return this.operators[i];
    }
});



