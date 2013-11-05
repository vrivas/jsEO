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

var jsEOBSGA = new Class({
    Extends: jsEOGA,
    verbose: jsEOUtils.getInputParam("verbose", false),
    configure: jsEOUtils.getInputParam("configure", false),
    popSize: jsEOUtils.getInputParam("popSize", 100),
    tournamentSize: jsEOUtils.getInputParam("tournamentSize", 2),
    xOverRate: jsEOUtils.getInputParam("xOverRate", 0.8),
    mutRate: jsEOUtils.getInputParam("mutRate", 0.2),
    mutPower: jsEOUtils.getInputParam("mutPower", 0.5),
    numGenerations: jsEOUtils.getInputParam("numGenerations", 500),
    replaceRate: jsEOUtils.getInputParam("replaceRate", 0.5),
    getIndividualsRate: jsEOUtils.getInputParam("getIndividualsRate",  0.2),
    showing: jsEOUtils.getInputParam("showing", 3),
    indSize: jsEOUtils.getInputParam("indSize", 256),
    initialize: function( _opSend, _opGet) {
        if( typeof _opGet!= 'undefined' ) {
            _opGet.setApplicationRate( this.getIndividualsRate );
        }
        this.parent( _opSend, _opGet);
        jsEOUtils.debugln("Initializing a jsEOBSGA");
        return this;
    },
    doConfigure: function() {
        msg = "";
        jsEOUtils.setOutput("jsEOForm");
        jsEOUtils.println("<strong>Configuring EOTest</strong><br/>");
        msg = "<form method='GET' action='./index.html' name='f1'>";
        msg += "<p>Verbosity: <input type='radio' name='verbose' value='true'>True ";
        msg += "<input type='radio' name='verbose' value='False'>False</p>";
        msg += "<p>Individual size: <input type='text' name='indSize' value='" +
                this.indSize + "' size='4'></p>";
        msg += "<p>Population size: <input type='text' name='popSize' value='" +
                this.popSize + "' size='4'></p>";
        msg += "<p>Tournament size: <input type='text' name='tournamentSize' value='" +
                this.tournamentSize + "' size='4'></p>";
        msg += "<p>CrossOver rate: <input type='text' name='xOverRate' value='" +
                this.xOverRate + "' size='4'></p>";
        msg += "<p>Mutation rate: <input type='text' name='mutRate' value='" +
                this.mutRate + "' size='4'></p>";
        msg += "<p>Bits changed by mutator rate: <input type='text' name='mutPower' value='" +
                this.mutPower + "' size='4'></p>";
        msg += "<p>Number of generations: <input type='text' name='numGenerations' value='" +
                this.numGenerations + "' size='4'></p>";
        msg += "<p>Replace rate: <input type='text' name='replaceRate' value='" +
                this.replaceRate + "' size='4'></p>";
        msg += "<p>'Get Individuals' rate: <input type='text' name='getIndividualsRate' value='" +
                this.getIndividualsRate + "' size='4'></p>";
        msg += "<p>Number of individuals to show: <input type='text' name='showing' value='" +
                this.showing + "' size='4'></p>";
        msg += "<p><input type='submit' value='Send data'>" +
                "<input type='reset' value='Reset'></p>";
        msg += "</form>"
        jsEOUtils.clear();
        jsEOUtils.println(msg);
        jsEOUtils.setOutput("jsEOConsole");
        return this;
    },
    run: function( _fitFn ) {
        // Program
        // Program
        if (this.configure) {
            this.doConfigure();
            return;
        }
        this.population = new jsEOPopulation();
        for (var i = 0; i < this.popSize; ++i) {
            var myBS = new jsEOBSIndividual();
            myBS.randomize(this.indSize, this.minValue, this.maxValue).
                    evaluate(_fitFn);
            this.population.addIndividual(myBS);
        }
        this.population.sort();

        this.indivSelector = new jsEOOpSelectorTournament(this.tournamentSize,
                Math.floor(this.popSize * this.replaceRate));

        this.operSelector = new jsEOOperatorsWheel();
        this.operSelector.
                addOperator(new jsEOBSOpCrossOver(this.xOverRate));
        this.operSelector.
                addOperator(new jsEOBSOpMutation(this.mutRate,
                        this.mutPower,
                        this.minValue,
                        this.maxValue));
        if( this.opGet) {
            this.operSelector.addOperator( this.opGet );
        }

        jsEOUtils.showPop(this.population, "Initial population", this.showing);
        jsEOUtils.println("Average fitness: " + jsEOUtils.averageFitness(this.population));

        this.privateRun(_fitFn, this.numGenerations, this.showing);

        jsEOUtils.showPop(this.population, "Final population", this.showing);
        jsEOUtils.println("Average fitness: " + jsEOUtils.averageFitness(this.population));
        //jsEOUtils.drawStats( "Graphics" );
    }

});
 