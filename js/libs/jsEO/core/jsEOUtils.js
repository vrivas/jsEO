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




/* global google */

var jsEOUtils = {
    verbose: false
    , bestFit: []
    , worstFit: []
    , averageFit: []
    , idOutput: "jsEOConsole"
    , idGraphics: "jsEOGraphics"
    , idChart: "myChart"
    , problemID: null
    , getURL: "http://jseo.vrivas.es/php/sending.php"
    , sendURL: "http://jseo.vrivas.es/php/receiving.php"
    , proxyURL: "http://jseo.vrivas.es/php/proxy.php"
    , showing: 3
    , setOutput: function (_id) {
        if (typeof _id != 'undefined') {
            this.idOutput = _id;
        }
        return this;
    }
    , setGraphics: function (_id) {
        if (typeof _id != 'undefined') {
            this.idGraphics = _id;
        }
        return this;
    }
    , print: function (_message, _id) {
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idOutput;
        }
        var element = document.getElementById(_id);
        if (element) {
            element.innerHTML += _message;
        }
        return this;
    }
    , replace: function (_message, _id) {
        this.clear(_id);
        this.print(_message, _id);
        return this;
    }
    , println: function (_message, _id) {
        this.print(_message + "<br/>", _id);
        return this;
    }
    , h2: function (_message, _id) {
        this.print("<h2>" + _message + "</h2>\n", _id);
        return this;
    }
    , clear: function (_id) {
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idOutput;
        }
        var element = document.getElementById(_id);
        if (element) {
            element.innerHTML = "";
        }
        return this;
    }
    , debug: function (_message, _id) {
        if (!this.verbose)
            return;
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idOutput;
        }
        var element = document.getElementById(_id);
        if (element) {
            element.innerHTML += "<pre>" + _message + "</pre>";
        }
        return this;
    }
    , debugln: function (_message, _id) {
        this.debug(_message + "<br/>", _id);
        return this;
    }
    , remove_commas: function (_str) {
        if (typeof _str == 'undefined' || !_str) {
            return "";
        }
        return _str.replace(/,/g, '');
    }
    , setVerbose: function (boolean) {
        this.verbose = boolean;
        return this;
    }
    , getVerbose: function () {
        return this.verbose;
    }
    , setProblemId: function (_id) {
        this.problemID = this.remove_commas(_id);
        return this;
    }
    , getProblemId: function () {
        return this.remove_commas(this.problemID);
    }
    , setGetURL: function (_url) {
        this.getURL = _url;
        return this;
    }
    , getGetURL: function () {
        return this.getURL;
    }
    , setSendURL: function (_url) {
        this.sendURL = _url;
        return this;
    }
    , getSendURL: function () {
        return this.sendURL;
    }
    , setProxyURL: function (_url) {
        this.proxyURL = _url;
        return this;
    }
    , getProxyURL: function () {
        return this.proxyURL;
    }
    , setShowing: function (_val) {
        this.showing = (_val >= 0) ? _val : this.showing;
        return this;
    }
    , getShowing: function () {
        return this.showing;
    }
    , showPop: function (_aPop, _message, _numIndiv) {
        if (typeof _message != 'undefined' && _message) {
            jsEOUtils.print("<h2>" + _message + "</h2>");
        }
        if (typeof _aPop == 'undefined') {
            return this;
        }

        // Fixing the value of _numIndiv in case of problems
        _numIndiv = (typeof _numIndiv == 'undefined') ? this.showing : _numIndiv;
        _numIndiv = (_numIndiv < 0 || _numIndiv > _aPop.length()) ? _aPop.length() : _numIndiv;

        var tb = "";
        tb += "<table class='tb_indiv' cols='3' border='0'>\n<tr>\n" +
                "<th class='nInd'>#Indiv</th>\n " +
                "<th class='chr'>Chromosome</th>\n " +
                "<th class='fit'>Fitness</th>\n " +
                "</tr>\n ";
        for (var i = 0; i < _numIndiv; ++i) {
            var chr = _aPop.getAt(i).getChromosome().toString();
            tb += "<tr>\n " +
                    "<td class='nInd'>" + i + "</td>\n" +
                    "<td class='chr'><span title='" + chr + "'>" +
                    ((chr.length <= 50) ? chr : (chr.substr(0) + "...")) + "</span></td>\n" +
                    "<td class='chr'>" + _aPop.getAt(i).getFitness() + "</td>\n" +
                    "</tr>\n ";

        }
        tb += "</table>\n";
        this.print(tb);

        return this;
    }
    , averageFitness: function (_aPop) {
        var toRet = 0;
        if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
            return toRet;
        }
        for (i = 0; i < _aPop.length(); ++i)
            toRet += _aPop.getAt(i).getFitness();
        return (toRet / _aPop.length());
    }
    , getInputParam: function (_param, _default) {
        var str = location.search.toLowerCase();
        var pos = str.indexOf((_param + "=").toLowerCase());
        return (pos < 0) ? _default : str.substring(str.indexOf("=", pos) + 1,
                (str.indexOf("&", pos) >= 0) ? str.indexOf("&", pos) : str.length);
    }
    , clearBestFitness: function () {
        bestFitness.length = 0;
        return this;
    }
    , clearWorstFitness: function () {
        worstFitness.length = 0;
        return this;
    }
    , clearAverageFitness: function () {
        averageFitness.length = 0;
        return this;
    }
    , clearStats: function () {
        this.clearAverageFitness();
        this.clearBestFitness();
        this.clearWorstFitness();
        return this;
    }
    , recordBestFitness: function (_value) {
        this.bestFit.push(_value);
        return this;
    }
    , recordWorstFitness: function (_value) {
        this.worstFit.push(_value);
        return this;
    }
    , recordAverageFitness: function (_value) {
        this.averageFit.push(_value);
        return this;
    }
    , recordStats: function (_worst, _average, _best) {
        this.recordWorstFitness(_worst);
        this.recordAverageFitness(_average);
        this.recordBestFitness(_best);
        return this;
    }
    , drawBestFitness: function (_id) {
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idGraphics;
        }
        google.load("visualization", "1", {packages: ["corechart"]});
        google.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Generation');
            data.addColumn('number', 'Fitness');
            for (var i = 0; i < jsEOUtils.bestFit.length; ++i) {
                data.addRow([i, jsEOUtils.bestFit[i]]);
            }

            var options = {
                title: 'Evolution of Best Fitness'
            };
            var chart = new google.visualization.LineChart(document.getElementById(_id));
            chart.draw(data, options);
        });
        return this;
    }
    , drawWorstFitness: function (_id) {
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idGraphics;
        }
        google.load("visualization", "1", {packages: ["corechart"]});
        google.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Generation');
            data.addColumn('number', 'Fitness');
            for (var i = 0; i < jsEOUtils.worstFit.length; ++i) {
                data.addRow([i, jsEOUtils.worstFit[i]]);
            }

            var options = {
                title: 'Evolution of Worst Fitness'
            };
            var chart = new google.visualization.LineChart(document.getElementById(_id));
            chart.draw(data, options);
        });
        return this;
    }
    , drawAverageFitness: function (_id) {
        if (typeof _id === 'undefined' || !_id) {
            _id = this.idGraphics;
        }
        google.load("visualization", "1", {packages: ["corechart"]});
        google.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Generation');
            data.addColumn('number', 'Fitness');
            for (var i = 0; i < jsEOUtils.averageFit.length; ++i) {
                data.addRow([i, jsEOUtils.averageFit[i]]);
            }

            var options = {
                title: 'Evolution of Average Fitness'
            };
            var chart = new google.visualization.LineChart(document.getElementById(_id));
            chart.draw(data, options);
        });
        return this;
    }
    , drawAverageFitness2: function (_id) {
        if (typeof _id === 'undefined' || !_id) {
            _id = this.idChart;
        }
        var ctx = document.getElementById(_id).getContext("2d");
        var data = {
            labels: jsEOUtils.averageFit.map(function (e, i) {
                return i;
            }),
            datasets: [
                {
                    label: "Average Fitness",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: jsEOUtils.averageFit
                }
            ]
        };
        var myLineChart = new Chart(ctx).Line(data);
        return this;
    }

    , drawStats: function (_message, _id) {
        if (typeof _id === 'undefined' || !_id) {
            _id = this.idGraphics;
        }
        this.h2(_message, _id);
        google.load("visualization", "1", {packages: ["corechart"]});
        google.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Generation');
            data.addColumn('number', 'Worst Fitness');
            data.addColumn('number', 'Average Fitness');
            data.addColumn('number', 'Best Fitness');
            for (var i = 0; i < jsEOUtils.bestFit.length; ++i) {
                data.addRow([i, jsEOUtils.worstFit[i],
                    jsEOUtils.averageFit[i],
                    jsEOUtils.bestFit[i]]);
            }

            var options = {
                title: 'Evolution of Fitness'
            };
            var chart = new google.visualization.LineChart(document.getElementById(_id));
            chart.draw(data, options);
        });
        return this;
    }

    /**
     * Creates a random integer number between min and max, both of them included
     * @param {type} min Lowest value
     * @param {type} max Greatest value
     * @returns {Number} Random integer number in the range [min,max]
     */
    , intRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Creates a random number between [min, max)
     * @param {type} min Lowest value
     * @param {type} max Greatest value
     * @returns {Number} Random number in the range [min,max)
     */
    , random: function (min, max) {
        return (Math.random() * (max - min)) + min;
    }

    /**
     * Computes euclidean distance between two arrays
     * @param {array of floats} a First array
     * @param {array of floats} b Second array
     * @throws {RangeError} Error if lengths of a and b are differents
     * @returns {Number} The euclidean distance
     */
    , distance: function (a, b) {
        if (typeof a === 'undefined')
            throw new TypeError("Distance can't be computed: "
                    + "first parameter doen't exist ");
        if (typeof b === 'undefined')
            throw new TypeError("Distance can't be computed: "
                    + "second parameter doen't exist ");
        if (a.length != b.length)
            throw new RangeError("Distance can't be computed: "
                    + "points have different lengths; "
                    + a.length + " vs " + b.length);

        // Turning parameters into array to apply .map
        a = (a.length) ? a : [a];
        b = (b.length) ? b : [b];
        return Math.sqrt(
                a.map(function (e, i) {
                    return e - b[i];
                })
                .map(function (e) {
                    return Math.pow(e, 2);
                })
                .reduce(function (a, b) {
                    return a + b;
                }, 0)
                );
    }
};
