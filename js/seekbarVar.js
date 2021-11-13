var cubeSlider = new Seekbar.Seekbar({
    renderTo: "#seekbar-Cube",
    minValue: 0, maxValue: 100,
    valueListener: function (value) {
      var sum = sSlider.value + value;
      if(sum>100){
        this.value = Math.round(100-sum+value);
      }else{
        this.value = Math.round(value);
      }
      updateValue()
    },
    barSize:4,
    needleSize:0.2,
    thumbColor: '#ccff0000',
    negativeColor: '#ff0000',
    positiveColor: '#CCC',
    value: 0
});
var cubeSpreadSlider = new Seekbar.Seekbar({
    renderTo: "#seekbar-Cube-S",
    minValue: 1, maxValue: 15,
    valueListener: function (value) {
        this.value = Math.round(value);
        updateValue()
    },
    barSize:4,
    needleSize:0.2,
    thumbColor: '#ccff0000',
    negativeColor: '#ff0000',
    positiveColor: '#CCC',
    value: 1
});
var sSlider = new Seekbar.Seekbar({
    renderTo: "#seekbar-S",
    minValue: 0, maxValue: 100,
    valueListener: function (value) {
        var sum = cubeSlider.value + value;
        if(sum>100){
          this.value = Math.round(100-sum+value);
        }else{
          this.value = Math.round(value);
        }
        updateValue()
    },
    barSize:4,
    needleSize:0.2,
    thumbColor: '#cc0000ff',
    negativeColor: '#0000ff',
    positiveColor: '#CCC',
    value: 0
});
var sSpreadSlider = new Seekbar.Seekbar({
    renderTo: "#seekbar-S-S",
    minValue: 1, maxValue: 15,
    valueListener: function (value) {
      this.value = Math.round(value);
      updateValue()
    },
    barSize:4,
    needleSize:0.2,
    thumbColor: '#cc0000ff',
    negativeColor: '#0000ff',
    positiveColor: '#CCC',
    value: 1
});
function updateValue() {
    var Cube = cubeSlider.value.toString(10);
    var CubeS = cubeSpreadSlider.value.toString(10);
    var S = sSlider.value.toString(10);
    var SS = sSpreadSlider.value.toString(10);
    document.getElementById('SVolume').value = S;
    document.getElementById('CubeVolume').value = Cube;
    document.getElementById('SSpread').value = SS;
    document.getElementById('CubeSpread').value = CubeS;
    document.getElementById('RandVolume').value = 100-(cubeSlider.value+sSlider.value);
    $("#CubeVolume").html(Cube);
    $("#CubeSpread").html(CubeS);
    $("#SVolume").html(S);
    $("#SSpread").html(SS);
    $("#RandVolume").html((100-(cubeSlider.value+sSlider.value)).toString(10));

  }
