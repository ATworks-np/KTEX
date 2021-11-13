const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
//const direct = [[1],[0],[0]];
const direct = [[1/Math.sqrt(3)],[1/Math.sqrt(3)],[1/Math.sqrt(3)]];
const name = ['cube','s','random'];
function rnorm(){
    return Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
}
function rnormN(N){
  var spl =  [-1.2815514,
              -0.841621007,
              -0.524401007,
              -0.25334700,
               0,
               0.253346992,
               0.524400992,
               0.841620992,
               1.2815514]
  var res = new Array(N);
  var E = (new Array(10)).fill(0);
  for(var i=0;i<N;i++){
    res[i] = rnorm();
    if(res[i]<spl[0]){
      E[0]+=1
    }else if(res[i]>=spl[8]){
      E[9]+=1
    }else{
      for(var j=0;j<8;j++){
        if(res[i]>=spl[j]&&res[i]<spl[j+1]){
          E[j+1]+=1
          break;
        }
      }
    }
  }
  var Q=0;
  for(var i=0;i<10;i++){
    Q+=(N/10-E[i])**2/(N/10);
  }
  if(Q>14.7){
    res = rnormN(N);
  }
  return res
}
function dot(matrix1, matrix2){
  var res = [];
  var row1 = matrix1.length;
  var row2 = matrix2.length;
  var col1 = matrix1[0].length;
  var col2 = matrix2[0].length;

  for(var i1 = 0; i1 < row1; i1++){
    res.push([]);
    for(var i2 = 0; i2 < col2; i2++){
      res[i1].push(0);
      for(var i3 = 0; i3 < col1; i3++){
        res[i1][i2] += matrix1[i1][i3] * matrix2[i3][i2];
      }
    }
  }

  return res;
}
function trans(polar){
  var len = polar.length;
  var res = JSON.parse(JSON.stringify((new Array(len)).fill((new Array(2)).fill(0))));
  for (var i=0;i<len;i++){
    res[i][0]= Math.sqrt(polar[i][0]**2 + polar[i][1]**2);
    res[i][1] = Math.atan2(polar[i][1],polar[i][0]);
  }
  return res;
}
function rot(phi){
  var res = new Array(2);
  var a  = phi[0]*Math.PI/180-Math.PI/2;
  var b  = phi[1]*Math.PI/180;
  var c  = phi[2]*Math.PI/180+Math.PI/2;
  var R1 = [[ Math.cos(a) , Math.sin(a),0],
            [-Math.sin(a) , Math.cos(a),0],
            [0            , 0          ,1]];
  var R2 = [[ Math.cos(b) ,0, -Math.sin(b)],
            [ 0           ,1, 0           ],
            [ Math.sin(b) ,0, Math.cos(b)]];
  var R3 = [[ Math.cos(c) , Math.sin(c),0],
            [-Math.sin(c) , Math.cos(c),0],
            [0            , 0          ,1]];
  var R = dot(dot(R1,R2),R3);
  var o = dot(R,direct);
  if(o[2][0]<0)o[2][0]*=-1
  var x = 2*o[0][0]/(1+o[2][0]);
  var y = 2*o[1][0]/(1+o[2][0]);
  res[0]= Math.sqrt(x**2 + y**2);
  res[1] = Math.atan2(x,y);
  return res;
}
function stereographic(tex,json){
  var polar = ({'cube'    :{'r':[],'theta':[]},
                's'       :{'r':[],'theta':[]},
                'random'  :{'r':[],'theta':[]},
                'selected':{'r':[],'theta':[]}
              });
  var len = [Object.keys(tex['cube'].phi).length,
             Object.keys(tex['s'].phi).length,
             Object.keys(tex['random'].phi).length,
            ];
  var vol = len[0]+len[1]+len[2];
  var ind = ({'cube'    :[],
              's'       :[],
              'random'  :[],
              });
  for(var i=0;i<3;i++){
    for(var j=0;j<len[i];j++){
      var p = rot([tex[name[i]].phi1[j],
                   tex[name[i]].phi[j],
                   tex[name[i]].phi2[j]
                   ]);
      polar[name[i]].r.push(p[0]);
      polar[name[i]].theta.push(p[1]);
    }
    for(var j=0;j<json[name[i]].volume*10;j++){
      var a = Math.random()*len[i]|0;
      ind[name[i]].push(a);
    }
  }
  for(var i=0;i<3;i++){
    for(var j=0;j<json[name[i]].volume*10;j++){
      polar["selected"].r.push(polar[name[i]].r[ind[name[i]][j]]);
      polar["selected"].theta.push(polar[name[i]].theta[ind[name[i]][j]]);
    }
  }
  return polar;
}
function chi_check(){
  return 0;
}
function geTex(json){
  var cube = geCube(json);
  var s    = geS(json);
  var conp = cube.length+s.length;
  var v = parseInt((json.cube.volume/100+json.s.volume/100)*json.volume,10);
  var ind = new Array(v);
  for(var i=0;i<v;i++)ind[i]=parseInt(Math.random()*conp,10);
  var tex = ({'cube' :{'phi1':[],'phi':[],'phi2':[]},
             's'     :{'phi1':[],'phi':[],'phi2':[]},
             'random':{'phi1':[],'phi':[],'phi2':[]}
            });
  for(var i=0;i<json.volume;i++){
    I = ind[i];
    if(i>v){
      tex.random.phi1.push(Math.random()*360);
      tex.random.phi.push(Math.random()*360);
      tex.random.phi2.push(Math.random()*360);
    }else if(I>=0&&I<cube.length){
      tex.cube.phi1.push(cube[I][0]);
      tex.cube.phi.push(cube[I][1]);
      tex.cube.phi2.push(cube[I][2]);
    }else if(I>=cube.length){
      tex.s.phi1.push(s[I-cube.length][0]);
      tex.s.phi.push(s[I-cube.length][1]);
      tex.s.phi2.push(s[I-cube.length][2]);
    }
  }
  return tex;

}
function cubeUnit(json,c){
  var a = 0.5;
  var v = parseInt(9*json.k*json.cube.volume/100,10);
  var R = JSON.parse(JSON.stringify((new Array(3)).fill((new Array(3)).fill(0))));
  if(c ==1){
    R = [[-0.707,0, 0.707],
         [     0,1,     0],
         [-0.707,0,-0.707]];
  }else{
    R = [[ 0.707,0, 0.707],
         [     0,1,     0],
         [-0.707,0, 0.707]];
  }
  var tex = JSON.parse(JSON.stringify((new Array(v)).fill((new Array(3)).fill(0))));
  for(var i=0;i<parseInt(v*a,10);i++){
    var p = [[Math.random()*90*1.414],
             [rnorm()*json.cube.spread],
             [rnorm()*json.cube.spread]
            ];
    if(p[1][0]<0)p[1][0]*=-1;
    var pp = dot(R,p);
    tex[i][0] = pp[0][0];
    tex[i][1] = pp[1][0];
    tex[i][2] = pp[2][0];
    if(c==0){
      tex[i][0]+=90
      tex[i][2]+=90
    }else{
      tex[i][2]+=90;
    }
    if(tex[i][2]<0){
      tex[i][2]+=90;
    }else if(tex[i][0]>90){
      tex[i][0]-=90;
    }else if(tex[i][0]<0){
      tex[i][0]+=90;
    }else if(tex[i][2] > 90){
            tex[i][2]-=90;
    }

  }
  for(var i=parseInt(a*v,10);i<v;i++){
    tex[i] = [rnorm()*json.cube.spread,
              rnorm()*json.cube.spread,
              rnorm()*json.cube.spread
             ];
    for(var j=0;j<3;j++){
      if(tex[i][j]<0){
        tex[i][j]+=90;
      }
    }
  }
  return tex;
}
function geCube(json){
  var a = 1;
  var v = parseInt(9*json.k*json.cube.volume/100,10);
  var tex = JSON.parse(JSON.stringify((new Array(v*64)).fill((new Array(3)).fill(0))));
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      for(var k=0;k<4;k++){
        if(k == 0){
          var a = 1;
          var buf = cubeUnit(json,0);
          for(var l=0;l<v;l++){
            tex[((i*4+j)*4+k)*v+l][0] = buf[l][0]+90*i;
            tex[((i*4+j)*4+k)*v+l][1] = buf[l][1];
            tex[((i*4+j)*4+k)*v+l][2] = buf[l][2]+90*j;
          }
        }else if(k == 1){
          var a = 1;
          var buf = cubeUnit(json,1);
          for(var l=0;l<v;l++){
            tex[((i*4+j)*4+k)*v+l][0] = buf[l][0]+90*i;
            tex[((i*4+j)*4+k)*v+l][1] = 180-buf[l][1];
            tex[((i*4+j)*4+k)*v+l][2] = buf[l][2]+90*j;
          }
        }else if(k == 2){
          var buf = cubeUnit(json,1);
          for(var l=0;l<v;l++){
            tex[((i*4+j)*4+k)*v+l][0] = buf[l][0]+90*i;
            tex[((i*4+j)*4+k)*v+l][1] = 180+buf[l][1];
            tex[((i*4+j)*4+k)*v+l][2] = buf[l][2]+90*j;
          }
        }else if(k == 3){
          var buf = cubeUnit(json,0);
          for(var l=0;l<v;l++){
            tex[((i*4+j)*4+k)*v+l][0] = buf[l][0]+90*i;
            tex[((i*4+j)*4+k)*v+l][1] = 360-buf[l][1];
            tex[((i*4+j)*4+k)*v+l][2] = buf[l][2]+90*j;
          }
        }
      }
    }
  }
  return tex;
}
function geS(json){
  var v = parseInt(8*json.k*json.s.volume/100,10);
  var tex = JSON.parse(JSON.stringify((new Array(v*72)).fill((new Array(3)).fill(0))));
  var S = [ [  59,  37,  63],
            [ 239, 143, 117],
            [ 239, 143, 297],
            [  59,  37, 243],
            [ 307,  74,  56],
            [ 127, 106, 304],
            [ 307,  74, 236],
            [ 127, 106, 124],
            [ 206,  58,  19],
            [  26, 122, 161],
            [  26, 122, 341],
            [ 206,  58, 199],
            [ 307,  74, 146],
            [  26, 122,  71],
            [  59,  37, 333],
            [ 127, 106,  34],
            [ 206,  58, 289],
            [  59,  37, 153],
            [ 239, 143,  27],
            [ 239, 143, 207],
            [ 206,  58, 109],
            [ 307,  74, 326],
            [  26, 122, 251],
            [ 127, 106, 214],
            [  53,  75,  34],
            [ 233, 105, 146],
            [ 233, 105, 326],
            [  53,  75, 214],
            [ 302,  37,  26],
            [ 122, 143, 334],
            [ 302,  37, 206],
            [ 122, 143, 154],
            [ 153,  57,  72],
            [ 333, 123, 108],
            [ 333, 123, 288],
            [ 153,  57, 252],
            [ 302,  37, 116],
            [ 333, 123,  18],
            [  53,  75, 304],
            [ 122, 143,  64],
            [ 153,  57, 342],
            [  53,  75, 124],
            [ 233, 105,  56],
            [ 233, 105, 236],
            [ 153,  57, 162],
            [ 302,  37, 296],
            [ 333, 123, 198],
            [ 122, 143, 244],
            [  27,  58,  20],
            [ 207, 122, 160],
            [ 207, 122, 340],
            [  27,  58, 200],
            [ 241,  37,  61],
            [  61, 143, 299],
            [ 241,  37, 241],
            [  61, 143, 119],
            [ 128,  73,  56],
            [ 308, 107, 124],
            [ 308, 107, 304],
            [ 128,  73, 236],
            [ 241,  37, 151],
            [ 308, 107,  34],
            [  27,  58, 290],
            [  61, 143,  29],
            [ 128,  73, 326],
            [  27,  58, 110],
            [ 207, 122,  70],
            [ 207, 122, 250],
            [ 128,  73, 146],
            [ 241,  37, 331],
            [ 308, 107, 214],
            [  61, 143, 209]];
  for(var sp=0;sp<72;sp++){
    for(var axis=0;axis<3;axis++){
      var norm = rnormN(parseInt(v/2,10));
      for(var vv=0;vv<parseInt(v/2,10);vv++){
        tex[sp*v+vv][axis] =  - norm[vv]*json.s.spread+S[sp][axis];
      }
      norm = rnormN(parseInt(v/2,10));
      for(var vv=parseInt(v/2,10);vv<v;vv++){
        tex[sp*v+vv][axis] = 360 - (norm[vv-parseInt(v/2,10)]*json.s.spread+S[sp][axis]);
      }
    }
  }
  return tex;
}
