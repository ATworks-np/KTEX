var tex;
var texbuf;
var conf;
function drawSS(json){
  var RD = {
    x: json['1_1'].RD_e,
    y: json['1_1'].RD_s,
    mode: 'lines',
    line: {
      color: 'rgb(0,255,0)',
      width: 3
    }
  };
  var TD = {
    x: json['1_1'].TD_e,
    y: json['1_1'].TD_s,
    mode: 'lines',
    line: {
      color: 'rgb(255,0,0)',
      width: 3
    }
  };
  var data = [RD, TD];
  var layout = {
    title: 'SS curve',
    xaxis: {
      title:"epsiron",
      range: [0, 600]
    },
    yaxis: {
      title:"stress",
      range: [0, 300]
    }
  };

  Plotly.newPlot('SS_content', data, layout);
}
function drawTex(tex){
  var random = {
    x:tex.random.phi1,
    y:tex.random.phi,
    z:tex.random.phi2,
    mode: 'markers',
    name: 'Random',
    marker: {
      size: 3,
      color: 'rgba(0, 0, 0, 0.2)',
      opacity: 0.8
    },
    type: 'scatter3d'
  };
  var cube = {
    x:tex.cube.phi1,
    y:tex.cube.phi,
    z:tex.cube.phi2,
    mode: 'markers',
    name: 'Cube',
    marker: {
      size: 3,
      color: 'rgba(217, 0, 0, 0.2)',
      opacity: 0.8
    },
    type: 'scatter3d'
  };
  var s = {
    x:tex.s.phi1,
    y:tex.s.phi,
    z:tex.s.phi2,
    mode: 'markers',
    name: 'S',
    marker: {
      size: 3,
      color: 'rgba(0, 10, 200, 0.5)',
      opacity: 0.8
    },
    type: 'scatter3d'
  };
  var data = [random,cube,s];
  var xti = '&mu;';
  var layout = {
    title: "Buge's Euler Angle",
     scene: {
      xaxis: {
        title:"phi1",
        range: [0, 360],
        titlefont: {
          family: 'Times New Roman',
          size: 18,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        title:"phi",
        range: [0, 360],
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      zaxis: {
        title:"phi2",
        range: [0, 360],
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };
  Plotly.newPlot('eulerPlot', data, layout);
}
function drawPolar(polar){
  var random = {
    r: polar.random.r,
    theta: polar.random.theta,
    thetaunit: "radians",
    mode: 'markers',
    name:'random',
    marker: {
      size: 4,
      color: 'rgba(0, 0, 0, 0.3)',
      opacity: 0.8
    },
    type: 'scatterpolar'
  };
  var cube = {
    r: polar.cube.r,
    theta: polar.cube.theta,
    thetaunit: "radians",
    mode: 'markers',
    name:'Cube',
    marker: {
      size: 4,
      color: 'rgba(200, 0, 0, 0.3)',
      opacity: 0.8
    },
    type: 'scatterpolar'
  };
  var s = {
    r: polar.s.r,
    theta: polar.s.theta,
    thetaunit: "radians",
    mode: 'markers',
    name:'S',
    marker: {
      size: 4,
      color: 'rgba(0, 0, 200, 0.3)',
      opacity: 0.8
    },
    type: 'scatterpolar'
  };
  var selected = {
    r: polar.selected.r,
    theta: polar.selected.theta,
    thetaunit: "radians",
    mode: 'markers',
    name:'selected',
    marker: {
      size: 4,
      color: 'rgba(0, 255,0, 0.5)',
      opacity: 0.8
    },
    type: 'scatterpolar'
  };
  var layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 2]
      }
    }
  }

  var data = [random,cube,s,selected]
  Plotly.newPlot('programming_content', data,layout);
}
function drawPole2(json){
  var p = {
    r: json.r,
    theta: json.arg,
    mode: 'markers',
    marker: {
      size: 3,
      line: {
        color: 'rgba(0, 0, 0, 0.14)',
        width: 0
      },
      opacity: 0.8
    },
    type: 'scatterpolar'
  };
  var layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 4]
      }
    }
  }
  var data = [p]
  Plotly.newPlot('programming_content', data,layout);
}
function drawEuler(json){
  var trace1 = {
    x:json.phi1,  y: json.phi, z:json.phi2,
    mode: 'markers',
    marker: {
      size: 3,
      line: {
        color: 'rgba(217, 217, 217, 0.14)',
        width: 0
      },
      opacity: 0.8
    },
    type: 'scatter3d'
  };
  var data = [trace1];
  var xti = '&mu;';
  var layout = {
    title: '$\phi$',
     scene: {
      xaxis: {
        title:"&mu;",
        titlefont: {
          family: 'Times New Roman',
          size: 18,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        title: 'y Axis',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      zaxis: {
        title: 'y Axis',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };
  Plotly.newPlot('all_content', data, layout);
}
function drawODF(tex){
  var ODFname = ['0','5','10','15','20','25','30','35','40','45',
                 '50','55','60','65','70','75','80','85']
  var ODF = ({'0' :{'phi1':[],'phi':[]},
              '5' :{'phi1':[],'phi':[]},
              '10':{'phi1':[],'phi':[]},
              '15':{'phi1':[],'phi':[]},
              '20':{'phi1':[],'phi':[]},
              '25':{'phi1':[],'phi':[]},
              '30':{'phi1':[],'phi':[]},
              '35':{'phi1':[],'phi':[]},
              '40':{'phi1':[],'phi':[]},
              '45':{'phi1':[],'phi':[]},
              '50':{'phi1':[],'phi':[]},
              '55':{'phi1':[],'phi':[]},
              '60':{'phi1':[],'phi':[]},
              '65':{'phi1':[],'phi':[]},
              '70':{'phi1':[],'phi':[]},
              '75':{'phi1':[],'phi':[]},
              '80':{'phi1':[],'phi':[]},
              '85':{'phi1':[],'phi':[]}
            })
  for(var i=0;i<3;i++){
    var len=Object.keys(tex[name[i]].phi).length
    for(var j=0;j<len;j++){
      var a = tex[name[i]].phi1[j];
      var b = tex[name[i]].phi[j];
      var c = tex[name[i]].phi2[j];
      if(a<90&&c<90&&b<90){
        ODF[ODFname[parseInt(c/5)]].phi1.push(a);
        ODF[ODFname[parseInt(c/5)]].phi.push(b);
      }
    }
  }
  var data = [{
    x: ODF['20'].phi1,
    y: ODF['20'].phi,
    mode: 'markers',
    type: 'histogram2dcontour'
  }];
  var layout = {
    xaxis: {
      title:"phi1",
      range: [0, 90]
    },
    yaxis: {
      title:"phi",
      range: [0, 90]
    }
  }
  Plotly.newPlot('design_content', data,layout);
}
//<canvas id="pole" width="600" height="600"></canvas>
