{
	
var app=angular.module('app',['angular-jqcloud']);

app.controller('controller',function ($scope) {
	$scope.friends=[
		{text: "gaurav", weight: 43},
		{text: "dhiraj", weight: 23},
		{text: "charu", weight: 33},
		{text: "pallavi", weight: 23},
		{text: "Sush", weight: 18},
		{text: "heena", weight: 20},
		{text: "nisha", weight: 26},
		{text: "aarti", weight: 24},
		{text: "Immam", weight: 33},
		{text: "nakul", weight: 111},
		{text: "jyoti", weight: 29},
		{text: "radha", weight: 35},
		{text: "ruschi", weight: 13},

	];

	$scope.brands=[
		{text: "Puma", weight: 43},
		{text: "Addidas", weight: 33},
		{text: "NIke", weight: 53},
		{text: "Levis", weight: 23},
		{text: "Rebook", weight: 34},
		{text: "WoodLand", weight: 143},

	];

	$scope.brandColors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];


	this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };

});

app.controller('brand',function($scope){

	$scope.brands=[
		{text: "Puma", weight: 43},
		{text: "Addidas", weight: 33},
		{text: "NIke", weight: 53},
		{text: "Levis", weight: 23},
		{text: "Rebook", weight: 34},
		{text: "WoodLand", weight: 143},

	];

	$scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];


})
}
