import numpy as np
import os
import cgi
import json
from CubeS import geCube
from CubeS import geS
import convert

print ("Content-Type:text/html")
print()

size = 128
if 'QUERY_STRING' in os.environ:
    query = cgi.parse_qs(os.environ['QUERY_STRING'])
else:
    query = {}

def trans(data):
    res = np.zeros([data.shape[0],2])
    for i in range(data.shape[0]):
        res[i,1] = np.sqrt(data[i,0]**2 + data[i,1]**2)
        res[i,0] = np.arctan2(data[i,1],data[i,0])*180/np.pi

    return res
direct = np.array([1,1,1])

Vc = int(query['cv'][0])/100.0
Vs = int(query['sv'][0])/100.0
ss = 8
sc = 2
Vol = 4000
Vol_ge = int(Vol*Vc) + int(Vol*Vs/2) + int(Vol*Vs/2) +int( Vol*(1- (Vc+Vs)))
m=0
if (Vol_ge != Vol):
    m = Vol - Vol_ge
Cube = geCube(sc,int(Vol*Vc)+m)
S1    = geS (ss,int(Vol*Vs/2))
S2    = geS (ss,int(Vol*Vs/2))
S2[:,1]*=-1
S2[:,1]+=360
a = Vol*(1- (Vc+Vs))
none  = np.random.rand(int(a)*3)
none  = np.reshape(none,(int(a),3))*[360,360,360]
texture = np.r_[Cube,S1,S2,none]
texturePole = np.array(trans(convert.convert(texture,direct)))
texturePole1000 = np.random.choice(texturePole,1000, replace=False)
np.savetxt("texture.txt",texturePole1000,delimiter="\t")
json_content = json.dumps({'phi1': [texture[i,0] for i in range(Vol)],
                           'phi' : [texture[i,1] for i in range(Vol)],
                           'phi2': [texture[i,2] for i in range(Vol)],
                           'r'   : [texturePole[i,1]  for i in range(Vol)],
                           'arg'   : [texturePole[i,0]  for i in range(Vol)],
                           })

print ("callback(%s);"%(json_content))
